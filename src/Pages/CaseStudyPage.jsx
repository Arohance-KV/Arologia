import React, { useState, useRef } from 'react';
import CaseStudyHero from "../components/CaseStudy/CaseStudyHero";
import CaseStudyGrid from "../components/CaseStudy/CaseStudyGrid";
import CaseStudyDetails from "../components/CaseStudy/CaseStudyDetails";
import CaseStudyCTA from "../components/CaseStudy/CaseStudyCTA";

const CaseStudies = () => {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const heroRef = useRef(null);

  const openCaseStudy = (study) => {
    setSelectedStudy(study);
    document.body.style.overflow = 'hidden';
  };

  const closeDetailedView = () => {
    setSelectedStudy(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <CaseStudyHero ref={heroRef} />

      {/* Case Studies Grid */}
      <CaseStudyGrid onSelectStudy={openCaseStudy} />

      {/* Detailed Case Study Modal */}
      {selectedStudy && (
        <CaseStudyDetails 
          selectedStudy={selectedStudy} 
          onClose={closeDetailedView} 
        />
      )}

      {/* CTA Section */}
      <CaseStudyCTA />
    </div>
  );
};

export default CaseStudies;