import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import keynaLogo from "@/assets/keyna-logo.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/CartDrawer";

const shopLinks = [
  { label: "Abayas & Veils", href: "#collections" },
  { label: "Perfumes", href: "#collections" },
  { label: "Bags", href: "#collections" },
  { label: "Jewelry", href: "#collections" },
  { label: "Thiouraye & Essences", href: "#collections" },
  { label: "Fabrics", href: "#collections" },
  { label: "Home & Tableware", href: "#collections" },
  { label: "Scrunchies & Hats", href: "#collections" },
  { label: "New Arrivals", href: "#new-arrivals" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="section-padding flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <img src={keynaLogo} alt="KEYNA" className="h-12 md:h-16" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="font-body text-[13px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1">
              Shop
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2"
                >
                  {shopLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block px-4 py-2 font-body text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-[13px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <CartDrawer />
          <Link to="/shop">
            <Button variant="hero" size="sm">
              Shop Now
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="section-padding py-6 flex flex-col gap-3">
              {/* Shop section */}
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mt-1">Shop</p>
              {shopLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors pl-3"
                >
                  {link.label}
                </a>
              ))}

              <div className="h-px bg-border my-2" />

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/shop" onClick={() => setIsOpen(false)}>
                <Button variant="hero" size="sm" className="w-fit mt-2">
                  Shop Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
