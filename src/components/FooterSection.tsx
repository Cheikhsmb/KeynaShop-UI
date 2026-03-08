import { Instagram, Twitter, Facebook } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 md:py-20 section-padding border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
        <div className="md:col-span-2">
          <h3 className="text-display text-2xl tracking-tighter mb-4">MODERNO</h3>
          <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
            Contemporary fashion for the modern individual. Visit us in-store or shop online.
          </p>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-widest mb-4 text-foreground">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {["Collections", "New Arrivals", "About Us", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors font-body"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-widest mb-4 text-foreground">
            Connect
          </h4>
          <div className="flex gap-4 mb-4">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
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
          <p className="text-muted-foreground text-sm font-body">hello@moderno.com</p>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-xs font-body">
          © 2026 MODERNO. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground text-xs hover:text-foreground transition-colors font-body"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
