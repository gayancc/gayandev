'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  alpha: number;
}

export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      const count = Math.min(120, Math.floor(canvas.offsetWidth / 8));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: 1 + Math.random() * 2.5,
        velocityX: (Math.random() - 0.5) * 0.4,
        velocityY: (Math.random() - 0.5) * 0.4,
        alpha: 0.2 + Math.random() * 0.6,
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.x <= 0 || particle.x >= canvas.offsetWidth) {
          particle.velocityX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.offsetHeight) {
          particle.velocityY *= -1;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.alpha})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(render);
    };

    const handleResize = () => {
      resize();
      createParticles();
    };

    resize();
    createParticles();
    render();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className ?? ''}`} />;
}
