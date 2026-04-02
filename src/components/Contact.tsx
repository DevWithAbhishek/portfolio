import { Github, Linkedin, Mail, MapPin, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const contactLinks = [
  {
    name: 'Email',
    icon: Mail,
    label: 'abhishek@codewithabhishek.in',
    url: 'mailto:abhishek@codewithabhishek.in',
    description: 'Best for role discussions and project enquiries',
  },
  {
    name: 'GitHub',
    icon: Github,
    label: 'github.com/DevWithAbhishek',
    url: 'https://github.com/DevWithAbhishek',
    description: 'Browse live projects, commits, and architecture decisions',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    label: 'linkedin.com/in/devwithabhishek',
    url: 'https://www.linkedin.com/in/devwithabhishek/',
    description: 'Professional background and work history',
  },
];

const openTo = [
  'Remote Backend Roles',
  'Node.js / TypeScript Teams',
  'Startups & Early-Stage Products',
  'API-First Products',
  'Fintech & Payments',
  'B2B SaaS',
];

const quickFacts = [
  { icon: MapPin, label: 'Location', value: 'Prayagraj, India · Remote Only' },
  { icon: Clock, label: 'Available From', value: 'April 10, 2026 · Immediately' },
];

const values = [
  'I own what I ship — bugs included.',
  'I read error logs before asking for help.',
  'I design for failure, not just the happy path.',
  'I write code I can explain line by line.',
];

export const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="section-title">
            Let's Build Something{' '}
            <span className="gradient-text">Reliable Together</span>
          </h2>
          <p className="section-subtitle">
            Looking for a backend engineer who takes ownership, thinks in systems, and ships production-ready code? Let's talk.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-10">

          {/* Top row: availability + open to */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Availability */}
            <div className="card-glass gradient-border p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-mono text-sm font-medium tracking-wide uppercase">
                  Open to Work
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-3">Ready to Contribute</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm fully available for remote backend roles from April 10, 2026. I'm looking for a fast-paced team that values correctness, clear engineering decisions, and systems that hold up in production — not just demos.
                </p>
              </div>
              <div className="space-y-3">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-3 text-sm">
                    <fact.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{fact.label}:</span>
                    <span className="font-medium">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open to */}
            <div className="card-glass gradient-border p-8 space-y-6">
              <h3 className="font-display text-2xl font-bold">Open To</h3>
              <div className="flex flex-wrap gap-2.5">
                {openTo.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-mono font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-border/50 space-y-2.5">
                {values.map((v) => (
                  <div key={v} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: contact cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card-glass gradient-border p-6 group flex flex-col gap-4 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <div>
                  <p className="font-display font-semibold text-base mb-1">{link.name}</p>
                  <p className="text-primary text-sm font-mono truncate">{link.label}</p>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed mt-auto">
                  {link.description}
                </p>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};