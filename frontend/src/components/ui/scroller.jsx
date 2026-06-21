import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal scroller with gradient edge overlays and nav buttons.
 * Adapted from the provided TypeScript Scroller component to JSX,
 * using the existing shadcn button styles and lucide-react icons.
 */
export const Scroller = ({
  children,
  height = "100%",
  width = "100%",
  withButtons = true,
  childrenContainerClassName,
  buttonClassName,
}) => {
  const items = React.Children.toArray(children);
  const containerRef = useRef(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const itemsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
      itemsRef.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleButtonClick = (direction) => {
    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, items.length - 1)
        : Math.max(currentIndex - 1, 0);
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftOverlay(scrollLeft > 0);
        setShowRightOverlay(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    handleScroll();
    const element = containerRef.current;
    element?.addEventListener("scroll", handleScroll);
    return () => element?.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync currentIndex on manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncIndex = () => {
      const containerRect = container.getBoundingClientRect();
      let closest = 0;
      let closestDist = Infinity;
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.left - containerRect.left);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setCurrentIndex(closest);
    };

    let timeout;
    const debouncedSync = () => {
      clearTimeout(timeout);
      timeout = setTimeout(syncIndex, 150);
    };

    container.addEventListener("scroll", debouncedSync);
    return () => {
      container.removeEventListener("scroll", debouncedSync);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden flex flex-col gap-4"
      style={{ width, height }}
    >
      {/* Scrollable container */}
      <div
        className={cn(
          "flex flex-row relative hide-scrollbar overflow-x-auto overflow-y-hidden",
          childrenContainerClassName
        )}
        ref={containerRef}
      >
        {items.map((child, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      {withButtons && (
        <div className="flex gap-2 z-10">
          <button
            aria-label="Scroll left"
            onClick={() => handleButtonClick("prev")}
            disabled={!showLeftOverlay}
            className={cn(
              "w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center transition-all duration-200",
              showLeftOverlay
                ? "text-white/80 hover:bg-white/10 hover:border-white/40 cursor-pointer"
                : "text-white/20 cursor-not-allowed",
              buttonClassName
            )}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => handleButtonClick("next")}
            disabled={!showRightOverlay}
            className={cn(
              "w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center transition-all duration-200",
              showRightOverlay
                ? "text-white/80 hover:bg-white/10 hover:border-white/40 cursor-pointer"
                : "text-white/20 cursor-not-allowed",
              buttonClassName
            )}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Left gradient overlay */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10 transition-opacity duration-300",
          showLeftOverlay ? "opacity-100 left-0" : "opacity-0 -left-16"
        )}
      />
      {/* Right gradient overlay */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10 transition-opacity duration-300",
          showRightOverlay ? "opacity-100 right-0" : "opacity-0 -right-16"
        )}
      />
    </div>
  );
};
