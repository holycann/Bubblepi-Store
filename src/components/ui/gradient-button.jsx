import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const GradientButton = ({
  children,
  to,
  className,
  containerClassName,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  useEffect(() => {
    setOpacity(hovered ? 1 : 0);
  }, [hovered]);

  const Component = to ? Link : "button";

  return (
    <Component
      ref={containerRef}
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-medium transition-all duration-300",
        "text-gray-900 dark:text-white",
        "hover:scale-105 hover:shadow-xl",
        containerClassName
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(244, 171, 196, 0.3), transparent 40%)`,
        }}
      />
      <div
        className={cn(
          "relative z-10 flex items-center justify-center gap-2",
          className
        )}
      >
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: "linear-gradient(45deg, rgba(244, 171, 196, 0.1), rgba(89, 91, 131, 0.1))",
          opacity: hovered ? 1 : 0,
        }}
      />
    </Component>
  );
}; 