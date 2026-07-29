import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  { key: "menus", num: "01" },
  { key: "posters", num: "02" },
  { key: "flyers", num: "03" },
  { key: "websites", num: "04" },
  { key: "social", num: "05" },
  { key: "identity", num: "06" },
];

export function Services() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-foreground/10 py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-end mb-16">
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-3 reveal">
            {t("services.eyebrow")}
          </div>
          <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight md:col-span-9 md:text-7xl reveal reveal-delay-1">
            {t("services.title")}
          </h2>
        </div>

        <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
          {SERVICES.map((s, i) => (
            <li key={s.key}>
              <a
                href="#contact"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition md:grid-cols-[80px_1fr_2fr_auto] md:py-10"
              >
                <span className="font-mono text-xs text-muted-foreground">{s.num}</span>
                <span className="font-display text-3xl font-black tracking-tight transition group-hover:text-accent md:text-6xl">
                  {t(`services.${s.key}`)}
                </span>
                <span className="hidden text-sm text-muted-foreground md:block max-w-md">
                  {t(`services.${s.key}.desc`)}
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 -translate-x-2 opacity-40 transition group-hover:translate-x-0 group-hover:opacity-100 rtl:rotate-[-90deg] rtl:translate-x-2 rtl:group-hover:translate-x-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
