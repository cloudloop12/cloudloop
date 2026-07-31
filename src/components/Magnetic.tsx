import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // Maximum offset distance in pixels (default 3)
  active?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 3,
  active = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Check for touch devices or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reduceMotion || !active) return;

    const element = containerRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Calculate relative displacement mapped strictly to max strength
      const moveX = Math.max(-strength, Math.min(strength, (distanceX / (rect.width / 2)) * strength));
      const moveY = Math.max(-strength, Math.min(strength, (distanceY / (rect.height / 2)) * strength));

      setPosition({ x: moveX, y: moveY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, active]);

  return (
    <div
      ref={containerRef}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};
