import type { EvidenceStatus } from '@/components/shared/EvidenceBadge';

export interface Decision {
    decision: string;
    context: string;
    alternatives: string;
    tradeoff: string;
    status: EvidenceStatus;
}

export interface VerificationItem {
    item: string;
    status: EvidenceStatus;
    detail: string;
}

export interface CaseStudyContent {
    slug: string;
    title: string;
    subtitle: string;
    status: EvidenceStatus;
    statusNote: string; // e.g. "Live, taking real checkout traffic" or "Infra completing this week"
    date: string;
    heroImage: string;
    liveUrl: string | null;
    codeUrl: string;

    whatIsIt: string;
    whyExists: string;

    architecture: {
        intro: string;
        points: string[];
    };

    hardProblems: {
        problem: string;
        approach: string;
        status: EvidenceStatus;
    }[];

    decisions: Decision[];

    verification: VerificationItem[];

    failureModes: {
        scenario: string;
        handling: string;
        status: EvidenceStatus;
    }[];

    results: {
        stats: { value: string; label: string }[];
        note: string;
    };

    tech: string[];
}