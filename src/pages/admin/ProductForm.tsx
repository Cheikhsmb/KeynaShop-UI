import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { fetchProductById, createProduct, updateProduct, uploadProductImage } from "@/lib/api/products";
import { toast } from "sonner";
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";

interface VariantEntry {
  id: string;
  label: string;
  available: boolean;
}

const CATEGORIES = [
  "abayas", "perfumes", "bags", "jewelry",
  "thiouraye", "fabrics", "home", "scrunchies",
] as const;

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [handle, setHandle] = useState("");
  const [category, setCategory] = useState("abayas");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("0");

  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [variants, setVariants] = useState<VariantEntry[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then((product) => {
        if (!product) return;
        setHandle(product.handle);
        setCategory(product.category);
        setPrice(String(product.price));
        setRating(String(product.rating));
        setTitle(product.title);
        setTitleEn(product.titleEn);
        setTitleAr(product.titleAr);
        setDescription(product.description);
        setDescriptionEn(product.descriptionEn);
        setDescriptionAr(product.descriptionAr);
        setImages(product.images);
        setVariants(product.variants ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: "", available: true },
    ]);
  };

  const updateVariant = (idx: number, field: keyof VariantEntry, value: string | boolean) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, [field]: value } : v)),
    );
  };

  const removeVariant = (idx: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageUpload = async () => {
    if (!newImageFile) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(newImageFile);
      setImages((prev) => [...prev, url]);
      setNewImageFile(null);
      toast.success("Image uploaded");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const productData = {
      handle: handle.trim().toLowerCase().replace(/\s+/g, "-"),
      category,
      price: Number(price),
      rating: Number(rating),
      title: title.trim(),
      title_en: titleEn.trim(),
      title_ar: titleAr.trim(),
      description: description.trim(),
      description_en: descriptionEn.trim(),
      description_ar: descriptionAr.trim(),
      images,
      variants: variants.filter((v) => v.label.trim()),
    };

    try {
      if (isEditing) {
        await updateProduct(id!, productData);
        toast.success("Product updated");
      } else {
        await createProduct(productData);
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
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

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <button
          onClick={() => navigate("/admin/products")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-body mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back to products
        </button>

        <h1 className="font-display text-2xl italic mb-8">
          {isEditing ? "Edit Product" : "New Product"}
        </h1>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Basic info */}
          <section className="bg-background rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-display text-sm italic">Basic Info</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Handle *
                </label>
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                  placeholder="product-handle"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-muted-foreground font-body mb-1">
                    Price (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min={0}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground font-body mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min={0}
                    max={5}
                    step={0.5}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Titles & descriptions */}
          <section className="bg-background rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-display text-sm italic">Titles & Descriptions</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Title (FR) *
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Title (EN)
                </label>
                <input
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Title (AR)
                </label>
                <input
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Description (FR)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Description (EN)
                </label>
                <textarea
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground font-body mb-1">
                  Description (AR)
                </label>
                <textarea
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-background rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-display text-sm italic">Images</h2>

            <div className="flex flex-wrap gap-3">
              {images.map((url, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImageFile(e.target.files?.[0] ?? null)}
                className="text-sm font-body text-muted-foreground file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-border file:bg-muted file:text-foreground file:text-sm file:font-body hover:file:bg-accent/10"
              />
              {newImageFile && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-body font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {uploading ? "Uploading…" : "Upload"}
                </button>
              )}
            </div>
          </section>

          {/* Variants */}
          <section className="bg-background rounded-xl border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm italic">Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1 text-xs text-accent font-body hover:underline"
              >
                <PlusIcon className="w-3 h-3" /> Add variant
              </button>
            </div>

            {variants.length === 0 && (
              <p className="text-xs text-muted-foreground font-body">
                No variants (product will be treated as single-variant).
              </p>
            )}

            <div className="space-y-2">
              {variants.map((v, idx) => (
                <div key={v.id} className="flex items-center gap-2">
                  <input
                    value={v.label}
                    onChange={(e) => updateVariant(idx, "label", e.target.value)}
                    placeholder="e.g. M, 10ml, Noir"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-accent"
                  />
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground font-body whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={v.available}
                      onChange={(e) =>
                        updateVariant(idx, "available", e.target.checked)
                      }
                      className="rounded border-border"
                    />
                    Available
                  </label>
                  <button
                    type="button"
                    onClick={() => removeVariant(idx)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Save */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving…" : isEditing ? "Update Product" : "Create Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2.5 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
