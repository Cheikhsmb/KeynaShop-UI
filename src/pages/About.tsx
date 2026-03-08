import { motion } from "framer-motion";
import { MapPin, Globe, Heart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const values = [
  {
    icon: Globe,
    title: "Sourced Worldwide",
    description: "From the souks of Dubai to the markets of Istanbul, Bangkok, Kuala Lumpur and Guangzhou — we travel so you don't have to.",
  },
  {
    icon: Heart,
    title: "Curated with Care",
    description: "Every piece is hand-selected for quality, style and elegance. We only bring back what we'd wear ourselves.",
  },
  {
    icon: Sparkles,
    title: "Modern Elegance",
    description: "We believe tradition and trend can coexist. KEYNA is for the woman who honours her roots while embracing the world.",
  },
  {
    icon: MapPin,
    title: "Proudly Dakaroise",
    description: "Born in Dakar, inspired by the world. We serve Senegalese women with pride, delivering across the country.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 section-padding bg-primary text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="gold-divider mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-6xl italic mb-6">Notre Histoire</h1>
            <p className="text-primary-foreground/75 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              KEYNA est née d'une passion simple : connecter Dakar aux plus belles tendances internationales. 
              Nous parcourons le monde — Dubaï, Turquie, Thaïlande, Malaisie, Chine — pour vous offrir des produits 
              d'exception : abayas brodées, parfums rares, accessoires élégants et articles pour la maison.
            </p>
          </motion.div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-28 section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="gold-divider mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl italic mb-5">Notre Mission</h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              Offrir à chaque femme sénégalaise l'accès à des produits de qualité mondiale, 
              soigneusement sélectionnés pour allier tradition, modernité et élégance au quotidien. 
              Chez KEYNA, nous croyons que le style est un choix personnel — et nous sommes là pour l'enrichir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default About;
