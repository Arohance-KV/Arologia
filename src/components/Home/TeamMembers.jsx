import React, { useRef, useEffect } from "react";
import { teamMembers } from "../../utils/teamMembersData";

const TeamMembersSection = () => {
  const sectionRef = useRef(null);
  const membersRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animate title on mount
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(50px)";
      setTimeout(() => {
        titleRef.current.style.transition = "all 1s ease-out";
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "translateY(0)";
      }, 200);
    }

    // Animate members on mount with stagger
    membersRef.current.forEach((member, index) => {
      if (member) {
        member.style.opacity = "0";
        member.style.transform = "translateY(80px)";
        setTimeout(() => {
          member.style.transition = "all 0.8s ease-out";
          member.style.opacity = "1";
          member.style.transform = "translateY(0)";
        }, 400 + index * 150);
      }
    });

    // Floating scroll animation - only for medium screens and above
    const handleScroll = () => {
      // Check if screen width is medium or larger (768px and above)
      if (window.innerWidth < 768) {
        return; // Skip floating effect on small screens
      }

      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop || 0;
      const sectionHeight = sectionRef.current?.offsetHeight || 0;

      if (
        scrollY > sectionTop - window.innerHeight &&
        scrollY < sectionTop + sectionHeight
      ) {
        membersRef.current.forEach((member, index) => {
          if (member) {
            const speed = 0.5 + (index % 3) * 0.2; // Different speeds for floating effect
            const direction = index % 2 === 0 ? 1 : -1; // Alternate directions
            const yPos = (scrollY - sectionTop) * speed * direction * 0.1;

            member.style.transform = `translateY(${yPos}px)`;
          }
        });
      }
    };

    // Handle resize to reset transforms on screen size change
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Reset transforms for small screens
        membersRef.current.forEach((member) => {
          if (member) {
            member.style.transform = "translateY(0)";
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-20 md:py-3 relative lg:pb-0 md:pb-0"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20 md:mb-32">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide">
            OUR TEAM
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Meet the creative minds behind Arohance Tech Team, bringing innovation
            and expertise to every project.
          </p>
        </div>

        {/* Team Members Grid - 3 per row */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (membersRef.current[index] = el)}
              className="member-card group cursor-pointer"
            >
              {/* Member Image */}
              <div className="relative mb-8 overflow-hidden aspect-[3/4] bg-gray-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Overlay with text positioned like the reference */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl md:text-3xl font-light mb-2 text-white tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {member.name}
                    </h3>
                    <p className="text-lg text-gray-300 italic opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Member Info Below Image */}
              <div className="text-center space-y-1">
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-white">
                  {member.name}
                </h3>
                <p className="text-base md:text-lg text-gray-400 font-light">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-20 md:mt-32 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute top-1/4 right-10 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/15 rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default TeamMembersSection;
