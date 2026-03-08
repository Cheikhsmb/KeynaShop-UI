import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const faqs = [
  {
    question: "Livrez-vous à Dakar ?",
    answer: "Oui ! Nous livrons partout à Dakar et dans les environs. La livraison est également disponible dans tout le Sénégal.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Les commandes à Dakar sont livrées sous 24 à 48 heures. Pour les autres régions du Sénégal, comptez 3 à 5 jours ouvrables.",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons le paiement en espèces à la livraison, les transferts Orange Money et Wave, ainsi que les virements bancaires.",
  },
  {
    question: "Puis-je retourner ou échanger un produit ?",
    answer: "Les échanges sont possibles sous 48 heures si le produit est dans son état d'origine. Les parfums et produits cosmétiques ne sont ni échangeables ni remboursables pour des raisons d'hygiène.",
  },
  {
    question: "D'où proviennent vos produits ?",
    answer: "Nos produits sont importés de Dubaï, Turquie, Thaïlande, Malaisie et Chine. Chaque pièce est soigneusement sélectionnée pour sa qualité et son élégance.",
  },
  {
    question: "Comment passer commande ?",
    answer: "Vous pouvez passer commande directement via notre WhatsApp ou Instagram. Envoyez-nous simplement une photo du produit qui vous intéresse et nous vous guiderons.",
  },
  {
    question: "Proposez-vous des cadeaux emballés ?",
    answer: "Oui ! Nous proposons un service d'emballage cadeau élégant, parfait pour les mariages, anniversaires et célébrations.",
  },
];

const FAQ = () => {
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
            <h1 className="font-display text-4xl md:text-6xl italic mb-6">Questions Fréquentes</h1>
            <p className="text-primary-foreground/75 font-body text-base md:text-lg leading-relaxed">
              Tout ce que vous devez savoir avant de commander.
            </p>
          </motion.div>
        </section>

        <section className="py-20 md:py-28 section-padding">
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <AccordionItem value={`item-${i}`}>
                    <AccordionTrigger className="font-display text-left text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-body leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default FAQ;
