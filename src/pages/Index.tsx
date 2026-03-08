import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import BestSellersSection from "@/components/BestSellersSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CollectionsSection />
        <NewArrivalsSection />
        <BestSellersSection />
        <AboutSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
