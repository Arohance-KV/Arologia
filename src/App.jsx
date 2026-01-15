// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Layout
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Pages
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import CaseStudyPage from "./Pages/CaseStudyPage";
import ContactUsPage from "./Pages/ContactUsPage";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/caseStudies" element={<CaseStudyPage />} />
        <Route path="/contactUs" element={<ContactUsPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
