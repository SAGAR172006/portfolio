import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const targetRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const target = targetRef.current;
    if (!cursor || !target) return;

    // Selectors for interactive elements
    const interactiveElements = 'a, button, input, textarea, [role="button"], .hover-target';

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive element
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = hoveredElement?.closest(interactiveElements);

      if (interactive && interactive !== targetElement) {
        setTargetElement(interactive);
        setIsHovering(true);
        const rect = interactive.getBoundingClientRect();
        targetPos.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        };
      } else if (!interactive) {
        setIsHovering(false);
        setTargetElement(null);
      }
    };

    const animate = () => {
      // Smooth cursor follow
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

      cursor.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;

      // Target ring animation
      if (isHovering && targetElement) {
        const targetX = targetPos.current.x;
        const targetY = targetPos.current.y;
        const targetWidth = targetPos.current.width;
        const targetHeight = targetPos.current.height;

        target.style.transform = `translate(${targetX}px, ${targetY}px)`;
        target.style.width = `${targetWidth + 20}px`;
        target.style.height = `${targetHeight + 20}px`;
        target.style.opacity = '1';
      } else {
        target.style.opacity = '0';
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering, targetElement]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#9B8BC4] dark:bg-[#B4A4D6] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />

      {/* Target ring */}
      <div
        ref={targetRef}
        className="fixed top-0 left-0 border-2 border-[#9B8BC4] dark:border-[#B4A4D6] rounded-lg pointer-events-none z-[9998] opacity-0"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease'
        }}
      />
    </>
  );
};

export default CustomCursor;