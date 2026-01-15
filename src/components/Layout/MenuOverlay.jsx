// components/MenuOverlay.jsx - Full Screen Menu Overlay
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useMenuOverlayAnimations } from '../../hooks/navbarAnimation';

const MenuOverlay = ({ isOpen, onClose, plusButtonRef, navbarRef }) => {
  const plusMenuRef = useRef(null);
  const logoRef = useRef(null);
  const socialLinksRef = useRef([]);
  const copyrightRef = useRef(null);
  const closeButtonRef = useRef(null);
  const plusMenuItemsRef = useRef([]);

  // Use menu overlay animation hook
  useMenuOverlayAnimations({
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
  });

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <div
      ref={plusMenuRef}
      className="fixed inset-0 bg-black z-[9999] hidden"
    >
      {/* Logo - Responsive positioning and sizing */}
      <div
        ref={logoRef}
        className="absolute left-4 sm:left-6 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 sm:space-x-3 md:space-x-4"
      >
        <div className="text-white font-medium">
          <div className="font-bold leading-tight text-lg sm:text-2xl md:text-3xl lg:text-5xl">
            AROHANCE
          </div>
          <div className="font-light leading-tight text-sm sm:text-lg md:text-xl lg:text-3xl">
            Tech Team
          </div>
        </div>
      </div>

      {/* Close Button - Top Right */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110"
      >
        <span className="plus-icon text-lg sm:text-xl md:text-2xl font-bold text-black transition-transform duration-300">
          +
        </span>
      </button>

      {/* Navigation Links - Center */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light">
          <Link
            ref={el => (plusMenuItemsRef.current[0] = el)}
            to="/"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
          >
            Home
          </Link>
          <Link
            ref={el => (plusMenuItemsRef.current[1] = el)}
            to="/about"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
          >
            About
          </Link>
          <Link
            ref={el => (plusMenuItemsRef.current[2] = el)}
            to="/case-studies"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
          >
            Case Studies
          </Link>
          <Link
            ref={el => (plusMenuItemsRef.current[3] = el)}
            to="/ContactUs"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Social Links - Right Side */}
      <div className="absolute right-4 sm:right-6 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-2 sm:space-y-3 text-white text-sm sm:text-base md:text-lg">
        <a
          ref={el => (socialLinksRef.current[0] = el)}
          href="https://www.instagram.com/arohance?igsh=MTcyYTh4emRyajlsdA=="
          className="flex items-center space-x-2 hover:text-white/70 transition-colors duration-300 transform hover:scale-105"
        >
          <span className="hidden sm:inline">Instagram</span>
          <span className="sm:hidden">IG</span>
          <FaInstagram className="text-lg sm:text-xl md:text-2xl" />
        </a>
        <a
          ref={el => (socialLinksRef.current[1] = el)}
          href="https://www.linkedin.com/company/arohance-india/"
          className="flex items-center space-x-2 hover:text-white/70 transition-colors duration-300 transform hover:scale-105"
        >
          <span className="hidden sm:inline">LinkedIn</span>
          <span className="sm:hidden">LI</span>
          <FaLinkedinIn className="text-lg sm:text-xl md:text-2xl" />
        </a>
      </div>

      {/* Copyright - Bottom Right */}
      <div
        ref={copyrightRef}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 text-white text-xs sm:text-sm text-center sm:text-right max-w-48 sm:max-w-none"
      >
        <span className="hidden sm:inline">© Copyright AROHANCE Tech Services</span>
        <span className="sm:hidden">© AROHANCE Tech</span>
      </div>
    </div>
  );
};

export default MenuOverlay;