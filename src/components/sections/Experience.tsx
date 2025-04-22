import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Calendar, MapPin, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  logo: string;
  location: string;
  period: string;
  description: string[];
  expanded?: boolean;
}

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Sample experience data
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Frontend Developer',
      company: 'BitLogix.',
      logo: '🚀',
      location: 'Gulgerg',
      period: '2021 - Present',
      description: [
        'Led the development of the company\'s flagship web application using React, TypeScript, and GraphQL',
        'Implemented a component-based design system that improved development efficiency by 40%',
        'Mentored junior developers and conducted code reviews to ensure high-quality code standards',
        'Collaborated with UX designers to implement complex UI animations and interactions'
      ],
      expanded: true
    },
    {
      id: 2,
      role: 'UI/UX Developer',
      company: 'Design Studio',
      logo: '🎨',
      location: 'Ali Town',
      period: '2021 - 2022',
      description: [
        'Created responsive web designs and interactive prototypes using Figma and Adobe XD',
        'Transformed design mockups into pixel-perfect frontend implementations',
        'Improved site performance by 35% through code optimization and modern build techniques',
        'Developed and maintained the company design system with detailed documentation'
      ]
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'WebSolutions',
      logo: '💻',
      location: 'Lahore',
      period: '2022 - 2025',
      description: [
        'Built responsive, cross-browser compatible websites for a diverse client portfolio',
        'Implemented custom animations and interactive elements to enhance user experience',
        'Collaborated with backend developers to integrate RESTful APIs',
        'Maintained and updated legacy code for improved performance and security'
      ]
    }
  ];
  
  // GSAP animation for timeline
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    const line = timelineRef.current.querySelector('.timeline-line');
    
    gsap.fromTo(
      line,
      { height: 0 },
      {
        height: '100%',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      items,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);
  
  const [expandedId, setExpandedId] = useState<number | null>(1);
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 animate-in">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Career Path
          </span>
          <h2 className="text-4xl font-bold text-center mb-4">Work Experience</h2>
          <div className="h-1 w-16 bg-primary rounded"></div>
        </div>
        
        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
          {/* Timeline line */}
          <div className="timeline-line absolute top-0 bottom-0 left-8 w-px bg-primary/30"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item relative pl-20">
                {/* Timeline marker */}
                <div className="absolute left-4 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center">
                  <span className="text-lg">{exp.logo}</span>
                </div>
                
                <Card className="overflow-hidden border-border/50">
                  <CardContent className="p-0">
                    {/* Card header */}
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/30">
                      <div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Briefcase size={14} /> {exp.company}
                          </span>
                          <span className="text-muted-foreground hidden sm:flex items-center gap-1">
                            <Calendar size={14} /> {exp.period}
                          </span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <MapPin size={14} /> {exp.location}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-start"
                        onClick={() => toggleExpand(exp.id)}
                      >
                        {expandedId === exp.id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </Button>
                    </div>
                    
                    {/* Card body */}
                    <div 
                      className={cn(
                        "transition-all duration-300 origin-top",
                        expandedId === exp.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      )}
                    >
                      <div className="p-6">
                        <ul className="space-y-3">
                          {exp.description.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="h-6 w-6 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              </span>
                              <p className="text-muted-foreground">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;