import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function HomeFAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  
  // Refs for animations and scroll tracking
  const faqSectionRef = useRef(null);
  const faqTitleRef = useRef(null);
  const faqItemsRef = useRef([]);
  const categoriesRef = useRef([]);
  const questionsContainerRef = useRef(null);

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: 0,
      name: "Product",
      questions: [
        {
          question: "What services does Arohance Tech offer?",
          answer: "We specialize in creating stunning, functional websites for businesses across different industries. Our services include web development, UI/UX design, mobile app development, and digital marketing solutions."
        },
        {
          question: "What technologies do you use?",
          answer: "We use cutting-edge technologies including React, Next.js, Node.js, Python, and various cloud platforms. Our tech stack is chosen based on project requirements to ensure optimal performance and scalability."
        },
        {
          question: "How do you ensure project quality?",
          answer: "We follow industry best practices including rigorous testing, code reviews, and iterative feedback cycles. Our team maintains high standards throughout the development process to deliver exceptional results."
        }
      ]
    },
    {
      id: 1,
      name: "Features",
      questions: [
        {
          question: "How long does it take to complete a project?",
          answer: "Project timelines vary depending on complexity and requirements. Typically, a standard website takes 2-4 weeks, while more complex applications can take 6-12 weeks. We provide detailed timelines during our initial consultation."
        },
        {
          question: "Do you work with startups and small businesses?",
          answer: "Absolutely! We work with businesses of all sizes, from startups to established enterprises. We understand the unique challenges each business faces and tailor our solutions accordingly."
        },
        {
          question: "Do you provide ongoing support and maintenance?",
          answer: "Yes, we offer comprehensive support and maintenance packages to ensure your website or application continues to perform optimally. This includes regular updates, security patches, and technical support."
        }
      ]
    }
  ];

  // Flatten all questions for easier indexing
  const allQuestions = faqCategories.flatMap((category, categoryIndex) =>
    category.questions.map((question, questionIndex) => ({
      ...question,
      categoryId: category.id,
      categoryName: category.name,
      globalIndex: categoryIndex * 100 + questionIndex, // Unique global index
      categoryIndex,
      questionIndex
    }))
  );

  const toggleFAQ = (globalIndex) => {
    setOpenFAQ(openFAQ === globalIndex ? null : globalIndex);
  };

  // Function to determine which category should be active based on visible questions
  const updateActiveCategory = () => {
    if (!questionsContainerRef.current || !categoriesRef.current[0]) return;

    // Get the position of the categories sidebar
    const categoriesContainer = categoriesRef.current[0].parentElement;
    const categoriesRect = categoriesContainer.getBoundingClientRect();
    const categoriesMiddle = categoriesRect.top + (categoriesRect.height / 2);

    let newActiveCategory = 0;
    let bestMatch = null;
    let smallestDistance = Infinity;

    // For each question, check if it's aligned with the categories area
    faqItemsRef.current.forEach((item, index) => {
      if (item && allQuestions[index]) {
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top;
        const itemBottom = itemRect.bottom;
        const itemMiddle = itemTop + (itemRect.height / 2);

        // Check if this question is currently visible and in the viewport
        if (itemBottom > 0 && itemTop < window.innerHeight) {
          // Calculate distance from question to categories middle point
          const distance = Math.abs(itemMiddle - categoriesMiddle);
          
          // If this is the closest question to the categories area
          if (distance < smallestDistance) {
            smallestDistance = distance;
            bestMatch = allQuestions[index];
          }
        }
      }
    });

    // If we found a good match, use its category
    if (bestMatch && bestMatch.categoryId !== activeCategory) {
      setActiveCategory(bestMatch.categoryId);
    }

    // Fallback: If no good match, determine based on scroll position
    if (!bestMatch) {
      const scrollPosition = window.scrollY;
      const firstFeaturesIndex = allQuestions.findIndex(q => q.categoryId === 1);
      
      if (firstFeaturesIndex !== -1 && faqItemsRef.current[firstFeaturesIndex]) {
        const firstFeaturesTop = faqItemsRef.current[firstFeaturesIndex].offsetTop;
        const threshold = firstFeaturesTop - 200; // 200px before the first Features question
        
        const shouldBeFeatures = scrollPosition > threshold;
        const newCategory = shouldBeFeatures ? 1 : 0;
        
        if (newCategory !== activeCategory) {
          setActiveCategory(newCategory);
        }
      }
    }
  };

  // Navigation function for category clicks
  const navigateToCategory = (categoryId) => {
    const firstQuestionIndex = allQuestions.findIndex(q => q.categoryId === categoryId);
    if (firstQuestionIndex !== -1 && faqItemsRef.current[firstQuestionIndex]) {
      const element = faqItemsRef.current[firstQuestionIndex];
      
      // Calculate the position relative to the page
      const elementRect = element.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const elementTop = currentScrollY + elementRect.top;
      
      // Scroll to position the question with some offset for better alignment
      const offset = 100; // Adjust this value to fine-tune positioning
      const targetScrollY = elementTop - offset;
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Animation for title (simplified for performance)
    if (faqTitleRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.transform = 'translateY(0) scale(1)';
              entry.target.style.opacity = '1';
              entry.target.style.transition = 'all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
          });
        },
        { threshold: 0.2 }
      );
      
      faqTitleRef.current.style.transform = 'translateY(100px) scale(0.9)';
      faqTitleRef.current.style.opacity = '0';
      observer.observe(faqTitleRef.current);
    }

    // Animation for categories
    categoriesRef.current.forEach((category, index) => {
      if (category) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.style.transform = 'translateX(0)';
                  entry.target.style.opacity = '1';
                  entry.target.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, index * 200);
              }
            });
          },
          { threshold: 0.2 }
        );
        
        category.style.transform = 'translateX(-100px)';
        category.style.opacity = '0';
        observer.observe(category);
      }
    });

    // Animation for FAQ items
    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.style.transform = 'translateY(0)';
                  entry.target.style.opacity = '1';
                  entry.target.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, (index % 3) * 100);
              }
            });
          },
          { threshold: 0.1 }
        );
        
        item.style.transform = 'translateY(80px)';
        item.style.opacity = '0';
        observer.observe(item);
      }
    });

    // Set up scroll listener for category highlighting with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveCategory();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial category update after a short delay to ensure elements are positioned
    const initialUpdate = setTimeout(() => {
      updateActiveCategory();
    }, 500);

    // Also update when FAQ items are toggled (height changes)
    const observer = new MutationObserver(() => {
      setTimeout(updateActiveCategory, 100);
    });
    
    if (questionsContainerRef.current) {
      observer.observe(questionsContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(initialUpdate);
      observer.disconnect();
    };
  }, [activeCategory]);

  return (
    <section ref={faqSectionRef} className="relative z-20 py-20 md:py-24 lg:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* FAQ Title */}
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

        {/* Mobile Categories Navigation - Visible only on smaller screens */}
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Categories (Hidden on mobile) */}
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

          {/* Right Column - Questions */}
          <div className="lg:col-span-9" ref={questionsContainerRef}>
            <div className="space-y-6">
              {allQuestions.map((faq, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </section>
  );
}

export default HomeFAQs;