import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all PNG images from assets
import image1 from '/assets/1.png';
import image2 from '/assets/2.png';
import image3 from '/assets/3.png';
import image4 from '/assets/4.png';
import image5 from '/assets/5.png';
import image6 from '/assets/6.png';
import image7 from '/assets/7.png';
import image8 from '/assets/8.png';
import image9 from '/assets/9.png';
import image10 from '/assets/10.png';
import image11 from '/assets/11.png';
import image12 from '/assets/12.png';
import image13 from '/assets/13.png';
import image14 from '/assets/14.png';

gsap.registerPlugin(ScrollTrigger);

const OurClients = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const scrollerRef = useRef(null);

  // Array of imported images
  const clientImages = [
    image1, image2, image3, image4, image5, image6, image7,
    image8, image9, image10, image11, image12, image13, image14
  ];

  // Duplicate the array to ensure seamless infinite scroll
  const duplicatedImages = [...clientImages, ...clientImages];

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.set(headingRef.current, {
        y: 100,
        opacity: 0
      });

      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(headingRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
      });
    }

    // Infinite scroll animation
    if (scrollerRef.current) {
      const scrollWidth = scrollerRef.current.scrollWidth / 2;
      
      gsap.set(scrollerRef.current, { x: 0 });
      
      gsap.to(scrollerRef.current, {
        x: -scrollWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % scrollWidth)
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide opacity-0"
          >
            OUR CLIENTS
          </h2>
        </div>

        {/* Infinite Horizontal Scroller */}
        <div className="relative">
          {/* Scrolling container */}
          <div 
            ref={scrollerRef}
            className="flex items-center gap-8 whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {duplicatedImages.map((imageSrc, index) => (
              <div
                key={index}
                className="flex-shrink-0 group"
              >
                {/* Image Container */}
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt={`Client ${(index % clientImages.length) + 1}`}
                    className="w-40 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional subtitle */}
        <div className="text-center mt-12">
          <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
            Trusted by industry leaders worldwide, we deliver exceptional digital solutions that drive growth and innovation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OurClients;