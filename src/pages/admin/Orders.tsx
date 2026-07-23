import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { fetchOrders, type OrderWithItems, type OrderStatus } from "@/lib/api/orders";

const STATUS_BADGE: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

const Orders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? orders
    : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl italic">Orders</h1>
            <p className="text-muted-foreground font-body text-sm">
              Manage customer orders
            </p>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "pending", "confirmed", "shipped", "delivered"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-body border transition-colors ${
                filter === s
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-accent/50"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABEL[s]} ({counts[s]})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground font-body text-center py-20">
            No orders found.
          </p>
        ) : (
          <div className="bg-background rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Order
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Phone
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Items
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="font-mono text-xs text-accent hover:underline"
                        >
                          #{order.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-body">{order.customer_name}</td>
                      <td className="px-4 py-3 font-body text-muted-foreground">
                        {order.phone}
                      </td>
                      <td className="px-4 py-3 font-body">
                        {order.items.length} item(s)
                      </td>
                      <td className="px-4 py-3 font-body font-medium">
                        {Number(order.total).toLocaleString()} FCFA
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider ${STATUS_BADGE[order.status]}`}
                        >
                          {STATUS_LABEL[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground font-body">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
