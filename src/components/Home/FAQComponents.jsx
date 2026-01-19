import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export const FAQTitle = ({ faqTitleRef }) => (
  <div className="text-center mb-16">
    <h2 
      ref={faqTitleRef}
      className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide text-white relative"
    >
      FAQ
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white rounded-full"></div>
    </h2>
    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
      Got questions? We've got answers. Here are some of the most frequently asked questions about our services.
    </p>
  </div>
);

export const MobileCategories = ({ faqCategories, activeCategory, navigateToCategory }) => (
  <div className="lg:hidden mb-8">
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {faqCategories.map((category, index) => (
        <button
          key={category.id}
          onClick={() => navigateToCategory(category.id)}
          className={`flex-shrink-0 px-6 py-3 rounded-sm transition-all duration-300 whitespace-nowrap ${
            activeCategory === category.id
              ? 'bg-white text-black font-semibold'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/50'
          }`}
        >
          <span className="text-sm font-medium">0{index + 1}</span>
          <span className="ml-2 text-base">{category.name}</span>
        </button>
      ))}
    </div>
  </div>
);

export const DesktopCategories = ({ 
  faqCategories, 
  activeCategory, 
  navigateToCategory,
  categoriesRef 
}) => (
  <div className="hidden lg:block lg:col-span-3">
    <div className="sticky top-24 space-y-8">
      {faqCategories.map((category, index) => (
        <div
          key={category.id}
          ref={(el) => (categoriesRef.current[index] = el)}
          className={`transition-all duration-700 transform cursor-pointer ${
            activeCategory === category.id
              ? 'text-white scale-105'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => navigateToCategory(category.id)}
        >
          <div className="flex items-center space-x-4 ">
            <span className={`text-3xl font-medium transition-all duration-500 ${
              activeCategory === category.id ? 'text-white' : 'text-gray-600'
            }`}>
              0{index + 1}
            </span>
            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-500 ${
              activeCategory === category.id 
                ? 'text-white font-normal' 
                : 'text-gray-400 hover:text-gray-300'
            }`}>
              {category.name}
            </h3>
          </div>
          <div className={`mt-3 h-1 bg-white rounded-full transition-all duration-500 ${
            activeCategory === category.id 
              ? 'opacity-100 transform scale-x-100' 
              : 'opacity-0 transform scale-x-0'
          } origin-left`}></div>
        </div>
      ))}
    </div>
  </div>
);

export const FAQItem = ({ faq, openFAQ, toggleFAQ, faqItemsRef, index }) => (
  <div
    key={faq.globalIndex}
    ref={(el) => (faqItemsRef.current[index] = el)}
    data-category={faq.categoryId}
    className="group bg-gray-800/30 backdrop-blur-sm rounded-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:bg-gray-800/50"
  >
    <button
      onClick={() => toggleFAQ(faq.globalIndex)}
      className="w-full px-6 md:px-8 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-sm"
    >
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white group-hover:text-purple-50 transition-colors duration-300 pr-4 leading-relaxed">
        {faq.question}
      </h3>
      <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border-2 ${
        openFAQ === faq.globalIndex 
          ? 'bg-white border-transparent' 
          : 'border-gray-600 group-hover:border-white'
      }`}>
        {openFAQ === faq.globalIndex ? (
          <FaMinus className="text-black text-sm" />
        ) : (
          <FaPlus className="text-white text-sm group-hover:text-purple-300" />
        )}
      </div>
    </button>
    
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
      openFAQ === faq.globalIndex ? 'max-h-96 pb-6' : 'max-h-0'
    }`}>
      <div className="px-6 md:px-8 pb-2">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed animate-fade-in">
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

export const FAQQuestions = ({ allQuestions, openFAQ, toggleFAQ, faqItemsRef, questionsContainerRef }) => (
  <div className="lg:col-span-9" ref={questionsContainerRef}>
    <div className="space-y-6">
      {allQuestions.map((faq, index) => (
        <FAQItem
          key={faq.globalIndex}
          faq={faq}
          openFAQ={openFAQ}
          toggleFAQ={toggleFAQ}
          faqItemsRef={faqItemsRef}
          index={index}
        />
      ))}
    </div>
  </div>
);