import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show theme toggle after component has mounted (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation properties for sun/moon icon
  const iconSpring = useSpring({
    transform: theme === 'dark' ? 'rotate(40deg)' : 'rotate(90deg)',
    opacity: 1,
    config: { tension: 300, friction: 20 }
  });

  // Animation for container
  const containerSpring = useSpring({
    scale: mounted ? 1 : 0,
    opacity: mounted ? 1 : 0,
    config: { tension: 200, friction: 20 }
  });

  if (!mounted) return null;

  return (
    <animated.div style={containerSpring}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        className="relative group"
      >
        <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-200" />
        
        <animated.div style={iconSpring} className="relative z-10">
          {theme === 'dark' ? (
            <Moon className="h-5 w-5 text-yellow-300" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
        </animated.div>
      </Button>
    </animated.div>
  );
};

export default ThemeToggle;