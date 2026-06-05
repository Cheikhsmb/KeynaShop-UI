import { motion } from "framer-motion";
import { MapPin, Truck, Gift } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: MapPin, titleKey: "about.feat1.title", descKey: "about.feat1.desc" },
    { icon: Truck, titleKey: "about.feat2.title", descKey: "about.feat2.desc" },
    { icon: Gift, titleKey: "about.feat3.title", descKey: "about.feat3.desc" },
  ];

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
            {t("about.title")}
          </h2>
          <p className="text-primary-foreground/70 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("about.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
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
                {t(feature.titleKey)}
              </h3>
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
