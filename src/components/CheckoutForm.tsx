import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  onSubmit: (data: { customer_name: string; phone: string; address: string; notes?: string }) => Promise<boolean>;
  onCancel: () => void;
  total: number;
  serverError?: string | null;
}

const CheckoutForm = ({ onSubmit, onCancel, total, serverError }: Props) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    const ok = await onSubmit({
      customer_name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim() || undefined,
    });
    if (!ok) {
      setError("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-base italic">
        {t("checkout.title") ?? "Confirm Your Order"}
      </h3>

      <div>
        <label className="block text-xs text-muted-foreground font-body mb-1">
          {t("checkout.name") ?? "Full Name"} *
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
          placeholder={t("checkout.namePlaceholder") ?? "Your name"}
        />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground font-body mb-1">
          {t("checkout.phone") ?? "Phone Number"} *
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
          placeholder={t("checkout.phonePlaceholder") ?? "+221 77 XXX XX XX"}
        />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground font-body mb-1">
          {t("checkout.address") ?? "Delivery Address"} *
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent resize-none"
          placeholder={t("checkout.addressPlaceholder") ?? "Address in Dakar or region"}
        />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground font-body mb-1">
          {t("checkout.notes") ?? "Notes (optional)"}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent resize-none"
          placeholder={t("checkout.notesPlaceholder") ?? "Any special instructions"}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="font-display text-sm italic">
          {t("cart.total") ?? "Total"}: <strong>{total.toLocaleString()} FCFA</strong>
        </span>
      </div>

      {(error || serverError) && (
        <p className="text-destructive text-xs font-body">{serverError || error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-lg bg-accent text-accent-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading
            ? (t("checkout.submitting") ?? "Placing order…")
            : (t("checkout.submit") ?? "Place Order")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors disabled:opacity-50"
        >
          {t("checkout.cancel") ?? "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
