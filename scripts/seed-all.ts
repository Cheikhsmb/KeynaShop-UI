import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const ASSETS_DIR = resolve(import.meta.dirname!, "../src/assets");

async function uploadImage(fileName: string): Promise<string> {
  const filePath = resolve(ASSETS_DIR, fileName);
  const buffer = readFileSync(filePath);
  const ext = fileName.split(".").pop();

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, buffer, {
      contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
      upsert: true,
    });

  if (error && !error.message.includes("already exists")) {
    console.error(`  Upload failed for ${fileName}:`, error.message);
  }

  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

interface ProductSeed {
  handle: string;
  category: string;
  price: number;
  rating: number;
  title: string;
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  imageIdx: number;
  imagesIdx: number[];
  variants?: { id: string; label: string; available: boolean }[];
}

const productsToSeed: ProductSeed[] = [
  { handle: "abaya-nuit-etoilee", category: "abayas", price: 52000, rating: 5, title: "Abaya Nuit Étoilée", titleEn: "Starry Night Abaya", titleAr: "عباءة ليلة النجوم", description: "Abaya noire brodée d'étoiles dorées, tissu crépon fluide. Élégance absolue pour toutes les occasions.", descriptionEn: "Black abaya embroidered with golden stars, flowing crêpe fabric. Absolute elegance for every occasion.", descriptionAr: "عباءة سوداء مطرزة بنجوم ذهبية، قماش كريب فضفاض. أناقة مطلقة لكل المناسبات.", imageIdx: 1, imagesIdx: [1, 2], variants: [{ id: "ab-01-s", label: "S / 38", available: true }, { id: "ab-01-m", label: "M / 40", available: true }, { id: "ab-01-l", label: "L / 42", available: true }, { id: "ab-01-xl", label: "XL / 44", available: true }] },
  { handle: "abaya-rose-perle", category: "abayas", price: 48000, rating: 5, title: "Abaya Rose Perlée", titleEn: "Pearly Rose Abaya", titleAr: "عباءة وردية لؤلؤية", description: "Abaya rose poudré ornée de perles et dentelle. Un choix parfait pour les mariages et cérémonies.", descriptionEn: "Powder pink abaya adorned with pearls and lace. A perfect choice for weddings and ceremonies.", descriptionAr: "عباءة وردية مزينة باللؤلؤ والدانتيل. خيار مثالي للأعراس والمناسبات.", imageIdx: 3, imagesIdx: [3, 1], variants: [{ id: "ab-02-s", label: "S", available: true }, { id: "ab-02-m", label: "M", available: true }, { id: "ab-02-l", label: "L", available: false }] },
  { handle: "voile-serenite", category: "abayas", price: 18000, rating: 4, title: "Voile Sérénité", titleEn: "Serenity Veil", titleAr: "حجاب السكينة", description: "Voile en mousseline légère, coloris nude. Douceur et légèreté pour un port confortable toute la journée.", descriptionEn: "Light chiffon veil in nude tone. Softness and lightness for comfortable all-day wear.", descriptionAr: "حجاب من الشيفون الخفيف باللون النود. نعومة وخفة للارتداء اليومي المريح.", imageIdx: 2, imagesIdx: [2] },
  { handle: "abaya-brodee-dubai", category: "abayas", price: 65000, rating: 5, title: "Abaya Brodée Dubai", titleEn: "Dubai Embroidered Abaya", titleAr: "عباءة دبي المطرزة", description: "L'élégance de Dubaï à Dakar. Broderies thermocollées en fil or sur abaya noire fluide.", descriptionEn: "The elegance of Dubai brought to Dakar. Heat-bonded gold thread embroidery on a flowing black abaya.", descriptionAr: "أناقة دبي في داكار. تطريز بخيط ذهبي على عباءة سوداء فضفاضة.", imageIdx: 5, imagesIdx: [5, 1], variants: [{ id: "ab-04-m", label: "M", available: true }, { id: "ab-04-l", label: "L", available: true }, { id: "ab-04-xl", label: "XL", available: true }] },
  { handle: "parfum-musc-blanc", category: "perfumes", price: 22000, rating: 5, title: "Parfum Musc Blanc", titleEn: "White Musk Perfume", titleAr: "عطر المسك الأبيض", description: "Musc blanc pur de Dubaï — délicat, enveloppant, signature d'une féminité raffinée.", descriptionEn: "Pure white musk from Dubai — delicate, enveloping, the signature of refined femininity.", descriptionAr: "مسك أبيض خالص من دبي — رفيع، يلفّ الحواس، توقيع الأنوثة الراقية.", imageIdx: 2, imagesIdx: [2, 6], variants: [{ id: "pf-01-10ml", label: "10 ml", available: true }, { id: "pf-01-30ml", label: "30 ml", available: true }] },
  { handle: "parfum-oud-royal", category: "perfumes", price: 35000, rating: 5, title: "Oud Royal", titleEn: "Royal Oud", titleAr: "العود الملكي", description: "Oud authentique du Moyen-Orient — profond, boisé, une fragrance qui laisse une empreinte inoubliable.", descriptionEn: "Authentic oud from the Middle East — deep, woody, a fragrance that leaves an unforgettable mark.", descriptionAr: "عود أصيل من الشرق الأوسط — عميق، خشبي، عطر يترك أثراً لا يُنسى.", imageIdx: 6, imagesIdx: [6, 2], variants: [{ id: "pf-02-12ml", label: "12 ml", available: true }, { id: "pf-02-50ml", label: "50 ml", available: true }] },
  { handle: "parfum-rose-taif", category: "perfumes", price: 28000, rating: 4, title: "Rose de Taïf", titleEn: "Taif Rose", titleAr: "وردة الطائف", description: "La rose la plus précieuse d'Arabie Saoudite, capturée en parfum. Floral, luxueux et intemporel.", descriptionEn: "The most precious rose from Saudi Arabia, captured in a perfume. Floral, luxurious and timeless.", descriptionAr: "أرقى وردة في الجزيرة العربية محبوسة في عطر. زهري، فاخر، وخالد.", imageIdx: 4, imagesIdx: [4] },
  { handle: "parfum-amber-soir", category: "perfumes", price: 24000, rating: 5, title: "Ambre Soir", titleEn: "Evening Amber", titleAr: "عنبر المساء", description: "Accord chaleureux d'ambre et vanille — sensuel et envoûtant, parfait pour les soirées.", descriptionEn: "Warm blend of amber and vanilla — sensual and captivating, perfect for evenings.", descriptionAr: "مزيج دافئ من العنبر والفانيليا — حسّي وآسر، مثالي لأمسيات الاحتفالات.", imageIdx: 8, imagesIdx: [8] },
  { handle: "sac-chaine-doree", category: "bags", price: 38000, rating: 4, title: "Sac Chaîne Dorée", titleEn: "Golden Chain Bag", titleAr: "حقيبة السلسلة الذهبية", description: "Mini sac en cuir vegan à chaîne dorée. Compact, chic, parfait pour les sorties et cérémonies.", descriptionEn: "Mini vegan leather bag with golden chain. Compact, chic, perfect for evenings and ceremonies.", descriptionAr: "حقيبة صغيرة من الجلد النباتي بسلسلة ذهبية. أنيقة ومدمجة، مثالية للأمسيات.", imageIdx: 3, imagesIdx: [3, 5], variants: [{ id: "bg-01-beige", label: "Beige", available: true }, { id: "bg-01-noir", label: "Noir", available: true }, { id: "bg-01-rose", label: "Rose Poudré", available: true }] },
  { handle: "cabas-luxe-turc", category: "bags", price: 45000, rating: 5, title: "Cabas Luxe Turc", titleEn: "Turkish Luxury Tote", titleAr: "حقيبة كبيرة فاخرة تركية", description: "Grand cabas importé de Turquie, cuir texturé et broderies artisanales. Élégance au quotidien.", descriptionEn: "Large tote imported from Turkey, textured leather with artisan embroidery. Everyday elegance.", descriptionAr: "حقيبة كبيرة مستوردة من تركيا، جلد منقوش مع تطريز حرفي. أناقة يومية.", imageIdx: 7, imagesIdx: [7, 3] },
  { handle: "clutch-perles", category: "bags", price: 25000, rating: 4, title: "Clutch Perlée", titleEn: "Beaded Clutch", titleAr: "حقيبة يد مرصعة باللؤلؤ", description: "Pochette de soirée ornée de perles et paillettes. La touche finale parfaite pour les cérémonies.", descriptionEn: "Evening clutch adorned with pearls and sequins. The perfect finishing touch for ceremonies.", descriptionAr: "حقيبة سهرة مزينة باللؤلؤ والترتر. اللمسة الأخيرة المثالية للمناسبات.", imageIdx: 5, imagesIdx: [5], variants: [{ id: "bg-03-gold", label: "Or", available: true }, { id: "bg-03-silver", label: "Argenté", available: true }] },
  { handle: "collier-or-dakar", category: "jewelry", price: 32000, rating: 5, title: "Collier Or Dakar", titleEn: "Dakar Gold Necklace", titleAr: "قلادة ذهب داكار", description: "Collier plaqué or 18 carats, design exclusif KEYNA. Raffinement et tradition.", descriptionEn: "18-carat gold-plated necklace, exclusive KEYNA design. Refinement and tradition.", descriptionAr: "قلادة مطلية بالذهب عيار 18، تصميم حصري لكيينا. رقي وتقاليد.", imageIdx: 5, imagesIdx: [5, 3] },
  { handle: "bracelet-perles-or", category: "jewelry", price: 18000, rating: 4, title: "Bracelet Perles & Or", titleEn: "Pearl & Gold Bracelet", titleAr: "سوار اللؤلؤ والذهب", description: "Bracelet élégant alliant perles naturelles et chaîne dorée. Porter l'élégance au poignet.", descriptionEn: "Elegant bracelet combining natural pearls and a golden chain. Wearing elegance on your wrist.", descriptionAr: "سوار أنيق يجمع بين اللؤلؤ الطبيعي والسلسلة الذهبية. الأناقة على معصمك.", imageIdx: 4, imagesIdx: [4] },
  { handle: "boucles-statement", category: "jewelry", price: 14000, rating: 5, title: "Boucles Statement", titleEn: "Statement Earrings", titleAr: "أقراط واسعة الأثر", description: "Grandes boucles d'oreilles dorées pour une apparence audacieuse et mémorable.", descriptionEn: "Bold gold earrings for a daring and memorable look.", descriptionAr: "أقراط ذهبية كبيرة لمظهر جريء لا يُنسى.", imageIdx: 2, imagesIdx: [2] },
  { handle: "thiouraye-premium", category: "thiouraye", price: 12000, rating: 5, title: "Thiouraye Premium", titleEn: "Premium Thiouraye", titleAr: "ثيوراي بريميوم", description: "Encens sénégalais premium — un rituel de bien-être ancestral pour parfumer votre espace et votre tenue.", descriptionEn: "Premium Senegalese incense — an ancestral wellness ritual to scent your space and clothing.", descriptionAr: "بخور سنغالي فاخر — طقس عافية قديم لعطرة مكانك وملابسك.", imageIdx: 6, imagesIdx: [6], variants: [{ id: "th-01-sm", label: "Petit sachet", available: true }, { id: "th-01-lg", label: "Grand sachet", available: true }] },
  { handle: "essence-sandalwood", category: "thiouraye", price: 8000, rating: 4, title: "Essence Bois de Santal", titleEn: "Sandalwood Essence", titleAr: "جوهر خشب الصندل", description: "Huile essentielle de bois de santal pure, importée d'Inde. Apaisante et envoûtante.", descriptionEn: "Pure sandalwood essential oil imported from India. Soothing and captivating.", descriptionAr: "زيت خشب الصندل العطري الخالص مستورد من الهند. مهدئ وآسر.", imageIdx: 8, imagesIdx: [8, 6] },
  { handle: "encens-dubai-mix", category: "thiouraye", price: 15000, rating: 5, title: "Mix Encens Dubaï", titleEn: "Dubai Incense Mix", titleAr: "مزيج بخور دبي", description: "Coffret mixte d'encens de luxe importés de Dubaï. Oud, Musc, Rose — une invitation au voyage.", descriptionEn: "Luxury incense mix set imported from Dubai. Oud, Musk, Rose — an invitation to travel.", descriptionAr: "مجموعة بخور فاخرة مستوردة من دبي. عود، مسك، وردة — دعوة للسفر.", imageIdx: 6, imagesIdx: [6] },
  { handle: "bazin-riche-dore", category: "fabrics", price: 28000, rating: 5, title: "Bazin Riche Doré", titleEn: "Golden Rich Bazin", titleAr: "قماش باسان الذهبي الفاخر", description: "Bazin riche 100% coton à reflets dorés — le tissu roi pour les grandes cérémonies au Sénégal.", descriptionEn: "100% cotton rich bazin with golden sheen — the king fabric for grand ceremonies in Senegal.", descriptionAr: "قماش باسان 100% قطن بتمييز ذهبي — قماش الملوك للمناسبات الكبرى في السنغال.", imageIdx: 7, imagesIdx: [7], variants: [{ id: "tf-01-5m", label: "5 mètres", available: true }, { id: "tf-01-10m", label: "10 mètres", available: true }] },
  { handle: "tissu-brode-turc", category: "fabrics", price: 35000, rating: 4, title: "Tissu Brodé Turc", titleEn: "Turkish Embroidered Fabric", titleAr: "قماش تركي مطرز", description: "Tissu coton brodé de fils colorés, importé de Turquie. Parfait pour les robes de cérémonie.", descriptionEn: "Cotton fabric embroidered with coloured threads, imported from Turkey. Perfect for ceremony dresses.", descriptionAr: "قماش قطني مطرز بخيوط ملونة مستورد من تركيا. مثالي لفساتين المناسبات.", imageIdx: 1, imagesIdx: [1, 7] },
  { handle: "service-the-ottoman", category: "home", price: 45000, rating: 5, title: "Service Thé Ottoman", titleEn: "Ottoman Tea Set", titleAr: "طقم شاي عثماني", description: "Service à thé en verre tulipe doré, style ottoman. 6 verres avec porte-verres en métal ciselé.", descriptionEn: "Golden tulip glass tea set, Ottoman style. 6 glasses with chiselled metal holders.", descriptionAr: "طقم شاي زجاجي بأكواب الشكل التوليبي الذهبي، بالأسلوب العثماني. 6 أكواب مع حوامل معدنية منقوشة.", imageIdx: 4, imagesIdx: [4, 8], variants: [{ id: "hm-01-6", label: "6 pièces", available: true }, { id: "hm-01-12", label: "12 pièces", available: true }] },
  { handle: "plaid-turc-hamam", category: "home", price: 22000, rating: 4, title: "Plaid Hammam Turc", titleEn: "Turkish Hammam Throw", titleAr: "غطاء الحمام التركي", description: "Serviette/plaid de hammam traditionnel turc en coton peigné. Douceur et durabilité garanties.", descriptionEn: "Traditional Turkish hammam towel/throw in combed cotton. Guaranteed softness and durability.", descriptionAr: "منشفة/غطاء حمام تركي تقليدي من القطن المشط. نعومة ومتانة مضمونة.", imageIdx: 7, imagesIdx: [7] },
  { handle: "bougie-parfumee-luxe", category: "home", price: 16000, rating: 5, title: "Bougie Parfumée Luxe", titleEn: "Luxury Scented Candle", titleAr: "شمعة عطرية فاخرة", description: "Bougie de soja parfumée à l'oud et à la rose, coulée à la main. Idéal en cadeau.", descriptionEn: "Oud and rose scented soy candle, hand-poured. Ideal as a gift.", descriptionAr: "شمعة صويا معطرة بالعود والورد، مصبوبة يدوياً. مثالية كهدية.", imageIdx: 6, imagesIdx: [6, 4] },
  { handle: "scrunchie-soie-satin", category: "scrunchies", price: 5000, rating: 5, title: "Scrunchie Satin Luxe", titleEn: "Luxury Satin Scrunchie", titleAr: "رابطة شعر ساتان فاخرة", description: "Chouchou en satin doux et brillant — protège vos cheveux tout en ajoutant une touche de glamour.", descriptionEn: "Soft and shiny satin scrunchie — protects your hair while adding a touch of glamour.", descriptionAr: "رابطة شعر من الساتان الناعم واللامع — تحمي شعرك وتضيف لمسة من الأناقة.", imageIdx: 8, imagesIdx: [8], variants: [{ id: "sc-01-black", label: "Noir", available: true }, { id: "sc-01-nude", label: "Nude", available: true }, { id: "sc-01-gold", label: "Doré", available: true }, { id: "sc-01-rose", label: "Rose", available: true }] },
  { handle: "chapeau-soleil-elegance", category: "scrunchies", price: 18000, rating: 4, title: "Chapeau Soleil Élégance", titleEn: "Elegance Sun Hat", titleAr: "قبعة شمس الأناقة", description: "Chapeau de plage large bord en raphia naturel, ruban doré. Chic et protecteur.", descriptionEn: "Wide-brim natural raffia beach hat with gold ribbon. Chic and protective.", descriptionAr: "قبعة شاطئ واسعة الحافة من الرافيا الطبيعي مع شريط ذهبي. أنيقة وواقية.", imageIdx: 3, imagesIdx: [3, 8], variants: [{ id: "sc-02-nat", label: "Naturel", available: true }, { id: "sc-02-kr", label: "Noir/Doré", available: true }] },
  { handle: "turban-soie-noue", category: "scrunchies", price: 8000, rating: 5, title: "Turban Noué en Soie", titleEn: "Knotted Silk Turban", titleAr: "عقال حرير مربوط", description: "Turban en soie naturelle pré-noué, ultra-tendance. Élégance instantanée pour chaque jour.", descriptionEn: "Pre-tied natural silk turban, ultra-trendy. Instant elegance for every day.", descriptionAr: "عقال من الحرير الطبيعي مُعقد مسبقاً، في قمة الموضة. أناقة فورية لكل يوم.", imageIdx: 2, imagesIdx: [2], variants: [{ id: "sc-03-blk", label: "Noir", available: true }, { id: "sc-03-wht", label: "Blanc", available: true }, { id: "sc-03-bge", label: "Beige", available: true }] },
];

const IMAGE_FILES = [
  "collection-1.jpg",
  "collection-2.jpg",
  "collection-3.jpg",
  "collection-4.jpg",
  "collection-5.jpg",
  "collection-6.jpg",
  "collection-7.jpg",
  "collection-8.jpg",
];

async function seed() {
  console.log("Uploading images…");
  const imageUrls: string[] = [];
  for (const file of IMAGE_FILES) {
    const url = await uploadImage(file);
    imageUrls.push(url);
    console.log(`  ✓ ${file}`);
  }

  console.log(`\nSeeding ${productsToSeed.length} products…`);
  for (const p of productsToSeed) {
    const images = p.imagesIdx.map((i) => imageUrls[i - 1]);
    const { error } = await supabase.from("products").upsert(
      {
        handle: p.handle,
        category: p.category,
        price: p.price,
        rating: p.rating,
        title: p.title,
        title_en: p.titleEn,
        title_ar: p.titleAr,
        description: p.description,
        description_en: p.descriptionEn,
        description_ar: p.descriptionAr,
        images,
        variants: p.variants ?? [],
      },
      { onConflict: "handle" },
    );

    if (error) {
      console.error(`  ✗ ${p.handle}: ${error.message}`);
    } else {
      console.log(`  ✓ ${p.handle}`);
    }
  }

  console.log("\nDone! All products seeded.");
}

seed().catch(console.error);
