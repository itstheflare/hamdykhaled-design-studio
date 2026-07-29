import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { ArrowUpRight } from "lucide-react";

const BUNDLES = [
  {
    id: "starter",
    saved: 15,
    includes_en: ["Logo mark", "5 social media posts", "1 revision round", "Delivered in 7 days"],
    includes_ar: ["شعار", "٥ منشورات سوشيال", "جولة مراجعات واحدة", "التسليم خلال ٧ أيام"],
  },
  {
    id: "launch",
    saved: 25,
    highlight: true,
    includes_en: [
      "Logo & basic brand system",
      "Full menu design (print-ready)",
      "3 launch posters",
      "5 social media posts",
      "2 revision rounds",
    ],
    includes_ar: [
      "شعار ونظام هوية أساسي",
      "منيو كامل (جاهز للطبع)",
      "٣ بوسترات إطلاق",
      "٥ منشورات سوشيال",
      "جولتين مراجعة",
    ],
  },
  {
    id: "full",
    saved: 32,
    includes_en: [
      "Logo & full brand guidelines",
      "Menu design",
      "One-page landing site",
      "10 social media posts",
      "3 posters",
      "3 revision rounds",
    ],
    includes_ar: [
      "شعار ودليل هوية كامل",
      "تصميم منيو",
      "موقع صفحة هبوط",
      "١٠ منشورات سوشيال",
      "٣ بوسترات",
      "٣ جولات مراجعة",
    ],
  },
  {
    id: "retainer",
    saved: 20,
    includes_en: [
      "Up to 8 designs / month",
      "Unlimited minor revisions",
      "Priority turnaround",
      "Monthly strategy call",
    ],
    includes_ar: [
      "حتى ٨ تصاميم شهرياً",
      "مراجعات صغيرة غير محدودة",
      "أولوية في التسليم",
      "مكالمة استراتيجية شهرية",
    ],
  },
];

export function Pricing() {
  const { t, lang } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  const prefill = (bundleId: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("hk:prefill-bundle", { detail: bundleId }));
  };

  return (
    <section className="border-t border-foreground/10 py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-3 reveal">
            {t("pricing.eyebrow")}
          </div>
          <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight md:col-span-6 md:text-7xl reveal reveal-delay-1">
            {t("pricing.title")}
          </h2>
          <p className="text-sm text-muted-foreground md:col-span-3 reveal reveal-delay-2">
            {t("pricing.note")}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-none border border-foreground/15 bg-foreground/15 md:grid-cols-2 lg:grid-cols-4">
          {BUNDLES.map((b) => {
            const includes = lang === "ar" ? b.includes_ar : b.includes_en;
            const highlight = b.highlight;
            return (
              <article
                key={b.id}
                className={`group relative flex flex-col justify-between gap-8 p-8 md:p-10 ${
                  highlight ? "bg-foreground text-background" : "bg-background"
                }`}
              >
                <div>
                  <div
                    className={`mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] ${
                      highlight ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    <span>{t("pricing.startingFrom")}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 ${
                        highlight ? "border-background/40 text-background" : "border-accent/60 text-accent"
                      }`}
                    >
                      −{b.saved}% {t("pricing.saved")}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-black tracking-tight md:text-4xl">
                    {t(`pricing.${b.id}`)}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${highlight ? "text-background/75" : "text-muted-foreground"}`}
                  >
                    {t(`pricing.${b.id}.desc`)}
                  </p>

                  <div
                    className={`mt-8 text-[11px] uppercase tracking-[0.2em] ${
                      highlight ? "text-background/60" : "text-muted-foreground"
                    }`}
                  >
                    {t("pricing.includes")}
                  </div>
                  <ul className="mt-3 space-y-2 text-[15px]">
                    {includes.map((it, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-2 h-px w-4 shrink-0 ${
                            highlight ? "bg-background/60" : "bg-foreground/40"
                          }`}
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  onClick={() => prefill(b.id)}
                  className={`group/cta inline-flex items-center justify-between gap-2 border-t pt-6 text-sm uppercase tracking-[0.16em] transition ${
                    highlight
                      ? "border-background/25 hover:text-accent-foreground"
                      : "border-foreground/20 hover:text-accent"
                  }`}
                >
                  {t("pricing.cta")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 rtl:rotate-[-90deg]" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
