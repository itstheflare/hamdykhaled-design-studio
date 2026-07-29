import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";

type Cat = "all" | "restaurant" | "general";

interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  meta_en: string;
  meta_ar: string;
  cat: Exclude<Cat, "all">;
  aspect: string; // tailwind aspect class
  span?: string;
  bg: string;
  ink: string;
}

const PROJECTS: Project[] = [
  {
    id: "olea",
    title_en: "Olea — Levantine Grill",
    title_ar: "أوليا — مشويات شامية",
    meta_en: "Identity · Menu · Signage",
    meta_ar: "هوية · منيو · لافتات",
    cat: "restaurant",
    aspect: "aspect-[4/5]",
    span: "md:col-span-7 md:row-span-2",
    bg: "oklch(0.32 0.05 45)",
    ink: "oklch(0.94 0.02 80)",
  },
  {
    id: "noon",
    title_en: "Noon Bakery",
    title_ar: "مخبز نون",
    meta_en: "Packaging · Social",
    meta_ar: "تغليف · سوشيال",
    cat: "restaurant",
    aspect: "aspect-[4/3]",
    span: "md:col-span-5",
    bg: "oklch(0.88 0.04 75)",
    ink: "oklch(0.22 0.03 40)",
  },
  {
    id: "rift",
    title_en: "Rift Records Poster Series",
    title_ar: "سلسلة بوسترات ريفت",
    meta_en: "Posters · Print",
    meta_ar: "بوسترات · طباعة",
    cat: "general",
    aspect: "aspect-[1/1]",
    span: "md:col-span-5",
    bg: "oklch(0.18 0.03 260)",
    ink: "oklch(0.85 0.15 90)",
  },
  {
    id: "sable",
    title_en: "Sable Coffee",
    title_ar: "سيبل كوفي",
    meta_en: "Identity · Menu",
    meta_ar: "هوية · منيو",
    cat: "restaurant",
    aspect: "aspect-[4/3]",
    span: "md:col-span-6",
    bg: "oklch(0.94 0.02 85)",
    ink: "oklch(0.2 0.02 45)",
  },
  {
    id: "atlas",
    title_en: "Atlas Studio — Site",
    title_ar: "أطلس ستوديو — موقع",
    meta_en: "Website · Art direction",
    meta_ar: "موقع · إدارة فنية",
    cat: "general",
    aspect: "aspect-[16/10]",
    span: "md:col-span-6",
    bg: "oklch(0.14 0.01 60)",
    ink: "oklch(0.9 0.06 70)",
  },
  {
    id: "fig",
    title_en: "Fig & Salt Trattoria",
    title_ar: "فيج آند سولت",
    meta_en: "Full brand · Menu",
    meta_ar: "هوية كاملة · منيو",
    cat: "restaurant",
    aspect: "aspect-[4/5]",
    span: "md:col-span-4",
    bg: "oklch(0.5 0.12 30)",
    ink: "oklch(0.96 0.02 80)",
  },
  {
    id: "civic",
    title_en: "Civic Weekend Campaign",
    title_ar: "حملة سيفيك ويكند",
    meta_en: "Campaign · Social",
    meta_ar: "حملة · سوشيال",
    cat: "general",
    aspect: "aspect-[4/3]",
    span: "md:col-span-8",
    bg: "oklch(0.96 0.01 90)",
    ink: "oklch(0.16 0.02 60)",
  },
];

function Tile({ p }: { p: Project }) {
  const { lang } = useI18n();
  const title = lang === "ar" ? p.title_ar : p.title_en;
  const meta = lang === "ar" ? p.meta_ar : p.meta_en;
  return (
    <a
      href="#contact"
      className={`tile group relative block overflow-hidden ${p.aspect} ${p.span ?? "md:col-span-6"}`}
    >
      <div
        className="tile-img absolute inset-0"
        style={{ backgroundColor: p.bg, color: p.ink }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <span
            className="font-display text-[18vw] font-black leading-none opacity-90 md:text-[9vw]"
            style={{ color: p.ink }}
          >
            {p.id.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-end justify-between p-6 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div>
          <div className="font-display text-xl font-bold md:text-2xl">{title}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] opacity-80">{meta}</div>
        </div>
      </div>
    </a>
  );
}

export function Portfolio() {
  const { t } = useI18n();
  const [cat, setCat] = useState<Cat>("all");
  const ref = useReveal<HTMLDivElement>();

  const filtered = useMemo(
    () => (cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat)),
    [cat],
  );

  const tabs: { key: Cat; label: string }[] = [
    { key: "all", label: t("portfolio.all") },
    { key: "restaurant", label: t("portfolio.restaurant") },
    { key: "general", label: t("portfolio.general") },
  ];

  return (
    <section className="border-t border-foreground/10 py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-3 reveal">
            {t("portfolio.eyebrow")}
          </div>
          <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight md:col-span-6 md:text-7xl reveal reveal-delay-1">
            {t("portfolio.title")}
          </h2>
          <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end reveal reveal-delay-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCat(tab.key)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  cat === tab.key
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/25 text-foreground/70 hover:border-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {filtered.map((p) => (
            <Tile key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
