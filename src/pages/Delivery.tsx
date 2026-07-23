import { motion } from "framer-motion";
import { TruckIcon, ClockIcon, CreditCardIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/i18n/LanguageContext";

const Delivery = () => {
  const { t } = useLanguage();

  const deliveryInfo = [
    {
      icon: TruckIcon,
      titleKey: "delivery.z.title",
      details: ["delivery.z.d1", "delivery.z.d2"],
    },
    {
      icon: ClockIcon,
      titleKey: "delivery.t.title",
      details: ["delivery.t.d1", "delivery.t.d2"],
    },
    {
      icon: CreditCardIcon,
      titleKey: "delivery.p.title",
      details: ["delivery.p.d1", "delivery.p.d2", "delivery.p.d3"],
    },
    {
      icon: ShieldCheckIcon,
      titleKey: "delivery.g.title",
      details: ["delivery.g.d1", "delivery.g.d2", "delivery.g.d3"],
    },
  ] as const;

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
            <h1 className="font-display text-4xl md:text-6xl italic mb-6">{t("delivery.h1")}</h1>
            <p className="text-primary-foreground/75 font-body text-base md:text-lg leading-relaxed">
              {t("delivery.intro")}
            </p>
          </motion.div>
        </section>

        <section className="py-20 md:py-28 section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {deliveryInfo.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border rounded-lg p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-3">{t(item.titleKey)}</h3>
                <ul className="space-y-2">
                  {item.details.map((key) => (
                    <li key={key} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
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

export default Delivery;
