import type { CaseStudyContent } from './types';
import imsImg from '@/assets/ims.png';

export const ims: CaseStudyContent = {
    slug: 'ims',
    title: 'IMS',
    subtitle: 'Production Incident Management System',
    status: 'FUTURE',
    statusNote: 'Architecture stage — implementation not yet started',
    date: '07/2026 – Present',
    heroImage: imsImg,
    liveUrl: null,
    codeUrl: 'https://github.com/DevWithAbhishek/IMS',

    whatIsIt:
        'A planned incident-management platform: incident lifecycle tracking, SLA policies, escalation workflows, and role-based access, built as a modular monolith so it can be split into services later without a rewrite.',

    whyExists:
        'Kridha and ShelfAPI are both request/response systems. IMS is deliberately chosen to force work on the async side of backend engineering — background jobs, queues, and observability — which neither prior project exercises.',

    architecture: {
        intro: 'Planned: Express.js modular monolith, PostgreSQL + Prisma, Redis-backed BullMQ for async work, OpenTelemetry/Prometheus/Grafana for observability.',
        points: [
            'Module boundaries drawn up front so distributed extraction is possible later without a rewrite.',
            'Incident lifecycle intended to be enforced by database state transitions, not just application logic.',
            'Escalations, notifications, and retries intended to run through BullMQ rather than inline in request handlers.',
        ],
    },

    hardProblems: [],

    decisions: [],

    verification: [
        {
            item: 'Any implementation claim',
            status: 'FUTURE',
            detail: 'Nothing beyond architecture planning exists yet. This page intentionally has no verified sections — check back as modules land.',
        },
    ],

    failureModes: [],

    results: {
        stats: [
            { value: 'ADR', label: 'Architecture First' },
            { value: 'Queues', label: 'Planned: BullMQ' },
            { value: 'Telemetry', label: 'Planned: Monitoring' },
        ],
        note: 'No implementation evidence exists yet. Follow the repository for progress.',
    },

    tech: [
        'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ',
        'Docker', 'GitHub Actions', 'OpenTelemetry', 'Prometheus', 'Grafana', 'JWT',
    ],
};