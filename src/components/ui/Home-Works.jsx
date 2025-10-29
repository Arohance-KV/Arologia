import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import MedalImg from '/Medal-Investments.png';
import caroalImg from '/caroal.png';

// Works data with titles, descriptions, and multiple website previews
const worksData = [
  {
    id: 1,
    title: "Medal Investments",
    description: "A comprehensive investment platform designed to help users make informed financial decisions with advanced analytics and portfolio management tools.",
    websitePreviews: [
      MedalImg,
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    websiteUrl: "https://medalinvestments.com",
    bgGradient: "from-gray-900 via-gray-800 to-black"
  },
  {
    id: 2,
    title: "CAROAL",
    description: "An innovative automotive marketplace connecting buyers and sellers with AI-powered recommendations and seamless transaction experiences.",
    websitePreviews: [
      caroalImg,
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    websiteUrl: "https://caroal.com",
    bgGradient: "from-amber-600 via-orange-500 to-yellow-400"
  },
  {
    id: 3,
    title: "TUK-TUK",
    description: "A modern ride-sharing application focused on urban mobility solutions with real-time tracking and sustainable transportation options.",
    websitePreviews: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1558618666-fbd62c73cd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    websiteUrl: "https://tuktuk.com",
    bgGradient: "from-blue-900 via-blue-700 to-blue-500"
  },
  {
    id: 4,
    title: "ROVERA",
    description: "A cutting-edge e-commerce platform with personalized shopping experiences powered by machine learning and advanced recommendation algorithms.",
    websitePreviews: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2040&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    websiteUrl: "https://rovera.com",
    bgGradient: "from-amber-800 via-amber-600 to-yellow-500"
  },
  {
    id: 5,
    title: "Kuch Bhi",
    description: "A versatile digital solution platform offering custom web applications, mobile apps, and digital transformation services for businesses.",
    websitePreviews: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    websiteUrl: "https://kuchbhi.com",
    bgGradient: "from-indigo-900 via-purple-700 to-blue-600"
  }
];

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 1, 0.7] : [0.8, 1, 0.8];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const rotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -5, 0, 5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <div
      className="h-[150vh] flex items-center justify-center relative p-0 overflow-hidden"
      ref={containerRef}
    >
      <div
        className="w-full h-full relative top-0"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} opacity={opacity} />
        <Card 
          rotate={rotate}
          rotateY={rotateY}
          translate={translate}
          scale={scale}
          opacity={opacity}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent, opacity }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity
      }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, rotateY, scale, translate, opacity, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        rotateY: rotateY,
        scale,
        translateY: translate,
        opacity: opacity,
        boxShadow:
          "0 0 #0000004d, 0 3px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="w-full h-full border-0 rounded-sm overflow-hidden"
    >
      <div className="h-full w-full overflow-hidden rounded-sm bg-gray-100 dark:bg-zinc-900 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

// Enhanced WorkCard component with seamless infinite smooth scrolling
export const WorkCard = ({ work }) => {
  const containerRef = useRef(null);
  const parentDivRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.5)');
  const animationFrameRef = useRef(null);
  const leftScrollRef = useRef(0);
  const rightScrollRef = useRef(0);
  const observerRef = useRef(null);

  // Function to extract dominant color from gradient and convert to shadow color
  const extractShadowColorFromGradient = (gradientClass) => {
    // Map Tailwind gradient classes to their corresponding shadow colors
    const gradientToShadowMap = {
      // Gray gradients
      'from-gray-900': 'rgba(107, 114, 128, 0.5)',
      'from-gray-800': 'rgba(107, 114, 128, 0.5)',
      'from-gray-700': 'rgba(107, 114, 128, 0.5)',
      
      // Amber/Orange gradients
      'from-amber-600': 'rgba(245, 158, 11, 0.5)',
      'from-amber-800': 'rgba(217, 119, 6, 0.5)',
      'from-orange-500': 'rgba(249, 115, 22, 0.5)',
      
      // Blue gradients
      'from-blue-900': 'rgba(59, 130, 246, 0.5)',
      'from-blue-800': 'rgba(59, 130, 246, 0.5)',
      'from-blue-700': 'rgba(59, 130, 246, 0.5)',
      'from-blue-600': 'rgba(59, 130, 246, 0.5)',
      'from-blue-500': 'rgba(59, 130, 246, 0.5)',
      
      // Indigo/Purple gradients
      'from-indigo-900': 'rgba(99, 102, 241, 0.5)',
      'from-purple-700': 'rgba(147, 51, 234, 0.5)',
      
      // Yellow gradients
      'from-yellow-400': 'rgba(251, 191, 36, 0.5)',
      'from-yellow-500': 'rgba(251, 191, 36, 0.5)',
    };

    // Extract the first color class from the gradient
    const gradientClasses = gradientClass.split(' ');
    const fromClass = gradientClasses.find(cls => cls.startsWith('from-'));
    
    return gradientToShadowMap[fromClass] || 'rgba(0, 0, 0, 0.5)';
  };

  // Extract shadow color from gradient on component mount
  useEffect(() => {
    const extractedShadowColor = extractShadowColorFromGradient(work.bgGradient);
    setShadowColor(extractedShadowColor);
  }, [work.bgGradient]);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Seamless infinite scrolling animation
  useEffect(() => {
    if (!isVisible || isHovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const scrollSpeed = 0.4; // Smooth scrolling speed
    const imageHeight = 280; // Fixed image height
    const gap = 24; // Consistent gap between images (24px = 1.5rem)
    const itemHeight = imageHeight + gap;

    const animate = () => {
      if (isHovered || !isVisible) return;

      const leftColumn = leftColumnRef.current;
      const rightColumn = rightColumnRef.current;
      
      if (!leftColumn || !rightColumn) return;

      // Update scroll positions
      leftScrollRef.current += scrollSpeed;
      rightScrollRef.current += scrollSpeed;

      // Calculate total content height for one set of images
      const leftImages = Math.ceil(work.websitePreviews.length / 2);
      const rightImages = Math.floor(work.websitePreviews.length / 2);
      const leftContentHeight = leftImages * itemHeight;
      const rightContentHeight = rightImages * itemHeight;

      // Reset scroll position seamlessly when we've scrolled one full set
      if (leftScrollRef.current >= leftContentHeight) {
        leftScrollRef.current = leftScrollRef.current - leftContentHeight;
      }
      if (rightScrollRef.current >= rightContentHeight) {
        rightScrollRef.current = rightScrollRef.current - rightContentHeight;
      }

      // Apply transforms with consistent movement
      leftColumn.style.transform = `translateY(-${leftScrollRef.current}px)`;
      rightColumn.style.transform = `translateY(-${rightScrollRef.current}px)`;

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a brief delay
    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, isHovered, work.websitePreviews.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Create seamless infinite content with enough repetitions
  const createInfiniteContent = () => {
    const leftColumnImages = work.websitePreviews.filter((_, index) => index % 2 === 0);
    const rightColumnImages = work.websitePreviews.filter((_, index) => index % 2 === 1);
    
    // Create enough repetitions to fill the viewport and provide seamless scrolling
    const repeatCount = 8; // More repetitions for smoother infinite effect
    return {
      left: Array(repeatCount).fill(leftColumnImages).flat(),
      right: Array(repeatCount).fill(rightColumnImages).flat()
    };
  };

  const { left: leftImages, right: rightImages } = createInfiniteContent();

  return (
    <div 
      ref={parentDivRef}
      className={`w-full h-full bg-gradient-to-br ${work.bgGradient} flex items-center justify-center p-8 lg:p-12`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 w-full max-w-7xl mx-auto items-center">
        {/* Left side - Content (2 columns) */}
        <div className="lg:col-span-2 space-y-6 text-white">
          <>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
              {work.title}
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl text-gray-200 leading-relaxed mb-6">
              {work.description}
            </p>
            {/* Visit Website Button */}
            <div className="pt-4">
              <a
                href={work.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-sm hover:bg-gray-100 transition-colors duration-300 group"
              >
                Visit Website
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </>
        </div>
        
        {/* Right side - Seamless Infinite Smooth Scrolling Website Previews (3 columns) */}
        <div className="lg:col-span-3 relative">
          <div className="relative bg-transparent rounded-sm overflow-hidden">
            <div 
              ref={containerRef}
              className="h-[500px] lg:h-[500px] overflow-hidden relative cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Seamless infinite scrolling content */}
              <div className="grid grid-cols-2 gap-6 p-2 relative h-full">
                {/* Left Column */}
                <div 
                  ref={leftColumnRef}
                  className="flex flex-col"
                  style={{
                    willChange: 'transform',
                    transition: isHovered ? 'transform 0.3s ease-out' : 'none'
                  }}
                >
                  {leftImages.map((preview, index) => (
                    <div 
                      key={`left-${index}`}
                      className="relative overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105"
                      style={{ 
                        marginBottom: '24px', // Consistent 24px gap
                        boxShadow: `0 10px 30px ${shadowColor}, 0 20px 60px ${shadowColor.replace('0.5', '0.3')}`
                      }}
                    >
                      <img
                        src={preview}
                        alt={`${work.title} preview ${index + 1}`}
                        className="w-full object-cover"
                        style={{ height: '280px' }} // Fixed height
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Subtle overlay for better visual appeal */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Offset for staggered effect */}
                <div 
                  ref={rightColumnRef}
                  className="flex flex-col" 
                  style={{ 
                    marginTop: '60px', // Offset for staggered effect
                    willChange: 'transform',
                    transition: isHovered ? 'transform 0.3s ease-out' : 'none'
                  }}
                >
                  {rightImages.map((preview, index) => (
                    <div 
                      key={`right-${index}`}
                      className="relative overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105"
                      style={{ 
                        marginBottom: '24px', // Consistent 24px gap
                        boxShadow: `0 10px 30px ${shadowColor}, 0 20px 60px ${shadowColor.replace('0.5', '0.3')}`
                      }}
                    >
                      <img
                        src={preview}
                        alt={`${work.title} preview ${index + 1}`}
                        className="w-full object-cover"
                        style={{ height: '280px' }} // Fixed height
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Subtle overlay for better visual appeal */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced gradient overlays for smooth visual transitions */}
            <div 
              className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to bottom, ${shadowColor.replace('0.5', '0.8')} 0%, ${shadowColor.replace('0.5', '0.4')} 50%, transparent 100%)`
              }}
            ></div>
            <div 
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to top, ${shadowColor.replace('0.5', '0.8')} 0%, ${shadowColor.replace('0.5', '0.4')} 50%, transparent 100%)`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Works Section Component
export const WorksSection = () => {
  return (
    <section className="bg-black text-white relative z-20">
      <div className="flex justify-center lg:py-15 md:py-7 sm:py-4">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide">WORKS</h2>
      </div>

      <div className="relative">
        {worksData.map((work) => (
          <ContainerScroll
            key={work.id}
          >
            <WorkCard work={work} />
          </ContainerScroll>
        ))}
      </div>
    </section>
  );
};