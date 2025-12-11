import { useState, useEffect, useRef } from 'react';

// Skills data - easily editable
const skillsData = [
  { name: 'HTML', percentage: 80, icon: '🌐' },   
  { name: 'CSS', percentage: 78, icon: '🎨' },    
  { name: 'JavaScript', percentage: 72, icon: '⚡' },  

  { name: 'React', percentage: 60, icon: '⚛️' },     
  { name: 'Next.js', percentage: 50, icon: '▲' },     

  { name: 'TypeScript', percentage: 40, icon: '📘' }, 
  { name: 'Tailwind CSS', percentage: 70, icon: '💨' },

  { name: 'Node.js', percentage: 65, icon: '🟢' },     
  { name: 'Express', percentage: 60, icon: '🚂' },     
  { name: 'MongoDB', percentage: 70, icon: '🍃' },     

  { name: 'Git/GitHub', percentage: 60, icon: '🔀' },  
  { name: 'UI/UX', percentage: 56, icon: '✨' },        
];


interface SkillBarProps {
  name: string;
  percentage: number;
  icon: string;
  index: number;
}

const SkillBar = ({ name, percentage, icon, index }: SkillBarProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Delay based on index for staggered effect
          const delay = index * 80;
          
          setTimeout(() => {
            const duration = 1500;
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smooth deceleration
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = Math.round(easeOut * percentage);
              
              setDisplayValue(currentValue);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [percentage, index, hasAnimated]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-muted-foreground text-sm font-mono tabular-nums">
          {displayValue}%
        </span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full progress-gradient transition-all duration-1000 ease-out relative"
          style={{
            width: hasAnimated ? `${percentage}%` : '0%',
            transitionDelay: `${index * 80}ms`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient" />
        </div>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive toolkit for building modern, high-performance web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skillsData.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
