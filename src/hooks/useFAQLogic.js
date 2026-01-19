import { useEffect } from 'react';

export const useFAQAnimations = (
  faqTitleRef,
  categoriesRef,
  faqItemsRef,
) => {
  useEffect(() => {
    // Animation for title
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
  }, [faqTitleRef, categoriesRef, faqItemsRef]);
};

export const useFAQScrollTracking = (
  allQuestions,
  faqItemsRef,
  categoriesRef,
  questionsContainerRef,
  activeCategory,
  setActiveCategory
) => {
  useEffect(() => {
    const updateActiveCategory = () => {
      if (!questionsContainerRef.current || !categoriesRef.current[0]) return;

      const categoriesContainer = categoriesRef.current[0].parentElement;
      const categoriesRect = categoriesContainer.getBoundingClientRect();
      const categoriesMiddle = categoriesRect.top + (categoriesRect.height / 2);

      let bestMatch = null;
      let smallestDistance = Infinity;

      faqItemsRef.current.forEach((item, index) => {
        if (item && allQuestions[index]) {
          const itemRect = item.getBoundingClientRect();
          const itemTop = itemRect.top;
          const itemBottom = itemRect.bottom;
          const itemMiddle = itemTop + (itemRect.height / 2);

          if (itemBottom > 0 && itemTop < window.innerHeight) {
            const distance = Math.abs(itemMiddle - categoriesMiddle);
            
            if (distance < smallestDistance) {
              smallestDistance = distance;
              bestMatch = allQuestions[index];
            }
          }
        }
      });

      if (bestMatch && bestMatch.categoryId !== activeCategory) {
        setActiveCategory(bestMatch.categoryId);
      }

      if (!bestMatch) {
        const scrollPosition = window.scrollY;
        const firstFeaturesIndex = allQuestions.findIndex(q => q.categoryId === 1);
        
        if (firstFeaturesIndex !== -1 && faqItemsRef.current[firstFeaturesIndex]) {
          const firstFeaturesTop = faqItemsRef.current[firstFeaturesIndex].offsetTop;
          const threshold = firstFeaturesTop - 200;
          
          const shouldBeFeatures = scrollPosition > threshold;
          const newCategory = shouldBeFeatures ? 1 : 0;
          
          if (newCategory !== activeCategory) {
            setActiveCategory(newCategory);
          }
        }
      }
    };

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    const initialUpdate = setTimeout(() => {
      updateActiveCategory();
    }, 500);

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(initialUpdate);
      observer.disconnect();
    };
  }, [allQuestions, activeCategory, setActiveCategory, faqItemsRef, categoriesRef, questionsContainerRef]);
};

export const navigateToCategory = (categoryId, allQuestions, faqItemsRef) => {
  const firstQuestionIndex = allQuestions.findIndex(q => q.categoryId === categoryId);
  if (firstQuestionIndex !== -1 && faqItemsRef.current[firstQuestionIndex]) {
    const element = faqItemsRef.current[firstQuestionIndex];
    const elementRect = element.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const elementTop = currentScrollY + elementRect.top;
    const offset = 100;
    const targetScrollY = elementTop - offset;
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }
};