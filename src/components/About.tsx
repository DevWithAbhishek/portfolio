import { Code2, Zap, Palette, Brain } from 'lucide-react';
import avatar from '@/assets/avatar.png';

const highlights = [
  {
    icon: Code2,
    title: 'Technologies',
    description: 'HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind, Node.js, Express, MongoDB, Git/GitHub',
  },
  {
    icon: Zap,
    title: 'Focus Areas',
    description: 'Performance, UI Engineering, Responsive Design, Unique Ideas',
  },
  {
    icon: Palette,
    title: 'Experience',
    description: 'Hands-on projects and full-stack learning with real-world applications',
  },
  {
    icon: Brain,
    title: 'Specialties',
    description: 'Problem-solving, clean UI, full-stack mindset',
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
                I'm Abhishek Kumar, a passionate web developer dedicated to creating exceptional digital experiences. My journey into web development started with a curiosity about how the web works, and it quickly evolved into a deep passion for building modern, performant applications.
              </p>
              <p>
                I specialize in crafting high-performance, visually striking web experiences using modern frontend technologies like JavaScript, React, Next.js, TypeScript, and Tailwind CSS. My focus is on creating interfaces that are not just functional, but truly memorable.
              </p>
              <p>
                Every project I take on is an opportunity to push boundaries and deliver real, impactful solutions. I believe in clean code, thoughtful design, and the power of technology to solve problems and create value.
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
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
