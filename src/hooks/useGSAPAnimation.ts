import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useGSAPAnimation = (triggerOnMount = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerOnMount && ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }
  }, [triggerOnMount]);

  return ref;
};

export const animateIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay,
      ease: 'power2.out'
    }
  );
};

export const animateStagger = (elements: HTMLElement[], delay = 0, stagger = 0.1) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay,
      stagger,
      ease: 'power2.out'
    }
  );
};

export const animateHover = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.to(element, {
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto'
  });
};

export const animateClick = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.timeline()
    .to(element, { scale: 0.95, duration: 0.1 }, 0)
    .to(element, { scale: 1, duration: 0.2 }, 0.1);
};

export const pulsateGlow = (element: HTMLElement | null, color = '#06b6d4') => {
  if (!element) return;
  gsap.to(element, {
    boxShadow: `0 0 30px ${color}`,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
};
