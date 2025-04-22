import { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { FileText, User, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  
  // Use react-spring for tilt effect on hover
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  
  // Tilt effect calculation
  const calc = (x: number, y: number) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return [0, 0, 1];
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return [
      -(y - centerY) / 20,
      (x - centerX) / 20,
      1.05
    ];
  };
  
  // Format for transform
  const trans = (x: number, y: number, s: number) => 
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  
  // GSAP animations for staggered content
  useEffect(() => {
    const cards = document.querySelectorAll('.about-card');
    
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);
  
  return (
    <section id="about" ref={aboutRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 animate-in">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-4xl font-bold text-center mb-4">Who I Am</h2>
          <div className="h-1 w-16 bg-primary rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold animate-in">Frontend Developer & UI/UX Designer</h3>
              
              <p className="text-muted-foreground animate-in">
                I'm Moiz Khan, a passionate frontend developer and designer with over 2 years of experience creating stunning, user-centered digital experiences. I specialize in building responsive websites, interactive applications, and engaging user interfaces.
              </p>
              
              <p className="text-muted-foreground animate-in">
                My approach combines technical expertise with aesthetic sensibility, ensuring that every project not only functions flawlessly but also delights users with its visual appeal and intuitive design.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="about-card p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User width={20} height={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Personal Info</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based in Kot Radha Kishen, Kasur
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="about-card p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Briefcase width={20} height={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Experience</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        2+ years in the field
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="about-card p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap width={20} height={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Education</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bacholer of science in Software Engineering
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="about-card p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FileText width={20} height={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Projects</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        10+ completed projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 animate-in">
                <Button size="lg" className="rounded-full px-8">
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center animate-in">
            <animated.div
              ref={imageRef}
              className="relative w-[320px] h-[320px] rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 p-1 shadow-xl"
              onMouseMove={({ clientX, clientY }) => set({ xys: calc(clientX, clientY) })}
              onMouseLeave={() => set({ xys: [0, 0, 1] })}
              style={{
                transform: props.xys.to(trans)
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                <img 
                  src={`${import.meta.env.BASE_URL}Profile.jpg`}
                  alt="Moist Khan" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-primary/80 text-white flex items-center justify-center text-xs font-bold">
                5+
              </div>
              
              <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-card border border-border flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  UI/UX
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;