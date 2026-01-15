import React, { useRef, useEffect, useState } from 'react';
import { FaLinkedinIn, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const navLinksRef = useRef([]);
  const socialLinksRef = useRef([]);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    // Initial animation when footer comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      Array.from(footerRef.current.children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px)';
        child.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  const handleNavHover = (index, isHovering) => {
    const link = navLinksRef.current[index];
    const lineContainer = link?.nextElementSibling;
    
    if (link) {
      link.style.transform = isHovering ? 'translateX(-10px)' : 'translateX(0)';
      link.style.transition = 'transform 0.3s ease';
    }
    
    if (lineContainer) {
      lineContainer.style.transform = isHovering ? 'scaleX(0.7)' : 'scaleX(1)';
      lineContainer.style.transformOrigin = 'right center';
      lineContainer.style.transition = 'transform 0.3s ease';
    }
    
    // Keep ring circular by countering the scaleX effect
    const ring = lineContainer?.querySelector('.nav-ring');
    if (ring) {
      ring.style.transform = isHovering ? 'scaleX(1.43)' : 'scaleX(1)';
      ring.style.transition = 'transform 0.3s ease';
    }
  };

  const handleSocialHover = (index, isHovering) => {
    const socialLink = socialLinksRef.current[index];
    if (socialLink) {
      socialLink.style.transform = isHovering ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0deg)';
      socialLink.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    setHoveredIcon(isHovering ? index : null);
  };

  const socialLinks = [
    { icon: FaLinkedinIn, name: 'LinkedIn', href: 'https://www.linkedin.com/company/arohance-india/' },
    { icon: FaFacebook, name: 'Facebook', href: '#' },
    { icon: FaTwitter, name: 'X', href: '#' },
    { icon: FaInstagram, name: 'Insta', href: 'https://www.instagram.com/arohance?igsh=MTcyYTh4emRyajlsdA==' }
  ];

  const navItems = [
    { name: 'Home', href: '/', lineWidth: 'w-16 sm:w-32 md:w-48 lg:w-96' },
    { name: 'Case Studies', href: '/case-studies', lineWidth: 'w-12 sm:w-24 md:w-40 lg:w-80' },
    { name: 'About', href: '/about', lineWidth: 'w-10 sm:w-20 md:w-40 lg:w-84' },
    { name: 'Contact', href: '/ContactUs', lineWidth: 'w-8 sm:w-16 md:w-36 lg:w-72' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-black text-white py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-12 border-t border-gray-800 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto overflow-x-hidden">
        <div className="flex justify-between items-start min-h-0">
          
          {/* Left Section - Social Icons (Vertical) */}
          <div className="flex flex-col space-y-4 sm:space-y-10 flex-shrink-0 px-10 py-2">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <div key={index} className="relative">
                  <a
                    ref={el => socialLinksRef.current[index] = el}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-gray-600 rounded-full hover:border-white transition-colors duration-300 cursor-pointer"
                    onMouseEnter={() => handleSocialHover(index, true)}
                    onMouseLeave={() => handleSocialHover(index, false)}
                  >
                    <IconComponent className="text-white text-xs sm:text-sm lg:text-lg" />
                  </a>
                  {hoveredIcon === index && (
                    <div className="absolute -right-12 sm:-right-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      {social.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section - Navigation Links */}
          <div className="flex flex-col space-y-8 sm:space-y-15 lg:space-y-12 flex-shrink-0 ">
            {navItems.map((item, index) => (
              <div key={index} className="flex items-center justify-end space-x-1 sm:space-x-2 lg:space-x-4">
                <a
                  ref={el => navLinksRef.current[index] = el}
                  href={item.href}
                  className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-light hover:text-white transition-colors duration-300 whitespace-nowrap"
                  onMouseEnter={() => handleNavHover(index, true)}
                  onMouseLeave={() => handleNavHover(index, false)}
                >
                  {item.name}
                </a>
                <div className="flex items-center line-ring-container flex-shrink-0">
                  <div className="nav-ring w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-transparent border border-white rounded-full flex-shrink-0"></div>
                  <div className={`nav-line ${item.lineWidth} h-px bg-white flex-shrink-0`}></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-white font-medium">
                <div className="font-bold leading-tight text-base sm:text-lg">AROHANCE</div>
                <div className="font-light leading-tight text-xs sm:text-sm">Tech Team</div>
              </div>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-400">
              © 2024 AROHANCE Tech Services. All rights reserved.
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;