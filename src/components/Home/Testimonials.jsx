import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonialsData } from "../../utils/testimonialData";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    const title = titleRef.current;
    const typingContainer = typingRef.current;

    if (!section || !container || !track || !title || !typingContainer) return;

    // Create individual character spans for simple animation
    const text = "TESTIMONIALS";
    typingContainer.innerHTML = text
      .split("")
      .map(
        (char) =>
          `<span class="char" style="opacity: 0; display: inline-block;">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");

    const chars = typingContainer.querySelectorAll(".char");

    // Set initial states for title container
    gsap.set(title, {
      opacity: 0,
    });

    // Set initial states for characters
    gsap.set(chars, {
      opacity: 0,
      x: -20,
    });

    // Title container animation - appears first
    const titleAnimation = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        gsap.to(title, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        // Simple staggered character animation - slide in from left
        gsap.to(chars, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        });
      },
      onLeave: () => {
        // Fade out title when horizontal scroll starts
        gsap.to(title, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        gsap.to(title, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
        gsap.to(chars, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        });
      },
      onLeaveBack: () => {
        gsap.to(title, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.set(chars, {
          opacity: 0,
          x: -20,
        });
      },
    });

    // Calculate the width needed to center the last card
    const lastCard = track.lastElementChild;
    const lastCardWidth = lastCard ? lastCard.offsetWidth : 0;
    const containerCenterOffset = container.offsetWidth / 2;
    const lastCardCenterOffset = lastCardWidth / 2;

    // Total distance to move: from start to positioning last card at center
    const totalWidth =
      track.scrollWidth - containerCenterOffset - lastCardCenterOffset;

    // Ensure the track stays within bounds
    gsap.set(track, {
      x: 0,
      willChange: "transform", // Optimize for animations
    });

    const horizontalScroll = gsap.to(track, {
      x: () => -Math.max(0, totalWidth), // Move to center the last card
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(100, totalWidth)}`, // Minimum scroll distance
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          // Clamp the transform to prevent overflow
          const maxTransform = -Math.max(0, totalWidth);
          const currentX = gsap.getProperty(track, "x");
          if (currentX < maxTransform) {
            gsap.set(track, { x: maxTransform });
          }
        },
        onRefresh: () => {
          // Recalculate on resize to maintain last card centering
          const newLastCard = track.lastElementChild;
          const newLastCardWidth = newLastCard ? newLastCard.offsetWidth : 0;
          const newContainerCenterOffset = container.offsetWidth / 2;
          const newLastCardCenterOffset = newLastCardWidth / 2;
          const newTotalWidth =
            track.scrollWidth - newContainerCenterOffset - newLastCardCenterOffset;

          if (Math.abs(newTotalWidth - totalWidth) > 10) {
            ScrollTrigger.refresh();
          }
        },
      },
    });

    // Animate cards as they come into view
    const cards = track.querySelectorAll(".testimonial-card");
    cards.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalScroll,
        start: "left 70%",
        end: "right 30%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(card, {
            opacity: 0.7,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });

    // Cleanup
    return () => {
      titleAnimation.kill();
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === section ||
          trigger.containerAnimation === horizontalScroll
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{
        height: "100vh",
        overflow: "hidden", // Prevent any overflow
        position: "relative",
        width: "100vw", // Ensure full width
      }}
    >
      {/* Title with Animation */}
      <div className="absolute top-4 md:top-6 lg:top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white opacity-0 whitespace-nowrap"
        >
          <div ref={typingRef} className="inline-block relative">
            {/* Content will be populated by JavaScript */}
          </div>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={containerRef}
        className="flex items-center h-full"
        style={{
          width: "100%",
          overflow: "hidden", // Critical: prevent horizontal scrollbar
          position: "relative",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-12 lg:gap-16 px-12 md:px-24 lg:px-32"
          style={{
            width: "max-content",
            willChange: "transform", // Optimize for animations
            transform: "translateX(0px)", // Initial position
          }}
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card flex-shrink-0 w-80 md:w-96 lg:w-[28rem] h-96 md:h-[28rem] bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-sm p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{ opacity: 0 }}
            >
              {/* Background glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card content */}
              <div className="relative z-30">
                {/* Quote icon */}
                <div className="text-4xl md:text-5xl text-white/20 mb-6 group-hover:text-white/30 transition-colors duration-300">
                  "
                </div>

                {/* Testimonial text */}
                <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                  {testimonial.testimonial}
                </p>
              </div>

              {/* Client info */}
              <div className="relative z-30 flex items-center space-x-4">
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

              {/* Subtle border effect */}
              <div className="absolute inset-0 rounded-sm border border-white/10 group-hover:border-white/20 transition-colors duration-300"></div>

              {/* Moving gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for hiding scrollbars */}
      <style jsx>{`
        /* Hide scrollbars */
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
