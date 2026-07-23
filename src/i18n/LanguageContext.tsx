import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("keyna-lang");
    if (saved === "fr" || saved === "en" || saved === "ar") return saved;
    return "fr";
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("keyna-lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.fr[key] ?? key;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
