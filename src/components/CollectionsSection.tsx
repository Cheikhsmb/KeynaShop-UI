import { motion } from "framer-motion";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";

const collections = [
  {
    title: "Essentials",
    description: "Timeless basics reimagined",
    image: collection1,
  },
  {
    title: "Accessories",
    description: "Bold finishing touches",
    image: collection2,
  },
  {
    title: "Streetwear",
    description: "Urban edge, elevated",
    image: collection3,
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
      >
        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent mb-3">
          Curated For You
        </p>
        <h2 className="text-display text-3xl md:text-5xl mb-12 md:mb-16">
          Collections
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {collections.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/4] mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
            </div>
            <h3 className="text-display text-lg mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSection;
