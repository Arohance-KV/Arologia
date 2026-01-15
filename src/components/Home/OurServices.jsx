import React, { useEffect, useRef, useState } from 'react';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      title: "Website Development",
      duration: "20 DAYs",
      description: "Modern, responsive websites for businesses and e-commerce platforms.",
      baseColor: "bg-gray-200",
      textColor: "text-gray-800"
    },
    {
      title: "Web Applications", 
      duration: "40 DAYS",
      description: "Interactive web applications, dashboards, and management systems.",
      baseColor: "bg-gray-200",
      textColor: "text-gray-800"
    },
    {
      title: "Mobile Applications",
      duration: "40+ DAYS", 
      description: "Native and cross-platform mobile apps for iOS and Android devices.",
      baseColor: "bg-gray-200",
      textColor: "text-gray-800"
    },
    {
      title: "Desktop Applications",
      duration: "50+ DAYS",
      description: "Desktop software for Windows, Mac, and Linux with full system access.",
      baseColor: "bg-gray-200", 
      textColor: "text-gray-800"
    }
  ];

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    // Title animation
    if (titleRef.current) {
      titleRef.current.style.transform = 'translateY(100px)';
      titleRef.current.style.opacity = '0';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(titleRef.current);
    }

    // Mobile horizontal scroll animation
    if (isMobile) {
      // Set initial states for mobile cards - ALL cards should be 96% width
      cardRefs.current.forEach((card, index) => {
        if (card) {
          card.style.width = '96%';
          card.style.minWidth = '96%';
          card.style.maxWidth = '96%';
          card.style.flexShrink = '0';
          card.style.opacity = '1';
          card.style.visibility = 'visible';
          card.style.transform = 'translateX(0)';
          card.style.height = '60vh';
          card.style.minHeight = '60vh';
          card.style.maxHeight = '60vh';
          card.style.overflow = 'hidden';
          card.style.transition = 'none'; // Remove width transition for mobile
          card.className = card.className.replace(/bg-\w+-\d+/g, '').replace(/  +/g, ' ').trim() + ` ${services[index].baseColor}`;
        }
      });

      let ticking = false;

      const handleScrollMobile = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress
            const scrollStart = -rect.top;
            const scrollEnd = sectionHeight - windowHeight;
            const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
            
            // Calculate total width needed to scroll through all cards
            const containerWidth = cardsContainerRef.current.offsetWidth;
            const cardWidth = containerWidth * 0.96;
            const gap = containerWidth * 0.04;
            const totalCardsWidth = (cardWidth * services.length) + (gap * (services.length - 1));
            const maxScroll = totalCardsWidth - containerWidth;
            
            // Calculate horizontal translation based on scroll progress
            const translateX = -(progress * maxScroll);
            
            // Apply transform to container
            cardsContainerRef.current.style.transform = `translateX(${translateX}px)`;
            cardsContainerRef.current.style.transition = 'none';
            
            ticking = false;
          });
          ticking = true;
        }
      };

      const observerMobile = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScrollMobile);
            handleScrollMobile();
          } else {
            window.removeEventListener('scroll', handleScrollMobile);
          }
        });
      }, { threshold: 0.1 });

      observerMobile.observe(sectionRef.current);

      return () => {
        window.removeEventListener('scroll', handleScrollMobile);
      };
    } 
    // Desktop animation (original behavior)
    else {
      // Reset container transform for desktop
      if (cardsContainerRef.current) {
        cardsContainerRef.current.style.transform = 'translateX(0)';
      }

      // Set initial states for cards - all positioned side by side but only first visible
      cardRefs.current.forEach((card, index) => {
        if (card) {
          // Remove mobile-specific constraints
          card.style.minWidth = 'auto';
          card.style.maxWidth = 'none';
          
          // All cards are positioned but with different widths
          if (index === 0) {
            card.style.width = '100%';
            card.className = card.className.replace(/bg-\w+-\d+/g, '').replace(/  +/g, ' ').trim() + ` ${services[index].baseColor}`;
          } else {
            card.style.width = '0%';
            card.className = card.className.replace(/bg-\w+-\d+/g, '').replace(/  +/g, ' ').trim() + ` bg-gray-200`;
          }
          
          card.style.opacity = '1';
          card.style.visibility = 'visible';
          card.style.transform = 'translateX(0)';
          card.style.transition = 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
          card.style.height = '60vh';
          card.style.minHeight = '60vh';
          card.style.maxHeight = '60vh';
          card.style.overflow = 'hidden';
          card.style.flexShrink = '0';
        }
      });

      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            
            const scrollStart = -rect.top;
            const scrollEnd = sectionHeight - windowHeight;
            const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
            
            const totalCards = services.length;
            const phaseProgress = progress * (totalCards - 1);
            
            const gapCompensation = 3;
            const finalWidth = (100 - gapCompensation) / 4;
            
            cardRefs.current.forEach((card, index) => {
              if (!card) return;
              
              let cardWidth;
              let shouldShowColor = false;
              
              if (index === 0) {
                if (phaseProgress <= 1) {
                  cardWidth = 100 - (52 * phaseProgress);
                  shouldShowColor = true;
                } else if (phaseProgress <= 2) {
                  const localProgress = phaseProgress - 1;
                  cardWidth = 48 - (17 * localProgress);
                  shouldShowColor = localProgress < 0.5;
                } else {
                  const localProgress = phaseProgress - 2;
                  cardWidth = 31 - (31 - finalWidth) * localProgress;
                  shouldShowColor = localProgress < 0.5;
                }
              } else if (index === 1) {
                if (phaseProgress <= 1) {
                  cardWidth = 48 * phaseProgress;
                  shouldShowColor = phaseProgress > 0.3;
                } else if (phaseProgress <= 2) {
                  const localProgress = phaseProgress - 1;
                  cardWidth = 48 - (17 * localProgress);
                  shouldShowColor = localProgress < 0.5;
                } else {
                  const localProgress = phaseProgress - 2;
                  cardWidth = 31 - (31 - finalWidth) * localProgress;
                  shouldShowColor = localProgress < 0.5;
                }
              } else if (index === 2) {
                if (phaseProgress <= 1) {
                  cardWidth = 0;
                } else if (phaseProgress <= 2) {
                  const localProgress = phaseProgress - 1;
                  cardWidth = 31 * localProgress;
                  shouldShowColor = localProgress > 0.3;
                } else {
                  const localProgress = phaseProgress - 2;
                  cardWidth = 31 - (31 - finalWidth) * localProgress;
                  shouldShowColor = localProgress < 0.5;
                }
              } else if (index === 3) {
                if (phaseProgress <= 2) {
                  cardWidth = 0;
                } else {
                  const localProgress = phaseProgress - 2;
                  cardWidth = finalWidth * localProgress;
                  shouldShowColor = localProgress > 0.3;
                }
              }
              
              card.style.width = `${Math.max(0, cardWidth)}%`;
              
              if (shouldShowColor) {
                card.className = card.className.replace(/bg-\w+-\d+/g, '').replace(/  +/g, ' ').trim() + ` ${services[index].baseColor}`;
              } else {
                card.className = card.className.replace(/bg-\w+-\d+/g, '').replace(/  +/g, ' ').trim() + ` bg-gray-200`;
              }
            });
            
            ticking = false;
          });
          ticking = true;
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
          } else {
            window.removeEventListener('scroll', handleScroll);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(sectionRef.current);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="bg-black text-white relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-20 flex-1 flex flex-col">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 text-white tracking-tight opacity-0"
            >
              What We Provide
            </h2>
          </div>

          {/* Cards Container */}
          <div 
            className="relative flex-1 w-full overflow-hidden"
            style={{ minHeight: '60vh' }}
          >
            <div
              ref={cardsContainerRef}
              className={`flex h-full`}
              style={{ 
                gap: isMobile ? '4%' : '1rem',
                transition: 'none',
                willChange: isMobile ? 'transform' : 'auto'
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${service.textColor} flex flex-col justify-between p-6 md:p-8 lg:p-10 bg-gray-200 rounded-2xl`}
                  style={{ 
                    width: isMobile ? '96%' : '0%',
                    minWidth: isMobile ? '96%' : 'auto',
                    maxWidth: isMobile ? '96%' : 'none',
                    height: '60vh',
                    minHeight: '60vh',
                    maxHeight: '60vh',
                    overflow: 'hidden',
                    flexShrink: 0,
                    transition: isMobile ? 'none' : 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight flex-1 min-w-0">
                      {service.title}
                    </h3>
                    <span className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full text-sm md:text-base font-medium whitespace-nowrap flex-shrink-0">
                      {service.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-start pt-8">
                    <div className="space-y-2 md:space-y-3 w-full">
                      {service.description.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className="text-sm md:text-base lg:text-lg xl:text-xl font-medium tracking-wide opacity-90">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom spacer */}
                  <div className="h-6"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional subtitle */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
              Delivering cutting-edge technology solutions with precision, scalability, and innovation at the core of everything we build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
