import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Veuillez entrer une adresse email valide." })
  .max(255, { message: "L'email est trop long." });

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Erreur", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Merci !", description: "Vous êtes inscrit(e) à notre newsletter." });
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-20 md:py-28 section-padding bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-center"
      >
        <div className="gold-divider mx-auto mb-5" />
        <h2 className="font-display text-2xl md:text-4xl italic mb-3">
          Restez Inspirée
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base mb-8">
          Inscrivez-vous pour recevoir nos nouveautés, offres exclusives et inspirations directement dans votre boîte mail.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background font-body"
            required
            maxLength={255}
          />
          <Button variant="hero" type="submit" disabled={loading} className="shrink-0">
            {loading ? "..." : "S'inscrire"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
