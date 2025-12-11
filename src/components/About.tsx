import { Code2, Zap, Palette, Brain } from 'lucide-react';
import avatar from '@/assets/avatar.png';

const highlights = [
  {
    icon: Code2,
    title: 'Technologies',
    description:
      'Building with JavaScript, React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB — with a strong focus on writing clean, scalable code.',
  },
  {
    icon: Zap,
    title: 'Focus Areas',
    description:
      'High-performance engineering, UI precision, responsive design, and transforming raw ideas into polished, production-ready interfaces.',
  },
  {
    icon: Palette,
    title: 'Experience',
    description:
      'Practical experience through end-to-end projects — designing, developing, and deploying real applications that solve real problems.',
  },
  {
    icon: Brain,
    title: 'Specialties',
    description:
      'Strong problem-solving mindset, ownership-driven execution, attention to detail, and a product-focused approach to full-stack development.',
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
                  alt="Abhishek Kumar - Web Developer"
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
                I’m Abhishek Kumar, a web developer focused on building fast, modern, and reliable digital experiences. What began as simple curiosity about how products are built on the web has grown into a deep commitment to engineering interfaces that feel intuitive, polished, and impactful.
              </p>
              <p> 
                I work extensively with JavaScript, React, Next.js, TypeScript, and Tailwind CSS to create high-performance frontend applications. My approach combines clean engineering practices with a strong eye for design, ensuring that every project delivers both technical quality and a standout user experience.
              </p>
              <p> 
                Although I’m early in my professional journey, I operate with the mindset of someone who builds for real users — focusing on performance, clarity, and long-term maintainability. I thrive in environments where ideas move fast and product decisions matter, making me a strong fit for startups and teams that value ownership and execution.
              </p>
              <p> 
                Every project I take on is treated as a chance to create meaningful impact — whether that’s improving usability, enhancing performance, or bringing a new concept to life with precision and creativity. I care deeply about building things that work beautifully, scale reliably, and deliver real value. </p>
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
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
