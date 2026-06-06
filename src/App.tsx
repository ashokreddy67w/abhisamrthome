import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import HeroSection from "./components/sections/HeroSection";
import SmartHomeExperience from "./components/sections/SmartHomeExperience";
import ServicesSection from "./components/sections/ServicesSection";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import GallerySection from "./components/sections/GallerySection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import CostCalculator from "./components/sections/CostCalculator";
import BrandsSection from "./components/sections/BrandsSection";
import BlogSection from "./components/sections/BlogSection";
import FAQSection from "./components/sections/FAQSection";
import ContactSection from "./components/sections/ContactSection";

import AIChat from "./components/ui/AIChat";

import HomeAutomation from "./pages/HomeAutomation";

// Homepage Component
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection />
        <SmartHomeExperience />
        <ServicesSection />
        <WhyChooseUs />
        <GallerySection />
        <TestimonialsSection />
        <CostCalculator />
        <BrandsSection />
        <BlogSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

// Main App
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Service Pages */}
        <Route
          path="/services/home-automation"
          element={<HomeAutomation />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;