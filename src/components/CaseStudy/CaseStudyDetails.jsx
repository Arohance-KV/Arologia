import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const CaseStudiesDetailed = ({ selectedStudy, onClose }) => {
  const [hoveredPreview, setHoveredPreview] = useState(null);
  const previewsRef = useRef(null);

  // Handle keyboard navigation and browser back button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'Backspace') {
        onClose();
      }
    };

    // Handle browser back button
    const handlePopState = (e) => {
      onClose();
    };

    // Add a history state when the modal opens
    if (selectedStudy) {
      window.history.pushState({ modal: 'case-study-detail' }, '');
    }

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose, selectedStudy]);

  // Handle modal closing
  const handleClose = () => {
    // Remove the history state we added
    if (window.history.state && window.history.state.modal === 'case-study-detail') {
      window.history.back();
    } else {
      onClose();
    }
  };

  // Handle universal scrolling for previews (desktop only)
  useEffect(() => {
    if (!selectedStudy || !previewsRef.current) return;
    
    // Only apply custom scrolling on desktop
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const container = previewsRef.current;
      const scrollAmount = e.deltaY;
      container.scrollTop += scrollAmount;
    };

    const detailModal = document.querySelector('.detail-modal');
    if (detailModal) {
      detailModal.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (detailModal) {
        detailModal.removeEventListener('wheel', handleWheel);
      }
    };
  }, [selectedStudy]);

  // Render mixed preview layout with random mobile placement
  const renderMixedPreviews = (images) => {
    const desktopImages = images.filter(img => img.type === 'desktop');
    const mobileImages = images.filter(img => img.type === 'mobile');
    const result = [];
    
    let desktopIndex = 0;
    let mobileIndex = 0;
    
    // Create a mixed layout pattern - randomly insert mobile pairs between desktop images
    while (desktopIndex < desktopImages.length || mobileIndex < mobileImages.length) {
      // Add 1-2 desktop images
      const desktopCount = Math.min(Math.floor(Math.random() * 2) + 1, desktopImages.length - desktopIndex);
      for (let i = 0; i < desktopCount; i++) {
        const image = desktopImages[desktopIndex];
        result.push(
          <div key={`desktop-${desktopIndex}`} className="group relative mb-8">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onMouseEnter={() => setHoveredPreview(`desktop-${desktopIndex}`)}
                onMouseLeave={() => setHoveredPreview(null)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Desktop preview overlay */}
              <div className={`absolute inset-0 flex items-end p-6 transition-all duration-300 ${
                hoveredPreview === `desktop-${desktopIndex}` ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 w-full">
                  <h4 className="text-lg font-semibold text-white mb-2">{image.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
        desktopIndex++;
      }
      
      // Add mobile pair if available
      if (mobileIndex < mobileImages.length) {
        const img1 = mobileImages[mobileIndex];
        const img2 = mobileImages[mobileIndex + 1];
        
        result.push(
          <div key={`mobile-pair-${mobileIndex}`} className="flex gap-4 mb-8">
            <div className="flex-1 group relative">
              <div className="relative overflow-hidden rounded-xl aspect-[9/16] max-w-xs mx-auto">
                <img
                  src={img1.image}
                  alt={img1.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onMouseEnter={() => setHoveredPreview(`${img1.title}-${mobileIndex}`)}
                  onMouseLeave={() => setHoveredPreview(null)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Mobile preview overlay */}
                <div className={`absolute inset-0 flex items-end p-4 transition-all duration-300 ${
                  hoveredPreview === `${img1.title}-${mobileIndex}` ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 w-full">
                    <h4 className="text-sm font-semibold text-white mb-1">{img1.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{img1.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {img2 && (
              <div className="flex-1 group relative">
                <div className="relative overflow-hidden rounded-xl aspect-[9/16] max-w-xs mx-auto">
                  <img
                    src={img2.image}
                    alt={img2.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onMouseEnter={() => setHoveredPreview(`${img2.title}-${mobileIndex + 1}`)}
                    onMouseLeave={() => setHoveredPreview(null)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Mobile preview overlay */}
                  <div className={`absolute inset-0 flex items-end p-4 transition-all duration-300 ${
                    hoveredPreview === `${img2.title}-${mobileIndex + 1}` ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 w-full">
                      <h4 className="text-sm font-semibold text-white mb-1">{img2.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{img2.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
        mobileIndex += 2;
      }
    }
    
    return result;
  };

  if (!selectedStudy) return null;

  return (
    <div className="detail-modal fixed inset-0 bg-black z-50 overflow-auto lg:overflow-hidden">
      {/* Close Button - Enhanced with multiple exit hints */}
      <button
        onClick={handleClose}
        className="fixed top-6 left-6 z-30 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors backdrop-blur-sm group"
        title="Close (ESC, ←, or browser back)"
      >
        <X className="w-6 h-6" />
        
      </button>

      {/* Mobile Layout - Stacked vertically */}
      <div className="lg:hidden">
        <div className="min-h-screen p-4 pt-20">
          {/* Info Card First */}
          <div className="mb-8">
            <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl p-6 relative">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight mb-2">
                    {selectedStudy.title}
                  </h1>
                  
                  {/* Industry & Type */}
                  <div className="text-gray-600 text-base">
                    {selectedStudy.industry} — {selectedStudy.type}
                  </div>
                </div>

                {/* Service Tags */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.services.slice(0, 5).map((service, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-full font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Section */}
                <div>
                  <h3 className="text-lg font-bold mb-3 text-black">Client</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedStudy.overview}
                  </p>
                </div>

                {/* Process Section */}
                <div>
                  <h3 className="text-lg font-bold mb-3 text-black">Process</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedStudy.solution}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="text-center p-4 bg-orange-500 text-white rounded-lg">
                    <div className="text-lg font-bold">{selectedStudy.duration}</div>
                    <div className="text-orange-100 text-xs">of collaboration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 text-white rounded-lg">
                    <div className="text-lg font-bold">{selectedStudy.technologies.length}+</div>
                    <div className="text-gray-300 text-xs">technologies used</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 text-white rounded-lg">
                    <div className="text-lg font-bold">{selectedStudy.projectImages.length}</div>
                    <div className="text-gray-300 text-xs">project deliverables</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Images After Info */}
          <div className="space-y-8">
            {renderMixedPreviews(selectedStudy.projectImages)}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden lg:flex h-screen">
        {/* Left Column - Card Style Info */}
        <div className="w-1/2 p-4 lg:p-6 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl p-6 lg:p-8 relative">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-2">
                  {selectedStudy.title}
                </h1>
                
                {/* Industry & Type */}
                <div className="text-gray-600 text-base lg:text-lg">
                  {selectedStudy.industry} — {selectedStudy.type}
                </div>
              </div>

              {/* Service Tags */}
              <div>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.services.slice(0, 5).map((service, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-full font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Section */}
              <div>
                <h3 className="text-lg lg:text-xl font-bold mb-3 text-black">Client</h3>
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  {selectedStudy.overview}
                </p>
              </div>

              {/* Process Section */}
              <div>
                <h3 className="text-lg lg:text-xl font-bold mb-3 text-black">Process</h3>
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  {selectedStudy.solution}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="text-center p-4 bg-orange-500 text-white rounded-lg">
                  <div className="text-lg lg:text-xl font-bold">{selectedStudy.duration}</div>
                  <div className="text-orange-100 text-xs lg:text-sm">of collaboration</div>
                </div>
                <div className="text-center p-4 bg-gray-800 text-white rounded-lg">
                  <div className="text-lg lg:text-xl font-bold">{selectedStudy.technologies.length}+</div>
                  <div className="text-gray-300 text-xs lg:text-sm">technologies used</div>
                </div>
                <div className="text-center p-4 bg-gray-800 text-white rounded-lg">
                  <div className="text-lg lg:text-xl font-bold">{selectedStudy.projectImages.length}</div>
                  <div className="text-gray-300 text-xs lg:text-sm">project deliverables</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Scrollable Project Images (Desktop Only) */}
        <div className="w-1/2 h-screen overflow-y-auto bg-black scrollbar-hide" 
             ref={previewsRef}
             style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="p-8">
            <div className="space-y-8">
              {/* Mixed layout with random mobile placement */}
              {renderMixedPreviews(selectedStudy.projectImages)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesDetailed;