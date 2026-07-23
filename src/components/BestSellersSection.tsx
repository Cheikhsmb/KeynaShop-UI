import { motion } from "framer-motion";
import { StarIcon } from "@phosphor-icons/react";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";

const BEST_SELLERS = [
  { handle: "abaya-nuit-etoilee", titleFr: "Abaya Nuit Étoilée", titleEn: "Starry Night Abaya", titleAr: "عباءة ليلة النجوم", price: "52 000 FCFA", image: collection1, rating: 5 },
  { handle: "parfum-musc-blanc", titleFr: "Parfum Musc Blanc", titleEn: "White Musk Perfume", titleAr: "عطر المسك الأبيض", price: "22 000 FCFA", image: collection2, rating: 5 },
  { handle: "sac-chaine-doree", titleFr: "Sac Chaîne Dorée", titleEn: "Golden Chain Bag", titleAr: "حقيبة السلسلة الذهبية", price: "38 000 FCFA", image: collection3, rating: 4 },
  { handle: "service-the-ottoman", titleFr: "Service Thé Ottoman", titleEn: "Ottoman Tea Set", titleAr: "طقم شاي عثماني", price: "45 000 FCFA", image: collection4, rating: 5 },
];

const BestSellersSection = () => {
  const { t, lang } = useLanguage();

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
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">{t("bestsellers.title")}</h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">{t("bestsellers.desc")}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {BEST_SELLERS.map((item, index) => {
          const title = lang === "en" ? item.titleEn : lang === "ar" ? item.titleAr : item.titleFr;
          return (
            <motion.div
              key={item.handle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/product/${item.handle}`}>
                <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-3">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      weight={i < item.rating ? "fill" : "light"}
                      className={`w-3 h-3 ${i < item.rating ? "text-accent" : "text-border"}`}
                    />
                  ))}
                </div>
                <h3 className="font-display text-sm md:text-base italic mb-0.5 group-hover:text-accent transition-colors">{title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm font-body">{item.price}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellersSection;
