// FILE 3: components/WorkCard.jsx
import React, { useRef, useState } from "react";
import { useWorkCardAnimation, useIntersectionObserver, useShadowColor } from "../../hooks/useWorkCardAnimation";

const createInfiniteContent = (websitePreviews) => {
  const leftColumnImages = websitePreviews.filter((_, index) => index % 2 === 0);
  const rightColumnImages = websitePreviews.filter((_, index) => index % 2 === 1);

  const repeatCount = 8;
  return {
    left: Array(repeatCount).fill(leftColumnImages).flat(),
    right: Array(repeatCount).fill(rightColumnImages).flat(),
  };
};

const ImagePreview = ({ preview, index, title, shadowColor }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105"
      style={{
        marginBottom: "24px",
        boxShadow: `0 10px 30px ${shadowColor}, 0 20px 60px ${shadowColor.replace(
          "0.5",
          "0.3"
        )}`,
      }}
    >
      <img
        src={preview}
        alt={`${title} preview ${index + 1}`}
        className="w-full object-cover"
        style={{ height: "280px" }}
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

const GradientOverlay = ({ position, shadowColor }) => {
  const isTop = position === "top";
  const style = {
    background: `linear-gradient(to ${isTop ? "bottom" : "top"}, ${shadowColor.replace(
      "0.5",
      "0.8"
    )} 0%, ${shadowColor.replace("0.5", "0.4")} 50%, transparent 100%)`,
  };

  return (
    <div
      className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 right-0 h-16 pointer-events-none z-10`}
      style={style}
    ></div>
  );
};

export const WorkCard = ({ work }) => {
  const containerRef = useRef(null);
  const parentDivRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { isVisible } = useIntersectionObserver(containerRef);
  const { leftColumnRef, rightColumnRef } = useWorkCardAnimation(work, isHovered, isVisible);
  const shadowColor = useShadowColor(work.bgGradient);

  const { left: leftImages, right: rightImages } = createInfiniteContent(work.websitePreviews);

  return (
    <div
      ref={parentDivRef}
      className={`w-full h-full bg-gradient-to-br ${work.bgGradient} flex items-center justify-center p-4 lg:p-6`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-8 w-full max-w-7xl mx-auto items-center">
        {/* Left side - Content */}
        <div className="lg:col-span-2 space-y-4 text-white">
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
            {work.title}
          </h2>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-200 leading-relaxed mb-6">
            {work.description}
          </p>

          <div className="pt-4">
            <a
              href={work.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-sm hover:bg-gray-100 transition-colors duration-300 group"
            >
              Visit Website
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right side - Infinite Scrolling Previews */}
        <div className="lg:col-span-3 relative">
          <div className="relative bg-transparent rounded-sm overflow-hidden">
            <div
              ref={containerRef}
              className="h-[500px] lg:h-[500px] overflow-hidden relative cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="grid grid-cols-2 gap-6 p-2 relative h-full">
                {/* Left Column */}
                <div
                  ref={leftColumnRef}
                  className="flex flex-col"
                  style={{
                    willChange: "transform",
                    transition: isHovered ? "transform 0.3s ease-out" : "none",
                  }}
                >
                  {leftImages.map((preview, index) => (
                    <ImagePreview
                      key={`left-${index}`}
                      preview={preview}
                      index={index}
                      title={work.title}
                      shadowColor={shadowColor}
                    />
                  ))}
                </div>

                {/* Right Column */}
                <div
                  ref={rightColumnRef}
                  className="flex flex-col"
                  style={{
                    marginTop: "60px",
                    willChange: "transform",
                    transition: isHovered ? "transform 0.3s ease-out" : "none",
                  }}
                >
                  {rightImages.map((preview, index) => (
                    <ImagePreview
                      key={`right-${index}`}
                      preview={preview}
                      index={index}
                      title={work.title}
                      shadowColor={shadowColor}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Gradient Overlays */}
            <GradientOverlay position="top" shadowColor={shadowColor} />
            <GradientOverlay position="bottom" shadowColor={shadowColor} />
          </div>
        </div>
      </div>
    </div>
  );
};