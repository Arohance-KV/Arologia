import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGlobe, FiSmartphone, FiZap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const HowWeCraft = () => {
  const servicesRef = useRef(null);
  const servicesTitleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced animation function
      const animateElement = (ref, config = {}) => {
        const {
          yStart = isMobile ? 50 : 80,
          yEnd = 0,
          opacityStart = 0,
          opacityEnd = 1,
          scale = false,
          scaleStart = 0.95,
          scaleEnd = 1,
          duration = isMobile ? 1.0 : 1.4,
          ease = "power3.out",
          delay = 0,
          startTrigger = "top 85%",
          endTrigger = "bottom 15%"
        } = config;

        if (ref.current) {
          const initialProps = {
            y: yStart,
            opacity: opacityStart,
            ...(scale && { scale: scaleStart })
          };

          gsap.set(ref.current, initialProps);

          ScrollTrigger.create({
            trigger: ref.current,
            start: startTrigger,
            end: endTrigger,
            onEnter: () => {
              const animateProps = {
                y: yEnd,
                opacity: opacityEnd,
                duration,
                ease,
                delay,
                ...(scale && { scale: scaleEnd })
              };
              gsap.to(ref.current, animateProps);
            },
            onLeave: () => {
              gsap.to(ref.current, {
                y: isMobile ? -25 : -50,
                opacity: 0.3,
                duration: 0.6,
                ease: "power2.out",
                ...(scale && { scale: 0.97 })
              });
            },
            onEnterBack: () => {
              const animateProps = {
                y: yEnd,
                opacity: opacityEnd,
                duration: 0.6,
                ease,
                ...(scale && { scale: scaleEnd })
              };
              gsap.to(ref.current, animateProps);
            },
            onLeaveBack: () => {
              const animateProps = {
                y: yStart,
                opacity: opacityStart,
                duration: 0.4,
                ease: "power2.out",
                ...(scale && { scale: scaleStart })
              };
              gsap.to(ref.current, animateProps);
            }
          });
        }
      };

      animateElement(servicesTitleRef, { 
        yStart: isMobile ? 50 : 80, 
        scale: true, 
        duration: isMobile ? 1.0 : 1.4, 
        ease: "power3.out" 
      });

      // Enhanced service cards animation with professional hover effects
      gsap.utils.toArray(".professional-card").forEach((card, i) => {
        gsap.set(card, { y: isMobile ? 50 : 80, opacity: 0 });
        
        ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          onEnter: () => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.8 : 1.2,
              ease: "power3.out",
              delay: i * (isMobile ? 0.05 : 0.1)
            });
          }
        });

        // Professional hover effects for desktop
        if (!isMobile) {
          const cardElement = card;
          const cardContent = card.querySelector('.card-content');
          const cardIcon = card.querySelector('.card-icon');
          
          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              duration: 0.4,
              y: -8,
              ease: "power2.out"
            });
            if (cardIcon) {
              gsap.to(cardIcon, {
                duration: 0.3,
                scale: 1.1,
                ease: "power2.out"
              });
            }
          });
          
          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              duration: 0.4,
              y: 0,
              ease: "power2.out"
            });
            if (cardIcon) {
              gsap.to(cardIcon, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
              });
            }
          });
        }
      });

    }, servicesRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={servicesRef}
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-black relative overflow-visible"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div
            ref={servicesTitleRef}
            className="flex items-center justify-center mb-6 md:mb-8 opacity-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-white/40"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide text-white text-center">
                How We Craft Digital Magic
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-l from-transparent via-white/40 to-white/40"></div>
            </div>
          </div>
        </div>
        
        {/* FIXED: Improved grid layout with better mobile handling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {/* Block 1 - Digital Storytelling */}
          <div className="professional-card group w-full">
            <div className="card-content relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-2xl hover:shadow-white/5">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-xl"></div>
              
              <div className="card-icon w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 sm:mb-8 border border-white/10 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/20 flex-shrink-0">
                <FiGlobe className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
              </div>
              
              <div className="flex-grow">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-white leading-tight">
                  Digital Storytelling
                </h4>
                
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg group-hover:text-gray-300 transition-colors duration-300">
                  We don't just build websites — we craft digital experiences that reflect your brand's story, personality, and purpose across every pixel.
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Block 2 - Seamless Journeys */}
          <div className="professional-card group w-full">
            <div className="card-content relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-2xl hover:shadow-white/5">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-xl"></div>
              
              <div className="card-icon w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 sm:mb-8 border border-white/10 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/20 flex-shrink-0">
                <FiSmartphone className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
              </div>
              
              <div className="flex-grow">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-white leading-tight">
                  Seamless Journeys
                </h4>
                
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg group-hover:text-gray-300 transition-colors duration-300">
                  From landing page to checkout, we design seamless user flows that make your audience feel at home — and keep them coming back.
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Block 3 - Experience Engineering */}
          <div className="professional-card group w-full md:col-span-2 lg:col-span-1">
            <div className="card-content relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-2xl hover:shadow-white/5">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-xl"></div>
              
              <div className="card-icon w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 sm:mb-8 border border-white/10 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/20 flex-shrink-0">
                <FiZap className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
              </div>
              
              <div className="flex-grow">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-white leading-tight">
                  Experience Engineering
                </h4>
                
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg group-hover:text-gray-300 transition-colors duration-300">
                  We fuse design, code, and performance into cohesive systems — ensuring every interaction is fast, functional, and unforgettable.
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* ADDED: Extra spacing at bottom to prevent next section overlap */}
        <div className="h-8 sm:h-12 md:h-16"></div>
      </div>
    </section>
  );
};

export default HowWeCraft;