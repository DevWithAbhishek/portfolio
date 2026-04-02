import { ExternalLink, Github, CheckCircle2, Calendar, ArrowUpRight } from 'lucide-react';
import kridhaImg from '@/assets/kridha.png';
import fixmitraaImg from '@/assets/fixmitraa.jpeg';

const projectsData = [
  {
    id: 1,
    label: 'Full-Stack · Live in Production',
    title: 'Kridha',
    subtitle: 'B2B + B2C Self-Pickup Marketplace',
    date: '03/2026 – Present',
    isLive: true,
    description:
      'Supply chain marketplace eliminating minimum-order constraints by replacing delivery with buyer self-pickup — connecting kirana owners with nearby farmers, oil mills, and micro-suppliers across Tier-2/3 India.',
    bullets: [
      'Architected multi-seller checkout with Order → SubOrder decomposition, giving each seller independent OTP verification, pickup window, and payout within a single atomic buyer transaction.',
      'Enforced 19 system invariants at DB and application layer — stock decrements via SELECT FOR UPDATE inside prisma.$transaction(), terminal state protection, and server-side-only status transitions.',
      'Built radius-based product discovery using PostGIS ST_DWithin with GIST index on geography column and pg_trgm GIN index for full-text search — no external search service.',
      'Implemented two-phase Razorpay flow (advance at confirmation, remainder at pickup) with idempotent webhook processing via WebhookLog.razorpayPaymentId @unique.',
      'Designed enumeration-safe auth: silent signup, Phone + PIN (Argon2), HttpOnly cookies, and token family rotation — reusing a rotated refresh token invalidates all sessions.',
      'Shipped 61 REST endpoints, 22 Prisma models, 39 error codes, Hindi-first i18n at ₹0/month infra cost.',
    ],
    stats: [
      { value: '61', label: 'API Endpoints' },
      { value: '19', label: 'Invariants' },
      { value: '22', label: 'DB Models' },
    ],
    tech: ['Node.js', 'TypeScript', 'Next.js 16', 'PostgreSQL', 'PostGIS', 'Prisma', 'Redis', 'Razorpay', 'Zod', 'Argon2', 'Vercel'],
    image: kridhaImg,
    liveUrl: 'https://kridha-marketplace.vercel.app/',
    codeUrl: 'https://github.com/DevWithAbhishek/kridha',
  },
  {
    id: 2,
    label: 'Full-Stack · Backend Systems',
    title: 'FixMitraa',
    subtitle: 'Repair Orchestration Platform',
    date: '04/2026 – Present',
    isLive: false,
    description:
      'Production-grade repair orchestration system connecting customers, technicians, and spare-part suppliers — with a strong emphasis on backend correctness, financial integrity, and failure recovery.',
    bullets: [
      'Designed a multi-actor repair lifecycle engine (Customer → Technician → Supplier) with a strict server-enforced state machine — no invalid transitions, no client-controlled status changes.',
      'Built idempotent Razorpay webhook processing using a WebhookLog table with DB-level unique constraints, preventing duplicate payment confirmation under repeated gateway retries.',
      'Engineered an admin reconciliation dashboard that detects mismatches between internal payment state and gateway records, enabling auditability and manual override.',
      'Implemented async background job processing with Redis + Vercel Cron — configurable retry strategies for failed webhook deliveries and payment reconciliation tasks.',
      'Applied PostgreSQL transactions (Prisma) across all multi-actor write operations, guaranteeing no partial state under concurrent updates from customers, technicians, and suppliers.',
    ],
    stats: [
      { value: '3', label: 'Actor Roles' },
      { value: '∞', label: 'Idempotent' },
      { value: '0', label: 'Dup. Txns' },
    ],
    tech: ['Node.js', 'TypeScript', 'Next.js 14', 'PostgreSQL', 'Prisma', 'Redis', 'Razorpay', 'Zod', 'JWT', 'Docker', 'Vercel'],
    image: fixmitraaImg,
    liveUrl: null,
    codeUrl: 'https://github.com/DevWithAbhishek/fixmitraa',
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Production-grade systems built for correctness, reliability, and real-world scale
          </p>
        </div>

        <div className="space-y-36">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`grid lg:grid-cols-2 gap-16 items-start`}
            >
              {/* ── Image column ── */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} space-y-4`}>

                {/* Image card */}
                <div className="gradient-border rounded-2xl overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-card to-muted relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Live badge overlay */}
                    {project.isLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-green-500/30 text-green-400 text-xs font-mono px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        LIVE
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="card-glass rounded-xl p-4 text-center border border-primary/10"
                    >
                      <div className="text-2xl font-bold gradient-text font-mono">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Content column ── */}
              <div className={`space-y-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>

                {/* Meta */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-primary font-mono text-xs tracking-widest uppercase">
                    {project.label}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                    <Calendar className="w-3 h-3" />
                    {project.date}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold leading-none">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-medium mt-1.5 text-lg">
                    {project.subtitle}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/30 pl-4">
                  {project.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gradient text-primary-foreground text-sm flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 text-muted-foreground border border-border cursor-not-allowed opacity-50">
                      <ExternalLink className="w-4 h-4" />
                      In Development
                    </span>
                  )}
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gradient text-foreground text-sm flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};