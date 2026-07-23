import { supabase } from "@/lib/supabase";
import type { Product } from "@/data/products";

const TABLE = "products";

export interface DbProduct {
  id: string;
  handle: string;
  category: string;
  price: number;
  rating: number;
  title: string;
  title_en: string;
  title_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  images: string[];
  variants: { id: string; label: string; available: boolean }[];
  created_at: string;
  updated_at: string;
}

function dbToProduct(db: DbProduct): Product {
  return {
    id: db.id,
    handle: db.handle,
    category: db.category as Product["category"],
    image: db.images[0] ?? "",
    images: db.images,
    price: db.price,
    rating: db.rating,
    title: db.title,
    titleEn: db.title_en,
    titleAr: db.title_ar,
    description: db.description,
    descriptionEn: db.description_en,
    descriptionAr: db.description_ar,
    variants: db.variants,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(dbToProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data ? dbToProduct(data) : null;
}

export type ProductInput = Omit<DbProduct, "id" | "created_at" | "updated_at">;

export async function createProduct(input: ProductInput) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `products/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(path);

  return urlData.publicUrl;
}
