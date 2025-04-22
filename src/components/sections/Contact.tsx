import { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import anime from 'animejs';
import emailjs from 'emailjs-com';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const sendEmail = async (data: FormValues) => {
    setIsSubmitting(true);
  
    try {
      const result = await emailjs.send(
        'service_ndqsroj',
        'template_3t52wy7',
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        'OLRDTpN7AbcThGqnu'
      );
  
      console.log('✅ Email sent successfully:', result);
  
      // Animate success
      if (formRef.current) {
        anime({
          targets: formRef.current,
          translateY: [0, 20, 0],
          opacity: [1, 0.5, 1],
          easing: 'easeInOutQuad',
          duration: 800
        });
      }
  
      setIsSent(true);
      reset();
  
      toast({
        title: 'Message sent successfully!',
        description: "I'll get back to you as soon as possible.",
        variant: 'default',
      });
  
      setTimeout(() => setIsSent(false), 3000);
  
    } catch (error) {
      console.error('❌ Email sending failed:', error);
  
      toast({
        title: 'Failed to send message',
        description: 'Please try again later or contact me directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  // Animation for contact info cards
  const ContactInfoCard = ({ 
    icon, title, content 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    content: string; 
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const springProps = useSpring({
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
      boxShadow: isHovered 
        ? '0 12px 20px -5px rgba(0, 0, 0, 0.1)' 
        : '0 2px 10px rgba(0, 0, 0, 0.05)',
      config: { tension: 300, friction: 20 }
    });
    
    return (
      <animated.div 
        style={springProps}
        className="bg-card border border-border/50 rounded-lg p-6 flex flex-col items-center text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
      </animated.div>
    );
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 animate-in">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold text-center mb-4">Contact Me</h2>
          <div className="h-1 w-16 bg-primary rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-in">
            <Card className="p-6 border-border/50">
              <form ref={formRef} onSubmit={handleSubmit(sendEmail)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input 
                    id="name"
                    {...register('name')}
                    disabled={isSubmitting}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={isSubmitting}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    id="message"
                    rows={5}
                    {...register('message')}
                    disabled={isSubmitting}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gap-2 rounded-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : isSent ? (
                    <>
                      Message Sent
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 6L8.25 12.75L3 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6 animate-in">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <p className="text-muted-foreground mb-8">
              Feel free to reach out to me through the contact form or directly via email, phone, or social media channels. I'll be happy to discuss your project and answer any questions you may have.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ContactInfoCard 
                icon={<Mail width={24} height={24} />}
                title="Email"
                content="moizhanif.dev@gmail.com"
              />
              
              <ContactInfoCard 
                icon={<Phone width={24} height={24} />}
                title="Phone"
                content="+92 3235086899"
              />
              
              <ContactInfoCard 
                icon={<MapPin width={24} height={24} />}
                title="Location"
                content="Kot Radha Kishan, Punjab, Pakistan"
              />
            </div>
            
            <div className="mt-8 p-6 bg-card border border-border/50 rounded-lg">
              <h4 className="text-lg font-medium mb-4">Availability</h4>
              <p className="text-muted-foreground">
                Currently available for freelance projects, consultations, and full-time positions. Let's create something amazing together!
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="rounded-full gap-2" asChild>
                  <a href="moizhanif.dev@gmail.com">
                    <Mail className="h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button className="rounded-full gap-2">
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;