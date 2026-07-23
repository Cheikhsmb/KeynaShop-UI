import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { WHATSAPP_NUMBER } from "@/data/products";

const SOCIALS = [
  { Icon: SiInstagram, href: "https://instagram.com/keyna.sn", label: "Instagram" },
  { Icon: SiWhatsapp, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp" },
];

const FooterSection = () => {
  const { t } = useLanguage();

  const navLinks = [
    { labelKey: "footer.about", href: "/about" },
    { labelKey: "footer.faq", href: "/faq" },
    { labelKey: "footer.delivery", href: "/delivery" },
    { labelKey: "footer.contact", href: "/contact" },
  ] as const;

  return (
    <footer id="contact" className="py-16 md:py-20 section-padding border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-2xl italic tracking-tight mb-4 block">KEYNA</Link>
          <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.15em] mb-4 text-foreground font-semibold">
            {t("footer.nav")}
          </h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.labelKey}>
                <Link to={link.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors font-body">
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs uppercase tracking-[0.15em] mb-4 text-foreground font-semibold">
            {t("footer.touch")}
          </h4>
          <div className="flex gap-4 mb-4">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label={label}
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
        <p className="text-muted-foreground text-xs font-body">{t("footer.copyright")}</p>
        <div className="flex gap-6">
          {(["footer.privacy", "footer.terms"] as const).map((key) => (
            <a key={key} href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors font-body">
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
