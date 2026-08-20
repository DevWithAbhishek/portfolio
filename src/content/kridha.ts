import type { CaseStudyContent } from './types';
import kridhaImg from '@/assets/kridha.png';

export const kridha: CaseStudyContent = {
    slug: 'kridha',
    title: 'Kridha',
    subtitle: 'B2B + B2C Self-Pickup Marketplace',
    status: 'VERIFIED',
    statusNote: 'Live — taking real checkout traffic',
    date: '03/2026 – Present',
    heroImage: kridhaImg,
    liveUrl: 'https://kridha-marketplace.vercel.app/',
    codeUrl: 'https://github.com/DevWithAbhishek/kridha',

    whatIsIt:
        'A hyperlocal B2B/B2C marketplace connecting kirana shop owners with nearby farmers, oil mills, and micro-suppliers across Tier-2/3 India. Buyers discover sellers within a radius, checkout across multiple sellers in one transaction, and pick up in person — no delivery layer.',

    whyExists:
        'Minimum-order constraints from delivery-based B2B platforms lock small buyers out. Replacing delivery with self-pickup removes that floor, but it introduces a harder problem: a single buyer transaction can span multiple independent sellers, each with their own inventory, pickup windows, and payout — all of which has to stay consistent even when things fail halfway through.',

    architecture: {
        intro:
            'Next.js 16 monolith (App Router) with API routes as the backend, PostgreSQL 17 with PostGIS on Supabase, dual-mode Redis (Upstash in production, local Docker in dev), and Razorpay for payments.',
        points: [
            'Order → SubOrder decomposition: one buyer transaction, one Order per checkout, one SubOrder per seller — each with independent OTP verification, pickup window, and payout.',
            'Checkout runs inside a single Prisma transaction that locks every product row, verifies stock, decrements inventory, and creates the Order/SubOrder/OrderItem records atomically.',
            'Webhook receiver is a separate, stateless trust boundary: HMAC-verified, idempotent via a unique DB constraint, always returns 200 to avoid retry storms.',
            'Three-layer rate limiting (per-IP, per-account, global platform ceiling) sitting in front of auth and checkout routes.',
        ],
    },

    hardProblems: [
        {
            problem: 'Concurrent buyers checking out the same limited stock must never oversell it.',
            approach:
                'Row-level pessimistic locking: SELECT ... FOR UPDATE on the product row inside the checkout transaction, backed by a DB-level CHECK (available >= 0) as a second line of defense if application logic has a bug.',
            status: 'VERIFIED',
        },
        {
            problem: 'Razorpay redelivers webhooks; a duplicate delivery must never double-process a payment.',
            approach:
                'Insert-first idempotency: a WebhookLog row with a unique constraint on razorpayPaymentId is created before processing. A second delivery hits the unique-constraint violation and is treated as already-handled, silently returning 200.',
            status: 'VERIFIED',
        },
        {
            problem: 'A stolen refresh token must be detectable, not just rotatable.',
            approach:
                'Refresh tokens are grouped into a family (UUID). Reuse of an already-rotated token revokes the entire family — the legitimate user gets logged out, but so does the attacker, and it is logged as a security event.',
            status: 'VERIFIED',
        },
        {
            problem: '"Products within 5km" needs to be geodesically accurate at India scale, not a flat-plane approximation.',
            approach:
                'PostGIS geography column with ST_DWithin and a GiST index, chosen over MongoDB\'s $geoWithin specifically because PostGIS uses the WGS-84 ellipsoid rather than flat geometry.',
            status: 'VERIFIED',
        },
    ],

    decisions: [
        {
            decision: 'SELECT FOR UPDATE (pessimistic locking) over optimistic locking for inventory.',
            context: 'Checkout must resolve synchronously — the buyer is waiting on a response, not polling a retry loop.',
            alternatives:
                'Optimistic locking (version column + retry) was considered but rejected because a failed optimistic write means re-running checkout logic client-side, which is a worse UX than a lock briefly queuing.',
            tradeoff: 'Lock contention increases response time under heavy concurrent checkout of the same product, in exchange for a correctness guarantee instead of a probabilistic one.',
            status: 'VERIFIED',
        },
        {
            decision: 'PostgreSQL + PostGIS over MongoDB for geospatial search.',
            context: 'Core discovery flow is "sellers within radius R of buyer" — this needs to be both accurate and indexable.',
            alternatives: 'MongoDB with $geoWithin was the default reach for a Node/JS stack, but its flat-geometry math introduces real error at India\'s geographic scale.',
            tradeoff: 'Committing to a relational database for what could otherwise be a document-shaped catalog — accepted because the actual data (orders, sub-orders, payments) was relational anyway, so PostGIS didn\'t cost an extra database.',
            status: 'VERIFIED',
        },
        {
            decision: 'Always return HTTP 200 from the webhook receiver, even on internal error.',
            context: 'Razorpay retries non-200 responses with exponential backoff, which can cause retry floods during a transient DB outage.',
            alternatives: 'Returning 5xx on failure is the "obvious" REST-correct choice, but it hands retry-storm risk to the payment provider instead of your own logging/alerting.',
            tradeoff: 'Failures have to be caught by Sentry/logging instead of HTTP status — if alerting silently breaks, a failed webhook could go unnoticed longer than a 5xx would.',
            status: 'VERIFIED',
        },
    ],

    verification: [
        {
            item: 'Row-level locking prevents overselling under concurrent checkout',
            status: 'IN_PROGRESS',
            detail:
                'k6 load test (03_race_condition.js) targets the SELECT FOR UPDATE path directly with isolated per-buyer JWTs. Reported as executed and passing; raw output was deliberately deleted afterward to force independent reproduction as interview preparation, so no artifact is currently attached to this claim.',
        },
        {
            item: 'Webhook idempotency under concurrent duplicate delivery',
            status: 'IN_PROGRESS',
            detail: '04_webhook_idempotency.js sends 100 identical webhook payloads concurrently and asserts exactly one WebhookLog row. Test is written and targets the correct code path; execution artifacts not currently retained.',
            // note: mirrors the same re-run status as the race condition test
        },
        {
            item: 'Cart concurrency and cache-aside behavior under load',
            status: 'IN_PROGRESS',
            detail: '05_concurrency.js is a stability test (cart writes + cold/warm cache reads), not a correctness proof like the two above.',
        },
        {
            item: 'Unit and integration test coverage (pricing, state machine, order+webhook flow)',
            status: 'VERIFIED',
            detail: 'Test files exist and exercise the described logic (Jest + Supertest); full assertion detail not reproduced here.',
        },
    ],

    failureModes: [
        {
            scenario: 'Transaction interrupted after SELECT FOR UPDATE but before COMMIT',
            handling: 'Lock releases on ROLLBACK — no partial stock decrement is possible since the whole checkout is one transaction.',
            status: 'VERIFIED',
        },
        {
            scenario: 'Razorpay order creation succeeds but the DB transaction that should follow it fails',
            handling: 'Compensating transaction restores stock and cancels the SubOrder; a compensation failure is logged at fatal severity to Sentry rather than failing silently.',
            status: 'VERIFIED',
        },
        {
            scenario: 'Redis (cache/rate-limiter) is unavailable',
            handling: 'Cache fails open (falls through to DB, slower but correct). Rate limiting fails closed (blocks requests) — a deliberate asymmetry, since a missing cache only costs performance while open-failing rate limiting invites abuse.',
            status: 'VERIFIED',
        },
    ],

    results: {
        stats: [
            { value: '61', label: 'API Endpoints' },
            { value: '19', label: 'Invariants' },
            { value: '22', label: 'DB Models' },
        ],
        note:
            'Endpoint/model/invariant counts are verified against the source repository. Production traffic, latency, and throughput figures are not available — this is a live app without meaningful user volume to report yet, and no number is claimed here that isn\'t backed by something checkable.',
    },

    tech: [
        'Node.js', 'TypeScript', 'Next.js 16', 'PostgreSQL', 'PostGIS',
        'Prisma', 'Redis', 'Razorpay', 'Zod', 'Argon2', 'Vercel',
    ],
};