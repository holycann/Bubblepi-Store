import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  className,
  particleDensity,
}) => {
  const [particles, setParticles] = useState([]);
  const frameRef = useRef();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = containerRef.current;

    if (!canvas || !ctx || !container) return;

    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const particlesCount = Math.min(
      Math.max(Math.floor((canvas.width * canvas.height) / 12000), 40),
      particleDensity || 100
    );

    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < particlesCount; i++) {
        const particle = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize || 3 - minSize || 1) + (minSize || 1),
          speedX: (Math.random() - 0.01) * (speed || 0.02),
          speedY: (Math.random() - 0.02) * (speed || 0.04),
          color: particleColor || "#ffffff",
        };
        newParticles.push(particle);
      }
      return newParticles;
    };

    setParticles(createParticles());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [particles, maxSize, minSize, speed, particleColor, particleDensity]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      style={{
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: background || "transparent",
          zIndex: 0,
        }}
      />
    </div>
  );
}; 