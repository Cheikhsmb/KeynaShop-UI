// Supabase Edge Function — new-order-notification
// Triggered by a Database Webhook on INSERT to public.orders
// Sends a Telegram notification to the admin

import { createClient } from "jsr:@supabase/supabase-js@2";

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: {
    id: string;
    customer_name: string;
    phone: string;
    address: string;
    status: string;
    total: number;
    notes: string | null;
    created_at: string;
  };
}

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

Deno.serve(async (req) => {
  // Verify auth
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${Deno.env.get("SUPABASE_WEBHOOK_SECRET")}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload: WebhookPayload = await req.json();
  const order = payload.record;

  // Fetch order items
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: items } = await supabase
    .from("order_items")
    .select("product_title, variant_label, quantity, unit_price")
    .eq("order_id", order.id);

  const itemsList = (items ?? [])
    .map(
      (item) =>
        `• ${item.product_title}${item.variant_label !== "Default" ? ` (${item.variant_label})` : ""} x${item.quantity} — ${(item.quantity * Number(item.unit_price)).toLocaleString()} FCFA`,
    )
    .join("\n");

  const message = [
    `🛍️ *Nouvelle commande #${order.id.slice(0, 8)}*`,
    ``,
    `👤 *Client :* ${order.customer_name}`,
    `📞 *Téléphone :* ${order.phone}`,
    `📍 *Adresse :* ${order.address}`,
    ``,
    `*Articles :*`,
    itemsList,
    ``,
    `💰 *Total :* ${Number(order.total).toLocaleString()} FCFA`,
    order.notes ? `\n📝 *Notes :* ${order.notes}` : "",
    `\n🕐 ${new Date(order.created_at).toLocaleString("fr-SN")}`,
  ].join("\n");

  // Send to Telegram
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const telegramRes = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  if (!telegramRes.ok) {
    const err = await telegramRes.text();
    console.error("Telegram API error:", err);
    return new Response(`Telegram error: ${err}`, { status: 500 });
  }

  return new Response("OK", { status: 200 });
});
