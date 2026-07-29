import { useI18n } from "@/lib/i18n";

export function HKMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-black leading-none tracking-tighter ${className}`}
      aria-label="HK — Hamdy Khaled"
    >
      HK
    </span>
  );
}

function navigate(hash: string) {
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }
  history.pushState(null, "", hash || "#top");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function Nav() {
  const { t, toggle, lang } = useI18n();
  const links = [
    { href: "#work", key: "nav.work" },
    { href: "#services", key: "nav.services" },
    { href: "#pricing", key: "nav.pricing" },
    { href: "#about", key: "nav.about" },
    { href: "#contact", key: "nav.contact" },
  ];
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" onClick={(e) => handleClick(e, "#top")} className="flex items-center gap-2">
          <HKMark className="text-2xl" />
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Hamdy Khaled
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="group relative text-sm uppercase tracking-[0.14em] text-foreground/80 transition hover:text-foreground"
            >
              {t(l.key)}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <button
          onClick={toggle}
          aria-label="Toggle language"
          className="flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background"
        >
          <span className={lang === "en" ? "font-semibold" : "opacity-40"}>EN</span>
          <span className="opacity-30">/</span>
          <span className={lang === "ar" ? "font-semibold" : "opacity-40"}>ع</span>
        </button>
      </div>
    </header>
  );
}
