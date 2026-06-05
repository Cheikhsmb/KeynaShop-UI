import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const TESTIMONIALS = [
  {
    name: "Fatou D.",
    location: "Dakar",
    fr: "Les abayas de KEYNA sont d'une qualité exceptionnelle. Les broderies sont magnifiques et le tissu est très agréable. Je recommande à 100% !",
    en: "KEYNA's abayas are of exceptional quality. The embroideries are magnificent and the fabric is very pleasant. I recommend 100%!",
    ar: "عباءات كيينا ذات جودة استثنائية. التطريز رائع والقماش لطيف جداً. أوصي بها 100%!",
    rating: 5,
  },
  {
    name: "Aminata S.",
    location: "Thiès",
    fr: "J'ai commandé un parfum et un sac pour le mariage de ma sœur. L'emballage était soigné et la livraison rapide. Merci KEYNA !",
    en: "I ordered a perfume and a bag for my sister's wedding. The packaging was careful and the delivery fast. Thank you KEYNA!",
    ar: "طلبت عطراً وحقيبة لحفل زفاف أختي. كان التغليف دقيقاً والتوصيل سريعاً. شكراً كيينا!",
    rating: 5,
  },
  {
    name: "Mariama B.",
    location: "Dakar",
    fr: "Le service client est incroyable. Ils m'ont aidée à choisir le parfait cadeau via WhatsApp. Une expérience vraiment personnalisée.",
    en: "The customer service is incredible. They helped me choose the perfect gift via WhatsApp. A truly personalised experience.",
    ar: "خدمة العملاء لا تصدق. ساعدوني في اختيار الهدية المثالية عبر واتساب. تجربة شخصية حقاً.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 md:py-28 section-padding bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="gold-divider mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-5xl italic mb-3">{t("testimonials.title")}</h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">{t("testimonials.desc")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TESTIMONIALS.map((item, index) => {
          const text = lang === "en" ? item.en : lang === "ar" ? item.ar : item.fr;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-background border border-border rounded-lg p-6"
            >
              <Quote className="w-6 h-6 text-accent/40 mb-3" />
              <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{text}"</p>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-display text-sm italic">{item.name}</p>
              <p className="text-muted-foreground font-body text-xs">{item.location}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsSection;
