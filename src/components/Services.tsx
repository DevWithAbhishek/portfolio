import { Globe, Layers, Layout, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Custom Web Development',
    description:
      'I build fast, modern, and purpose-driven web solutions tailored to your product goals — with clean architecture, scalable code, and obsessive attention to detail.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Product Development',
    description:
      'From frontend interfaces to backend APIs and databases, I craft complete web applications that are reliable, performant, and ready to grow with your users.',
  },
  {
    icon: Layout,
    title: 'Portfolio & High-Impact Landing Pages',
    description:
      'I design and develop visually striking, conversion-optimized landing pages and portfolios that communicate value clearly and leave a strong first impression.',
  },
  {
    icon: Sparkles,
    title: 'Interactive, UI-Led Web Experiences',
    description:
      'I specialize in polished interfaces with smooth micro-animations, refined interactions, and immersive visual details that elevate your brand and user experience.',
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
