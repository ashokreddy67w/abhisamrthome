import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import SmartHomeExperience from './components/sections/SmartHomeExperience';
import ServicesSection from './components/sections/ServicesSection';
import WhyChooseUs from './components/sections/WhyChooseUs';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CostCalculator from './components/sections/CostCalculator';
import BrandsSection from './components/sections/BrandsSection';
import BlogSection from './components/sections/BlogSection';
import FAQSection from './components/sections/FAQSection';
import ContactSection from './components/sections/ContactSection';
import AIChat from './components/ui/AIChat';

const App: React.FC = () => {
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

export default App;
