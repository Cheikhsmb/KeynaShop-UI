import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import collection5 from "@/assets/collection-5.jpg";
import collection6 from "@/assets/collection-6.jpg";
import collection7 from "@/assets/collection-7.jpg";
import collection8 from "@/assets/collection-8.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const COLLECTIONS = [
  { titleKey: "collections.abayas.title", descKey: "collections.abayas.desc", image: collection1, cat: "abayas" },
  { titleKey: "collections.perfumes.title", descKey: "collections.perfumes.desc", image: collection2, cat: "perfumes" },
  { titleKey: "collections.bags.title", descKey: "collections.bags.desc", image: collection3, cat: "bags" },
  { titleKey: "collections.jewelry.title", descKey: "collections.jewelry.desc", image: collection5, cat: "jewelry" },
  { titleKey: "collections.thiouraye.title", descKey: "collections.thiouraye.desc", image: collection6, cat: "thiouraye" },
  { titleKey: "collections.fabrics.title", descKey: "collections.fabrics.desc", image: collection7, cat: "fabrics" },
  { titleKey: "collections.home.title", descKey: "collections.home.desc", image: collection4, cat: "home" },
  { titleKey: "collections.scrunchies.title", descKey: "collections.scrunchies.desc", image: collection8, cat: "scrunchies" },
];

const CollectionsSection = () => {
  const { t } = useLanguage();

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
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">{t("collections.title")}</h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">{t("collections.desc")}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {COLLECTIONS.map((item, index) => (
          <motion.div
            key={item.titleKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="group cursor-pointer"
          >
            <Link to={`/shop?category=${item.cat}`}>
              <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-primary-foreground">
                    {t("hero.explore")} →
                  </span>
                </div>
              </div>
              <h3 className="font-display text-lg italic mb-1 group-hover:text-accent transition-colors">{t(item.titleKey)}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{t(item.descKey)}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSection;
