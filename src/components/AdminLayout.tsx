import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GaugeIcon,
  ShoppingBagIcon,
  PackageIcon,
  SignOutIcon,
  ListIcon,
} from "@phosphor-icons/react";
import { signOut } from "@/lib/api/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: GaugeIcon },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
  { href: "/admin/products", label: "Products", icon: PackageIcon },
];

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Link to="/admin" className="font-display text-xl italic">
            KEYNA
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <ListIcon className="w-5 h-5" weight="bold" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
          >
            <SignOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <ListIcon className="w-6 h-6" weight="bold" />
          </button>
          <div className="flex-1" />
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors"
          >
            View Storefront →
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
