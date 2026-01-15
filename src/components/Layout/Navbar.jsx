import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuOverlay from "./MenuOverlay";
import { useNavbarAnimations } from "../../hooks/navbarAnimation";

const Navbar = () => {
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navbarRef = useRef(null);
  const plusButtonRef = useRef(null);

  // Use animation hook
  useNavbarAnimations({
    navbarRef,
    plusButtonRef,
    showPlusButton,
    setShowPlusButton,
    location: location.pathname,
  });

  const handleContactNavigation = () => {
    navigate("/ContactUs");
  };

  const togglePlusMenu = () => {
    setIsPlusMenuOpen(!isPlusMenuOpen);
  };

  const closePlusMenu = () => {
    setIsPlusMenuOpen(false);
  };

  return (
    <>
      {/* Enhanced Navbar - Separate container */}
      <div className="absolute top-0 left-0 right-0 z-[100]">
        <nav
          ref={navbarRef}
          className="px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-6"
        >
          <div className="flex justify-between items-center">
            {/* Logo - Left Side */}
            <Link
              to="/"
              className="flex items-center space-x-2 lg:space-x-3 z-50"
            >
              <img
                src="/assets/logo1.webp"
                alt="Arohance Logo"
                className="w-20 h-20 sm:w-25 sm:h-25 lg:w-50 lg:h-10 object-contain"
              />
            </Link>

            {/* Navigation Links - Center (Desktop Only) */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium text-white/90">
              <Link
                to="/about"
                className="hover:text-white transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/casestudies"
                className="hover:text-white transition-colors duration-200"
              >
                Case Studies
              </Link>
              <Link
                to="/ContactUs"
                className="hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Let's Talk Button - Desktop */}
              <div className="hidden lg:block">
                <button
                  onClick={handleContactNavigation}
                  className="border border-white/60 px-4 lg:px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium text-white"
                >
                  Let's talk
                </button>
              </div>

              {/* Plus Button - Mobile & Tablet */}
              <div className="lg:hidden">
                <button
                  onClick={togglePlusMenu}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="plus-icon text-lg sm:text-xl font-bold text-black transition-transform duration-300">
                    +
                  </span>
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
        style={{ display: showPlusButton ? "block" : "none" }}
      >
        <button
          onClick={togglePlusMenu}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="plus-icon text-xl sm:text-2xl font-bold text-black transition-transform duration-300">
            +
          </span>
        </button>
      </div>

      {/* Menu Overlay Component */}
      <MenuOverlay
        isOpen={isPlusMenuOpen}
        onClose={closePlusMenu}
        plusButtonRef={plusButtonRef}
        navbarRef={navbarRef}
      />
    </>
  );
};

export default Navbar;
