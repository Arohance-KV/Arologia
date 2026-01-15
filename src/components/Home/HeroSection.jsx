import React, { useRef } from "react";
import sampleVideo from "/assets/sample.mp4";
import useHeroGsap from "../../hooks/useHeroGsap";

export default function HeroSection() {
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Hero text refs
  const heroTheRef = useRef(null);
  const heroTechTeamRef = useRef(null);
  const heroDescriptionRef = useRef(null);

  // ✅ GSAP logic moved into hook
  useHeroGsap({
    heroTheRef,
    heroTechTeamRef,
    heroDescriptionRef,
  });

  return (
    <section
      ref={heroSectionRef}
      className="relative hero-section"
      style={{ height: "200vh" }}
    >
      {/* Background Video */}
      <div ref={videoContainerRef} className="sticky top-0 w-full h-screen z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={sampleVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Text Overlay */}
      <div className="relative z-30 -mt-[98vh]">
        <div
          className="flex flex-col justify-center items-start pl-0 pr-0 pointer-events-none font-sans pt-10 lg:pt-185 md:pt-170 sm:pt-150"
          style={{ height: "100vh" }}
        >
          <div className="flex flex-col">
            {/* Main title */}
            <div
              ref={heroTheRef}
              className="text-[12vw] font-bold leading-[0.9] tracking-tight text-white opacity-0"
            >
              AROLOGIA
            </div>

            {/* Sub title */}
            <div
              ref={heroTechTeamRef}
              className="text-[10vw] md:text-[8vw] lg:text-[13vw] font-light leading-[0.9] tracking-tight text-white mt-2 opacity-0"
            >
              Tech Team
            </div>
          </div>

          {/* Description */}
          <div
            ref={heroDescriptionRef}
            className="mt-8 md:mt-12 max-w-2xl text-xl md:text-2xl opacity-0 leading-relaxed text-white ml-20"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              architecto ad cumque sequi officia repellendus et praesentium odit
              libero adipisci.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
