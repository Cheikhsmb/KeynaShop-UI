import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconContext } from "@phosphor-icons/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/i18n/ThemeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Delivery from "./pages/Delivery";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderDetail from "./pages/admin/OrderDetail";
import AdminProducts from "./pages/admin/Products";
import AdminProductForm from "./pages/admin/ProductForm";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:handle" element={<ProductDetail />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/orders"
        element={<ProtectedRoute><AdminOrders /></ProtectedRoute>}
      />
      <Route
        path="/admin/orders/:id"
        element={<ProtectedRoute><AdminOrderDetail /></ProtectedRoute>}
      />
      <Route
        path="/admin/products"
        element={<ProtectedRoute><AdminProducts /></ProtectedRoute>}
      />
      <Route
        path="/admin/products/new"
        element={<ProtectedRoute><AdminProductForm /></ProtectedRoute>}
      />
      <Route
        path="/admin/products/:id"
        element={<ProtectedRoute><AdminProductForm /></ProtectedRoute>}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      {/* Hairline stroke across the site to match the Playfair display type. */}
      <IconContext.Provider value={{ weight: "light" }}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </IconContext.Provider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
