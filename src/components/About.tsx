import { Code2, Zap, Layers, Brain } from "lucide-react";
import avatar from "@/assets/avatar.png";

const highlights = [
  {
    icon: Code2,
    title: "Technologies",
    description:
      "Building with Node.js, TypeScript, PostgreSQL, Prisma, Redis, Next.js, Zod, PostGIS, Razorpay, and JWT — with a strong focus on correctness, schema-first design, and production reliability.",
  },
  {
    icon: Zap,
    title: "Focus Areas",
    description:
      "API design, transactional consistency, idempotent payment systems, failure recovery, and designing backend services for correctness under real-world concurrency and retries.",
  },
  {
    icon: Layers,
    title: "Experience",
    description:
      "End-to-end ownership of a production system — from DB schema and state machines to webhook handling and reconciliation. Kridha (live, 61 endpoints) is fully self-built.",
  },
  {
    icon: Brain,
    title: "Specialties",
    description:
      "Systems thinking, engineering judgment beyond generated code, ownership-driven execution, and designing for failure — not just for the happy path.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="glow-frame animate-float">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-card to-muted overflow-hidden">
                <img
                  src={avatar}
                  alt="Abhishek Kumar - Backend Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Abhishek Kumar, a backend-focused engineer with strong
                foundations in API design, data modeling, and system
                reliability. I graduated in Mechanical Engineering from NIT
                Allahabad in 2024, and taught myself backend engineering the way
                I believe it should be learned — by building a real production
                system and confronting real problems.
              </p>
              <p>
                My work centers on the hard parts of backend development:
                transactional consistency, idempotent payment handling, strict
                state machines, and failure recovery. I've built Kridha — a live
                B2B + B2C marketplace with 61 REST endpoints, PostGIS-powered
                radius search, and two-phase Razorpay flows.
              </p>
              <p>
                I approach engineering with judgment, not just execution. In an
                era of AI-assisted development, I focus on what generated code
                can't provide: understanding trade-offs, designing for failure,
                and building systems for correctness under concurrency, retries,
                and edge cases that only appear in production.
              </p>
              <p>
                I'm looking for a backend role where correctness, clarity, and
                systems thinking are valued — a team that builds things that
                actually work reliably, not just things that demo well.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="card-glass gradient-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
