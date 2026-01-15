import React, { useEffect, forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Silk from './CaseStudyHeroBackground';

const CaseStudyHero = forwardRef((props, ref) => {
  useEffect(() => {
    if (ref.current) {
      const children = Array.from(ref.current.children);
      children.forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(100px)';
        
        setTimeout(() => {
          child.style.transition = 'all 1.2s ease-out';
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
  }, [ref]);

  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Silk Background Animation */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#1e3a8a"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10"></div>
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-20" ref={ref}>
        <div className="mb-6 md:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 bg-white bg-clip-text text-transparent">
            Case Studies
          </h1>
        </div>
        <div className="mb-6 md:mb-8">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Discover how <span className="font-semibold text-white">Arohance Tech Team</span> transforms businesses through innovative digital solutions
          </p>
        </div>
        <div className="mb-8 md:mb-12">
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            From e-commerce platforms to mobile applications, explore our portfolio of success stories
          </p>
        </div>
        <div className="animate-bounce">
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto rotate-90 text-gray-400" />
        </div>
      </div>
    </section>
  );
});

CaseStudyHero.displayName = 'CaseStudyHero';

export default CaseStudyHero;