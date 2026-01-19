// components/MenuOverlay.jsx - Full Screen Menu Overlay with Responsive Design
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const MenuOverlay = ({ isOpen, onClose }) => {
  const plusMenuRef = useRef(null);
  const logoRef = useRef(null);
  const socialLinksRef = useRef([]);
  const closeButtonRef = useRef(null);
  const plusMenuItemsRef = useRef([]);

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <div
      ref={plusMenuRef}
      className={`fixed inset-0 bg-black z-[9999] transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Logo - Responsive positioning and sizing */}
      <div
        ref={logoRef}
        className="absolute left-3 xs:left-4 sm:left-6 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 xs:space-x-2 sm:space-x-3 md:space-x-4"
      >
        {/* Logo Image */}
        <img
          src="/assets/logo1.webp"
          alt="Arologia Logo"
          className="w-20 h-20 sm:w-25 sm:h-25 lg:w-50 lg:h-10 object-contain"
        />
      </div>

      {/* Close Button - Top Right with Plus to X Transformation */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-3 xs:top-4 sm:top-6 md:top-8 right-3 xs:right-4 sm:right-6 md:right-8 w-9 xs:w-10 sm:w-12 md:w-14 lg:w-16 h-9 xs:h-10 sm:h-12 md:h-14 lg:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110 active:scale-95"
      >
        <span
          className={`text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black transition-all duration-500 ease-in-out flex items-center justify-center h-full w-full ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      {/* Navigation Links - Center */}
      <div className="absolute inset-0 flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-white text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light w-full max-w-2xl">
          <Link
            ref={(el) => (plusMenuItemsRef.current[0] = el)}
            to="/"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 active:scale-95 text-center w-full py-2 md:py-3"
          >
            Home
          </Link>
          <Link
            ref={(el) => (plusMenuItemsRef.current[1] = el)}
            to="/about"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 active:scale-95 text-center w-full py-2 md:py-3"
          >
            About
          </Link>
          <Link
            ref={(el) => (plusMenuItemsRef.current[2] = el)}
            to="/casestudies"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 active:scale-95 text-center w-full py-2 md:py-3"
          >
            Case Studies
          </Link>
          <Link
            ref={(el) => (plusMenuItemsRef.current[3] = el)}
            to="/ContactUs"
            onClick={handleMenuItemClick}
            className="hover:text-white/70 transition-colors duration-300 transform hover:scale-105 active:scale-95 text-center w-full py-2 md:py-3"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* ✅ Social Links - Always Right Side (Desktop Style on all screens) */}
      <div className="absolute right-3 xs:right-4 sm:right-6 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 xs:gap-4 sm:gap-5 text-white text-xs xs:text-sm sm:text-base md:text-lg">
        <a
          ref={(el) => (socialLinksRef.current[0] = el)}
          href="https://www.instagram.com/arohance?igsh=MTcyYTh4emRyajlsdA=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 xs:gap-2 hover:text-white/70 transition-colors duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Instagram"
        >
          <span className="hidden xs:inline text-xs sm:text-sm md:text-base">
            Instagram
          </span>
          <FaInstagram className="text-base xs:text-lg sm:text-xl md:text-2xl flex-shrink-0" />
        </a>

        <a
          ref={(el) => (socialLinksRef.current[1] = el)}
          href="https://www.linkedin.com/company/arohance-india/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 xs:gap-2 hover:text-white/70 transition-colors duration-300 transform hover:scale-110 active:scale-95"
          aria-label="LinkedIn"
        >
          <span className="hidden xs:inline text-xs sm:text-sm md:text-base">
            LinkedIn
          </span>
          <FaLinkedinIn className="text-base xs:text-lg sm:text-xl md:text-2xl flex-shrink-0" />
        </a>
      </div>
    </div>
  );
};

export default MenuOverlay;
