import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Target, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OurVision = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const visionTextRef = useRef(null);
  const pillarsRef = useRef(null);
  const statsRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visionPillars = [
    {
      title: "Excellence",
      description: "Delivering superior digital solutions that exceed industry standards and client expectations.",
      metric: "99.8%",
      metricLabel: "Client Satisfaction"
    },
    {
      title: "Innovation",
      description: "Pioneering cutting-edge technologies and methodologies to drive business transformation.",
      metric: "150+",
      metricLabel: "Projects Delivered"
    },
    {
      title: "Partnership",
      description: "Building long-term relationships based on trust, transparency, and mutual success.",
      metric: "5 Years",
      metricLabel: "Average Partnership"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Professional fade-in animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          const tl = gsap.timeline();
          
          tl.fromTo(titleRef.current, {
            y: isMobile ? 40 : 60,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          })
          
          .fromTo(visionTextRef.current, {
            y: isMobile ? 30 : 40,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }, "-=0.6");
        },
        onLeave: () => {
          gsap.to([titleRef.current, visionTextRef.current], {
            y: -20,
            opacity: 0.7,
            duration: 0.6,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to([titleRef.current, visionTextRef.current], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      });

      // Pillars animation
      if (pillarsRef.current) {
        const pillars = pillarsRef.current.children;
        
        gsap.set(pillars, {
          y: isMobile ? 40 : 60,
          opacity: 0
        });

        ScrollTrigger.create({
          trigger: pillarsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(pillars, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.2
            });
          }
        });
      }

      // Stats counter animation
      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(statsRef.current.children, {
              y: 30,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1
            });
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 text-white tracking-tight opacity-0"
            >
              Our Vision
            </h2>
            
            <div 
              ref={visionTextRef}
              className="max-w-4xl mx-auto opacity-0"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed mb-8 font-light">
                To be the definitive technology partner that transforms businesses through 
                strategic digital innovation, delivering measurable value and sustainable growth.
              </p>
              
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
            </div>
          </div>

          {/* Vision Pillars */}
          <div 
            ref={pillarsRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-24"
          >
            {visionPillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-500"
              >
                {/* Metric */}
                <div className="text-center mb-6">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {pillar.metric}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {pillar.metricLabel}
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Subtle hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-6">
                Our Mission
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                We empower businesses to thrive in the digital era by delivering innovative, 
                scalable, and secure technology solutions that drive operational efficiency, 
                enhance customer experiences, and accelerate growth.
              </p>
              
              {/* Key Stats */}
              <div 
                ref={statsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">Global</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Reach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;