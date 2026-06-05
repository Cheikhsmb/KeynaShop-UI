import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const emailSchema = z
    .string()
    .trim()
    .email({ message: t("newsletter.invalid.email") })
    .max(255, { message: t("newsletter.email.long") });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: t("newsletter.error.title"), description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast({ title: t("newsletter.success.title"), description: t("newsletter.success.desc") });
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
        <h2 className="font-display text-2xl md:text-4xl italic mb-3">{t("newsletter.title")}</h2>
        <p className="text-muted-foreground font-body text-sm md:text-base mb-8">{t("newsletter.desc")}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background font-body"
            required
            maxLength={255}
          />
          <Button variant="hero" type="submit" disabled={loading} className="shrink-0">
            {loading ? "..." : t("newsletter.btn")}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
