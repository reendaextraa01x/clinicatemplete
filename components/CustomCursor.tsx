import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed z-[100] mix-blend-difference">
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})` 
        }}
      />
      <div 
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 1 : 0.5
        }}
      />
    </div>
  );
};