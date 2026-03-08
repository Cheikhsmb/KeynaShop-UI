import { motion } from "framer-motion";
import { MessageCircle, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+221 XX XXX XX XX",
    href: "https://wa.me/221XXXXXXXXX",
    description: "Réponse rapide, du lundi au samedi",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@keyna.sn",
    href: "https://instagram.com/keyna.sn",
    description: "Suivez nos nouveautés et inspirations",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@keyna.sn",
    href: "mailto:contact@keyna.sn",
    description: "Pour les demandes professionnelles",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Dakar, Sénégal",
    href: "#",
    description: "Visitez notre boutique",
  },
];

const Contact = () => {
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
            <h1 className="font-display text-4xl md:text-6xl italic mb-6">Contactez-Nous</h1>
            <p className="text-primary-foreground/75 font-body text-base md:text-lg leading-relaxed">
              Une question, une commande spéciale ou simplement envie de dire bonjour ? Nous sommes là pour vous.
            </p>
          </motion.div>
        </section>

        <section className="py-20 md:py-28 section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 mb-4">
                  <method.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-1">{method.label}</h3>
                <p className="text-foreground font-body text-sm font-medium mb-1">{method.value}</p>
                <p className="text-muted-foreground font-body text-xs">{method.description}</p>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
