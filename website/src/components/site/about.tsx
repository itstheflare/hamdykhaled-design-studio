import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";

export function About() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="border-t border-foreground/10 py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-end mb-16">
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-3 reveal">
            {t("about.eyebrow")}
          </div>
          <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight md:col-span-9 md:text-7xl reveal reveal-delay-1">
            {t("about.title")}
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-1 reveal">
            <p className="text-lg leading-relaxed text-foreground/80">{t("about.bio")}</p>
            <div className="mt-10 space-y-6 text-foreground/70">
              <p>{t("about.philosophy1")}</p>
              <p>{t("about.philosophy2")}</p>
            </div>
          </div>

          <blockquote className="md:col-span-6 md:col-start-7 reveal reveal-delay-2">
            <div className="font-display text-3xl font-black italic leading-[1.1] tracking-tight md:text-6xl">
              <span className="text-accent">“</span>
              {t("about.quote")}
              <span className="text-accent">”</span>
            </div>
            <div className="mt-8 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              — Hamdy Khaled
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
