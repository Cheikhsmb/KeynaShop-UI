import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { getProductByHandle, WHATSAPP_NUMBER, type Product } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (handle) {
      const found = getProductByHandle(handle);
      setProduct(found ?? null);
      setSelectedVariantIndex(0);
      setSelectedImage(0);
    }
  }, [handle]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground font-body">{t("product.notFound")}</p>
          <Link to="/shop">
            <Button variant="hero-outline">{t("product.backShop")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title =
    lang === "en" ? product.titleEn : lang === "ar" ? product.titleAr : product.title;
  const description =
    lang === "en"
      ? product.descriptionEn
      : lang === "ar"
      ? product.descriptionAr
      : product.description;

  const variant = product.variants?.[selectedVariantIndex];
  const isAvailable = variant?.available ?? true;

  const handleAddToCart = () => {
    addItem({
      product,
      variantId: variant?.id ?? `${product.id}-default`,
      variantLabel: variant?.label ?? "Default",
      price: product.price,
      quantity: 1,
    });
    toast.success(t("product.added"), { description: title, position: "top-center" });
  };

  const handleOrderWhatsApp = () => {
    const msg = `${t("cart.waMsg")}• ${title}${variant && variant.label !== "Default" ? ` (${variant.label})` : ""} x1 — ${product.price.toLocaleString()} FCFA${t("cart.waThanks")}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20 section-padding">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t("product.back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage] ?? product.image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      i === selectedImage ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="gold-divider mb-4" />
            <h1 className="font-display text-3xl md:text-4xl italic mb-3">{title}</h1>
            <p className="font-body text-2xl font-bold text-accent mb-6">
              {product.price.toLocaleString()} FCFA
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">{description}</p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => v.available && setSelectedVariantIndex(i)}
                      disabled={!v.available}
                      className={`px-4 py-2 rounded-md border font-body text-sm transition-colors ${
                        i === selectedVariantIndex
                          ? "border-accent bg-accent/10 text-foreground"
                          : v.available
                          ? "border-border text-muted-foreground hover:border-foreground"
                          : "border-border text-muted-foreground/40 cursor-not-allowed line-through"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="hero"
                size="lg"
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="flex-1"
                id="add-to-cart-btn"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAvailable ? t("product.addCart") : t("product.outOfStock")}
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                onClick={handleOrderWhatsApp}
                className="flex-1 bg-[#25D366]/10 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                id="whatsapp-direct-btn"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("product.orderWA")}
              </Button>
            </div>
            {!isAvailable && (
              <p className="text-destructive font-body text-sm mt-2">{t("product.outOfStock")}</p>
            )}
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductDetail;
