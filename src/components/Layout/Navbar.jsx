import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuOverlay from "./MenuOverlay";

const Navbar = () => {
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    navigate("/ContactUs");
  };

  const togglePlusMenu = () => {
    setIsPlusMenuOpen(!isPlusMenuOpen);
  };

  const closePlusMenu = () => {
    setIsPlusMenuOpen(false);
  };

  // Handle scroll event to show/hide floating plus button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Active Link Class
  const navLinkClass = ({ isActive }) =>
    `hover:text-white transition-colors duration-200 ${
      isActive ? "text-[#00FFD1] font-semibold" : "text-white/90"
    }`;

  return (
    <>
      {/* Enhanced Navbar - Separate container */}
      <div className="absolute top-0 left-0 right-0 z-[100]">
        <nav className="px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-6">
          <div className="flex justify-between items-center">
            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3 z-50">
              <img
                src="/assets/logo1.webp"
                alt="Arohance Logo"
                className="w-20 h-20 sm:w-25 sm:h-25 lg:w-50 lg:h-10 object-contain"
              />
            </Link>

            {/* Navigation Links - Center (Desktop Only) */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm uppercase font-medium">
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>

              <NavLink to="/casestudies" className={navLinkClass}>
                Case Studies
              </NavLink>

              <NavLink to="/ContactUs" className={navLinkClass}>
                Contact Us
              </NavLink>
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

              {/* Plus Button - Mobile & Tablet (Always visible) */}
              <div className="lg:hidden">
                <button
                  onClick={togglePlusMenu}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span
                    className={`text-lg sm:text-xl font-bold text-black transition-transform duration-500 ${
                      isPlusMenuOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Floating Plus Button - Desktop Only (Appears on scroll) */}
      {showFloatingButton && (
        <button
          onClick={togglePlusMenu}
          className="fixed top-6 right-6 z-[9998] w-14 h-14 bg-white rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hidden lg:flex"
        >
          <span
            className={`text-2xl font-bold text-black transition-transform duration-500 ${
              isPlusMenuOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      )}

      {/* Menu Overlay Component */}
      <MenuOverlay isOpen={isPlusMenuOpen} onClose={closePlusMenu} />
    </>
  );
};

export default Navbar;
