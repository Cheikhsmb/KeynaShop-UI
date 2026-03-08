import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";

const newArrivals = [
  { title: "Abaya Perle Dorée", price: "45 000 FCFA", image: collection1, tag: "Nouveau" },
  { title: "Parfum Oud Royal", price: "28 000 FCFA", image: collection2, tag: "Nouveau" },
  { title: "Sac Cuir Milano", price: "35 000 FCFA", image: collection3, tag: "Nouveau" },
];

const NewArrivalsSection = () => {
  return (
    <section className="py-20 md:py-28 section-padding bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="gold-divider mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">Nouveautés</h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">
          Les dernières pièces fraîchement arrivées dans notre collection.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {newArrivals.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {item.tag}
              </span>
            </div>
            <h3 className="font-display text-lg italic mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body">{item.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
