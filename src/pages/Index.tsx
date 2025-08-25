import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroSection from "@/components/Home/HeroSection";
import FeaturedCategories from "@/components/Home/FeaturedCategories";
import HowItWorks from "@/components/Home/HowItWorks";
import TestimonialsSection from "@/components/Home/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <HowItWorks />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
