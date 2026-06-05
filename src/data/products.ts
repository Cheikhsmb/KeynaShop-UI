import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import collection5 from "@/assets/collection-5.jpg";
import collection6 from "@/assets/collection-6.jpg";
import collection7 from "@/assets/collection-7.jpg";
import collection8 from "@/assets/collection-8.jpg";

export type Category =
  | "abayas"
  | "perfumes"
  | "bags"
  | "jewelry"
  | "thiouraye"
  | "fabrics"
  | "home"
  | "scrunchies";

export interface ProductVariant {
  id: string;
  label: string;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string;
  category: Category;
  image: string;
  images: string[];
  price: number; // FCFA
  rating: number;
  // Multilingual fields
  title: string;
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  variants?: ProductVariant[];
}

const allProducts: Product[] = [
  // ─── Abayas & Voiles ───────────────────────────────────────
  {
    id: "ab-01",
    handle: "abaya-nuit-etoilee",
    category: "abayas",
    image: collection1,
    images: [collection1, collection2],
    price: 52000,
    rating: 5,
    title: "Abaya Nuit Étoilée",
    titleEn: "Starry Night Abaya",
    titleAr: "عباءة ليلة النجوم",
    description: "Abaya noire brodée d'étoiles dorées, tissu crépon fluide. Élégance absolue pour toutes les occasions.",
    descriptionEn: "Black abaya embroidered with golden stars, flowing crêpe fabric. Absolute elegance for every occasion.",
    descriptionAr: "عباءة سوداء مطرزة بنجوم ذهبية، قماش كريب فضفاض. أناقة مطلقة لكل المناسبات.",
    variants: [
      { id: "ab-01-s", label: "S / 38", available: true },
      { id: "ab-01-m", label: "M / 40", available: true },
      { id: "ab-01-l", label: "L / 42", available: true },
      { id: "ab-01-xl", label: "XL / 44", available: true },
    ],
  },
  {
    id: "ab-02",
    handle: "abaya-rose-perle",
    category: "abayas",
    image: collection3,
    images: [collection3, collection1],
    price: 48000,
    rating: 5,
    title: "Abaya Rose Perlée",
    titleEn: "Pearly Rose Abaya",
    titleAr: "عباءة وردية لؤلؤية",
    description: "Abaya rose poudré ornée de perles et dentelle. Un choix parfait pour les mariages et cérémonies.",
    descriptionEn: "Powder pink abaya adorned with pearls and lace. A perfect choice for weddings and ceremonies.",
    descriptionAr: "عباءة وردية مزينة باللؤلؤ والدانتيل. خيار مثالي للأعراس والمناسبات.",
    variants: [
      { id: "ab-02-s", label: "S", available: true },
      { id: "ab-02-m", label: "M", available: true },
      { id: "ab-02-l", label: "L", available: false },
    ],
  },
  {
    id: "ab-03",
    handle: "voile-serenite",
    category: "abayas",
    image: collection2,
    images: [collection2],
    price: 18000,
    rating: 4,
    title: "Voile Sérénité",
    titleEn: "Serenity Veil",
    titleAr: "حجاب السكينة",
    description: "Voile en mousseline légère, coloris nude. Douceur et légèreté pour un port confortable toute la journée.",
    descriptionEn: "Light chiffon veil in nude tone. Softness and lightness for comfortable all-day wear.",
    descriptionAr: "حجاب من الشيفون الخفيف باللون النود. نعومة وخفة للارتداء اليومي المريح.",
  },
  {
    id: "ab-04",
    handle: "abaya-brodee-dubai",
    category: "abayas",
    image: collection5,
    images: [collection5, collection1],
    price: 65000,
    rating: 5,
    title: "Abaya Brodée Dubai",
    titleEn: "Dubai Embroidered Abaya",
    titleAr: "عباءة دبي المطرزة",
    description: "L'élégance de Dubaï à Dakar. Broderies thermocollées en fil or sur abaya noire fluide.",
    descriptionEn: "The elegance of Dubai brought to Dakar. Heat-bonded gold thread embroidery on a flowing black abaya.",
    descriptionAr: "أناقة دبي في داكار. تطريز بخيط ذهبي على عباءة سوداء فضفاضة.",
    variants: [
      { id: "ab-04-m", label: "M", available: true },
      { id: "ab-04-l", label: "L", available: true },
      { id: "ab-04-xl", label: "XL", available: true },
    ],
  },

  // ─── Parfums ───────────────────────────────────────────────
  {
    id: "pf-01",
    handle: "parfum-musc-blanc",
    category: "perfumes",
    image: collection2,
    images: [collection2, collection6],
    price: 22000,
    rating: 5,
    title: "Parfum Musc Blanc",
    titleEn: "White Musk Perfume",
    titleAr: "عطر المسك الأبيض",
    description: "Musc blanc pur de Dubaï — délicat, enveloppant, signature d'une féminité raffinée.",
    descriptionEn: "Pure white musk from Dubai — delicate, enveloping, the signature of refined femininity.",
    descriptionAr: "مسك أبيض خالص من دبي — رفيع، يلفّ الحواس، توقيع الأنوثة الراقية.",
    variants: [
      { id: "pf-01-10ml", label: "10 ml", available: true },
      { id: "pf-01-30ml", label: "30 ml", available: true },
    ],
  },
  {
    id: "pf-02",
    handle: "parfum-oud-royal",
    category: "perfumes",
    image: collection6,
    images: [collection6, collection2],
    price: 35000,
    rating: 5,
    title: "Oud Royal",
    titleEn: "Royal Oud",
    titleAr: "العود الملكي",
    description: "Oud authentique du Moyen-Orient — profond, boisé, une fragrance qui laisse une empreinte inoubliable.",
    descriptionEn: "Authentic oud from the Middle East — deep, woody, a fragrance that leaves an unforgettable mark.",
    descriptionAr: "عود أصيل من الشرق الأوسط — عميق، خشبي، عطر يترك أثراً لا يُنسى.",
    variants: [
      { id: "pf-02-12ml", label: "12 ml", available: true },
      { id: "pf-02-50ml", label: "50 ml", available: true },
    ],
  },
  {
    id: "pf-03",
    handle: "parfum-rose-taif",
    category: "perfumes",
    image: collection4,
    images: [collection4],
    price: 28000,
    rating: 4,
    title: "Rose de Taïf",
    titleEn: "Taif Rose",
    titleAr: "وردة الطائف",
    description: "La rose la plus précieuse d'Arabie Saoudite, capturée en parfum. Floral, luxueux et intemporel.",
    descriptionEn: "The most precious rose from Saudi Arabia, captured in a perfume. Floral, luxurious and timeless.",
    descriptionAr: "أرقى وردة في الجزيرة العربية محبوسة في عطر. زهري، فاخر، وخالد.",
  },
  {
    id: "pf-04",
    handle: "parfum-amber-soir",
    category: "perfumes",
    image: collection8,
    images: [collection8],
    price: 24000,
    rating: 5,
    title: "Ambre Soir",
    titleEn: "Evening Amber",
    titleAr: "عنبر المساء",
    description: "Accord chaleureux d'ambre et vanille — sensuel et envoûtant, parfait pour les soirées.",
    descriptionEn: "Warm blend of amber and vanilla — sensual and captivating, perfect for evenings.",
    descriptionAr: "مزيج دافئ من العنبر والفانيليا — حسّي وآسر، مثالي لأمسيات الاحتفالات.",
  },

  // ─── Sacs & Chaussures ─────────────────────────────────────
  {
    id: "bg-01",
    handle: "sac-chaine-doree",
    category: "bags",
    image: collection3,
    images: [collection3, collection5],
    price: 38000,
    rating: 4,
    title: "Sac Chaîne Dorée",
    titleEn: "Golden Chain Bag",
    titleAr: "حقيبة السلسلة الذهبية",
    description: "Mini sac en cuir vegan à chaîne dorée. Compact, chic, parfait pour les sorties et cérémonies.",
    descriptionEn: "Mini vegan leather bag with golden chain. Compact, chic, perfect for evenings and ceremonies.",
    descriptionAr: "حقيبة صغيرة من الجلد النباتي بسلسلة ذهبية. أنيقة ومدمجة، مثالية للأمسيات.",
    variants: [
      { id: "bg-01-beige", label: "Beige", available: true },
      { id: "bg-01-noir", label: "Noir", available: true },
      { id: "bg-01-rose", label: "Rose Poudré", available: true },
    ],
  },
  {
    id: "bg-02",
    handle: "cabas-luxe-turc",
    category: "bags",
    image: collection7,
    images: [collection7, collection3],
    price: 45000,
    rating: 5,
    title: "Cabas Luxe Turc",
    titleEn: "Turkish Luxury Tote",
    titleAr: "حقيبة كبيرة فاخرة تركية",
    description: "Grand cabas importé de Turquie, cuir texturé et broderies artisanales. Élégance au quotidien.",
    descriptionEn: "Large tote imported from Turkey, textured leather with artisan embroidery. Everyday elegance.",
    descriptionAr: "حقيبة كبيرة مستوردة من تركيا، جلد منقوش مع تطريز حرفي. أناقة يومية.",
  },
  {
    id: "bg-03",
    handle: "clutch-perles",
    category: "bags",
    image: collection5,
    images: [collection5],
    price: 25000,
    rating: 4,
    title: "Clutch Perlée",
    titleEn: "Beaded Clutch",
    titleAr: "حقيبة يد مرصعة باللؤلؤ",
    description: "Pochette de soirée ornée de perles et paillettes. La touche finale parfaite pour les cérémonies.",
    descriptionEn: "Evening clutch adorned with pearls and sequins. The perfect finishing touch for ceremonies.",
    descriptionAr: "حقيبة سهرة مزينة باللؤلؤ والترتر. اللمسة الأخيرة المثالية للمناسبات.",
    variants: [
      { id: "bg-03-gold", label: "Or", available: true },
      { id: "bg-03-silver", label: "Argenté", available: true },
    ],
  },

  // ─── Bijoux ────────────────────────────────────────────────
  {
    id: "bj-01",
    handle: "collier-or-dakar",
    category: "jewelry",
    image: collection5,
    images: [collection5, collection3],
    price: 32000,
    rating: 5,
    title: "Collier Or Dakar",
    titleEn: "Dakar Gold Necklace",
    titleAr: "قلادة ذهب داكار",
    description: "Collier plaqué or 18 carats, design exclusif KEYNA. Raffinement et tradition.",
    descriptionEn: "18-carat gold-plated necklace, exclusive KEYNA design. Refinement and tradition.",
    descriptionAr: "قلادة مطلية بالذهب عيار 18، تصميم حصري لكيينا. رقي وتقاليد.",
  },
  {
    id: "bj-02",
    handle: "bracelet-perles-or",
    category: "jewelry",
    image: collection4,
    images: [collection4],
    price: 18000,
    rating: 4,
    title: "Bracelet Perles & Or",
    titleEn: "Pearl & Gold Bracelet",
    titleAr: "سوار اللؤلؤ والذهب",
    description: "Bracelet élégant alliant perles naturelles et chaîne dorée. Porter l'élégance au poignet.",
    descriptionEn: "Elegant bracelet combining natural pearls and a golden chain. Wearing elegance on your wrist.",
    descriptionAr: "سوار أنيق يجمع بين اللؤلؤ الطبيعي والسلسلة الذهبية. الأناقة على معصمك.",
  },
  {
    id: "bj-03",
    handle: "boucles-statement",
    category: "jewelry",
    image: collection2,
    images: [collection2],
    price: 14000,
    rating: 5,
    title: "Boucles Statement",
    titleEn: "Statement Earrings",
    titleAr: "أقراط واسعة الأثر",
    description: "Grandes boucles d'oreilles dorées pour une apparence audacieuse et mémorable.",
    descriptionEn: "Bold gold earrings for a daring and memorable look.",
    descriptionAr: "أقراط ذهبية كبيرة لمظهر جريء لا يُنسى.",
  },

  // ─── Thiouraye & Essences ─────────────────────────────────
  {
    id: "th-01",
    handle: "thiouraye-premium",
    category: "thiouraye",
    image: collection6,
    images: [collection6],
    price: 12000,
    rating: 5,
    title: "Thiouraye Premium",
    titleEn: "Premium Thiouraye",
    titleAr: "ثيوراي بريميوم",
    description: "Encens sénégalais premium — un rituel de bien-être ancestral pour parfumer votre espace et votre tenue.",
    descriptionEn: "Premium Senegalese incense — an ancestral wellness ritual to scent your space and clothing.",
    descriptionAr: "بخور سنغالي فاخر — طقس عافية قديم لعطرة مكانك وملابسك.",
    variants: [
      { id: "th-01-sm", label: "Petit sachet", available: true },
      { id: "th-01-lg", label: "Grand sachet", available: true },
    ],
  },
  {
    id: "th-02",
    handle: "essence-sandalwood",
    category: "thiouraye",
    image: collection8,
    images: [collection8, collection6],
    price: 8000,
    rating: 4,
    title: "Essence Bois de Santal",
    titleEn: "Sandalwood Essence",
    titleAr: "جوهر خشب الصندل",
    description: "Huile essentielle de bois de santal pure, importée d'Inde. Apaisante et envoûtante.",
    descriptionEn: "Pure sandalwood essential oil imported from India. Soothing and captivating.",
    descriptionAr: "زيت خشب الصندل العطري الخالص مستورد من الهند. مهدئ وآسر.",
  },
  {
    id: "th-03",
    handle: "encens-dubai-mix",
    category: "thiouraye",
    image: collection6,
    images: [collection6],
    price: 15000,
    rating: 5,
    title: "Mix Encens Dubaï",
    titleEn: "Dubai Incense Mix",
    titleAr: "مزيج بخور دبي",
    description: "Coffret mixte d'encens de luxe importés de Dubaï. Oud, Musc, Rose — une invitation au voyage.",
    descriptionEn: "Luxury incense mix set imported from Dubai. Oud, Musk, Rose — an invitation to travel.",
    descriptionAr: "مجموعة بخور فاخرة مستوردة من دبي. عود، مسك، وردة — دعوة للسفر.",
  },

  // ─── Tissus ───────────────────────────────────────────────
  {
    id: "tf-01",
    handle: "bazin-riche-dore",
    category: "fabrics",
    image: collection7,
    images: [collection7],
    price: 28000,
    rating: 5,
    title: "Bazin Riche Doré",
    titleEn: "Golden Rich Bazin",
    titleAr: "قماش باسان الذهبي الفاخر",
    description: "Bazin riche 100% coton à reflets dorés — le tissu roi pour les grandes cérémonies au Sénégal.",
    descriptionEn: "100% cotton rich bazin with golden sheen — the king fabric for grand ceremonies in Senegal.",
    descriptionAr: "قماش باسان 100% قطن بتمييز ذهبي — قماش الملوك للمناسبات الكبرى في السنغال.",
    variants: [
      { id: "tf-01-5m", label: "5 mètres", available: true },
      { id: "tf-01-10m", label: "10 mètres", available: true },
    ],
  },
  {
    id: "tf-02",
    handle: "tissu-brode-turc",
    category: "fabrics",
    image: collection1,
    images: [collection1, collection7],
    price: 35000,
    rating: 4,
    title: "Tissu Brodé Turc",
    titleEn: "Turkish Embroidered Fabric",
    titleAr: "قماش تركي مطرز",
    description: "Tissu coton brodé de fils colorés, importé de Turquie. Parfait pour les robes de cérémonie.",
    descriptionEn: "Cotton fabric embroidered with coloured threads, imported from Turkey. Perfect for ceremony dresses.",
    descriptionAr: "قماش قطني مطرز بخيوط ملونة مستورد من تركيا. مثالي لفساتين المناسبات.",
  },

  // ─── Maison & Arts de Table ───────────────────────────────
  {
    id: "hm-01",
    handle: "service-the-ottoman",
    category: "home",
    image: collection4,
    images: [collection4, collection8],
    price: 45000,
    rating: 5,
    title: "Service Thé Ottoman",
    titleEn: "Ottoman Tea Set",
    titleAr: "طقم شاي عثماني",
    description: "Service à thé en verre tulipe doré, style ottoman. 6 verres avec porte-verres en métal ciselé.",
    descriptionEn: "Golden tulip glass tea set, Ottoman style. 6 glasses with chiselled metal holders.",
    descriptionAr: "طقم شاي زجاجي بأكواب الشكل التوليبي الذهبي، بالأسلوب العثماني. 6 أكواب مع حوامل معدنية منقوشة.",
    variants: [
      { id: "hm-01-6", label: "6 pièces", available: true },
      { id: "hm-01-12", label: "12 pièces", available: true },
    ],
  },
  {
    id: "hm-02",
    handle: "plaid-turc-hamam",
    category: "home",
    image: collection7,
    images: [collection7],
    price: 22000,
    rating: 4,
    title: "Plaid Hammam Turc",
    titleEn: "Turkish Hammam Throw",
    titleAr: "غطاء الحمام التركي",
    description: "Serviette/plaid de hammam traditionnel turc en coton peigné. Douceur et durabilité garanties.",
    descriptionEn: "Traditional Turkish hammam towel/throw in combed cotton. Guaranteed softness and durability.",
    descriptionAr: "منشفة/غطاء حمام تركي تقليدي من القطن المشط. نعومة ومتانة مضمونة.",
  },
  {
    id: "hm-03",
    handle: "bougie-parfumee-luxe",
    category: "home",
    image: collection6,
    images: [collection6, collection4],
    price: 16000,
    rating: 5,
    title: "Bougie Parfumée Luxe",
    titleEn: "Luxury Scented Candle",
    titleAr: "شمعة عطرية فاخرة",
    description: "Bougie de soja parfumée à l'oud et à la rose, coulée à la main. Idéal en cadeau.",
    descriptionEn: "Oud and rose scented soy candle, hand-poured. Ideal as a gift.",
    descriptionAr: "شمعة صويا معطرة بالعود والورد، مصبوبة يدوياً. مثالية كهدية.",
  },

  // ─── Scrunchies & Chapeaux ────────────────────────────────
  {
    id: "sc-01",
    handle: "scrunchie-soie-satin",
    category: "scrunchies",
    image: collection8,
    images: [collection8],
    price: 5000,
    rating: 5,
    title: "Scrunchie Satin Luxe",
    titleEn: "Luxury Satin Scrunchie",
    titleAr: "رابطة شعر ساتان فاخرة",
    description: "Chouchou en satin doux et brillant — protège vos cheveux tout en ajoutant une touche de glamour.",
    descriptionEn: "Soft and shiny satin scrunchie — protects your hair while adding a touch of glamour.",
    descriptionAr: "رابطة شعر من الساتان الناعم واللامع — تحمي شعرك وتضيف لمسة من الأناقة.",
    variants: [
      { id: "sc-01-black", label: "Noir", available: true },
      { id: "sc-01-nude", label: "Nude", available: true },
      { id: "sc-01-gold", label: "Doré", available: true },
      { id: "sc-01-rose", label: "Rose", available: true },
    ],
  },
  {
    id: "sc-02",
    handle: "chapeau-soleil-elegance",
    category: "scrunchies",
    image: collection3,
    images: [collection3, collection8],
    price: 18000,
    rating: 4,
    title: "Chapeau Soleil Élégance",
    titleEn: "Elegance Sun Hat",
    titleAr: "قبعة شمس الأناقة",
    description: "Chapeau de plage large bord en raphia naturel, ruban doré. Chic et protecteur.",
    descriptionEn: "Wide-brim natural raffia beach hat with gold ribbon. Chic and protective.",
    descriptionAr: "قبعة شاطئ واسعة الحافة من الرافيا الطبيعي مع شريط ذهبي. أنيقة وواقية.",
    variants: [
      { id: "sc-02-nat", label: "Naturel", available: true },
      { id: "sc-02-kr", label: "Noir/Doré", available: true },
    ],
  },
  {
    id: "sc-03",
    handle: "turban-soie-noue",
    category: "scrunchies",
    image: collection2,
    images: [collection2],
    price: 8000,
    rating: 5,
    title: "Turban Noué en Soie",
    titleEn: "Knotted Silk Turban",
    titleAr: "عقال حرير مربوط",
    description: "Turban en soie naturelle pré-noué, ultra-tendance. Élégance instantanée pour chaque jour.",
    descriptionEn: "Pre-tied natural silk turban, ultra-trendy. Instant elegance for every day.",
    descriptionAr: "عقال من الحرير الطبيعي مُعقد مسبقاً، في قمة الموضة. أناقة فورية لكل يوم.",
    variants: [
      { id: "sc-03-blk", label: "Noir", available: true },
      { id: "sc-03-wht", label: "Blanc", available: true },
      { id: "sc-03-bge", label: "Beige", available: true },
    ],
  },
];

export default allProducts;

export function getProductByHandle(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function getProductsByCategory(category: Category | "all"): Product[] {
  if (category === "all") return allProducts;
  return allProducts.filter((p) => p.category === category);
}

export const CATEGORY_KEYS: { value: Category | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "shop.all" },
  { value: "abayas", labelKey: "nav.cat.abayas" },
  { value: "perfumes", labelKey: "nav.cat.perfumes" },
  { value: "bags", labelKey: "nav.cat.bags" },
  { value: "jewelry", labelKey: "nav.cat.jewelry" },
  { value: "thiouraye", labelKey: "nav.cat.thiouraye" },
  { value: "fabrics", labelKey: "nav.cat.fabrics" },
  { value: "home", labelKey: "nav.cat.home" },
  { value: "scrunchies", labelKey: "nav.cat.scrunchies" },
];

export const WHATSAPP_NUMBER = "+221772283684"; // WhatsApp Business Number
