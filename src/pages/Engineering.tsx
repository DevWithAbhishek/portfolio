import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import {
  engineeringDecisions,
  debuggingCases,
  experimentCategories,
  aiAssistedEngineering,
  agenticEngineering,
} from "@/content/engineering";

const SectionHeading = ({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="mb-8">
    <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
      {children}
    </h2>
    {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
  </div>
);

const EngineeringPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 py-5">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </div>
      </header>

      <section className="py-16 md:py-20 spotlight">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-none mb-4">
            Engineering
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Decisions, debugging, and experiments across projects — with the
            same evidence standard as everywhere else on this site. Empty
            sections say so rather than being filled with placeholder claims.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-4xl space-y-20 pb-24">
        {/* Engineering Decisions */}
        <section>
          <SectionHeading subtitle="Aggregated from each project's case study — not duplicated content, single source of truth lives with the project.">
            Engineering Decisions
          </SectionHeading>
          <div className="space-y-8">
            {engineeringDecisions.map((d, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-5">
                <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                  <h3 className="font-display font-semibold">{d.decision}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <EvidenceBadge status={d.status} />
                  </div>
                </div>
                <Link
                  to={`/projects/${d.projectSlug}`}
                  className="text-xs font-mono text-primary/80 hover:text-primary inline-flex items-center gap-1 mb-3"
                >
                  {d.project} <ArrowRight className="w-3 h-3" />
                </Link>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="inline text-foreground font-medium">
                      Context:{" "}
                    </dt>
                    <dd className="inline text-muted-foreground">
                      {d.context}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-foreground font-medium">
                      Alternatives:{" "}
                    </dt>
                    <dd className="inline text-muted-foreground">
                      {d.alternatives}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-foreground font-medium">
                      Trade-off:{" "}
                    </dt>
                    <dd className="inline text-muted-foreground">
                      {d.tradeoff}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Debugging */}
        <section>
          <SectionHeading subtitle="Problem → Reproduction → Observed Behaviour → Hypothesis → Evidence → Root Cause → Fix → Verification → Prevention → Trade-offs">
            Debugging
          </SectionHeading>
          {debuggingCases.length === 0 ? (
            <div className="card-glass rounded-xl p-6 border border-dashed border-border">
              <EvidenceBadge status="FUTURE" className="mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                No completed debugging writeup exists yet. Nothing is published
                here rather than filling the space with a generic claim — the
                structure above is the one that will be used once a real case is
                documented.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {debuggingCases.map((dc, i) => (
                <div key={i} className="card-glass rounded-xl p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold">{dc.title}</h3>
                    <EvidenceBadge status={dc.status} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dc.summary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Experiments */}
        <section>
          <SectionHeading subtitle="Future-proof by category — activated as real evidence lands, not before.">
            Engineering Experiments
          </SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {experimentCategories.map((ec) => (
              <div key={ec.name} className="card-glass rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-medium text-sm">{ec.name}</h3>
                  <EvidenceBadge status={ec.status} className="flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  {ec.note}
                </p>
                {ec.linkSlug && (
                  <Link
                    to={`/projects/${ec.linkSlug}`}
                    className="text-xs font-mono text-primary/80 hover:text-primary inline-flex items-center gap-1"
                  >
                    View evidence <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* AI-Assisted Engineering */}
        <section>
          <SectionHeading>AI-Assisted Engineering</SectionHeading>
          <div className="card-glass rounded-xl p-6 border border-dashed border-border">
            <EvidenceBadge
              status={aiAssistedEngineering.status}
              className="mb-3"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aiAssistedEngineering.note}
            </p>
          </div>
        </section>

        {/* Agentic Engineering */}
        <section>
          <SectionHeading>Agentic Engineering</SectionHeading>
          <div className="card-glass rounded-xl p-6 border border-dashed border-border">
            <EvidenceBadge
              status={agenticEngineering.status}
              className="mb-3"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {agenticEngineering.note}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EngineeringPage;
