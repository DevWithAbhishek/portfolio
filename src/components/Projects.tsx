import {
  ExternalLink,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import imsImg from "@/assets/ims.png";
import kridhaDemoVideo from "@/assets/videos/kridha-demo.mp4";
import kridhaDemoThumbnail from "@/assets/kridha.png";
import shelfApiImg from "@/assets/project-1.png";

const projectsData = [
  {
    id: 1,
    slug: "kridha",
    label: "Production Project · Live",
    title: "Kridha",
    subtitle: "B2B + B2C Self-Pickup Marketplace",
    date: "03/2026 – Present",
    isLive: true,
    description:
      "Supply chain marketplace eliminating minimum-order constraints by replacing delivery with buyer self-pickup — connecting kirana owners with nearby farmers, oil mills, and micro-suppliers across Tier-2/3 India.",
    bullets: [
      "Architected multi-seller checkout with Order → SubOrder decomposition, giving each seller independent OTP verification, pickup window, and payout within a single atomic buyer transaction.",
      "Enforced 19 system invariants at DB and application layer — stock decrements via SELECT FOR UPDATE inside prisma.$transaction(), terminal state protection, and server-side-only status transitions.",
      "Built radius-based product discovery using PostGIS ST_DWithin with GIST index on geography column and pg_trgm GIN index for full-text search — no external search service.",
      "Implemented two-phase Razorpay flow (advance at confirmation, remainder at pickup) with idempotent webhook processing via WebhookLog.razorpayPaymentId @unique.",
      "Designed enumeration-safe auth: silent signup, Phone + PIN (Argon2), HttpOnly cookies, and token family rotation — reusing a rotated refresh token invalidates all sessions.",
      "Shipped 61 REST endpoints, 22 Prisma models, 39 error codes, Hindi-first i18n at ₹0/month infra cost.",
    ],
    stats: [
      { value: "61", label: "API Endpoints" },
      { value: "19", label: "Invariants" },
      { value: "22", label: "DB Models" },
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "Next.js 16",
      "PostgreSQL",
      "PostGIS",
      "Prisma",
      "Redis",
      "Razorpay",
      "Zod",
      "Argon2",
      "Vercel",
    ],
    image: kridhaDemoThumbnail,
    demoUrl: kridhaDemoVideo,
    liveUrl: "https://kridha-marketplace.vercel.app/",
    codeUrl: "https://github.com/DevWithAbhishek/kridha",
  },
  {
    id: 2,
    slug: "ims",
    label: "Backend Engineering · In Active Development",
    title: "IMS",
    subtitle: "Production Incident Management System",
    date: "07/2026 – Present",
    isLive: false,

    description:
      "Production-grade incident management platform focused on reliability engineering, asynchronous workflows, observability, and operational excellence.",

    bullets: [
      "Architecting a modular monolith using Express.js with clear module boundaries, preparing the codebase for future distributed services without premature complexity.",
      "Designing a complete incident lifecycle with database-enforced state transitions, audit trails, SLA tracking, and role-based workflows.",
      "Building asynchronous processing using BullMQ and Redis for escalations, notifications, retries, delayed jobs, and background automation.",
      "Implementing structured observability with OpenTelemetry, Prometheus, Grafana, and centralized logging for production-grade debugging.",
      "Following Architecture Decision Records (ADRs), CI/CD, Docker-first development, and production-oriented engineering practices from day one.",
    ],

    stats: [
      { value: "ADR", label: "Architecture First" },
      { value: "Queues", label: "BullMQ Jobs" },
      { value: "Telemetry", label: "Monitoring" },
    ],

    tech: [
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
      "GitHub Actions",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "JWT",
    ],

    image: imsImg,
    demoUrl: null,
    liveUrl: null,
    codeUrl: "https://github.com/DevWithAbhishek/IMS",
  },
  {
    id: 3,
    slug: "shelfapi",
    label: "Backend Engineering · Infra Completing This Week",
    title: "ShelfAPI",
    subtitle: "Document Vault REST API",
    date: "07/2026 – Present",
    isLive: false,
    description:
      "REST API for authenticated document management with file attachments — built to practice ownership-scoped authorization, token rotation, and cloud storage integration end-to-end.",
    bullets: [
      "Implemented JWT access + refresh token rotation with Argon2-hashed tokens and session-family reuse detection, applying the same theft-detection pattern proven in Kridha.",
      "Built ownership-scoped document CRUD in NestJS with Prisma, using connectOrCreate for per-user tag deduplication and cascade deletes for referential integrity.",
      "Layered request validation with Zod at the API boundary plus NestJS's global ValidationPipe, catching malformed input before it reaches business logic.",
      "Centralized error handling via a global exception filter mapping custom error classes to HTTP status codes, with structured logging on every request.",
      "Completing direct-to-S3 presigned uploads and an EC2 + Nginx production deployment this week — case study updates once verified.",
    ],
    stats: [
      { value: "Argon2", label: "Token Hashing" },
      { value: "Zod", label: "Validation" },
      { value: "In Progress", label: "AWS Deploy" },
    ],
    tech: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Argon2",
      "Docker",
      "AWS S3",
    ],
    image: shelfApiImg,
    demoUrl: null,
    liveUrl: null,
    codeUrl: "https://github.com/DevWithAbhishek/ShelfAPI-backend",
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
            Production-grade systems built for correctness, reliability, and
            real-world scale
          </p>
        </div>

        <div className="space-y-36">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`grid lg:grid-cols-2 gap-16 items-start`}
            >
              {/* ── Image column ── */}
              <div
                className={`${index % 2 === 1 ? "lg:order-2" : ""} space-y-4`}
              >
                {/* Image card */}
                <div className="gradient-border rounded-2xl overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-card to-muted relative overflow-hidden">
                    {project.demoUrl ? (
                      <video
                        aria-label="Product demo"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                        disablePictureInPicture
                        controlsList="nodownload"
                        preload="metadata"
                        poster={project.image}
                      >
                        <source src={project.demoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Live badge overlay */}
                    {project.isLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-green-500/30 text-green-400 text-xs font-mono px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        LIVE
                      </div>
                    )}

                    {project.demoUrl && (
                      <div className="absolute bottom-4 right-4 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium border border-primary/20">
                        ▶ Demo
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

              {/* ── Content column ── */}
              <div
                className={`space-y-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
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
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
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
                      Live App
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gradient text-foreground text-sm flex items-center gap-2 opacity-80"
                    >
                      🚧 Follow Development
                    </a>
                  )}
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gradient text-foreground text-sm flex items-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    View Code
                  </a>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-sm font-medium text-primary hover:underline flex items-center gap-1 self-center"
                  >
                    Read Case Study
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
