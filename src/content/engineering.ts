import type { EvidenceStatus } from '@/components/shared/EvidenceBadge';
import { kridha } from './kridha';
import { shelfapi } from './shelfapi';

// Aggregates decisions already documented per-project rather than duplicating
// them — single source of truth stays in content/kridha.ts and content/shelfapi.ts.
export const engineeringDecisions = [
    ...kridha.decisions.map((d) => ({ ...d, project: 'Kridha', projectSlug: 'kridha' })),
    ...shelfapi.decisions.map((d) => ({ ...d, project: 'ShelfAPI', projectSlug: 'shelfapi' })),
];

export interface DebuggingCase {
    title: string;
    status: EvidenceStatus;
    summary: string;
}

// Structure to be used once a real debugging writeup exists:
// Problem -> Reproduction -> Observed behaviour -> Hypothesis -> Evidence
// collected -> Root cause -> Fix -> Verification -> Prevention -> Trade-offs.
// Nothing published here yet because no completed writeup exists — this is
// the honest state, not a placeholder pretending otherwise.
export const debuggingCases: DebuggingCase[] = [];

export interface ExperimentCategory {
    name: string;
    status: EvidenceStatus;
    note: string;
    linkSlug?: string; // if a project case study already covers this category
}

export const experimentCategories: ExperimentCategory[] = [
    {
        name: 'Concurrency',
        status: 'IN_PROGRESS',
        note: 'Covered by Kridha\'s row-locking + k6 race-condition test. See the Kridha case study — currently reported executed with artifacts not retained, pending re-run with saved output.',
        linkSlug: 'kridha',
    },
    {
        name: 'Database (transactions, locking, migrations)',
        status: 'FUTURE',
        note: 'No standalone experiment published yet beyond what\'s embedded in the Kridha case study.',
    },
    {
        name: 'Redis (failure modes, cache-aside, distributed locks)',
        status: 'FUTURE',
        note: 'To be added soon.',
    },
    {
        name: 'Queues (backlog handling, poison messages, idempotent retries)',
        status: 'FUTURE',
        note: 'Planned alongside IMS\'s BullMQ implementation — nothing to show yet.',
    },
    {
        name: 'CI/CD (rollback, pipeline gates, feature flags)',
        status: 'FUTURE',
        note: 'To be added soon.',
    },
    {
        name: 'Load Testing',
        status: 'IN_PROGRESS',
        note: 'k6 scripts exist for Kridha (throughput, latency percentiles, concurrency) — see Kridha case study Verification section for current status.',
        linkSlug: 'kridha',
    },
    {
        name: 'Observability (incident postmortems, alerting)',
        status: 'FUTURE',
        note: 'Planned alongside IMS. To be added soon.',
    },
];

export const aiAssistedEngineering = {
    status: 'FUTURE' as EvidenceStatus,
    note:
        'This section is reserved for concrete AI-assisted engineering writeups — what AI did, what I did, what I verified, what I rejected — once real examples exist with enough detail to be checkable. Not populating it with general statements about "using AI for speed," since that\'s not a specific, falsifiable claim.',
};

export const agenticEngineering = {
    status: 'FUTURE' as EvidenceStatus,
    note:
        'Reserved for documented agent-delegated engineering work (problem, agent/tool, task delegated, constraints, verification, human review, final decision) once such work exists in a reviewable form.',
};