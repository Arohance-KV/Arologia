// components/Navbar.jsx - Complete Navbar with Plus Menu
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const location = useLocation();
  
  const navbarRef = useRef(null);
  const plusButtonRef = useRef(null);
  const plusMenuRef = useRef(null);
  const plusMenuItemsRef = useRef([]);
  const logoRef = useRef(null);
  const socialLinksRef = useRef([]);
  const copyrightRef = useRef(null);
  const closeButtonRef = useRef(null);
  const navigate = useNavigate();

   // Handle navigation to contact us page
   const handleContactNavigation = () => {
    navigate('/ContactUs'); 
  };

  useEffect(() => {
    // Create scroll trigger for navbar hide/show on ALL pages
    const showAnim = gsap.fromTo(navbarRef.current, 
      { 
        yPercent: -100,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        paused: true
      }
    );

    const hideAnim = gsap.fromTo(navbarRef.current,
      {
        yPercent: 0,
        opacity: 1
      },
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        paused: true
      }
    );

   

    // Navbar scroll behavior - hides/shows based on scroll direction after 100vh
    ScrollTrigger.create({
      start: "100vh top",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === -1) {
          // Scrolling up - show navbar, hide plus button
          showAnim.play();
          setShowPlusButton(false);
          if (plusButtonRef.current) {
            gsap.to(plusButtonRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: "back.in(1.7)"
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
              ease: "back.out(1.7)",
              delay: 0.1
            });
          }
        }
      }
    });

    // Plus button appears after scrolling past hero section
    ScrollTrigger.create({
      start: "100vh top",
      end: "+=100",
      onLeave: () => {
        setShowPlusButton(true);
        if (plusButtonRef.current) {
          gsap.to(plusButtonRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
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
            ease: "back.in(1.7)"
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [location.pathname]);

  const togglePlusMenu = () => {
    setIsPlusMenuOpen(!isPlusMenuOpen);
    
    if (!isPlusMenuOpen) {
      // Opening animation
      gsap.set(plusMenuRef.current, { display: 'flex' });
      
      // Animate background
      gsap.fromTo(plusMenuRef.current, 
        { 
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );

      // Animate logo from left
      gsap.fromTo(logoRef.current,
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
          ease: "power3.out"
        }
      );

      // Animate menu items from center
      gsap.fromTo(plusMenuItemsRef.current,
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
          ease: "power3.out"
        }
      );

      // Animate social links from right
      gsap.fromTo(socialLinksRef.current,
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
          ease: "power3.out"
        }
      );

      // Animate copyright from bottom right
      gsap.fromTo(copyrightRef.current,
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
          ease: "power3.out"
        }
      );

      // Animate close button
      gsap.fromTo(closeButtonRef.current,
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
          ease: "back.out(1.7)"
        }
      );

      // Rotate plus button
      if (plusButtonRef.current?.querySelector('.plus-icon')) {
        gsap.to(plusButtonRef.current.querySelector('.plus-icon'), {
          rotation: 45,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Also rotate the close button in menu
      if (closeButtonRef.current?.querySelector('.plus-icon')) {
        gsap.to(closeButtonRef.current.querySelector('.plus-icon'), {
          rotation: 45,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Mobile-specific plus button in navbar
      const mobileNavPlusIcon = navbarRef.current?.querySelector('.plus-icon');
      if (mobileNavPlusIcon) {
        gsap.to(mobileNavPlusIcon, {
          rotation: 45,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    } else {
      // Closing animation
      const tl = gsap.timeline();

      // Animate out in reverse order
      tl.to(copyrightRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(closeButtonRef.current, {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.3,
        ease: "back.in(1.7)"
      }, "-=0.15")
      .to(socialLinksRef.current, {
        opacity: 0,
        x: 30,
        scale: 0.8,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in"
      }, "-=0.1")
      .to(plusMenuItemsRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in"
      }, "-=0.15")
      .to(logoRef.current, {
        opacity: 0,
        x: -50,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.1")
      .to(plusMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(plusMenuRef.current, { display: 'none' });
        }
      }, "-=0.2");

      // Rotate plus button back
      if (plusButtonRef.current?.querySelector('.plus-icon')) {
        gsap.to(plusButtonRef.current.querySelector('.plus-icon'), {
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Also rotate the close button back
      if (closeButtonRef.current?.querySelector('.plus-icon')) {
        gsap.to(closeButtonRef.current.querySelector('.plus-icon'), {
          rotation: 0,
          duration: 0.1,
          ease: "power2.out"
        });
      }

      // Mobile-specific plus button in navbar
      const mobileNavPlusIcon = navbarRef.current?.querySelector('.plus-icon');
      if (mobileNavPlusIcon) {
        gsap.to(mobileNavPlusIcon, {
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <>
      {/* Enhanced Navbar - Separate container */}
      <div className="absolute top-0 left-0 right-0 z-[100]">
        <nav ref={navbarRef} className="px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-6">
          <div className="flex justify-between items-center">
            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3 z-50">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              </div>
              <div className="text-white font-medium text-xs sm:text-sm lg:text-sm">
                <div className="font-bold leading-tight">Arohance</div>
                <div className="font-light leading-tight">Tech Team</div>
              </div>
            </Link>
            
            {/* Navigation Links - Center (Desktop Only) */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium text-white/90">
              <Link to="/about" className="hover:text-white transition-colors duration-200">About</Link>
              <Link to="/case-studies" className="hover:text-white transition-colors duration-200">Case Studies</Link>
              <Link to="/ContactUs" className="hover:text-white transition-colors duration-200">Contact Us</Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Let's Talk Button - Desktop */}
              <div className="hidden lg:block">
                <button 
                onClick={handleContactNavigation}
                className="border border-white/60 px-4 lg:px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium text-white">
                  
                  Let's talk
                </button>
              </div>

              {/* Plus Button - Mobile & Tablet (Always visible on mobile/tablet) */}
              <div className="lg:hidden">
                <button
                  onClick={togglePlusMenu}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="plus-icon text-lg sm:text-xl font-bold text-black transition-transform duration-300">+</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Plus Button - Desktop (Appears on scroll) */}
      <div 
        ref={plusButtonRef}
        className="hidden lg:block fixed top-6 sm:top-8 right-6 sm:right-8 z-[9998] transform scale-0 opacity-0"
        style={{ display: showPlusButton ? 'block' : 'none' }}
      >
        <button
          onClick={togglePlusMenu}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <span className="plus-icon text-xl sm:text-2xl font-bold text-black transition-transform duration-300">+</span>
        </button>
      </div>

      {/* Plus Menu - Fully Responsive */}
      <div 
        ref={plusMenuRef}
        className="fixed inset-0 bg-black z-[9999] hidden"
      >
        {/* Logo - Responsive positioning and sizing */}
        <div 
          ref={logoRef}
          className="absolute left-4 sm:left-6 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 sm:space-x-3 md:space-x-4"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          </div>
          <div className="text-white font-medium">
            <div className="font-bold leading-tight text-lg sm:text-2xl md:text-3xl lg:text-5xl">AROHANCE</div>
            <div className="font-light leading-tight text-sm sm:text-lg md:text-xl lg:text-3xl">Tech Team</div>
          </div>
        </div>

        {/* Close Button - Top Right (Responsive) */}
        <button
          ref={closeButtonRef}
          onClick={togglePlusMenu}
          className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group z-10 hover:scale-110"
        >
          <span className="plus-icon text-lg sm:text-xl md:text-2xl font-bold text-black transition-transform duration-300">+</span>
        </button>

        {/* Navigation Links - Perfect Center (Responsive) */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light">
            <Link 
              ref={el => plusMenuItemsRef.current[0] = el}
              to="/" 
              onClick={togglePlusMenu}
              className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
            >
              Home
            </Link>
            <Link 
              ref={el => plusMenuItemsRef.current[1] = el}
              to="/about" 
              onClick={togglePlusMenu}
              className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
            >
              About
            </Link>
            <Link 
              ref={el => plusMenuItemsRef.current[2] = el}
              to="/case-studies" 
              onClick={togglePlusMenu}
              className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
            >
              Case Studies
            </Link>
            <Link 
              ref={el => plusMenuItemsRef.current[4] = el}
              to="/ContactUs" 
              onClick={togglePlusMenu}
              className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Social Links - Responsive positioning */}
        <div className="absolute right-4 sm:right-6 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-2 sm:space-y-3 text-white text-sm sm:text-base md:text-lg">
          <a 
            ref={el => socialLinksRef.current[0] = el}
            href="https://www.instagram.com/arohance?igsh=MTcyYTh4emRyajlsdA==" 
            className="flex items-center space-x-2 hover:text-white/70 transition-colors duration-300 transform hover:scale-105"
          >
            <span className="hidden sm:inline">Instagram</span>
            <span className="sm:hidden">IG</span>
            <FaInstagram className="text-lg sm:text-xl md:text-2xl" />
          </a>
          <a 
            ref={el => socialLinksRef.current[1] = el}
            href="https://www.linkedin.com/company/arohance-india/" 
            className="flex items-center space-x-2 hover:text-white/70 transition-colors duration-300 transform hover:scale-105"
          >
            <span className="hidden sm:inline">LinkedIn</span>
            <span className="sm:hidden">LI</span>
            <FaLinkedinIn className="text-lg sm:text-xl md:text-2xl" />
          </a>
        </div>

        {/* Copyright - Bottom Right (Responsive) */}
        <div 
          ref={copyrightRef}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 text-white text-xs sm:text-sm text-center sm:text-right max-w-48 sm:max-w-none"
        >
          <span className="hidden sm:inline">© Copyright AROHANCE Tech Services</span>
          <span className="sm:hidden">© AROHANCE Tech</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;