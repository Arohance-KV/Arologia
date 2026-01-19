import React, { useState, useRef } from 'react';
import { faqCategories, createFlattenedQuestions } from '../../utils/faqData';
import { useFAQAnimations, useFAQScrollTracking, navigateToCategory } from '../../hooks/useFAQLogic';
import {
  FAQTitle,
  MobileCategories,
  DesktopCategories,
  FAQQuestions
} from '../Home/FAQComponents';

function HomeFAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  
  // Refs for animations and scroll tracking
  const faqSectionRef = useRef(null);
  const faqTitleRef = useRef(null);
  const faqItemsRef = useRef([]);
  const categoriesRef = useRef([]);
  const questionsContainerRef = useRef(null);

  // Create flattened questions from categories
  const allQuestions = createFlattenedQuestions(faqCategories);

  // Custom hooks for animations and scroll tracking
  useFAQAnimations(faqTitleRef, categoriesRef, faqItemsRef, questionsContainerRef);
  useFAQScrollTracking(
    allQuestions,
    faqItemsRef,
    categoriesRef,
    questionsContainerRef,
    activeCategory,
    setActiveCategory
  );

  const toggleFAQ = (globalIndex) => {
    setOpenFAQ(openFAQ === globalIndex ? null : globalIndex);
  };

  const handleNavigateToCategory = (categoryId) => {
    navigateToCategory(categoryId, allQuestions, faqItemsRef);
  };

  return (
    <section ref={faqSectionRef} className="relative z-20 py-20 md:py-24 lg:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* FAQ Title */}
        <FAQTitle faqTitleRef={faqTitleRef} />

        {/* Mobile Categories Navigation */}
        <MobileCategories 
          faqCategories={faqCategories}
          activeCategory={activeCategory}
          navigateToCategory={handleNavigateToCategory}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Categories (Hidden on mobile) */}
          <DesktopCategories 
            faqCategories={faqCategories}
            activeCategory={activeCategory}
            navigateToCategory={handleNavigateToCategory}
            categoriesRef={categoriesRef}
          />

          {/* Right Column - Questions */}
          <FAQQuestions 
            allQuestions={allQuestions}
            openFAQ={openFAQ}
            toggleFAQ={toggleFAQ}
            faqItemsRef={faqItemsRef}
            questionsContainerRef={questionsContainerRef}
          />
        </div>
      </div>

      <style>{`
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        .animate-scale-x {
          animation: scale-x 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
</style>
</section>
  );
}

export default HomeFAQs;