import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import {
  fetchOrderById,
  updateOrderStatus,
  type OrderWithItems,
  type OrderStatus,
} from "@/lib/api/orders";
import {
  ArrowLeftIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  NoteIcon,
  CheckCircleIcon,
  CopyIcon,
  ClockIcon,
  PackageIcon,
  TruckIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";

const STATUS_FLOW: { status: OrderStatus; label: string; icon: typeof ClockIcon; color: string; gradient: string }[] = [
  { status: "pending", label: "Pending", icon: ClockIcon, color: "text-amber-600", gradient: "from-amber-500 to-amber-600" },
  { status: "confirmed", label: "Confirmed", icon: CheckCircleIcon, color: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
  { status: "shipped", label: "Shipped", icon: TruckIcon, color: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
  { status: "delivered", label: "Delivered", icon: SealCheckIcon, color: "text-green-600", gradient: "from-green-500 to-green-600" },
];

const STATUS_BADGE: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
};

const STATUS_ICON: Record<OrderStatus, typeof ClockIcon> = {
  pending: ClockIcon,
  confirmed: CheckCircleIcon,
  shipped: TruckIcon,
  delivered: SealCheckIcon,
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchOrderById(id)
      .then(setOrder)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!id) return;
    setUpdating(true);
    try {
      await updateOrderStatus(id, newStatus);
      setOrder((prev) => prev ? { ...prev, status: newStatus } : prev);
      toast.success(`Order moved to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const copyDeliveryInfo = () => {
    if (!order) return;
    const text = [
      `Customer: ${order.customer_name}`,
      `Phone: ${order.phone}`,
      `Address: ${order.address}`,
      order.notes ? `Notes: ${order.notes}` : null,
      "",
      "Items:",
      ...order.items.map(
        (i) => `  ${i.product_title}${i.variant_label !== "Default" ? ` (${i.variant_label})` : ""} x${i.quantity}`,
      ),
      `Total: ${Number(order.total).toLocaleString()} FCFA`,
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(text);
    toast.success("Delivery info copied!");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <p className="text-muted-foreground font-body text-center py-20">
          Order not found.
        </p>
      </AdminLayout>
    );
  }

  const currentIdx = STATUS_FLOW.findIndex((s) => s.status === order.status);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back to orders
          </Link>
          <button
            onClick={copyDeliveryInfo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-body"
          >
            <CopyIcon className="w-3.5 h-3.5" /> Copy delivery info
          </button>
        </div>

        {/* Order title + status badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl italic">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-1">
              {new Date(order.created_at).toLocaleDateString("fr-SN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-semibold border ${STATUS_BADGE[order.status]}`}
          >
            {React.createElement(STATUS_ICON[order.status], { className: "w-4 h-4", weight: "fill" })}
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        {/* Status progression */}
        <div className="bg-background rounded-2xl border border-border p-6 md:p-8 mb-6">
          <h3 className="font-display text-base italic mb-6 flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-muted-foreground" weight="bold" />
            Order Status
          </h3>
          <div className="relative">
            {/* Desktop: horizontal stepper */}
            <div className="hidden md:flex items-center justify-between">
              {STATUS_FLOW.map((step, i) => {
                const isActive = i <= currentIdx;
                const isCurrent = i === currentIdx;
                const StatusIcon = step.icon;
                return (
                  <div key={step.status} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleStatusChange(step.status)}
                        disabled={updating || i > currentIdx + 1 || isCurrent}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                          isCurrent
                            ? `bg-gradient-to-br ${step.gradient} text-white border-transparent shadow-lg scale-110`
                            : isActive
                            ? "bg-accent/10 text-accent border-accent"
                            : "bg-muted text-muted-foreground/40 border-border cursor-not-allowed"
                        }`}
                      >
                        <StatusIcon className={`w-6 h-6 ${isCurrent ? "animate-pulse" : ""}`} weight={isActive ? "fill" : "regular"} />
                      </button>
                      <span
                        className={`mt-2 text-xs font-body font-medium ${
                          isCurrent
                            ? "text-foreground"
                            : isActive
                            ? "text-accent"
                            : "text-muted-foreground/40"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < STATUS_FLOW.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-4 rounded-full ${
                          i < currentIdx ? "bg-accent" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden space-y-0">
              {STATUS_FLOW.map((step, i) => {
                const isActive = i <= currentIdx;
                const isCurrent = i === currentIdx;
                const StatusIcon = step.icon;
                return (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleStatusChange(step.status)}
                        disabled={updating || i > currentIdx + 1 || isCurrent}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                          isCurrent
                            ? `bg-gradient-to-br ${step.gradient} text-white border-transparent shadow-md`
                            : isActive
                            ? "bg-accent/10 text-accent border-accent"
                            : "bg-muted text-muted-foreground/40 border-border cursor-not-allowed"
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" weight={isActive ? "fill" : "regular"} />
                      </button>
                      {i < STATUS_FLOW.length - 1 && (
                        <div
                          className={`w-0.5 h-8 my-1 ${
                            i < currentIdx ? "bg-accent" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                    <div className={`pb-6 ${isCurrent ? "pt-1.5" : "pt-2.5"}`}>
                      <span
                        className={`text-sm font-body font-medium ${
                          isCurrent
                            ? "text-foreground"
                            : isActive
                            ? "text-accent"
                            : "text-muted-foreground/40"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next action button */}
            {currentIdx < STATUS_FLOW.length - 1 && (
              <div className="mt-6 pt-4 border-t border-border">
                <button
                  onClick={() => handleStatusChange(STATUS_FLOW[currentIdx + 1].status)}
                  disabled={updating}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${STATUS_FLOW[currentIdx + 1].gradient}`}
                >
                  {updating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {React.createElement(STATUS_FLOW[currentIdx + 1].icon, { className: "w-4 h-4", weight: "bold" })}
                      Mark as {STATUS_FLOW[currentIdx + 1].label}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Info Card — for the deliverer */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-base italic flex items-center gap-2">
              <TruckIcon className="w-4 h-4 text-primary" weight="bold" />
              Delivery Info
            </h3>
            <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider bg-background px-2 py-1 rounded-md">
              For deliverer
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 bg-background/80 backdrop-blur rounded-xl p-4 border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-5 h-5" weight="fill" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-0.5">
                  Customer
                </p>
                <p className="font-body text-sm font-semibold">{order.customer_name}</p>
              </div>
            </div>

            <a
              href={`tel:${order.phone}`}
              className="flex items-start gap-3 bg-background/80 backdrop-blur rounded-xl p-4 border border-border/50 hover:border-green-300 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <PhoneIcon className="w-5 h-5" weight="fill" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <p className="font-body text-sm font-semibold text-blue-600 group-hover:underline">
                  {order.phone}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-3 bg-background/80 backdrop-blur rounded-xl p-4 border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-5 h-5" weight="fill" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-0.5">
                  Address
                </p>
                <p className="font-body text-sm font-semibold">{order.address}</p>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="mt-4 flex items-start gap-3 bg-amber-50/80 backdrop-blur rounded-xl p-4 border border-amber-200/50">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <NoteIcon className="w-4 h-4" weight="fill" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-0.5">
                  Delivery Notes
                </p>
                <p className="font-body text-sm">{order.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Items Card */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden mb-6">
          <div className="px-6 py-5 border-b border-border bg-muted/20">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base italic flex items-center gap-2">
                <PackageIcon className="w-4 h-4 text-muted-foreground" weight="bold" />
                Ordered Items
              </h3>
              <span className="text-xs text-muted-foreground font-body">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/10 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium truncate">
                    {item.product_title}
                  </p>
                  {item.variant_label !== "Default" && (
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      {item.variant_label}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-body text-sm">
                    x{item.quantity}
                  </p>
                </div>
                <div className="text-right w-28 flex-shrink-0">
                  <p className="font-body text-sm font-medium">
                    {(item.quantity * Number(item.unit_price)).toLocaleString()} FCFA
                  </p>
                  <p className="text-[10px] text-muted-foreground font-body">
                    {Number(item.unit_price).toLocaleString()} FCFA / unit
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-border bg-gradient-to-r from-accent/5 to-transparent flex items-center justify-between">
            <span className="font-display text-base italic">Total</span>
            <span className="font-body text-xl font-bold">
              {Number(order.total).toLocaleString()} FCFA
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetail;
