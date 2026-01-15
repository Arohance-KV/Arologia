import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroAnim from '../About/DarkVeil';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = forwardRef((props, ref) => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
      const animateElement = (refEl, config = {}) => {
        const {
          yStart = isMobile ? 50 : 100,
          yEnd = 0,
          opacityStart = 0,
          opacityEnd = 1,
          scale = false,
          scaleStart = 0.95,
          scaleEnd = 1,
          duration = isMobile ? 0.8 : 1.2,
          ease = "power3.out",
          delay = 0,
          startTrigger = "top 85%",
          endTrigger = "bottom 15%"
        } = config;

        if (refEl.current) {
          const initialProps = {
            y: yStart,
            opacity: opacityStart,
            ...(scale && { scale: scaleStart })
          };

          gsap.set(refEl.current, initialProps);

          ScrollTrigger.create({
            trigger: refEl.current,
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
              gsap.to(refEl.current, animateProps);
            },
            onLeave: () => {
              gsap.to(refEl.current, {
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
              gsap.to(refEl.current, animateProps);
            },
            onLeaveBack: () => {
              const animateProps = {
                y: yStart,
                opacity: opacityStart,
                duration: 0.4,
                ease: "power2.out",
                ...(scale && { scale: scaleStart })
              };
              gsap.to(refEl.current, animateProps);
            }
          });
        }
      };

      animateElement(heroTitleRef, {
        yStart: isMobile ? 60 : 100,
        scale: true,
        duration: isMobile ? 0.8 : 1.0,
        ease: "power3.out"
      });

      animateElement(heroSubtitleRef, {
        yStart: isMobile ? 60 : 100,
        scale: true,
        duration: isMobile ? 1.0 : 1.2,
        delay: 0.2,
        ease: "power3.out"
      });

      animateElement(heroDescriptionRef, {
        yStart: isMobile ? 30 : 50,
        duration: isMobile ? 1.0 : 1.2,
        delay: 0.4,
        ease: "power3.out"
      });
    }, ref);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={ref} className="relative py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 min-h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <HeroAnim />
      </div>

      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 relative z-20">
        <div className="text-center">
          <div ref={heroTitleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] font-black mb-4 sm:mb-6 md:mb-8 leading-none bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent opacity-0">
            ABOUT
          </div>
          <div ref={heroSubtitleRef} className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-light text-gray-300 mb-4 sm:mb-6 md:mb-8 opacity-0">
            AROHANCE TECH
          </div>
          <div ref={heroDescriptionRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4 opacity-0">
            Crafting Digital Excellence • Transforming Visions into Reality • Your Technology Partner
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;