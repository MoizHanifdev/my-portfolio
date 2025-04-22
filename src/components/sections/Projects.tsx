import { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import gsap from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern E-Commerce Platform',
      description: 'A full-featured e-commerce site with product catalog, cart functionality, and payment processing using React, Node.js and MongoDB.',
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Real-Time Dashboard',
      description: 'Interactive data visualization dashboard with real-time updates for analytics and monitoring, built with React, D3.js and WebSockets.',
      image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'D3.js', 'WebSockets', 'Material UI'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A productivity application for managing tasks, projects, and deadlines with drag-and-drop functionality and team collaboration features.',
      image: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'Redux', 'Firebase', 'Tailwind CSS'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Social Media Platform',
      description: 'A feature-rich social networking application with user profiles, real-time chat, news feed, and photo sharing capabilities.',
      image: 'https://images.pexels.com/photos/5931860/pexels-photo-5931860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['React', 'GraphQL', 'WebSockets', 'AWS'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];
  
  // GSAP animation for staggered cards
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const cards = projectsRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);
  
  // Project card component with animations
  const ProjectCard = ({ project }: { project: Project }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Animation for card hover
    const cardSpring = useSpring({
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      boxShadow: isHovered 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' 
        : '0 2px 4px rgba(0, 0, 0, 0.05)',
      config: { tension: 300, friction: 20 }
    });
    
    // Animation for image hover
    const imageSpring = useSpring({
      transform: isHovered ? 'scale(1.1) rotate(1deg)' : 'scale(1) rotate(0deg)',
      config: { tension: 200, friction: 20 }
    });
    
    // Animation for content reveal
    const contentSpring = useSpring({
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
      config: { tension: 300, friction: 30 }
    });
    
    return (
      <animated.div 
        style={cardSpring}
        className="project-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="overflow-hidden border-border/50 h-full bg-card">
          <div className="relative aspect-video overflow-hidden">
            <animated.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
              style={imageSpring}
            />
            <animated.div 
              style={contentSpring}
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end"
            >
              <div className="flex gap-2 mb-4 flex-wrap">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  className="rounded-full px-4 gap-2"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full px-4 gap-2" 
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github width={14} height={14} />
                    Source
                  </a>
                </Button>
              </div>
            </animated.div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      </animated.div>
    );
  };
  
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 animate-in">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="text-4xl font-bold text-center mb-4">Featured Projects</h2>
          <div className="h-1 w-16 bg-primary rounded"></div>
        </div>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
        <a href="https://github.com/MoizHanifdev?tab=repositories" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Button variant="outline" className="rounded-full px-8 gap-2" size="lg">
            <span>View All Projects</span>
            <ExternalLink width={16} height={16} />
          </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;