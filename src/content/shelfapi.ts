import type { CaseStudyContent } from './types';
import shelfApiImg from '@/assets/project-1.png';

export const shelfapi: CaseStudyContent = {
    slug: 'shelfapi',
    title: 'ShelfAPI',
    subtitle: 'Document Vault REST API',
    status: 'IN_PROGRESS',
    statusNote: 'Core API working locally — cloud deployment completing this week',
    date: '07/2026 – Present',
    heroImage: shelfApiImg,
    liveUrl: null,
    codeUrl: 'https://github.com/DevWithAbhishek/ShelfAPI-backend',

    whatIsIt:
        'A NestJS REST API for authenticated document management: users create documents, tag them, and attach a file. Built specifically to practice the parts of backend engineering that don\'t show up in a CRUD tutorial — ownership-scoped authorization, token theft detection, and direct-to-cloud file storage.',

    whyExists:
        'Kridha is large enough that individual patterns get buried in a bigger system. ShelfAPI isolates a few of those patterns — auth, ownership, file storage — in a smaller surface area, partly to prove they weren\'t incidental to Kridha\'s complexity, and partly to have a second, independently-defensible codebase for interviews.',

    architecture: {
        intro:
            'NestJS (dependency-injected, modular) with Prisma over PostgreSQL. Layered as Controller → Service → Prisma, with a global exception filter and Zod + class-validator at the request boundary.',
        points: [
            'AuthModule: signup, login, refresh-token rotation, logout — session state in a Postgres `Session` table.',
            'DocsModule: ownership-scoped CRUD on documents, many-to-many tags via a junction table, one-to-one file attachment.',
            'Global exception filter maps custom error classes to HTTP status codes and logs with structured context.',
            'S3 integration for file attachments — the storage client is wired into the module but not yet fully configured end-to-end (see Verification below).',
        ],
    },

    hardProblems: [
        {
            problem: 'A refresh token needs to be rotatable without losing the ability to detect if it was stolen.',
            approach:
                'Same family-tracking pattern used in Kridha: refresh tokens are grouped by a family UUID, hashed with Argon2 before storage, and reuse of an already-rotated token is treated as a signal, not just an error.',
            status: 'VERIFIED',
        },
        {
            problem: 'A user must never be able to read or modify another user\'s documents, even by guessing an ID.',
            approach: 'Every document query filters by user_id in the WHERE clause at the service layer, rather than checking ownership after fetching.',
            status: 'VERIFIED',
        },
        {
            problem: 'File uploads should not route through the Node process — an EC2 instance handling large file bytes for many concurrent uploads is a bandwidth and memory problem waiting to happen.',
            approach:
                'Design is a presigned-URL flow: Node generates a scoped, time-limited S3 URL; the browser uploads directly to S3. The generation logic and DB reference-storage pattern are in place; the S3 client\'s provider wiring is the remaining piece.',
            status: 'IN_PROGRESS',
        },
    ],

    decisions: [
        {
            decision: 'Argon2 over bcrypt for password and refresh-token hashing.',
            context: 'Same reasoning applied consistently across both Kridha and ShelfAPI.',
            alternatives: 'bcrypt is the more familiar default; Argon2 was chosen for its memory-hardness against GPU-based cracking.',
            tradeoff: 'Slightly more CPU/memory cost per hash operation, accepted because auth endpoints are not the throughput bottleneck in either system.',
            status: 'VERIFIED',
        },
        {
            decision: 'Presigned S3 URLs instead of routing uploads through the API.',
            context: 'A single EC2 instance has finite bandwidth and memory; proxying file bytes through Node for every upload doesn\'t scale past a handful of concurrent users.',
            alternatives: 'Storing files on the EC2 instance\'s own disk was rejected outright — it doesn\'t survive an instance replacement and isn\'t durable.',
            tradeoff: 'Adds the complexity of presigned-URL generation and expiry tuning versus a simpler (but non-durable, non-scalable) local-disk approach.',
            status: 'IN_PROGRESS',
        },
    ],

    verification: [
        {
            item: 'JWT auth + refresh rotation + Argon2 hashing',
            status: 'VERIFIED',
            detail: 'Confirmed via source-level read-only repository audit: token generation, family tracking, and hash verification are implemented as described.',
        },
        {
            item: 'Ownership-scoped document CRUD',
            status: 'VERIFIED',
            detail: 'Create, get-by-id, update, and delete are implemented with ownership checks. The list-all endpoint (GET /docs) is currently an empty handler — not yet implemented.',
        },
        {
            item: 'S3 file attachment upload',
            status: 'IN_PROGRESS',
            detail: 'S3Client is injected into the module but has no configured provider yet — this is the specific piece being finished this week, along with the EC2 + Nginx deployment.',
        },
        {
            item: 'Automated test coverage',
            status: 'FUTURE',
            detail: 'Test files exist per module but are currently placeholder ("should be defined") assertions rather than real coverage. Honest gap, not yet addressed.',
        },
    ],

    failureModes: [
        {
            scenario: 'A logout-all request should revoke every active session for a user, not just the current one.',
            handling: 'Implemented via a bulk update filtering by token family and null revoked_at — a single atomic query rather than a loop.',
            status: 'VERIFIED',
        },
        {
            scenario: 'A malformed or oversized request body reaches the API.',
            handling: 'Zod schema validation at the boundary plus NestJS\'s global ValidationPipe reject it before it reaches business logic.',
            status: 'VERIFIED',
        },
    ],

    results: {
        stats: [
            { value: 'Argon2', label: 'Token Hashing' },
            { value: 'Zod', label: 'Boundary Validation' },
            { value: 'This Week', label: 'AWS Deploy ETA' },
        ],
        note:
            'This case study will be updated with deployment details (EC2, Nginx, RDS, S3) once they are actually live and independently checkable — not before.',
    },

    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Zod', 'Argon2', 'Docker', 'AWS S3'],
};