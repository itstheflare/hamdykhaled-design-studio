import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Hero, Marquee } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Portfolio } from "@/components/site/portfolio";
import { Pricing } from "@/components/site/pricing";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hamdy Khaled — Restaurant Branding & Design Studio" },
      {
        name: "description",
        content:
          "Independent design studio for restaurants and independent businesses — menus, posters, identity, websites and social. Cairo-based, working worldwide.",
      },
      { property: "og:title", content: "Hamdy Khaled — Restaurant Branding & Design Studio" },
      {
        property: "og:description",
        content:
          "Independent design studio for restaurants and independent businesses — menus, posters, identity, websites and social. Cairo-based, working worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type View = "home" | "work" | "services" | "pricing" | "about" | "contact";

const HASH_MAP: Record<string, View> = {
  "": "home",
  "#top": "home",
  "#work": "work",
  "#services": "services",
  "#pricing": "pricing",
  "#about": "about",
  "#contact": "contact",
};

function Index() {
  const [view, setView] = useState<View>("home");

  useEffect(() => {
    const sync = () => {
      const v = HASH_MAP[window.location.hash] ?? "home";
      setView(v);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <I18nProvider>
      <Nav />
      <main className="pt-24">
        {view === "home" && (
          <>
            <Hero />
            <Marquee />
          </>
        )}
        {view === "work" && <Portfolio />}
        {view === "services" && <Services />}
        {view === "pricing" && <Pricing />}
        {view === "about" && <About />}
        {view === "contact" && <Contact />}
      </main>
      <Footer />
    </I18nProvider>
  );
}
