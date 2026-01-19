import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Lamp from '../Animations/lamp'; 

gsap.registerPlugin(ScrollTrigger);

function HomeAboutUs() {
  const aboutSectionRef = useRef(null);
  const aboutContentRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutDescriptionRef = useRef(null);
  const aboutButtonRef = useRef(null);

  useEffect(() => {
    // Title animation
    if (aboutTitleRef.current) {
      gsap.set(aboutTitleRef.current, { y: 80, opacity: 0, scale: 0.9 });
      ScrollTrigger.create({
        trigger: aboutTitleRef.current,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => gsap.to(aboutTitleRef.current, {
          y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out'
        }),
        onLeave: () => gsap.to(aboutTitleRef.current, {
          y: -40, opacity: 0.7, scale: 0.95, duration: 0.8, ease: 'power2.out'
        }),
        onEnterBack: () => gsap.to(aboutTitleRef.current, {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out'
        }),
        onLeaveBack: () => gsap.to(aboutTitleRef.current, {
          y: 80, opacity: 0, scale: 0.9, duration: 0.6, ease: 'power2.out'
        })
      });
    }

    // Description animation
    if (aboutDescriptionRef.current) {
      gsap.set(aboutDescriptionRef.current, { y: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: aboutDescriptionRef.current,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => gsap.to(aboutDescriptionRef.current, {
          y: 0, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.2
        }),
        onLeave: () => gsap.to(aboutDescriptionRef.current, {
          y: -30, opacity: 0.6, duration: 0.8, ease: 'power2.out'
        }),
        onEnterBack: () => gsap.to(aboutDescriptionRef.current, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out'
        }),
        onLeaveBack: () => gsap.to(aboutDescriptionRef.current, {
          y: 60, opacity: 0, duration: 0.6, ease: 'power2.out'
        })
      });
    }

    // Button animation
    if (aboutButtonRef.current) {
      gsap.set(aboutButtonRef.current, { y: 40, opacity: 0, scale: 0.9 });
      ScrollTrigger.create({
        trigger: aboutButtonRef.current,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => gsap.to(aboutButtonRef.current, {
          y: 0, opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out', delay: 0.4
        }),
        onLeave: () => gsap.to(aboutButtonRef.current, {
          y: -20, opacity: 0.7, scale: 0.95, duration: 0.8, ease: 'power2.out'
        }),
        onEnterBack: () => gsap.to(aboutButtonRef.current, {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out'
        }),
        onLeaveBack: () => gsap.to(aboutButtonRef.current, {
          y: 40, opacity: 0, scale: 0.9, duration: 0.6, ease: 'power2.out'
        })
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={aboutSectionRef} className="relative z-20 lg:pt-20 flex items-center">
      <Lamp className="p-0">
        <div
          ref={aboutContentRef}
          className="relative z-50 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-0"
        >
          <div className="text-center">
            {/* Title */}
            <h2
              ref={aboutTitleRef}
              className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-light mt-0 tracking-wide opacity-0 relative bg-transparent text-black pt-75 md:pt-30"
            >
              ABOUT US
              <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-gray-300/20 to-white/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </h2>

            {/* Description */}
            <p
              ref={aboutDescriptionRef}
              className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed opacity-0 relative mt-10"
            >
              At Arohance Tech, we specialize in creating stunning, functional websites
              for businesses across different industries. From startups to established enterprises,
              we bring digital visions to life with cutting-edge technology and innovative design.
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></span>
            </p>

            {/* CTA Button */}
            <div ref={aboutButtonRef} className="opacity-0">
              <Link
                to="/about"
                className="group inline-block relative px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white text-black text-lg md:text-xl font-semibold rounded-lg overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-white/25"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Know More About Us
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-white opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </Lamp>
    </section>
  );
}

export default HomeAboutUs;