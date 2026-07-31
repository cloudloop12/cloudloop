import React, { useEffect, useState, useRef } from 'react';

export type CursorMode = 'default' | 'button' | 'link' | 'card' | 'image' | 'hidden';

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  scale: number;
}

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation frame & target positioning
  const mousePos = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const innerPos = useRef({ x: -100, y: -100 });
  const trailRef = useRef<TrailPoint[]>([]);

  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Accessibility & Device Compatibility Checks
    const mediaQueryHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkSupport = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const supportsPointer = mediaQueryHover.matches;
      const reduceMotion = mediaQueryMotion.matches;
      
      setEnabled(supportsPointer && !isTouchDevice && !reduceMotion);
    };

    checkSupport();

    mediaQueryHover.addEventListener('change', checkSupport);
    mediaQueryMotion.addEventListener('change', checkSupport);

    return () => {
      mediaQueryHover.removeEventListener('change', checkSupport);
      mediaQueryMotion.removeEventListener('change', checkSupport);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');

    // Handle mouse movement
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor mode
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if inside input/textarea/select
      const isInput = target.closest('input, textarea, select, [contenteditable="true"], .no-custom-cursor');
      if (isInput) {
        setCursorMode('hidden');
        setCursorText('');
        return;
      }

      // Check image or data-cursor="image"
      const isImage = target.closest('img, [data-cursor="image"]');
      if (isImage) {
        setCursorMode('image');
        setCursorText(target.getAttribute('data-cursor-text') || '');
        return;
      }

      // Check button / cta
      const isButton = target.closest('button, [role="button"], .btn-primary, .btn-secondary, [data-cursor="button"]');
      if (isButton) {
        setCursorMode('button');
        setCursorText(target.getAttribute('data-cursor-text') || '');
        return;
      }

      // Check card / container
      const isCard = target.closest('.shiny-card, [data-cursor="card"], article, .group');
      if (isCard) {
        setCursorMode('card');
        setCursorText(target.getAttribute('data-cursor-text') || '');
        return;
      }

      // Check link
      const isLink = target.closest('a');
      if (isLink) {
        setCursorMode('link');
        setCursorText(target.getAttribute('data-cursor-text') || '');
        return;
      }

      // Default state
      setCursorMode('default');
      setCursorText('');
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // 2. 60 FPS Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Fast, responsive lerp (no drifting or detachment)
      const outerEase = 0.38;
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * outerEase;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * outerEase;

      // Inner dot follows instantly
      const innerEase = 0.88;
      innerPos.current.x += (mousePos.current.x - innerPos.current.x) * innerEase;
      innerPos.current.y += (mousePos.current.y - innerPos.current.y) * innerEase;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${innerPos.current.x}px, ${innerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Render Subtle Micro-Trail on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const dist = Math.hypot(
            mousePos.current.x - (trailRef.current[0]?.x || 0),
            mousePos.current.y - (trailRef.current[0]?.y || 0)
          );

          if (dist > 5 && isVisible && cursorMode !== 'hidden') {
            trailRef.current.unshift({
              x: mousePos.current.x,
              y: mousePos.current.y,
              alpha: 0.25,
              scale: isMouseDown ? 1.5 : 2.0,
            });
          }

          if (trailRef.current.length > 6) {
            trailRef.current.pop();
          }

          for (let i = 0; i < trailRef.current.length; i++) {
            const p = trailRef.current[i];
            p.alpha *= 0.72; // fade out quickly
            p.scale *= 0.92;

            if (p.alpha > 0.02) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.scale, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
              ctx.fill();
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      } else {
        lastTime = performance.now();
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [enabled, isVisible, cursorMode, isMouseDown]);

  if (!enabled) return null;

  // Refined subtle scale classes
  let scaleClass = 'scale-100 border-cyan-400/40 bg-cyan-400/5';
  let textLabel = cursorText;

  if (cursorMode === 'hidden') {
    scaleClass = 'scale-0 opacity-0';
  } else if (isMouseDown) {
    scaleClass = 'scale-[0.85] bg-cyan-500/20 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]';
  } else if (cursorMode === 'button') {
    scaleClass = 'scale-[1.2] bg-cyan-400/10 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.25)]';
  } else if (cursorMode === 'link') {
    scaleClass = 'scale-[1.15] bg-cyan-400/10 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.2)]';
  } else if (cursorMode === 'card') {
    scaleClass = 'scale-[1.08] bg-cyan-400/5 border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.15)]';
  } else if (cursorMode === 'image') {
    scaleClass = 'scale-[1.25] bg-slate-950/80 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]';
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible && cursorMode !== 'hidden' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Micro-Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 2. Compact Outer Ring */}
      <div
        ref={outerRef}
        className={`absolute top-0 left-0 w-6 h-6 rounded-full border backdrop-blur-[0.5px] flex items-center justify-center transition-transform duration-150 ease-out will-change-transform ${scaleClass}`}
      >
        {textLabel && (
          <span className="text-[8px] font-bold tracking-wider uppercase text-cyan-300 pointer-events-none select-none">
            {textLabel}
          </span>
        )}
      </div>

      {/* 3. Inner Precision Dot */}
      <div
        ref={innerRef}
        className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)] transition-transform duration-75 ease-out will-change-transform ${
          isMouseDown ? 'scale-125 bg-white' : 'scale-100'
        }`}
      />
    </div>
  );
};
