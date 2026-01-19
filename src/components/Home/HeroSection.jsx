import React, { useRef } from "react";
import sampleVideo from "/assets/sample.mp4";
import useHeroGsap from "../../hooks/useHeroGsap";

export default function HeroSection() {
  const videoRef = useRef(null);

  // ✅ Hero text refs (used in GSAP hook)
  const heroTheRef = useRef(null);
  const heroTechTeamRef = useRef(null);
  const heroDescriptionRef = useRef(null);

  useHeroGsap({
    heroTheRef,
    heroTechTeamRef,
    heroDescriptionRef,
  });

  return (
    <section className="relative hero-section h-[200vh]">
      {/* ✅ Background Video */}
      <div className="sticky top-0 w-full h-screen z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={sampleVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ✅ Hero Text Overlay */}
      <div className="relative z-30 -mt-[100vh]">
        <div className="h-screen flex items-center">
          <div
            className="
              w-full pointer-events-none font-sans
              px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
              pt-16 sm:pt-20 md:pt-24 lg:pt-28
            "
          >
            {/* ✅ Headings */}
            <div className="flex flex-col">
              {/* Main title */}
              <div
                ref={heroTheRef}
                className="
                  text-white opacity-0 font-bold tracking-tight leading-[0.9]
                  text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] xl:text-[6vw]
                "
              >
                AROLOGIA
              </div>

              {/* Sub title */}
              <div
                ref={heroTechTeamRef}
                className="
                  text-white opacity-0 font-light tracking-tight leading-[0.9]
                  mt-2 sm:mt-3
                  text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] xl:text-[5vw]
                "
              >
                Tech Team
              </div>
            </div>

            {/* ✅ Description */}
            <div
              ref={heroDescriptionRef}
              className="
                text-white opacity-0 leading-relaxed
                mt-6 sm:mt-8 md:mt-10
                max-w-[95%] sm:max-w-xl md:max-w-2xl
                text-sm sm:text-base md:text-xl lg:text-2xl
                ml-0 sm:ml-6 md:ml-10 lg:ml-16
              "
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                architecto ad cumque sequi officia repellendus et praesentium odit
                libero adipisci.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
