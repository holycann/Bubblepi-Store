import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "div",
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

  return (
    <Tag
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-lg p-[1px] overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(244, 171, 196, 0.8), transparent 40%)`,
        }}
      />
      <div
        className={cn(
          "relative h-full w-full rounded-lg bg-white dark:bg-dark-card",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
}; 