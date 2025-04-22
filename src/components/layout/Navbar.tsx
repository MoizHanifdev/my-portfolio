import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '../common/ThemeToggle';
import { cn } from '@/lib/utils';

interface NavbarProps {
  scrollDirection: string;
}

const Navbar: React.FC<NavbarProps> = ({ scrollDirection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle navbar visibility animation
  const navSpring = useSpring({
    transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0%)',
    config: { tension: 300, friction: 30 },
    immediate: scrollDirection === 'none'
  });

  // Handle navbar blur and background effects
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    // Set up intersection observer to detect active section
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId.replace('#', ''));
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <animated.header 
      style={navSpring} 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-colors duration-300',
        hasScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/20' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold relative overflow-hidden group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Moiz.Khan
          </span>
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    'relative py-2 px-1 text-sm font-medium transition-colors',
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {link.name}
                  <span 
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-[2px] bg-primary transform transition-transform duration-300',
                      activeSection === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0'
                    )} 
                  />
                </a>
              </li>
            ))}
          </ul>
          <Button variant="default" size="sm" className="rounded-full px-6">
            Download CV
          </Button>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ top: '64px' }}
      >
        <nav className="container mx-auto px-6 py-8 bg-black dark:bg-white">
          <ul className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <li key={link.name} className="border-b border-border/20 pb-4">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    'text-xl font-medium block transition-colors',
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Button variant="default" className="w-full rounded-full">
                Download CV
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </animated.header>
  );
};

export default Navbar;