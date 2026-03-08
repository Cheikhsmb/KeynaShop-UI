import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant woman in embroidered abaya at KEYNA boutique"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      </div>

      <div className="relative z-10 section-padding pb-16 md:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="max-w-2xl"
        >
          <div className="gold-divider mb-6" />
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-5 italic">
            Elegance
            <br />
            <span className="not-italic font-light">Redefined</span>
          </h1>
          <p className="text-primary-foreground/75 font-body text-base md:text-lg max-w-md mb-8 leading-relaxed">
            Curated abayas, perfumes, bags & homeware — imported from Dubai, Turkey, Thailand & beyond. For the modern woman who celebrates her style.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg">
              Explore Collections
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Our Story
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
