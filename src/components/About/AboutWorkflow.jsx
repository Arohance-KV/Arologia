import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Monitor, CheckCircle, Rocket } from 'lucide-react';
import CardSwap, { Card } from "../About/Workflowcards";

gsap.registerPlugin(ScrollTrigger);

const WorkflowSection = () => {
  const workflowRef = useRef(null);
  const workflowTitleRef = useRef(null);
  const workflowDescriptionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const workflowSteps = [
    {
      id: 1,
      title: "Discovery & Research",
      description: "We dive deep into understanding your business goals, target audience, and project requirements through comprehensive research and analysis.",
      icon: Search,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-900/20 to-blue-800/20"
    },
    {
      id: 2,
      title: "Design & Prototyping",
      description: "Our creative team crafts stunning visual designs and interactive prototypes that bring your vision to life with pixel-perfect precision.",
      icon: PenTool,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-900/20 to-purple-800/20"
    },
    {
      id: 3,
      title: "Development & Coding",
      description: "Expert developers transform designs into fully functional, responsive websites using cutting-edge technologies and best practices.",
      icon: Monitor,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-900/20 to-green-800/20"
    },
    {
      id: 4,
      title: "Testing & Optimization",
      description: "Rigorous testing across devices and browsers ensures optimal performance, security, and user experience before launch.",
      icon: CheckCircle,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-900/20 to-orange-800/20"
    },
    {
      id: 5,
      title: "Launch & Support",
      description: "We deploy your website with precision and provide ongoing support, maintenance, and updates to ensure continued success.",
      icon: Rocket,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-900/20 to-pink-800/20"
    }
  ];

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

      animateElement(workflowTitleRef, {
        yStart: isMobile ? 60 : 100,
        scale: true,
        duration: isMobile ? 1.0 : 1.4,
        ease: "power3.out"
      });

      if (workflowDescriptionRef.current) {
        gsap.set(workflowDescriptionRef.current, {
          y: isMobile ? 40 : 60,
          opacity: 0
        });

        ScrollTrigger.create({
          trigger: workflowRef.current,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => {
            gsap.to(workflowDescriptionRef.current, {
              y: 0,
              opacity: 1,
              duration: isMobile ? 1.2 : 1.6,
              ease: "power3.out",
              delay: 0.3
            });
          },
          onLeave: () => {
            gsap.to(workflowDescriptionRef.current, {
              y: isMobile ? -25 : -30,
              opacity: 0.8,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            gsap.to(workflowDescriptionRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(workflowDescriptionRef.current, {
              y: isMobile ? 40 : 60,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });
      }
    }, workflowRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={workflowRef} className="sm:pb-16 md:pb-30 lg:pb-50 bg-black h-full">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-16">
          <h2
            ref={workflowTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 tracking-wide text-white opacity-0 relative"
          >
            Our Workflow
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto"></div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="space-y-8">
            <p
              ref={workflowDescriptionRef}
              className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl relative"
            >
              From concept to launch, our proven 5-step process ensures every project is delivered with precision,
              creativity, and technical excellence.
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></span>
            </p>

            <div className="space-y-4 text-gray-300 pl-12">
              <div className="flex items-center space-x-3">
                <span className="text-sm lg:text-base">Comprehensive research and planning phase</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm lg:text-base">Creative design and user experience focus</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm lg:text-base">Cutting-edge development technologies</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm lg:text-base">Rigorous testing and quality assurance</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm lg:text-base">Ongoing support and maintenance</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-[500px] relative">
              <CardSwap
                cardDistance={30}
                verticalDistance={50}
                delay={3000}
                pauseOnHover={true}
              >
                {workflowSteps.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <Card key={step.id}>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full min-h-[450px] flex flex-col justify-center relative overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-500">
                        <div className="text-center relative z-10">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-medium text-white/70 mb-4 border border-white/20">
                            Step {step.id}
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-white leading-tight">
                            {step.title}
                          </h3>
                          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-xs mx-auto">
                            {step.description}
                          </p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                    </Card>
                  );
                })}
              </CardSwap>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden">
          <div className="text-center mb-8 sm:mb-12">
            <p
              ref={workflowDescriptionRef}
              className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto opacity-0"
            >
              From concept to launch, our proven 5-step process ensures every project is delivered with precision,
              creativity, and technical excellence.
            </p>
          </div>

          <div className="text-center mb-8 sm:mb-12">
            <div className="space-y-4 text-gray-300 max-w-sm sm:max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">Comprehensive research and planning phase</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">Creative design and user experience focus</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">Cutting-edge development technologies</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">Rigorous testing and quality assurance</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">Ongoing support and maintenance</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="max-w-sm sm:max-w-md">
              <div className="h-[200px] sm:h-[200px] mb-30 relative">
                <CardSwap
                  cardDistance={isMobile ? 15 : 20}
                  verticalDistance={isMobile ? 30 : 40}
                  delay={3000}
                  pauseOnHover={true}
                >
                  {workflowSteps.map((step) => {
                    const IconComponent = step.icon;
                    return (
                      <Card key={step.id}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 h-full min-h-[380px] sm:min-h-[420px] flex flex-col justify-center relative overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-500">
                          <div className="text-center relative z-10">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/10 rounded-full text-xs font-medium text-white/70 mb-3 border border-white/20">
                              Step {step.id}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-white leading-tight">
                              {step.title}
                            </h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed px-2">
                              {step.description}
                            </p>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;