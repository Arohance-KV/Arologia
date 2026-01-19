import React from "react";
import HeroSection from "../components/Home/HeroSection";
import OurServices from "../components/Home/OurServices";
import OurClients from "../components/Home/OurClients";
import Works from "../components/Home/Works";
import TeamMembers from "../components/Home/TeamMembers";
import Testimonials from "../components/Home/Testimonials";
import FAQs from "../components/Home/FAQs";
import AboutUs from "../components/Home/AboutUs";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* <HeroSection /> */}
      {/* <OurServices /> */}
      {/* <Works /> */}
      {/* <AboutUs /> */}
      {/* <TeamMembers /> */}
      <OurClients />
      <Testimonials />
      {/* <FAQs /> */}
    </div>
  );
}
