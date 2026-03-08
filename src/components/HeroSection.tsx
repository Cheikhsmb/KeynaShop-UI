import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion editorial - model on runway"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pb-16 md:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[0.95] mb-4">
            Define Your
            <br />
            Own Style
          </h1>
          <p className="text-primary-foreground/70 font-body text-base md:text-lg max-w-md mb-8">
            Curated contemporary fashion for those who dare to stand out. New collection available now.
          </p>
          <div className="flex gap-4">
            <Button variant="hero" size="lg">
              Explore Collection
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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
