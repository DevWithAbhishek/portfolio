import { Globe, Layers, Layout, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Custom Web Development',
    description: 'Tailored web solutions built from scratch to meet your unique business needs with clean, scalable code.',
  },
  {
    icon: Layers,
    title: 'Full Stack Web Applications',
    description: 'End-to-end development of complex web applications with robust backends and intuitive frontends.',
  },
  {
    icon: Layout,
    title: 'Portfolio & Landing Pages',
    description: 'Stunning, conversion-focused landing pages and portfolios that make a lasting first impression.',
  },
  {
    icon: Sparkles,
    title: 'UI-Focused, Animation-Rich Sites',
    description: 'Immersive websites with smooth micro-animations and interactive elements that engage users.',
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
            Comprehensive web development services to bring your vision to life
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
