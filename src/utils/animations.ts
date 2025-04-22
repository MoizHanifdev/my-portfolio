import { gsap } from 'gsap';

// Utility function to create staggered animations
export const createStaggerAnimation = (
  elements: HTMLElement[] | NodeListOf<Element>,
  fromProps: gsap.TweenVars,
  toProps: gsap.TweenVars,
  options?: {
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
  }
) => {
  return gsap.fromTo(
    elements,
    { ...fromProps },
    { 
      ...toProps,
      stagger: options?.stagger || 0.1,
      duration: options?.duration || 0.8,
      ease: options?.ease || 'power3.out',
      delay: options?.delay || 0
    }
  );
};

// Create a reveal animation for sections
export const revealSection = (
  sectionElement: HTMLElement, 
  childrenSelector: string = '.animate-in'
) => {
  const elements = sectionElement.querySelectorAll(childrenSelector);
  
  return gsap.timeline({
    scrollTrigger: {
      trigger: sectionElement,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  }).fromTo(
    elements,
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      stagger: 0.1, 
      duration: 0.6,
      ease: 'power3.out'
    }
  );
};

// Text splitting animation for character-by-character animations
export const splitTextAnimation = (element: HTMLElement) => {
  // Split text into characters
  const text = element.innerText;
  element.innerHTML = '';
  
  const characters = text.split('');
  
  characters.forEach((char) => {
    const span = document.createElement('span');
    span.className = 'char inline-block';
    span.innerText = char;
    element.appendChild(span);
  });
  
  // Animate the characters
  return gsap.fromTo(
    element.querySelectorAll('.char'),
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power3.out'
    }
  );
};