import { motion } from "framer-motion";
import { MapPin, Truck, Gift } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Imported Worldwide",
    description: "Dubai, Turkey, Thailand, Malaysia, China — we bring the world to Dakar.",
  },
  {
    icon: Truck,
    title: "Delivery Available",
    description: "Shop online and receive your items wherever you are in Senegal.",
  },
  {
    icon: Gift,
    title: "Perfect Gifts",
    description: "Perfumes, bags & homeware — ideal for weddings, birthdays & celebrations.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 section-padding bg-primary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-display text-3xl md:text-5xl text-primary-foreground italic mb-6">
            The KEYNA Philosophy
          </h2>
          <p className="text-primary-foreground/70 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We believe elegance is a daily choice. KEYNA curates the finest products from around the globe — 
            abayas, perfumes, accessories, and homeware — for the modern woman who celebrates her identity 
            while embracing international style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-lg text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
