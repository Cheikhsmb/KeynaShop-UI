import { motion } from "framer-motion";
import { Truck, Clock, CreditCard, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const deliveryInfo = [
  {
    icon: Truck,
    title: "Zones de Livraison",
    details: [
      "Dakar et banlieue : livraison disponible",
      "Régions du Sénégal : livraison par transporteur",
    ],
  },
  {
    icon: Clock,
    title: "Délais de Livraison",
    details: [
      "Dakar : 24 à 48 heures",
      "Autres régions : 3 à 5 jours ouvrables",
    ],
  },
  {
    icon: CreditCard,
    title: "Modes de Paiement",
    details: [
      "Espèces à la livraison",
      "Orange Money & Wave",
      "Virement bancaire",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Garanties",
    details: [
      "Échange sous 48h (état d'origine)",
      "Produits authentiques et importés",
      "Emballage soigné et sécurisé",
    ],
  },
];

const Delivery = () => {
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
            <h1 className="font-display text-4xl md:text-6xl italic mb-6">Livraison & Paiement</h1>
            <p className="text-primary-foreground/75 font-body text-base md:text-lg leading-relaxed">
              Tout savoir sur nos options de livraison et moyens de paiement.
            </p>
          </motion.div>
        </section>

        <section className="py-20 md:py-28 section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {deliveryInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border rounded-lg p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.details.map((detail, j) => (
                    <li key={j} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                      {detail}
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
