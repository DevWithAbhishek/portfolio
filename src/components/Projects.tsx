import { ExternalLink, Github } from 'lucide-react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';

// Projects data - easily editable
const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with cart functionality, payment integration, and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: project1,
    liveUrl: '#',
    codeUrl: 'https://github.com/DevWithAbhishek',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop, and team features.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    image: project2,
    liveUrl: '#',
    codeUrl: 'https://github.com/DevWithAbhishek',
  },
  {
    id: 3,
    title: 'Portfolio Generator',
    description: 'A tool that helps developers create stunning portfolios with customizable themes and animations.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    image: project3,
    liveUrl: '#',
    codeUrl: 'https://github.com/DevWithAbhishek',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.',
    tech: ['React', 'OpenWeather API', 'Chart.js'],
    image: project4,
    liveUrl: '#',
    codeUrl: 'https://github.com/DevWithAbhishek',
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my best work, each crafted with attention to detail and performance
          </p>
        </div>

        <div className="space-y-32">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="gradient-border rounded-2xl overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-card to-muted relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="text-primary font-mono text-sm">Featured Project</div>
                <h3 className="font-display text-3xl md:text-4xl font-bold">{project.title}</h3>
                <div className="card-glass">
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient text-primary-foreground text-sm flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
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
