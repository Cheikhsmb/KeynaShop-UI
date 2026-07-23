import { useState } from "react";
import { createOrder, type CreateOrderInput } from "@/lib/api/orders";
import { useCartStore } from "@/stores/cartStore";

export function useSubmitOrder() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  const submit = async (input: Omit<CreateOrderInput, "items">) => {
    setSubmitting(true);
    setError(null);

    const items = useCartStore.getState().items;

    if (items.length === 0) {
      setError("Cart is empty");
      setSubmitting(false);
      return;
    }

    try {
      await createOrder({
        ...input,
        items: items.map((item) => ({
          product_id: item.product.id,
          product_handle: item.product.handle,
          product_title: item.product.title,
          variant_label: item.variantLabel,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      });

      clearCart();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submit: submit as (input: Omit<CreateOrderInput, "items">) => Promise<boolean>, submitting, error };
}
