import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, ExternalLink } from 'lucide-react';
import { caseStudies } from './CaseStudyData';

const CaseStudyGrid = ({ onSelectStudy }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
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

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className={`case-study-card group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                hoveredCard && hoveredCard !== study.id ? 'blur-sm opacity-50' : ''
              }`}
              onClick={() => onSelectStudy(study)}
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
  );
};

export default CaseStudyGrid;