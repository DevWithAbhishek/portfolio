import { Database, ShieldCheck, Webhook, ServerCog } from 'lucide-react';

const services = [
  {
    icon: ServerCog,
    title: 'Backend API Development',
    description:
      'I design and build production-grade REST APIs with clean architecture, schema-first validation (Zod), structured error handling, and role-based access control — built to scale and easy to maintain.',
  },
  {
    icon: Database,
    title: 'Database Architecture & Modelling',
    description:
      'From schema design and indexing strategies to transactional consistency and query optimization — I build PostgreSQL-backed data layers that handle concurrency correctly and never leave data in a partial state.',
  },
  {
    icon: Webhook,
    title: 'Payment & Webhook Integration',
    description:
      'End-to-end payment system integration with Razorpay — including idempotent webhook processing, two-phase payment flows, refund logic, and admin reconciliation to ensure zero duplicate transactions.',
  },
  {
    icon: ShieldCheck,
    title: 'Auth Systems & Security',
    description:
      'Secure, production-ready authentication using Phone + PIN (Argon2), HttpOnly cookies, refresh token rotation with theft detection, and enumeration-safe signup — no localStorage, no shortcuts.',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Backend engineering services focused on correctness, reliability, and systems that hold up in production
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-glass gradient-border group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};