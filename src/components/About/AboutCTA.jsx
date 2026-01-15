import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaTextRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const ctaContactRef = useRef(null);
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
      const animateElement = (ref, config = {}) => {
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

      animateElement(ctaTitleRef, {
        yStart: isMobile ? 60 : 100,
        scale: true,
        duration: isMobile ? 1.0 : 1.4,
        ease: "power3.out"
      });

      animateElement(ctaTextRef, {
        yStart: isMobile ? 40 : 60,
        duration: isMobile ? 1.2 : 1.6,
        delay: 0.2,
        ease: "power3.out"
      });

      // CTA buttons animation
      if (ctaButtonsRef.current) {
        gsap.set(ctaButtonsRef.current, { y: isMobile ? 30 : 40, opacity: 0, scale: 0.95 });
        ScrollTrigger.create({
          trigger: ctaButtonsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(ctaButtonsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: isMobile ? 1.2 : 1.8,
              ease: "power3.out",
              delay: 0.4
            });
          }
        });
      }

      // CTA contact info animation
      if (ctaContactRef.current) {
        gsap.set(ctaContactRef.current.children, { y: isMobile ? 40 : 60, opacity: 0 });
        ScrollTrigger.create({
          trigger: ctaContactRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(ctaContactRef.current.children, {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.8 : 1.2,
              ease: "power3.out",
              stagger: 0.1,
              delay: 0.6
            });
          }
        });
      }
    }, ctaRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={ctaRef} className="py-12 sm:py-16 md:py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-black/20 to-blue-100/20"></div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            ref={ctaTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 tracking-wide text-white opacity-0 relative"
          >
            Ready to Start Your Project?
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </h2>

          <p
            ref={ctaTextRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed opacity-0 px-4"
          >
            Let's discuss how we can bring your digital vision to life with our expertise, innovation,
            and commitment to excellence. Your success story starts here.
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></span>
          </p>

          <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 md:mb-16 opacity-0">
            <Link
              to="/"
              className="group inline-block relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-gradient-to-r from-white to-gray-100 text-black text-base sm:text-lg md:text-xl font-semibold rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-white/25"
            >
              <span className="relative z-10 flex items-center justify-center">
                View Our Work
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
            </Link>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="mailto:admin@arohancetech.com"
                className="group inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 border-2 border-white text-white text-base sm:text-lg md:text-xl font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <Mail className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                Email Us
              </a>
              <a
                href="tel:+1234567890"
                className="group inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 bg-white/10 border border-white/30 text-white text-base sm:text-lg md:text-xl font-bold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <Phone className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;