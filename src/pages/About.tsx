import { motion } from "framer-motion";
import { MapPin, Globe, Heart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Globe, titleKey: "about.v1.title", descKey: "about.v1.desc" },
    { icon: Heart, titleKey: "about.v2.title", descKey: "about.v2.desc" },
    { icon: Sparkles, titleKey: "about.v3.title", descKey: "about.v3.desc" },
    { icon: MapPin, titleKey: "about.v4.title", descKey: "about.v4.desc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 section-padding bg-primary text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="gold-divider mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-6xl italic mb-6">{t("about.page.h1")}</h1>
            <p className="text-primary-foreground/75 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t("about.page.hero")}
            </p>
          </motion.div>
        </section>

        <section className="py-20 md:py-28 section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="gold-divider mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl italic mb-5">{t("about.mission.h2")}</h2>
            <p className="text-muted-foreground font-body leading-relaxed">{t("about.mission.desc")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-2">{t(item.titleKey)}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{t(item.descKey)}</p>
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
