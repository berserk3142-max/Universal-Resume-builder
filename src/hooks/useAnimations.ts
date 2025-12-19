'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Hero text reveal animation
export function useHeroAnimation() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Badge animation
            gsap.fromTo(
                badgeRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );

            // Title animation with split text effect
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
            );

            // Subtitle fade in
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
            );

            // Buttons slide up
            gsap.fromTo(
                buttonsRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
            );
        });

        return () => ctx.revert();
    }, []);

    return { titleRef, subtitleRef, buttonsRef, badgeRef };
}

// Card stagger animation
export function useCardAnimation() {
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.querySelectorAll('.feature-card');
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return cardsRef;
}

// Floating animation for elements
export function useFloatAnimation(element: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (!element.current) return;

        const ctx = gsap.context(() => {
            gsap.to(element.current, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        });

        return () => ctx.revert();
    }, [element]);
}

// Glow pulse animation
export function useGlowAnimation(element: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (!element.current) return;

        const ctx = gsap.context(() => {
            gsap.to(element.current, {
                boxShadow: '0 0 60px rgba(255, 153, 51, 0.4)',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        });

        return () => ctx.revert();
    }, [element]);
}

// Section reveal animation
export function useSectionReveal() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return sectionRef;
}

// Magnetic button effect
export function useMagneticEffect(element: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (!element.current) return;

        const el = element.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [element]);
}
