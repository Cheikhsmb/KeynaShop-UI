import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { fetchOrders, getOrderStats, type OrderWithItems } from "@/lib/api/orders";
import {
  ShoppingBagIcon,
  PackageIcon,
  CurrencyCircleDollarIcon,
  ClockIcon,
  ArrowRightIcon,
  TrendUpIcon,
  UsersIcon,
} from "@phosphor-icons/react";

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  revenue: number;
}

const STAT_CARDS = [
  {
    label: "Total Orders",
    key: "total" as const,
    icon: ShoppingBagIcon,
    gradient: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightIcon: "text-blue-600",
  },
  {
    label: "Pending",
    key: "pending" as const,
    icon: ClockIcon,
    gradient: "from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    lightIcon: "text-amber-600",
  },
  {
    label: "Shipped",
    key: "shipped" as const,
    icon: PackageIcon,
    gradient: "from-purple-500 to-purple-600",
    lightBg: "bg-purple-50",
    lightIcon: "text-purple-600",
  },
  {
    label: "Revenue",
    key: "revenue" as const,
    icon: CurrencyCircleDollarIcon,
    gradient: "from-green-500 to-green-600",
    lightBg: "bg-green-50",
    lightIcon: "text-green-600",
    format: (v: number) => `${v.toLocaleString()} FCFA`,
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrderStats(), fetchOrders()])
      .then(([s, orders]) => {
        setStats(s);
        setRecentOrders(orders.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <ShoppingBagIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-body">
            No orders yet.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-accent rounded-full" />
            <div>
              <h1 className="font-display text-3xl italic">Dashboard</h1>
              <p className="text-muted-foreground font-body text-sm">
                Your business at a glance
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            const value = stats[card.key];
            const displayValue = card.format
              ? card.format(value as number)
              : (value as number).toLocaleString();

            return (
              <div
                key={card.key}
                className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${card.gradient}`} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${card.lightBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.lightIcon}`} weight="fill" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-body tracking-tight">
                    {displayValue}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    {card.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {/* Status breakdown */}
          <div className="lg:col-span-2 bg-background rounded-2xl border border-border p-6">
            <h3 className="font-display text-base italic mb-6 flex items-center gap-2">
              <TrendUpIcon className="w-4 h-4 text-muted-foreground" weight="bold" />
              Order Status Overview
            </h3>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {([
                { label: "Pending", key: "pending" as const, color: "bg-amber-500", textColor: "text-amber-600", bgColor: "bg-amber-50" },
                { label: "Confirmed", key: "confirmed" as const, color: "bg-blue-500", textColor: "text-blue-600", bgColor: "bg-blue-50" },
                { label: "Shipped", key: "shipped" as const, color: "bg-purple-500", textColor: "text-purple-600", bgColor: "bg-purple-50" },
                { label: "Delivered", key: "delivered" as const, color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-50" },
              ] as const).map((item) => {
                const count = stats[item.key];
                return (
                  <div key={item.key} className={`${item.bgColor} rounded-xl p-4 text-center`}>
                    <p className={`text-2xl font-bold font-body ${item.textColor}`}>
                      {count}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mt-0.5">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Progress bars */}
            <div className="space-y-4">
              {([
                { label: "Pending", key: "pending" as const, color: "bg-amber-500" },
                { label: "Confirmed", key: "confirmed" as const, color: "bg-blue-500" },
                { label: "Shipped", key: "shipped" as const, color: "bg-purple-500" },
                { label: "Delivered", key: "delivered" as const, color: "bg-green-500" },
              ] as const).map((item) => {
                const count = stats[item.key];
                const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={item.key}>
                    <div className="flex justify-between text-xs font-body mb-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{Math.round(pct)}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${item.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions + summary */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20 p-6">
              <h3 className="font-display text-base italic mb-1">Quick Actions</h3>
              <p className="text-xs text-muted-foreground font-body mb-5">
                Common tasks
              </p>
              <div className="space-y-2.5">
                <Link
                  to="/admin/orders"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-background/80 hover:bg-background border border-border/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <ClockIcon className="w-4 h-4" weight="fill" />
                    </div>
                    <span className="font-body text-sm">
                      Pending orders
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-body font-semibold text-accent">
                      {stats.pending}
                    </span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
                <Link
                  to="/admin/products"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-background/80 hover:bg-background border border-border/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <PackageIcon className="w-4 h-4" weight="fill" />
                    </div>
                    <span className="font-body text-sm">Manage products</span>
                  </div>
                  <ArrowRightIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/admin/products/new"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-background/80 hover:bg-background border border-border/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                      <ShoppingBagIcon className="w-4 h-4" weight="fill" />
                    </div>
                    <span className="font-body text-sm">Add product</span>
                  </div>
                  <ArrowRightIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Summary mini-card */}
            <div className="bg-background rounded-2xl border border-border p-6">
              <h3 className="font-display text-base italic mb-4 flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-muted-foreground" weight="bold" />
                Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted-foreground">Completion rate</span>
                  <span className="font-body text-sm font-semibold">
                    {stats.total > 0
                      ? `${Math.round((stats.delivered / stats.total) * 100)}%`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted-foreground">Avg. order value</span>
                  <span className="font-body text-sm font-semibold">
                    {stats.total > 0
                      ? `${Math.round(stats.revenue / stats.total).toLocaleString()} FCFA`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted-foreground">Total revenue</span>
                  <span className="font-body text-sm font-semibold text-green-600">
                    {stats.revenue.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-5 border-b border-border flex items-center justify-between">
            <h3 className="font-display text-base italic flex items-center gap-2">
              <ShoppingBagIcon className="w-4 h-4 text-muted-foreground" weight="bold" />
              Recent Orders
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs text-accent font-body hover:underline"
            >
              View all →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body text-sm">No orders yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      order.status === "pending" ? "bg-amber-50 text-amber-600" :
                      order.status === "confirmed" ? "bg-blue-50 text-blue-600" :
                      order.status === "shipped" ? "bg-purple-50 text-purple-600" :
                      "bg-green-50 text-green-600"
                    }`}>
                      <ShoppingBagIcon className="w-4 h-4" weight="fill" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium truncate">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""} · {Number(order.total).toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      order.status === "pending" ? "bg-amber-50 text-amber-600" :
                      order.status === "confirmed" ? "bg-blue-50 text-blue-600" :
                      order.status === "shipped" ? "bg-purple-50 text-purple-600" :
                      "bg-green-50 text-green-600"
                    }`}>
                      {order.status}
                    </span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
