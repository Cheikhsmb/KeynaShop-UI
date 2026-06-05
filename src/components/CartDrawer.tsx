import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { WHATSAPP_NUMBER } from "@/data/products";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { t, lang } = useLanguage();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const lines = items.map((item) => {
      const title =
        lang === "en"
          ? item.product.titleEn
          : lang === "ar"
          ? item.product.titleAr
          : item.product.title;
      return `• ${title}${item.variantLabel !== "Default" ? ` (${item.variantLabel})` : ""} x${item.quantity} — ${(item.price * item.quantity).toLocaleString()} FCFA`;
    });

    const msg =
      t("cart.waMsg") +
      lines.join("\n") +
      `\n${t("cart.waTotal")} : ${totalPrice.toLocaleString()} FCFA` +
      t("cart.waThanks");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    clearCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" id="cart-trigger">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display italic">{t("cart.title")}</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? t("cart.empty")
              : `${totalItems} ${t("cart.items")}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body">{t("cart.empty")}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const title =
                      lang === "en"
                        ? item.product.titleEn
                        : lang === "ar"
                        ? item.product.titleAr
                        : item.product.title;
                    return (
                      <div key={item.variantId} className="flex gap-4 p-2 border border-border rounded-lg">
                        <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm italic truncate">{title}</h4>
                          {item.variantLabel !== "Default" && (
                            <p className="text-xs text-muted-foreground font-body">
                              {item.variantLabel}
                            </p>
                          )}
                          <p className="font-body font-semibold text-sm mt-1">
                            {(item.price * item.quantity).toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-body">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4 pt-4 border-t mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg italic">{t("cart.total")}</span>
                  <span className="font-body text-xl font-bold">
                    {totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
                <Button
                  onClick={handleWhatsAppOrder}
                  variant="hero"
                  className="w-full bg-[#25D366] hover:bg-[#20b857] text-white border-0"
                  size="lg"
                  id="whatsapp-order-btn"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("cart.orderWA")}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
