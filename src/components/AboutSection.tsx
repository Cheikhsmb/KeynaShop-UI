import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 section-padding bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent mb-3">
            Our Philosophy
          </p>
          <h2 className="text-display text-3xl md:text-5xl text-primary-foreground mb-8">
            Fashion That Speaks
          </h2>
          <p className="text-primary-foreground/70 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            We believe style is personal. Every piece in our collection is designed to empower 
            self-expression — blending contemporary silhouettes with quality craftsmanship. 
            From the streets to the spotlight, we dress the bold.
          </p>
          <div className="flex justify-center gap-12 mt-12">
            {[
              { number: "500+", label: "Products" },
              { number: "15K", label: "Customers" },
              { number: "4.9", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-display text-2xl md:text-3xl text-accent">
                  {stat.number}
                </p>
                <p className="text-primary-foreground/50 text-xs uppercase tracking-widest font-display mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
