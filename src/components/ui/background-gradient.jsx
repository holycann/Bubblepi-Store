import React from "react";
import { cn } from "../../lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  as: Component = "div",
}) => {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-px",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl",
          animate && "animate-gradient",
          "bg-gradient-to-r from-pink-soft via-purple-dark to-blue-dark opacity-20 dark:opacity-30"
        )}
      />
      <div className={cn("relative h-full w-full rounded-xl", className)}>
        {children}
      </div>
    </Component>
  );
};

export const BackgroundBeams = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 opacity-50 dark:opacity-30 rounded-xl",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle at top right, rgba(244, 171, 196, 0.3), transparent 1000px), radial-gradient(circle at bottom left, rgba(89, 91, 131, 0.3), transparent 800px)",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
      }}
    />
  );
};

export const GridPattern = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 opacity-20 dark:opacity-10",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(89, 91, 131, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(89, 91, 131, 0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}; 