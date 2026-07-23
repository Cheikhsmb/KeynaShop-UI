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
import { ShoppingBagIcon, MinusIcon, PlusIcon, TrashIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSubmitOrder } from "@/hooks/useSubmitOrder";
import CheckoutForm from "@/components/CheckoutForm";
import WhatsAppButton from "@/components/WhatsAppButton";

type View = "cart" | "checkout" | "success";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("cart");
  const { items, updateQuantity, removeItem } = useCartStore();
  const { t, lang } = useLanguage();
  const { submit, submitting, error } = useSubmitOrder();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async (data: { customer_name: string; phone: string; address: string; notes?: string }) => {
    const ok = await submit(data);
    if (ok) {
      setView("success");
    }
    return ok;
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setView("cart"), 300);
  };

  const getTitle = (item: { product: { title: string; titleEn: string; titleAr: string }; variantLabel: string }) => {
    return lang === "en"
      ? item.product.titleEn
      : lang === "ar"
      ? item.product.titleAr
      : item.product.title;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setTimeout(() => setView("cart"), 300);
    }}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" id="cart-trigger">
          <ShoppingBagIcon className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display italic">
            {view === "checkout"
              ? (t("checkout.title") ?? "Checkout")
              : view === "success"
              ? (t("checkout.success") ?? "Order Placed!")
              : t("cart.title")}
          </SheetTitle>
          <SheetDescription>
            {view === "cart" && totalItems > 0 && `${totalItems} ${t("cart.items")}`}
            {view === "cart" && totalItems === 0 && t("cart.empty")}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {view === "cart" && items.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body">{t("cart.empty")}</p>
              </div>
            </div>
          )}

          {view === "cart" && items.length > 0 && (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const title = getTitle(item);
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
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <MinusIcon className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-body">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <PlusIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-3 pt-4 border-t mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg italic">{t("cart.total")}</span>
                  <span className="font-body text-xl font-bold">
                    {totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
                <Button
                  onClick={() => setView("checkout")}
                  variant="hero"
                  className="w-full"
                  size="lg"
                >
                  <ShoppingBagIcon className="w-5 h-5 mr-2" />
                  Commander
                </Button>
              </div>
            </>
          )}

          {view === "checkout" && (
            <div className="flex-1 overflow-y-auto pr-2 min-h-0">
              <CheckoutForm
                onSubmit={handlePlaceOrder}
                onCancel={() => setView("cart")}
                total={totalPrice}
                serverError={error}
              />
            </div>
          )}

          {view === "success" && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" weight="fill" />
                <h3 className="font-display text-xl italic mb-2">
                  {t("checkout.success") ?? "Order Placed!"}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-6">
                  {t("checkout.successDesc") ?? "We'll contact you shortly to confirm your order."}
                </p>
                <Button onClick={handleClose} variant="hero" className="w-full">
                  {t("checkout.continue") ?? "Continue Shopping"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
