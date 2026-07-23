import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { fetchProducts, deleteProduct } from "@/lib/api/products";
import type { Product } from "@/data/products";
import { PlusIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl italic">Products</h1>
            <p className="text-muted-foreground font-body text-sm">
              Manage your product catalog
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-body font-medium hover:opacity-90 transition-opacity"
          >
            <PlusIcon className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body mb-4">
              No products yet.
            </p>
            <Link
              to="/admin/products/new"
              className="text-accent font-body text-sm hover:underline"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="bg-background rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Handle
                    </th>
                    <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="text-right px-4 py-3 font-body font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="text-right px-4 py-3 font-body font-medium text-muted-foreground">
                      Rating
                    </th>
                    <th className="text-right px-4 py-3 font-body font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image && (
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                          )}
                          <span className="font-body">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {p.handle}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.category}
                      </td>
                      <td className="px-4 py-3 text-right font-body">
                        {p.price.toLocaleString()} FCFA
                      </td>
                      <td className="px-4 py-3 text-right">{p.rating}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/products/${p.id}`}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
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

export default Products;
