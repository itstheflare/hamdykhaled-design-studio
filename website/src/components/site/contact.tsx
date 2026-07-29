import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { ArrowUpRight, Mail, Phone, MessageCircle } from "lucide-react";

const EMAIL = "hamdykhaled667@gmail.com";
const PHONE = "+201014878166";
const PHONE_DISPLAY = "+20 101 487 8166";
const WA = "https://wa.me/201014878166";

// Replace this with a real Formspree ID (https://formspree.io) — the form works out of the box on submit.
const FORMSPREE_ID = "xdkogldp";
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

const BUNDLE_KEYS = ["none", "starter", "launch", "full", "retainer"] as const;

export function Contact() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const [bundle, setBundle] = useState<string>("none");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail && BUNDLE_KEYS.includes(detail as (typeof BUNDLE_KEYS)[number])) {
        setBundle(detail);
      }
    };
    window.addEventListener("hk:prefill-bundle", handler);
    return () => window.removeEventListener("hk:prefill-bundle", handler);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
        setBundle("none");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="border-t border-foreground/10 py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-3 reveal">
            {t("contact.eyebrow")}
          </div>
          <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight md:col-span-9 md:text-7xl reveal reveal-delay-1">
            {t("contact.title")}
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 reveal">
            <p className="text-lg text-foreground/80">{t("contact.lede")}</p>

            <div className="mt-12 space-y-6 border-t border-foreground/15 pt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("contact.or")}
              <ul className="space-y-4 text-base normal-case tracking-normal text-foreground">
                <li>
                  <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 hover:text-accent">
                    <Mail className="h-4 w-4" />
                    <span className="font-display text-xl">{EMAIL}</span>
                    <ArrowUpRight className="ms-auto h-4 w-4 opacity-40 transition group-hover:opacity-100 rtl:rotate-[-90deg]" />
                  </a>
                </li>
                <li>
                  <a href={`tel:${PHONE}`} className="group flex items-center gap-4 hover:text-accent">
                    <Phone className="h-4 w-4" />
                    <span className="font-display text-xl">{PHONE_DISPLAY}</span>
                    <ArrowUpRight className="ms-auto h-4 w-4 opacity-40 transition group-hover:opacity-100 rtl:rotate-[-90deg]" />
                  </a>
                </li>
                <li>
                  <a
                    href={WA}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-display text-xl">WhatsApp</span>
                    <ArrowUpRight className="ms-auto h-4 w-4 opacity-40 transition group-hover:opacity-100 rtl:rotate-[-90deg]" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="md:col-span-7 grid gap-8 reveal reveal-delay-2"
          >
            <Field label={t("contact.name")} name="name" required />
            <Field label={t("contact.email")} name="email" type="email" required />

            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("contact.bundle")}
              </span>
              <select
                name="bundle"
                value={bundle}
                onChange={(e) => setBundle(e.target.value)}
                className="border-b border-foreground/30 bg-transparent py-3 text-lg outline-none focus:border-foreground"
              >
                {BUNDLE_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k === "none" ? t("contact.bundle.none") : t(`pricing.${k}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("contact.message")}
              </span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder={t("contact.messagePlaceholder")}
                className="resize-none border-b border-foreground/30 bg-transparent py-3 text-lg outline-none focus:border-foreground"
              />
            </label>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm uppercase tracking-[0.16em] text-background transition hover:bg-accent disabled:opacity-50"
              >
                {status === "sending" ? t("contact.sending") : t("contact.send")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-[-90deg]" />
              </button>
              {status === "ok" && (
                <span className="text-sm text-accent">{t("contact.success")}</span>
              )}
              {status === "err" && (
                <span className="text-sm text-destructive">{t("contact.error")}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-foreground/30 bg-transparent py-3 text-lg outline-none focus:border-foreground"
      />
    </label>
  );
}
