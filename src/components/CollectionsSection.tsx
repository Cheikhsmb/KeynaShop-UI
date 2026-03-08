import { motion } from "framer-motion";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import collection5 from "@/assets/collection-5.jpg";
import collection6 from "@/assets/collection-6.jpg";
import collection7 from "@/assets/collection-7.jpg";

const collections = [
  {
    title: "Abayas",
    description: "Flowing silhouettes with delicate embroidery, sourced from the finest ateliers",
    image: collection1,
  },
  {
    title: "Perfumes",
    description: "Exclusive fragrances from Dubai — rich, captivating, unforgettable",
    image: collection2,
  },
  {
    title: "Bags & Shoes",
    description: "Statement accessories imported from Malaysia and beyond",
    image: collection3,
  },
  {
    title: "Jewelry",
    description: "Elegant gold and statement pieces to complement every look",
    image: collection5,
  },
  {
    title: "Thiouraye & Essences",
    description: "Traditional Senegalese incense and aromatic essences for a refined atmosphere",
    image: collection6,
  },
  {
    title: "Embroidered & Cotton Fabrics",
    description: "Premium bazin, brodé and cotton textiles for every occasion",
    image: collection7,
  },
  {
    title: "Home & Table",
    description: "Turkish linens and elegant tableware to elevate your everyday",
    image: collection4,
  },
];

const CollectionsSection = () => {
  return (
    <section id="collections" className="py-20 md:py-32 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-20"
      >
        <div className="gold-divider mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">
          Our Collections
        </h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">
          Carefully sourced from around the world — for women who value quality, style, and authenticity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {collections.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>
            <h3 className="font-display text-lg italic mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSection;
