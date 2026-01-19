import React, { useRef } from "react";
import { Quote } from "lucide-react";
import { testimonialsData } from "../../utils/testimonialData";
import { useTestimonialsAnimation } from "../../hooks/useTestimonialsAnimation";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);
  const typingRef = useRef(null);

  // Initialize animations
  useTestimonialsAnimation(sectionRef, containerRef, titleRef, trackRef, typingRef);
  useHorizontalScroll(sectionRef, containerRef, trackRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        width: "100vw",
      }}
    >
      {/* Title with Animation */}
      <div className="absolute top-4 md:top-6 lg:top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white opacity-0 whitespace-nowrap"
        >
          <div ref={typingRef} className="inline-block relative" />
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={containerRef}
        className="flex items-center h-full"
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32"
          style={{
            width: "max-content",
            willChange: "transform",
            transform: "translateX(0px)",
          }}
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[28rem] h-80 sm:h-96 md:h-[28rem] bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-sm p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{ opacity: 0 }}
            >
              {/* Background glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card content */}
              <div className="relative z-30">
                {/* Client info */}
                <div className="relative z-30 flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                    <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Quote icon */}
                <div className="mb-4 md:mb-6 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote
                    size={24}
                    className="md:w-8 md:h-8 lg:w-8 lg:h-8 text-white/30 group-hover:text-white/50 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Testimonial text */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {testimonial.testimonial}
                </p>
              </div>

              {/* Subtle border effect */}
              <div className="absolute inset-0 rounded-sm border border-white/10 group-hover:border-white/20 transition-colors duration-300"></div>

              {/* Moving gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for hiding scrollbars */}
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;