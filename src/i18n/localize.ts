import type { Lang } from "./translations";

/** Picks the right text for the active language (French is the default/fallback). */
export function pickByLang(lang: Lang, texts: { fr: string; en: string; ar: string }): string {
  if (lang === "en") return texts.en;
  if (lang === "ar") return texts.ar;
  return texts.fr;
}

export function getLocalizedTitle(
  item: { title: string; titleEn: string; titleAr: string },
  lang: Lang,
): string {
  return pickByLang(lang, { fr: item.title, en: item.titleEn, ar: item.titleAr });
}

export function getLocalizedDescription(
  item: { description: string; descriptionEn: string; descriptionAr: string },
  lang: Lang,
): string {
  return pickByLang(lang, { fr: item.description, en: item.descriptionEn, ar: item.descriptionAr });
}
