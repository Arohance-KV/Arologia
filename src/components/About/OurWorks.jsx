import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const OurWorks = () => {
  const scrollContainerRef = useRef(null);
  const animRef = useRef(null);

  // persistent values
  const scrollPosRef = useRef(0); // keeps current scroll position between renders
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef(null);
  const cardWidthRef = useRef(400);
  const maxScrollRef = useRef(400 * 8); // will be recomputed on mount/resize

  const [isPaused, setIsPaused] = useState(false);
  const [autoScrollSpeed] = useState(1); // original per-frame speed equivalence

  const works = [
    { id: 1, title: "E-Commerce Platform", category: "Retail & Fashion", description: "Modern e-commerce solution...", image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 2, title: "Healthcare Dashboard", category: "Healthcare & Medical", description: "Comprehensive patient management...", image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 3, title: "Financial Analytics Tool", category: "Finance & Banking", description: "Advanced financial tracking...", image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 4, title: "Educational Platform", category: "Education & Learning", description: "Interactive learning management system...", image: "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 5, title: "Real Estate Portal", category: "Real Estate", description: "Property listing platform...", image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 6, title: "Social Media Platform", category: "Social & Networking", description: "Next-generation social networking...", image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 7, title: "Restaurant Management", category: "Food & Beverage", description: "Complete restaurant management...", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
    { id: 8, title: "Fitness Tracker App", category: "Health & Wellness", description: "Comprehensive fitness tracking app...", image: "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=800", link: "#" },
  ];

  // duplicate for continuous feeling (you already used this pattern)
  const duplicatedWorks = [...works, ...works, ...works];

  // keep isPausedRef in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // compute card width + maxScroll (runs on mount and resize)
  useEffect(() => {
    const computeSizes = () => {
      const container = scrollContainerRef.current;
      if (!container || container.children.length === 0) return;

      const first = container.children[0];
      const second = container.children[1];
      const firstRect = first.getBoundingClientRect();

      // estimate gap (if there's a second child)
      let gap = 24; // fallback
      if (second) {
        const secondRect = second.getBoundingClientRect();
        gap = Math.max(0, secondRect.left - firstRect.left - first.offsetWidth);
      }

      cardWidthRef.current = first.offsetWidth + gap;
      maxScrollRef.current = works.length * cardWidthRef.current;
    };

    computeSizes();
    window.addEventListener("resize", computeSizes);
    return () => window.removeEventListener("resize", computeSizes);
  }, [works.length]);

  // single RAF loop (mounted once) — uses refs, so position persists across pauses/re-renders
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    lastTimeRef.current = null;
    // Convert original "per-frame" speed to pixels-per-millisecond so movement is frame-rate independent.
    // We assume the original was per-60fps frame increments; this mapping keeps the visible speed similar.
    const pxPerMs = autoScrollSpeed / (1000 / 60);

    const loop = (time) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;

      // If paused, update lastTimeRef so when we resume we won't get a big delta jump
      if (isPausedRef.current) {
        lastTimeRef.current = time;
      } else {
        scrollPosRef.current += pxPerMs * delta;

        // wrap without resetting to 0 (keeps continuous feel)
        if (scrollPosRef.current >= maxScrollRef.current) {
          scrollPosRef.current -= maxScrollRef.current;
        }

        // apply transform
        container.style.transform = `translateX(-${scrollPosRef.current}px)`;
        lastTimeRef.current = time;
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // empty deps: single loop; refs hold dynamic values
  }, []);

  // handlers (pause while hovering; toggle pause on click)
  const handleMouseEnter = () => {
    setIsPaused(true);
    isPausedRef.current = true;
  };
  const handleMouseLeave = () => {
    setIsPaused(false);
    isPausedRef.current = false;
  };
  const handleClick = () => {
    setIsPaused((v) => {
      const newV = !v;
      isPausedRef.current = newV;
      return newV;
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
        {/* Title */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide text-white mb-6">Our Works</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">Discover our portfolio of cutting-edge projects that showcase our expertise across various industries</p>
        </div>

        {/* Scrolling Cards wrapper */}
        <div
          className="relative h-[500px] sm:h-[550px] md:h-[600px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div ref={scrollContainerRef} className="flex gap-6 h-full" style={{ width: "fit-content" }}>
            {duplicatedWorks.map((work, index) => (
              <div key={`${work.id}-${index}`} className="flex-shrink-0 w-[350px] sm:w-[380px] md:w-[400px] h-full group">
                <div
                  className="relative overflow-hidden h-full rounded-sm hover:transform hover:scale-[1.02] transition-all duration-500 shadow-2xl"
                  style={{
                    backgroundImage: `url(${work.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/10 transition-all duration-500" />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-sm border border-white/20">{work.category}</span>
                  </div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <div className="bg-black/20 backdrop-blur-sm rounded-sm p-6 border border-white/10">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">{work.title}</h3>
                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">{work.description}</p>
                      <a href={work.link} onClick={(e) => e.stopPropagation()} className="inline-flex items-center text-white bg-grey px-6 py-3 rounded-sm font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
                        View Project
                        <ExternalLink className="ml-2 w-4 h-4 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>

                  <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorks;
