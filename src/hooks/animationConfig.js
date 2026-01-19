// animationConfig.js

export const ANIMATION_CONFIG = {
  title: {
    duration: 1.2,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    yOffset: 100,
    threshold: 0.1
  },

  card: {
    transitionDuration: 0.6,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    heightVh: 60,
    gapPercentage: 4,
    widthPercentage: 96
  },

  scroll: {
    threshold: 0.1,
    useRAF: true
  },

  desktop: {
    gapCompensation: 3,
    phases: {
      total: 3,
      transitionPoints: [1, 2]
    }
  }
};

// Animation Setup - Desktop
export const setupDesktopAnimation = (
  sectionRef,
  cardsContainerRef,
  cardRefs,
  servicesLength,
) => {
  if (cardsContainerRef.current) {
    cardsContainerRef.current.style.transform = 'translateX(0)';
  }

  // Initialize desktop cards
  cardRefs.current.forEach((card, index) => {
    if (card) {
      card.style.minWidth = 'auto';
      card.style.maxWidth = 'none';
      card.style.width = index === 0 ? '100%' : '0%';
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.transform = 'translateX(0)';
      card.style.transition = `width ${ANIMATION_CONFIG.card.transitionDuration}s ${ANIMATION_CONFIG.card.easing}`;
      card.style.height = `${ANIMATION_CONFIG.card.heightVh}vh`;
      card.style.minHeight = `${ANIMATION_CONFIG.card.heightVh}vh`;
      card.style.maxHeight = `${ANIMATION_CONFIG.card.heightVh}vh`;
      card.style.overflow = 'hidden';
      card.style.flexShrink = '0';
    }
  });

  let ticking = false;

  const calculateCardWidth = (index, phaseProgress, finalWidth) => {
    const { transitionPoints } = ANIMATION_CONFIG.desktop.phases;

    if (index === 0) {
      if (phaseProgress <= transitionPoints[0]) return 100 - 52 * phaseProgress;
      if (phaseProgress <= transitionPoints[1]) return 48 - 17 * (phaseProgress - 1);
      return 31 - (31 - finalWidth) * (phaseProgress - 2);
    }
    if (index === 1) {
      if (phaseProgress <= transitionPoints[0]) return 48 * phaseProgress;
      if (phaseProgress <= transitionPoints[1]) return 48 - 17 * (phaseProgress - 1);
      return 31 - (31 - finalWidth) * (phaseProgress - 2);
    }
    if (index === 2) {
      if (phaseProgress <= transitionPoints[0]) return 0;
      if (phaseProgress <= transitionPoints[1]) return 31 * (phaseProgress - 1);
      return 31 - (31 - finalWidth) * (phaseProgress - 2);
    }
    if (index === 3) {
      if (phaseProgress <= transitionPoints[1]) return 0;
      return finalWidth * (phaseProgress - 2);
    }
    return 0;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollStart = -rect.top;
        const scrollEnd = sectionHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

        const phaseProgress = progress * (servicesLength - 1);
        const finalWidth = (100 - ANIMATION_CONFIG.desktop.gapCompensation) / servicesLength;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          let cardWidth = calculateCardWidth(index, phaseProgress, finalWidth);
          card.style.width = `${Math.max(0, cardWidth)}%`;
        });

        ticking = false;
      });
      ticking = true;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
          handleScroll();
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      });
    },
    { threshold: ANIMATION_CONFIG.scroll.threshold }
  );

  observer.observe(sectionRef.current);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    observer.disconnect();
  };
};

// Animation Setup - Mobile
export const setupMobileAnimation = (
  sectionRef,
  cardsContainerRef,
  cardRefs,
  servicesLength
) => {
  // Initialize mobile cards
  cardRefs.current.forEach((card) => {
    if (card) {
      card.style.width = `${ANIMATION_CONFIG.card.widthPercentage}%`;
      card.style.minWidth = `${ANIMATION_CONFIG.card.widthPercentage}%`;
      card.style.maxWidth = `${ANIMATION_CONFIG.card.widthPercentage}%`;
      card.style.flexShrink = '0';
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.transform = 'translateX(0)';
      card.style.height = `${ANIMATION_CONFIG.card.heightVh}vh`;
      card.style.minHeight = `${ANIMATION_CONFIG.card.heightVh}vh`;
      card.style.maxHeight = `${ANIMATION_CONFIG.card.heightVh}vh`;
      card.style.overflow = 'hidden';
      card.style.transition = 'none';
    }
  });

  let ticking = false;

  const handleScrollMobile = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollStart = -rect.top;
        const scrollEnd = sectionHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

        const containerWidth = cardsContainerRef.current.offsetWidth;
        const cardWidth = (containerWidth * ANIMATION_CONFIG.card.widthPercentage) / 100;
        const gap = (containerWidth * ANIMATION_CONFIG.card.gapPercentage) / 100;
        const totalCardsWidth = cardWidth * servicesLength + gap * (servicesLength - 1);
        const maxScroll = totalCardsWidth - containerWidth;

        const translateX = -(progress * maxScroll);
        cardsContainerRef.current.style.transform = `translateX(${translateX}px)`;
        cardsContainerRef.current.style.transition = 'none';

        ticking = false;
      });
      ticking = true;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScrollMobile);
          handleScrollMobile();
        } else {
          window.removeEventListener('scroll', handleScrollMobile);
        }
      });
    },
    { threshold: ANIMATION_CONFIG.scroll.threshold }
  );

  observer.observe(sectionRef.current);

  return () => {
    window.removeEventListener('scroll', handleScrollMobile);
    observer.disconnect();
  };
};

// Title Animation
export const setupTitleAnimation = (titleRef) => {
  if (!titleRef.current) return;

  titleRef.current.style.transform = `translateY(${ANIMATION_CONFIG.title.yOffset}px)`;
  titleRef.current.style.opacity = '0';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const { duration, easing } = ANIMATION_CONFIG.title;
          entry.target.style.transition = `transform ${duration}s ${easing}, opacity ${duration}s ${easing}`;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
        }
      });
    },
    { threshold: ANIMATION_CONFIG.title.threshold }
  );

  observer.observe(titleRef.current);
  return () => observer.disconnect();
};