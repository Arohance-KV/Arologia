import React from 'react';
import { useNavigate } from 'react-router-dom';

const CaseStudyCTA = () => {
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    navigate('/ContactUs');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
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
  );
};

export default CaseStudyCTA;