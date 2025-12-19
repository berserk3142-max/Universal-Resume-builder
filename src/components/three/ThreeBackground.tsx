'use client';

import { useEffect, useRef } from 'react';

// CSS-based animated background with floating particles
export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        // Canvas dimensions (captured after null check)
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            alpha: number;
            pulse: number;
            canvasW: number;
            canvasH: number;

            constructor(width: number, height: number) {
                this.canvasW = width;
                this.canvasH = height;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.color = this.getRandomColor();
                this.alpha = Math.random() * 0.5 + 0.2;
                this.pulse = Math.random() * Math.PI * 2;
            }

            getRandomColor(): string {
                const colors = [
                    '#FF9933', // Saffron
                    '#138808', // Green
                    '#8B5CF6', // Violet
                    '#06B6D4', // Cyan
                    '#EC4899', // Pink
                    '#F97316', // Orange
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            updateDimensions(width: number, height: number) {
                this.canvasW = width;
                this.canvasH = height;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += 0.02;

                // Wrap around screen
                if (this.x < 0) this.x = this.canvasW;
                if (this.x > this.canvasW) this.x = 0;
                if (this.y < 0) this.y = this.canvasH;
                if (this.y > this.canvasH) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                const pulsingAlpha = this.alpha + Math.sin(this.pulse) * 0.2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0.1, pulsingAlpha);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }


        // Initialize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        // Animation loop
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections between close particles
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#FF9933';
                        ctx.globalAlpha = 0.1 * (1 - distance / 120);
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                });
            });

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="absolute inset-0 -z-10">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: 'transparent' }}
            />
            {/* Floating gradient orbs with CSS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-bharat-saffron/20 to-primary-500/10 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-violet/15 to-accent-pink/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-bharat-green/10 to-accent-cyan/10 rounded-full blur-[150px] animate-pulse-soft" />
            </div>
        </div>
    );
}
