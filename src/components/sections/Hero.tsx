import { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Animation for content fade-in
  const contentSpring = useSpring({
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: { tension: 80, friction: 20 }
  });
  
  // GSAP animation for title
  useEffect(() => {
    if (!titleRef.current) return;
    
    const title = titleRef.current;
    const chars = title.querySelectorAll('.char');
    
    // Initial animation
    gsap.fromTo(
      chars,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    );
    
    // Continuous floating animation
    gsap.to(chars, {
      y: -10,
      duration: 1.5,
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true,
      },
      ease: 'power1.inOut'
    });
    
    // Animate background gradient
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);
  
  // Scroll down handler
  // const scrollToAbout = () => {
  //   const aboutSection = document.getElementById('about');
  //   if (aboutSection) {
  //     aboutSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
  
  return (
    <section 
      id="home" 
      ref={containerRef}
      className={cn(
        "min-h-screen flex items-center relative overflow-hidden",
        "bg-gradient-to-br from-background via-background/80 to-primary/5",
        "dark:from-background dark:via-background/90 dark:to-primary/10",
        "bg-[length:200%_200%] bg-[position:0%_0%]"
      )}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <animated.div style={contentSpring} className="space-y-8">
            <div className="inline-block px-6 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Frontend Developer & Designer
              </span>
            </div>
            
            <h1 
              ref={titleRef} 
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="inline-block">
                <span className="char inline-block">M</span>
                <span className="char inline-block">o</span>
                <span className="char inline-block">i</span>
                <span className="char inline-block">z</span>
                <span className="char inline-block">&nbsp;</span>
                <span className="char inline-block">K</span>
                <span className="char inline-block">h</span>
                <span className="char inline-block">a</span>
                <span className="char inline-block">n</span>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-md animate-in">
              Crafting visually stunning digital experiences with cutting-edge technology and innovative design.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 animate-in">
              <Button size="lg" className="rounded-full px-8">
                Download CV
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" onClick={scrollToAbout}>
                About Me
              </Button>
            </div>
            
            <div className="pt-6 animate-in">
              <div className="flex items-center gap-6">
                <div className="h-px bg-border flex-1 max-w-[80px]"></div>
                <div className="flex gap-4">
                <a href="https://github.com/MoizHanifdev/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github width={20} height={20} />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/moizhanifdev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button variant="ghost" size="icon">
                  <Linkedin width={20} height={20} />
                </Button>
              </a>
                  <Button variant="ghost" size="icon" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <a href="moizhanif.dev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <Button variant="ghost" size="icon" aria-label="Email">
                <Mail width={20} height={20} />
              </Button>
              </a>
                </div>
              </div>
            </div>
          </animated.div>
          
          <div className="hidden lg:flex justify-center items-center animate-in">
            <div className="relative w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/30 flex items-center justify-center">
              <div className="absolute w-[90%] h-[90%] rounded-full bg-card flex items-center justify-center overflow-hidden border border-border/50">
                <img 
                  src="/images/Profile.jpg" 
                  alt="Moiz Khan" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 group">
      <div className="relative w-12 h-12 flex items-center justify-center rounded-full border border-primary/30 bg-primary/5 shadow-inner transition duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-lg ">
        {/* Chevron Icon */}
        <ChevronDown className="h-6 w-6 text-primary animate-slide-down" />

        {/* Glow Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-40 group-hover:opacity-70 animate-ping-slow"></div>
      </div>
    </div>
    </section>
  );
};

export default Hero;