import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const { t, dir } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const Arrow = dir === "rtl" ? ArrowUpRight : ArrowUpRight;

  return (
    <section className="relative min-h-[100svh] pt-32">
      <div ref={ref} className="mx-auto grid max-w-[1600px] gap-12 px-6 md:px-10">
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-muted-foreground reveal">
          <span className="h-px w-10 bg-current" />
          <span>{t("hero.eyebrow")}</span>
        </div>

        <h1 className="font-display text-balance text-[clamp(3rem,10vw,10.5rem)] font-black leading-[0.9] tracking-[-0.03em]">
          <span className="block reveal">{t("hero.title.1")}</span>
          <span className="block reveal reveal-delay-1">
            <span className="text-accent italic">{t("hero.title.2")}</span>
          </span>
          <span className="block reveal reveal-delay-2 ps-[8vw]">{t("hero.title.3")}</span>
          <span className="block reveal reveal-delay-3">{t("hero.title.4")}</span>
        </h1>

        <div className="grid gap-10 pt-8 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-8 reveal reveal-delay-4">
            <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">{t("hero.lede")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm uppercase tracking-[0.16em] text-background transition hover:bg-accent"
              >
                {t("hero.cta")}
                <Arrow className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-[-90deg]" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-sm uppercase tracking-[0.16em] transition hover:border-foreground"
              >
                {t("hero.secondary")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1600px] items-end justify-between px-6 text-[11px] uppercase tracking-[0.24em] text-muted-foreground md:px-10">
        <div className="flex items-center gap-2">
          <ArrowDown className="h-3 w-3 animate-bounce" />
          <span>{t("hero.scroll")}</span>
        </div>
        <div className="hidden md:block">© {new Date().getFullYear()} — HK Studio</div>
      </div>
    </section>
  );
}

export function Marquee() {
  const { t } = useI18n();
  const items = t("marquee");
  return (
    <div className="relative border-y border-foreground/15 py-8 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap gap-16 font-display text-4xl md:text-6xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="opacity-90">
            {items}
          </span>
        ))}
      </div>
    </div>
  );
}
