import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSpring, animated } from 'react-spring';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Spring animation for content on load
  const contentSpring = useSpring({
    from: { opacity: 0, translateY: 50 },
    to: { opacity: 1, translateY: 0 },
    config: { tension: 80, friction: 20 },
    delay: 200
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar scrollDirection={scrollDirection} />
      <animated.div
        style={{
          opacity: contentSpring.opacity,
          transform: `translateY(${contentSpring.translateY}px)`
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default Layout;