import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import type { CaseStudyContent } from "@/content/types";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
    {children}
  </h2>
);

export const CaseStudyPage = ({ content }: { content: CaseStudyContent }) => {
  const c = content;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Minimal header — this is a subpage, not the anchor-nav home page */}
      <header className="border-b border-border/50 py-5">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <Link to="/#projects" className="text-sm nav-link">
            All projects
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 spotlight">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <EvidenceBadge status={c.status} />
            <span className="text-muted-foreground text-xs font-mono">
              {c.statusNote}
            </span>
            <span className="text-muted-foreground text-xs font-mono ml-auto">
              {c.date}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-none mb-3">
            {c.title}
          </h1>
          <p className="text-xl text-muted-foreground font-medium mb-8">
            {c.subtitle}
          </p>

          <div className="flex gap-3 flex-wrap mb-10">
            {c.liveUrl && (
              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-primary-foreground text-sm flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Live App{" "}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={c.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gradient text-foreground text-sm flex items-center gap-2"
            >
              <FaGithub className="w-4 h-4" /> View Code
            </a>
          </div>

          <div className="gradient-border rounded-2xl overflow-hidden mb-6 max-w-3xl">
            <img
              src={c.heroImage}
              alt={c.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl">
            {c.results.stats.map((stat) => (
              <div
                key={stat.label}
                className="card-glass rounded-xl p-4 text-center border border-primary/10"
              >
                <div className="text-2xl font-bold gradient-text font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-3xl space-y-20 pb-24">
        {/* What is it */}
        <section>
          <SectionHeading>What is it</SectionHeading>
          <p className="text-muted-foreground leading-relaxed">{c.whatIsIt}</p>
        </section>

        {/* Why it exists */}
        <section>
          <SectionHeading>Why it exists</SectionHeading>
          <p className="text-muted-foreground leading-relaxed">{c.whyExists}</p>
        </section>

        {/* Architecture */}
        <section>
          <SectionHeading>Architecture</SectionHeading>
          <p className="text-muted-foreground leading-relaxed mb-5">
            {c.architecture.intro}
          </p>
          <ul className="space-y-3">
            {c.architecture.points.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Hard problems */}
        {c.hardProblems.length > 0 && (
          <section>
            <SectionHeading>Hard engineering problems</SectionHeading>
            <div className="space-y-5">
              {c.hardProblems.map((hp, i) => (
                <div
                  key={i}
                  className="card-glass gradient-border rounded-xl p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="font-medium text-sm">{hp.problem}</p>
                    <EvidenceBadge
                      status={hp.status}
                      className="flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hp.approach}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering decisions */}
        {c.decisions.length > 0 && (
          <section>
            <SectionHeading>Engineering decisions</SectionHeading>
            <div className="space-y-8">
              {c.decisions.map((d, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold">{d.decision}</h3>
                    <EvidenceBadge
                      status={d.status}
                      className="flex-shrink-0"
                    />
                  </div>
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
        )}

        {/* Verification */}
        <section>
          <SectionHeading>Verification</SectionHeading>
          <div className="space-y-3">
            {c.verification.map((v, i) => (
              <div key={i} className="card-glass rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-medium text-sm">{v.item}</p>
                  <EvidenceBadge status={v.status} className="flex-shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Failure modes */}
        {c.failureModes.length > 0 && (
          <section>
            <SectionHeading>Failure modes</SectionHeading>
            <div className="space-y-3">
              {c.failureModes.map((f, i) => (
                <div key={i} className="card-glass rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-medium text-sm">{f.scenario}</p>
                    <EvidenceBadge
                      status={f.status}
                      className="flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.handling}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results / evidence note */}
        <section>
          <SectionHeading>Results &amp; evidence</SectionHeading>
          <p className="text-muted-foreground leading-relaxed">
            {c.results.note}
          </p>
        </section>

        {/* Tech */}
        <section>
          <SectionHeading>Stack</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {c.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
