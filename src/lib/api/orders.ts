import { supabase } from "@/lib/supabase";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export interface DbOrder {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  status: OrderStatus;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_handle: string;
  product_title: string;
  variant_label: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export type OrderWithItems = DbOrder & { items: DbOrderItem[] };

export async function fetchOrders(): Promise<OrderWithItems[]> {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const orderIds = (orders ?? []).map((o) => o.id);

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (itemsError) throw itemsError;

  const itemsByOrderId: Record<string, DbOrderItem[]> = {};
  for (const item of items ?? []) {
    if (!itemsByOrderId[item.order_id]) itemsByOrderId[item.order_id] = [];
    itemsByOrderId[item.order_id].push(item);
  }

  return (orders ?? []).map((order) => ({
    ...order,
    items: itemsByOrderId[order.id] ?? [],
  }));
}

export async function fetchOrderById(id: string): Promise<OrderWithItems | null> {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  if (itemsError) throw itemsError;

  return { ...order, items: items ?? [] };
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export interface CreateOrderInput {
  customer_name: string;
  phone: string;
  address: string;
  notes?: string;
  items: {
    product_id: string;
    product_handle: string;
    product_title: string;
    variant_label: string;
    quantity: number;
    unit_price: number;
  }[];
}

export async function createOrder(input: CreateOrderInput) {
  const total = input.items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: input.customer_name,
      phone: input.phone,
      address: input.address,
      notes: input.notes ?? null,
      total,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_handle: item.product_handle,
    product_title: item.product_title,
    variant_label: item.variant_label,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}

export async function getOrderStats() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("status, total");

  if (error) throw error;

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
  };

  return stats;
}
