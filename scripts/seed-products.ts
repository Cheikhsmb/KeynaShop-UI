// Run with: npx tsx scripts/seed-products.ts
// Requires VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY in .env

import { createClient } from "@supabase/supabase-js";
import allProducts from "../src/data/products";

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  console.log(`Seeding ${allProducts.length} products…`);

  for (const product of allProducts) {
    const { error } = await supabase.from("products").upsert(
      {
        handle: product.handle,
        category: product.category,
        price: product.price,
        rating: product.rating,
        title: product.title,
        title_en: product.titleEn,
        title_ar: product.titleAr,
        description: product.description,
        description_en: product.descriptionEn,
        description_ar: product.descriptionAr,
        images: product.images,
        variants: product.variants ?? [],
      },
      { onConflict: "handle" },
    );

    if (error) {
      console.error(`Failed to seed "${product.handle}":`, error.message);
    } else {
      console.log(`  ✓ ${product.handle}`);
    }
  }

  console.log("Done!");
}

seed().catch(console.error);
