import React, { useRef } from "react";
import HeroSection from "../components/About/AboutHero";
import OurVision from "../components/About/Vision";
import OurWorks from "../components/About/OurWorks";
import WorkflowSection from "../components/About/AboutWorkflow";
import HowWeCraft from "../components/About/HowWeCraft";
import CTASection from "../components/About/AboutCTA";

function About() {
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <HeroSection ref={heroRef} />
      <OurVision />
      <OurWorks />
      <WorkflowSection />
      <HowWeCraft />
      <CTASection />
    </div>
  );
}

export default About;
