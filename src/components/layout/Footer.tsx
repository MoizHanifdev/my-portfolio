import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-card/50 border-t border-border/50 py-12 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Moiz.Khan</h2>
            <p className="text-muted-foreground max-w-md">
              Creating exceptional digital experiences through innovative web development and design.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4 text-center md:text-right">Connect With Me</h3>
            <div className="flex space-x-4 justify-center md:justify-end">
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
                <Twitter width={20} height={20} />
              </Button>
              <a href="moizhanif.dev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <Button variant="ghost" size="icon" aria-label="Email">
                <Mail width={20} height={20} />
              </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Moiz.Khan. All rights reserved.
          </p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 group"
          >
            <span className="mr-2 group-hover:-translate-y-1 transition-transform">Back to Top</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:-translate-y-1 transition-transform"
            >
              <path 
                d="M8 3L14 9L12.6 10.4L8.8 6.6V13H7.2V6.6L3.4 10.4L2 9L8 3Z" 
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;