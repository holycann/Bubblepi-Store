"use client";
import { cn } from "../../lib/utils";
import { FiMenu, FiX } from "react-icons/fi";
import {
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        background: visible
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 1)",
        boxShadow: visible
          ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
          : "none",
        height: visible ? "60px" : "80px",
      }}
      className={cn(
        "dark:border-b dark:border-zinc-800 absolute inset-x-0 top-0 flex h-20 items-center justify-between px-4 transition-all duration-300 dark:bg-black/10",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }) => {
  return (
    <div className={cn("hidden items-center gap-4 lg:flex", className)}>
      {items.map((item, idx) => (
        <a
          key={item.name + idx}
          href={item.link}
          onClick={onItemClick}
          className="rounded-md px-4 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <div
      className={cn(
        "block lg:hidden",
        visible ? "text-zinc-900" : "text-zinc-900",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute right-0 top-0 h-screen w-full max-w-sm bg-white p-6 shadow-lg dark:bg-zinc-950",
              className,
            )}
          >
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={onClose}
                className="rounded-md text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button
      className="rounded-md text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
      onClick={onClick}
    >
      {isOpen ? (
        <FiX className="h-6 w-6" />
      ) : (
        <FiMenu className="h-6 w-6" />
      )}
    </button>
  );
};

export const NavbarButton = ({ href, as = "a", children, className, variant = "primary" }) => {
  const Component = as;
  const baseClasses =
    "inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";
  
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-pink-soft text-white shadow hover:bg-pink-soft/90 dark:bg-pink-soft dark:text-white dark:hover:bg-pink-soft/90";
      case "secondary":
        return "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80";
      case "dark":
        return "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90";
      case "gradient":
        return "bg-gradient-to-r from-pink-soft to-purple-dark text-white hover:opacity-90";
      default:
        return "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90";
    }
  };

  const combinedClasses = cn(baseClasses, getVariantClasses(), className);

  return (
    <Component href={href} className={combinedClasses}>
      {children}
    </Component>
  );
}; 