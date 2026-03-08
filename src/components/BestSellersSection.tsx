import { motion } from "framer-motion";
import { Star } from "lucide-react";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";

const bestSellers = [
  { title: "Abaya Nuit Étoilée", price: "52 000 FCFA", image: collection1, rating: 5 },
  { title: "Parfum Musc Blanc", price: "22 000 FCFA", image: collection2, rating: 5 },
  { title: "Sac Chaîne Dorée", price: "38 000 FCFA", image: collection3, rating: 4 },
  { title: "Service Thé Ottoman", price: "45 000 FCFA", image: collection4, rating: 5 },
];

const BestSellersSection = () => {
  return (
    <section className="py-20 md:py-28 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="gold-divider mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">Meilleures Ventes</h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">
          Les produits les plus appréciés par nos clientes.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {bestSellers.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < item.rating ? "fill-accent text-accent" : "text-border"}`}
                />
              ))}
            </div>
            <h3 className="font-display text-sm md:text-base italic mb-0.5">{item.title}</h3>
            <p className="text-muted-foreground text-xs md:text-sm font-body">{item.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
