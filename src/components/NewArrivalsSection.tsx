import { motion } from "framer-motion";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const items = [
  { titleKey: "newarrivals.item1.title", priceKey: "newarrivals.item1.price", image: collection1 },
  { titleKey: "newarrivals.item2.title", priceKey: "newarrivals.item2.price", image: collection2 },
  { titleKey: "newarrivals.item3.title", priceKey: "newarrivals.item3.price", image: collection3 },
] as const;

const NewArrivalsSection = () => {
  const { t } = useLanguage();

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
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">{t("newarrivals.title")}</h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">
          {t("newarrivals.desc")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.titleKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4">
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {t("newarrivals.tag")}
              </span>
            </div>
            <h3 className="font-display text-lg italic mb-1">{t(item.titleKey)}</h3>
            <p className="text-muted-foreground text-sm font-body">{t(item.priceKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
