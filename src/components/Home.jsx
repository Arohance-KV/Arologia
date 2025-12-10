import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorksSection } from './ui/Home-Works';
import TeamMembersSection from './ui/Home-TeamMembers';
import sampleVideo from '/sample.mp4';
import { Link } from 'react-router-dom';
import HomeFAQs from './ui/Home-FAQs';
import Testimonials from './ui/Home-Testimonials';
import AboutUs from './ui/Home-AboutUs';
import OurClients from './ui/Home-OurClients';
import OurServices from './ui/Home-OurServices';
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Hero text refs
  const heroTheRef = useRef(null);
  const heroArohanceRef = useRef(null);
  const heroTechTeamRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroContainerRef = useRef(null);

  useEffect(() => {
    // Set initial states for all elements
    if (heroTheRef.current) {
      gsap.set(heroTheRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9
      });
    }

    if (heroArohanceRef.current) {
      gsap.set(heroArohanceRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9
      });
    }

    if (heroTechTeamRef.current) {
      gsap.set(heroTechTeamRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9
      });
    }

    if (heroDescriptionRef.current) {
      gsap.set(heroDescriptionRef.current, {
        y: 50,
        opacity: 0
      });
    }

    // Create timeline for the staggered hero text animation (THE and AROHANCE)
    const heroTextTimelineEnter = gsap.timeline({ paused: true });
    
    // Enter animation: "THE" first, then "AROHANCE"
    if (heroTheRef.current) {
      heroTextTimelineEnter.to(heroTheRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      });
    }

    if (heroArohanceRef.current) {
      heroTextTimelineEnter.to(heroArohanceRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "+=0.15"); // 0.15 second delay after "THE"
    }

    // Create ScrollTrigger for the combined hero text (THE + AROHANCE)
    // Using the first element as trigger but affecting both
    if (heroTheRef.current) {
      ScrollTrigger.create({
        trigger: heroTheRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          heroTextTimelineEnter.play();
        },
        onLeave: () => {
          // Animate both elements out simultaneously
          gsap.to([heroTheRef.current, heroArohanceRef.current], {
            y: -50,
            opacity: 0.3,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          // Show both elements immediately without animation
          gsap.set([heroTheRef.current, heroArohanceRef.current], {
            y: 0,
            opacity: 1,
            scale: 1
          });
        },
        onLeaveBack: () => {
          // Reset both elements to initial state
          gsap.to([heroTheRef.current, heroArohanceRef.current], {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    }

    // TECH TEAM - Independent viewport trigger
    if (heroTechTeamRef.current) {
      ScrollTrigger.create({
        trigger: heroTechTeamRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(heroTechTeamRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        },
        onLeave: () => {
          gsap.to(heroTechTeamRef.current, {
            y: -50,
            opacity: 0.3,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(heroTechTeamRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(heroTechTeamRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    }

    // Description - Independent viewport trigger
    if (heroDescriptionRef.current) {
      ScrollTrigger.create({
        trigger: heroDescriptionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(heroDescriptionRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        },
        onLeave: () => {
          gsap.to(heroDescriptionRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(heroDescriptionRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(heroDescriptionRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
  <div className="bg-black text-white">
    {/* Hero Section - Extended height for scrolling content */}
    <section ref={heroSectionRef} className="relative hero-section" style={{ height: '200vh' }}>
      {/* Background Video - Fixed/Sticky */}
      <div ref={videoContainerRef} className="sticky top-0 w-full h-screen z-0">
        <video 
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={sampleVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Text Container - Positioned absolutely over video with negative margin to overlay */}
      <div ref={heroContainerRef} className="relative z-30 -mt-[98vh]">
        <div className="flex flex-col justify-center items-start pl-0 pr-0 pointer-events-none font-sans pt-10 lg:pt-185 md:pt-170 sm:pt-150" style={{ height: '100vh' }}>
          {/* Hero Text Structure with Individual Refs */}
          <div className="flex flex-col">
            {/* "THE" - Top with increased font weight */}
            <div 
              ref={heroTheRef}
              className="text-[12vw] font-bold leading-[0.9] tracking-tight text-white opacity-0"
            >
              AROLOGIA
            </div>
            
            {/* "AROHANCE" - Middle with increased font weight and max width constraint 
            <div 
              ref={heroArohanceRef}
              className="text-[12vw] font-extrabold leading-[0.9] tracking-tight text-white opacity-0 max-w-[50vw]"
            >
              AROHANCE
            </div>
            
            {/* "Tech Team" - Bottom */}
            <div 
              ref={heroTechTeamRef}
              className="text-[10vw] md:text-[8vw] lg:text-[13vw] font-light leading-[0.9] tracking-tight text-white mt-2 opacity-0"
            >
              Tech Team
            </div>
          </div>

          {/* Description Text - Separate div */}
          <div 
            ref={heroDescriptionRef} 
            className="mt-8 md:mt-12 max-w-2xl text-xl md:text-2xl opacity-0 leading-relaxed text-white ml-20"
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto ad cumque sequi officia repellendus et praesentium odit libero adipisci, impedit corrupti numquam earum mollitia consectetur dolorum explicabo veritatis quasi?</p>
          </div>
        </div>
      </div>
    </section>
    <OurServices/>
    <OurClients/>
    <WorksSection />
    <TeamMembersSection />
    <AboutUs/>
    <Testimonials/>
    <HomeFAQs/>
  </div>
);
}

export default Home;