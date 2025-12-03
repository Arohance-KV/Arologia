import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import Silk from './ui/CaseStudies-HeroBackground';
import CaseStudiesDetailed from './ui/CaseStudies-Detailed';
import { caseStudies } from './ui/CaseStudies-Data';


const CaseStudies = () => {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardsRef = useRef([]);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate(); 

  // Handle navigation to contact us page - UPDATED to scroll to top
  const handleContactNavigation = () => {
    navigate('/ContactUs');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Alternative approach: You can also use this method
  // const handleContactNavigation = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  //   navigate('/ContactUs');
  // };

  // Hero animation
  useEffect(() => {
    if (heroRef.current) {
      const children = Array.from(heroRef.current.children);
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

    // Grid animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'all 0.8s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.case-study-card');
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        observer.observe(card);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle opening case study details
  const openCaseStudy = (study) => {
    setSelectedStudy(study);
    document.body.style.overflow = 'hidden';
  };

  // Handle closing case study details
  const closeDetailedView = () => {
    setSelectedStudy(null);
    document.body.style.overflow = 'auto';
  };

  

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
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
        
        <div className="container mx-auto text-center relative z-20" ref={heroRef}>
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

      {/* Case Studies Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`case-study-card group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  hoveredCard && hoveredCard !== study.id ? 'blur-sm opacity-50' : ''
                }`}
                onClick={() => openCaseStudy(study)}
                onMouseEnter={() => setHoveredCard(study.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Full Image Background */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 bg-white/90 text-black rounded-full font-semibold">
                      {study.type}
                    </span>
                  </div>
                </div>
                
                {/* Overlay Content - Only visible on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 transition-all duration-300 ${
                  hoveredCard === study.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white text-black rounded-lg">
                      {study.icon}
                    </div>
                    <div className="text-sm text-gray-300">
                      {study.industry}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {study.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-3 font-medium">
                    {study.client}
                  </p>
                  
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed line-clamp-2">
                    {study.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {study.year}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {study.team}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Study Modal - Now using separate component */}
      {selectedStudy && (
        <CaseStudiesDetailed 
          selectedStudy={selectedStudy} 
          onClose={closeDetailedView} 
        />
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-3xl mx-auto px-4">
            Partner with <span className="font-semibold text-white">Arohance Tech Team</span> to transform your digital presence and drive exceptional results
          </p>
          <button 
            onClick={handleContactNavigation}
            className="bg-white text-black hover:bg-gray-200 px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Project Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;