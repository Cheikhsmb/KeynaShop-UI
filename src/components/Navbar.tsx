import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import keynaLogo from "@/assets/keyna-logo.png";
import { Menu, X, ChevronDown, Globe, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/CartDrawer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/i18n/ThemeContext";
import type { Lang } from "@/i18n/translations";

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
];

const SHOP_CAT_KEYS = [
  "nav.cat.abayas",
  "nav.cat.perfumes",
  "nav.cat.bags",
  "nav.cat.jewelry",
  "nav.cat.thiouraye",
  "nav.cat.fabrics",
  "nav.cat.home",
  "nav.cat.scrunchies",
  "nav.cat.new",
] as const;

const CAT_VALUES = [
  "abayas",
  "perfumes",
  "bags",
  "jewelry",
  "thiouraye",
  "fabrics",
  "home",
  "scrunchies",
  "new-arrivals",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.about", href: "/about" },
    { labelKey: "nav.contact", href: "/contact" },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="section-padding flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <img src={keynaLogo} alt="KEYNA" className="h-12 md:h-16" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="font-body text-[13px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1">
              {t("nav.shop")}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-52 bg-background border border-border rounded-lg shadow-lg py-2"
                >
                  {SHOP_CAT_KEYS.map((key, i) => (
                    <Link
                      key={key}
                      to={`/shop${CAT_VALUES[i] === "new-arrivals" ? "" : `?category=${CAT_VALUES[i]}`}`}
                      className="block px-4 py-2 font-body text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setShopOpen(false)}
                    >
                      {t(key)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.labelKey}
              to={link.href}
              className="font-body text-[13px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t(link.labelKey)}
            </Link>
          ))}

          <CartDrawer />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-10 w-10"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {/* Language Switcher */}
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              id="lang-switcher"
              className="flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("nav.lang")}
            >
              <Globe className="w-4 h-4" />
              <span className="text-base leading-none">{currentLang.flag}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg py-1 overflow-hidden"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      id={`lang-${l.code}`}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 font-body text-sm transition-colors ${
                        lang === l.code
                          ? "bg-accent/15 text-foreground font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/shop">
            <Button variant="hero" size="sm">{t("nav.shopNow")}</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mt-1">
                {t("nav.shop")}
              </p>
              {SHOP_CAT_KEYS.map((key, i) => (
                <Link
                  key={key}
                  to={`/shop${CAT_VALUES[i] === "new-arrivals" ? "" : `?category=${CAT_VALUES[i]}`}`}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors pl-3"
                >
                  {t(key)}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              {navLinks.map((link) => (
                <Link
                  key={link.labelKey}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              {/* Mobile Theme Toggle */}
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                {t("nav.theme")}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (theme !== "light") toggleTheme();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-body text-xs transition-all ${
                    theme === "light"
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  <span>{t("nav.theme.light")}</span>
                </button>
                <button
                  onClick={() => {
                    if (theme !== "dark") toggleTheme();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-body text-xs transition-all ${
                    theme === "dark"
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>{t("nav.theme.dark")}</span>
                </button>
              </div>

              {/* Mobile Language Switcher */}
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                {t("nav.lang")}
              </p>
              <div className="flex gap-2 flex-wrap">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    id={`mobile-lang-${l.code}`}
                    onClick={() => {
                      setLang(l.code);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-body text-xs transition-all ${
                      lang === l.code
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>

              <div className="h-px bg-border my-2" />

              <Link to="/shop" onClick={() => setIsOpen(false)}>
                <Button variant="hero" size="sm" className="w-fit mt-2">
                  {t("nav.shopNow")}
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
