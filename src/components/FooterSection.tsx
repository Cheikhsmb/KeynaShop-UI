import { Instagram, Facebook, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 md:py-20 section-padding border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-2xl italic tracking-tight mb-4 block">KEYNA</Link>
          <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
            Elegance curated from around the world. Visit our boutique in Dakar or shop conveniently online with delivery across Senegal.
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.15em] mb-4 text-foreground font-semibold">
            Navigation
          </h4>
          <ul className="space-y-2">
            {[
              { label: "About", href: "/about" },
              { label: "FAQ", href: "/faq" },
              { label: "Livraison", href: "/delivery" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors font-body">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.15em] mb-4 text-foreground font-semibold">
            Get In Touch
          </h4>
          <div className="flex gap-4 mb-4">
            {[Instagram, Facebook, Phone].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Social media"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm font-body">contact@keyna.sn</p>
          <p className="text-muted-foreground text-sm font-body mt-1">Dakar, Sénégal</p>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-xs font-body">
          © 2026 KEYNA. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          {["Politique de confidentialité", "Conditions générales"].map((item) => (
            <a key={item} href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors font-body">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
