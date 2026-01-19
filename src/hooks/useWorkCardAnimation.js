// FILE 1: hooks/useWorkCardAnimation.js
import { useRef, useEffect, useState } from "react";

export const useWorkCardAnimation = (work, isHovered, isVisible) => {
  const animationFrameRef = useRef(null);
  const leftScrollRef = useRef(0);
  const rightScrollRef = useRef(0);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    if (!isVisible || isHovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const scrollSpeed = 0.4;
    const imageHeight = 280;
    const gap = 24;
    const itemHeight = imageHeight + gap;

    const animate = () => {
      if (isHovered || !isVisible) return;

      const leftColumn = leftColumnRef.current;
      const rightColumn = rightColumnRef.current;

      if (!leftColumn || !rightColumn) return;

      leftScrollRef.current += scrollSpeed;
      rightScrollRef.current += scrollSpeed;

      const leftImages = Math.ceil(work.websitePreviews.length / 2);
      const rightImages = Math.floor(work.websitePreviews.length / 2);
      const leftContentHeight = leftImages * itemHeight;
      const rightContentHeight = rightImages * itemHeight;

      if (leftScrollRef.current >= leftContentHeight) {
        leftScrollRef.current = leftScrollRef.current - leftContentHeight;
      }
      if (rightScrollRef.current >= rightContentHeight) {
        rightScrollRef.current = rightScrollRef.current - rightContentHeight;
      }

      leftColumn.style.transform = `translateY(-${leftScrollRef.current}px)`;
      rightColumn.style.transform = `translateY(-${rightScrollRef.current}px)`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, isHovered, work.websitePreviews.length]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { leftColumnRef, rightColumnRef };
};

export const useIntersectionObserver = (containerRef) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef]);

  return { isVisible, observerRef };
};

export const useShadowColor = (bgGradient) => {
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.5)");

  const extractShadowColorFromGradient = (gradientClass) => {
    const gradientToShadowMap = {
      "from-gray-900": "rgba(107, 114, 128, 0.5)",
      "from-gray-800": "rgba(107, 114, 128, 0.5)",
      "from-gray-700": "rgba(107, 114, 128, 0.5)",
      "from-amber-600": "rgba(245, 158, 11, 0.5)",
      "from-amber-800": "rgba(217, 119, 6, 0.5)",
      "from-orange-500": "rgba(249, 115, 22, 0.5)",
      "from-blue-900": "rgba(59, 130, 246, 0.5)",
      "from-blue-800": "rgba(59, 130, 246, 0.5)",
      "from-blue-700": "rgba(59, 130, 246, 0.5)",
      "from-blue-600": "rgba(59, 130, 246, 0.5)",
      "from-blue-500": "rgba(59, 130, 246, 0.5)",
      "from-indigo-900": "rgba(99, 102, 241, 0.5)",
      "from-purple-700": "rgba(147, 51, 234, 0.5)",
      "from-yellow-400": "rgba(251, 191, 36, 0.5)",
      "from-yellow-500": "rgba(251, 191, 36, 0.5)",
    };

    const gradientClasses = gradientClass.split(" ");
    const fromClass = gradientClasses.find((cls) => cls.startsWith("from-"));

    return gradientToShadowMap[fromClass] || "rgba(0, 0, 0, 0.5)";
  };

  useEffect(() => {
    const extractedShadowColor = extractShadowColorFromGradient(bgGradient);
    setShadowColor(extractedShadowColor);
  }, [bgGradient]);

  return shadowColor;
};