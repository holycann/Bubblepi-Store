import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export const CardHoverEffect = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={item.link}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-purple-dark to-pink-soft rounded-lg transition-opacity duration-200 ${
              hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg transition-all duration-200 ${
              hoveredIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="text-white font-medium">{item.title}</div>
            <div className="text-white/80 text-sm">{item.description}</div>
          </div>
          <div className="rounded-lg overflow-hidden relative z-10 bg-white dark:bg-dark-card h-full">
            <div className="h-48 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-blue-dark dark:text-white mb-1">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}; 