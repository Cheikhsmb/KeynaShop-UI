import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    if (handle) fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIndex]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Ajouté au panier", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground font-body">Produit non trouvé</p>
          <Link to="/shop">
            <Button variant="hero-outline">Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const variant = product.variants.edges[selectedVariantIndex]?.node;
  const price = variant?.price;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20 section-padding">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
              {images[selectedImage] && (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${i === selectedImage ? 'border-accent' : 'border-transparent'}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col">
            <div className="gold-divider mb-4" />
            <h1 className="font-display text-3xl md:text-4xl italic mb-3">{product.title}</h1>
            {price && (
              <p className="font-body text-2xl font-bold text-accent mb-6">
                {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
              </p>
            )}
            <p className="text-muted-foreground font-body leading-relaxed mb-8">{product.description}</p>

            {/* Variant selector */}
            {product.options.length > 0 && product.options[0].name !== "Title" && (
              <div className="mb-8">
                {product.options.map((option) => (
                  <div key={option.name} className="mb-4">
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variantIdx = product.variants.edges.findIndex(v =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        );
                        const isSelected = product.variants.edges[selectedVariantIndex]?.node.selectedOptions.some(
                          o => o.name === option.name && o.value === value
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => variantIdx >= 0 && setSelectedVariantIndex(variantIdx)}
                            className={`px-4 py-2 rounded-md border font-body text-sm transition-colors ${
                              isSelected ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-foreground'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="hero"
              size="lg"
              onClick={handleAddToCart}
              disabled={isCartLoading || !variant?.availableForSale}
              className="w-full md:w-auto"
            >
              {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-2" />Ajouter au panier</>}
            </Button>
            {variant && !variant.availableForSale && (
              <p className="text-destructive font-body text-sm mt-2">Rupture de stock</p>
            )}
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductDetail;
