import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocalizedTitle } from "@/i18n/localize";
import allProducts, { CATEGORY_KEYS, type Category } from "@/data/products";
import { toast } from "sonner";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = (searchParams.get("category") ?? "all") as Category | "all";
  const { t, lang } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);

  const filtered =
    categoryParam === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === categoryParam);

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    const defaultVariant = product.variants?.[0];
    addItem({
      product,
      variantId: defaultVariant?.id ?? `${product.id}-default`,
      variantLabel: defaultVariant?.label ?? "Default",
      price: product.price,
      quantity: 1,
    });
    toast.success(t("product.added"), {
      description: getLocalizedTitle(product, lang),
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20 section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="gold-divider mx-auto mb-5" />
          <h1 className="font-display text-3xl md:text-5xl italic mb-3">{t("shop.title")}</h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">{t("shop.desc")}</p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {CATEGORY_KEYS.map(({ value, labelKey }) => (
            <button
              key={value}
              id={`cat-${value}`}
              onClick={() =>
                setSearchParams(value === "all" ? {} : { category: value })
              }
              className={`px-4 py-2 rounded-full font-body text-xs uppercase tracking-[0.12em] border transition-all duration-200 ${
                categoryParam === value
                  ? "bg-accent text-accent-foreground border-accent shadow-sm"
                  : "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBagIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body text-lg">{t("shop.empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filtered.map((product, index) => {
              const title = getLocalizedTitle(product, lang);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/product/${product.handle}`} className="group block">
                    <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-3">
                      <img
                        src={product.image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                    </div>
                    <h3 className="font-display text-sm md:text-base italic mb-0.5 group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm font-body mb-2">
                      {product.price.toLocaleString()} FCFA
                    </p>
                    <Button
                      variant="hero-outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full text-[10px]"
                    >
                      {t("shop.addCart")}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default Shop;
