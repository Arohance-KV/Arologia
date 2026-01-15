// hooks/navbarAnimations.js - Separate Animation Logic
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for navbar scroll animations (hide/show on scroll)
 */
export const useNavbarAnimations = ({
  navbarRef,
  plusButtonRef,
  setShowPlusButton,
  location
}) => {
  useEffect(() => {
    // Create scroll trigger for navbar hide/show on ALL pages
    const showAnim = gsap.fromTo(
      navbarRef.current,
      {
        yPercent: -100,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        paused: true
      }
    );

    const hideAnim = gsap.fromTo(
      navbarRef.current,
      {
        yPercent: 0,
        opacity: 1
      },
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        paused: true
      }
    );

    // Navbar scroll behavior - hides/shows based on scroll direction after 100vh
    ScrollTrigger.create({
      start: '100vh top',
      end: 99999,
      onUpdate: self => {
        if (self.direction === -1) {
          // Scrolling up - show navbar, hide plus button
          showAnim.play();
          setShowPlusButton(false);
          if (plusButtonRef.current) {
            gsap.to(plusButtonRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'back.in(1.7)'
            });
          }
        } else {
          // Scrolling down - hide navbar, show plus button
          hideAnim.play();
          setShowPlusButton(true);
          if (plusButtonRef.current) {
            gsap.to(plusButtonRef.current, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(1.7)',
              delay: 0.1
            });
          }
        }
      }
    });

    // Plus button appears after scrolling past hero section
    ScrollTrigger.create({
      start: '100vh top',
      end: '+=100',
      onLeave: () => {
        setShowPlusButton(true);
        if (plusButtonRef.current) {
          gsap.to(plusButtonRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        }
      },
      onEnterBack: () => {
        setShowPlusButton(false);
        if (plusButtonRef.current) {
          gsap.to(plusButtonRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'back.in(1.7)'
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [location, navbarRef, plusButtonRef, setShowPlusButton]);
};

/**
 * Hook for menu overlay open/close animations
 */
export const useMenuOverlayAnimations = ({
  isOpen,
  onClose,
  plusMenuRef,
  logoRef,
  closeButtonRef,
  socialLinksRef,
  copyrightRef,
  plusMenuItemsRef,
  plusButtonRef,
  navbarRef
}) => {
  useEffect(() => {
    if (isOpen) {
      // Opening animation
      gsap.set(plusMenuRef.current, { display: 'flex' });

      // Animate background
      gsap.fromTo(
        plusMenuRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }
      );

      // Animate logo from left
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          x: -100,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out'
        }
      );

      // Animate menu items from center
      gsap.fromTo(
        plusMenuItemsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out'
        }
      );

      // Animate social links from right
      gsap.fromTo(
        socialLinksRef.current,
        {
          opacity: 0,
          x: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power3.out'
        }
      );

      // Animate copyright from bottom right
      gsap.fromTo(
        copyrightRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.6,
          ease: 'power3.out'
        }
      );

      // Animate close button
      gsap.fromTo(
        closeButtonRef.current,
        {
          opacity: 0,
          scale: 0,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 45,
          duration: 0.6,
          delay: 0.3,
          ease: 'back.out(1.7)'
        }
      );

      // Rotate plus icons
      rotatePlusIcons(plusButtonRef, navbarRef, 45);
    } else {
      // Closing animation
      const tl = gsap.timeline();

      // Animate out in reverse order
      tl.to(copyrightRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in'
      })
        .to(
          closeButtonRef.current,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 0.3,
            ease: 'back.in(1.7)'
          },
          '-=0.15'
        )
        .to(
          socialLinksRef.current,
          {
            opacity: 0,
            x: 30,
            scale: 0.8,
            duration: 0.2,
            stagger: 0.05,
            ease: 'power2.in'
          },
          '-=0.1'
        )
        .to(
          plusMenuItemsRef.current,
          {
            opacity: 0,
            y: -30,
            scale: 0.8,
            duration: 0.2,
            stagger: 0.03,
            ease: 'power2.in'
          },
          '-=0.15'
        )
        .to(
          logoRef.current,
          {
            opacity: 0,
            x: -50,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in'
          },
          '-=0.1'
        )
        .to(
          plusMenuRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(plusMenuRef.current, { display: 'none' });
            }
          },
          '-=0.2'
        );

      // Rotate plus icons back
      rotatePlusIcons(plusButtonRef, navbarRef, 0);
    }
  }, [
    isOpen,
    onClose,
    plusMenuRef,
    logoRef,
    closeButtonRef,
    socialLinksRef,
    copyrightRef,
    plusMenuItemsRef,
    plusButtonRef,
    navbarRef
  ]);
};

/**
 * Helper function to rotate plus icons across different elements
 */
const rotatePlusIcons = (plusButtonRef, navbarRef, rotation) => {
  // Rotate plus button icon (desktop floating button)
  if (plusButtonRef.current?.querySelector('.plus-icon')) {
    gsap.to(plusButtonRef.current.querySelector('.plus-icon'), {
      rotation,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  // Rotate close button icon in menu
  const closeButton = document.querySelector('[class*="absolute"][class*="top-4"]')?.querySelector('.plus-icon');
  if (closeButton) {
    gsap.to(closeButton, {
      rotation,
      duration: rotation === 0 ? 0.1 : 0.4,
      ease: 'power2.out'
    });
  }

  // Rotate mobile/tablet navbar plus icon
  const mobileNavPlusIcon = navbarRef.current?.querySelector('.plus-icon');
  if (mobileNavPlusIcon) {
    gsap.to(mobileNavPlusIcon, {
      rotation,
      duration: 0.4,
      ease: 'power2.out'
    });
  }
};