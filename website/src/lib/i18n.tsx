import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const EN: Dict = {
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.pricing": "Pricing",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.langLabel": "AR",

  "hero.eyebrow": "Independent design studio — Cairo",
  "hero.title.1": "Branding for",
  "hero.title.2": "restaurants,",
  "hero.title.3": "posters, menus &",
  "hero.title.4": "everything in-between.",
  "hero.lede": "I'm Hamdy Khaled. I design considered brand systems, printed matter and digital campaigns for restaurants and independent businesses that refuse to look like everyone else.",
  "hero.cta": "Start a project",
  "hero.secondary": "See selected work",
  "hero.scroll": "Scroll",

  "marquee": "Menus · Posters · Flyers · Websites · Social · Identity · Editorial · Packaging",

  "services.eyebrow": "01 — Services",
  "services.title": "A tight offering, done properly.",
  "services.menus": "Menu Design",
  "services.menus.desc": "From tasting menus to daily specials — typographic, printable, and on-brand.",
  "services.posters": "Posters",
  "services.posters.desc": "Bold, oversized statements for launches, events and campaigns.",
  "services.flyers": "Flyers",
  "services.flyers.desc": "Print and digital flyers that convert without feeling shouty.",
  "services.websites": "Websites",
  "services.websites.desc": "One-page and landing sites built to load fast and read like a magazine.",
  "services.social": "Social & Marketing",
  "services.social.desc": "Cohesive social kits, templates and campaign assets, monthly or one-off.",
  "services.identity": "Identity",
  "services.identity.desc": "Logos, marks and brand systems — the foundation everything else sits on.",

  "portfolio.eyebrow": "02 — Selected work",
  "portfolio.title": "Restaurants, and everything else.",
  "portfolio.all": "All",
  "portfolio.restaurant": "Restaurant",
  "portfolio.general": "General",

  "pricing.eyebrow": "03 — Bundles",
  "pricing.title": "Priced in outcomes, not hours.",
  "pricing.note": "Every studio and every restaurant is different. Bundles start from — final quote after a short brief.",
  "pricing.starter": "Starter",
  "pricing.starter.desc": "For new brands finding their feet.",
  "pricing.launch": "Restaurant Launch",
  "pricing.launch.desc": "Everything a new restaurant needs on day one.",
  "pricing.full": "Full Brand Package",
  "pricing.full.desc": "Identity, menu, web and social — the complete set.",
  "pricing.retainer": "Monthly Retainer",
  "pricing.retainer.desc": "An in-house designer, without the payroll.",
  "pricing.includes": "Includes",
  "pricing.saved": "saved vs. à la carte",
  "pricing.cta": "Get a custom quote",
  "pricing.startingFrom": "Starting from",
  "pricing.onRequest": "On request",

  "about.eyebrow": "04 — About",
  "about.title": "Design that earns its place on the table.",
  "about.bio": "I've spent the last several years designing for restaurants, cafés and independent businesses across Egypt and the region — building identities that look as good on a folded menu as they do on a phone screen.",
  "about.quote": "Restaurants don't need more noise. They need a point of view — printed, plated, and remembered.",
  "about.philosophy1": "Every project starts with the same question: what does this place actually feel like at 8pm on a Friday? The answer usually writes the brief.",
  "about.philosophy2": "I work quietly, in tight loops, and I ship things that clients can actually use — menus that print, posters that scale, websites that don't need me to update them.",

  "contact.eyebrow": "05 — Contact",
  "contact.title": "Tell me about the project.",
  "contact.lede": "The more you can share up front, the sharper the first reply. I usually respond within a day.",
  "contact.name": "Your name",
  "contact.email": "Email",
  "contact.bundle": "Interested in",
  "contact.bundle.none": "Not sure yet",
  "contact.message": "About the project",
  "contact.messagePlaceholder": "What are you making, when is it needed, and where are you based?",
  "contact.send": "Send message",
  "contact.sending": "Sending…",
  "contact.success": "Thanks — I'll be in touch shortly.",
  "contact.error": "Something went wrong. Please email me directly.",
  "contact.or": "Or reach out directly",
  "contact.email.label": "Email",
  "contact.phone.label": "Call",
  "contact.wa.label": "WhatsApp",

  "footer.tag": "Independent design, made in Cairo.",
  "footer.rights": "All rights reserved.",
};

const AR: Dict = {
  "nav.work": "الأعمال",
  "nav.services": "الخدمات",
  "nav.pricing": "الباقات",
  "nav.about": "عني",
  "nav.contact": "تواصل",
  "nav.langLabel": "EN",

  "hero.eyebrow": "استوديو تصميم مستقل — القاهرة",
  "hero.title.1": "هويات",
  "hero.title.2": "للمطاعم،",
  "hero.title.3": "بوسترات، منيوهات",
  "hero.title.4": "وكل ما بينهم.",
  "hero.lede": "أنا حمدي خالد. أصمّم أنظمة هوية مدروسة، مطبوعات وحملات رقمية للمطاعم والمشاريع المستقلة التي ترفض أن تشبه غيرها.",
  "hero.cta": "ابدأ مشروعك",
  "hero.secondary": "تصفح الأعمال",
  "hero.scroll": "اسحب",

  "marquee": "منيوهات · بوسترات · فلايرز · مواقع · سوشيال · هوية · مطبوعات · تغليف",

  "services.eyebrow": "٠١ — الخدمات",
  "services.title": "قائمة قصيرة، منفّذة باحتراف.",
  "services.menus": "تصميم المنيو",
  "services.menus.desc": "من قوائم التذوّق لعروض اليوم — طباعي، جاهز للطبع، بهوية واضحة.",
  "services.posters": "بوسترات",
  "services.posters.desc": "تصميمات جريئة بمقاسات كبيرة للإطلاقات والفعاليات والحملات.",
  "services.flyers": "فلايرز",
  "services.flyers.desc": "فلايرز مطبوعة ورقمية تحقق نتائج دون ضوضاء.",
  "services.websites": "مواقع",
  "services.websites.desc": "مواقع صفحة واحدة وصفحات هبوط سريعة، تُقرأ كمجلة.",
  "services.social": "سوشيال وتسويق",
  "services.social.desc": "قوالب سوشيال متكاملة وحملات، شهرياً أو لمرة واحدة.",
  "services.identity": "هوية بصرية",
  "services.identity.desc": "شعارات، رموز وأنظمة هوية — الأساس اللي كل حاجة تبني عليه.",

  "portfolio.eyebrow": "٠٢ — أعمال مختارة",
  "portfolio.title": "مطاعم، وكل شيء آخر.",
  "portfolio.all": "الكل",
  "portfolio.restaurant": "مطاعم",
  "portfolio.general": "عام",

  "pricing.eyebrow": "٠٣ — الباقات",
  "pricing.title": "التسعير بالنتائج، مش بالساعات.",
  "pricing.note": "كل مشروع مختلف. الباقات تبدأ من — العرض النهائي بعد بريف قصير.",
  "pricing.starter": "البداية",
  "pricing.starter.desc": "للبراندات الجديدة اللي بتبدأ.",
  "pricing.launch": "إطلاق مطعم",
  "pricing.launch.desc": "كل ما يحتاجه مطعم جديد في يومه الأول.",
  "pricing.full": "الباقة الكاملة",
  "pricing.full.desc": "هوية، منيو، موقع وسوشيال — الحزمة الكاملة.",
  "pricing.retainer": "اشتراك شهري",
  "pricing.retainer.desc": "مصمّم داخلي، بدون تعيين.",
  "pricing.includes": "يشمل",
  "pricing.saved": "توفير مقارنة بالسعر المفرد",
  "pricing.cta": "اطلب عرض مخصص",
  "pricing.startingFrom": "يبدأ من",
  "pricing.onRequest": "حسب الطلب",

  "about.eyebrow": "٠٤ — عنّي",
  "about.title": "تصميم يستحق مكانه على الطاولة.",
  "about.bio": "قضيت السنوات الأخيرة في تصميم هويات لمطاعم وكافيهات ومشاريع مستقلة في مصر والمنطقة — أبني هويات تبدو حلوة على منيو ورقي زي ما هي حلوة على شاشة موبايل.",
  "about.quote": "المطاعم مش محتاجة ضوضاء أكتر. محتاجة وجهة نظر — مطبوعة، مقدّمة، ومحفورة في الذاكرة.",
  "about.philosophy1": "كل مشروع بيبدأ بنفس السؤال: المكان ده إحساسه إيه الساعة ٨ ليل يوم جمعة؟ الإجابة عادةً بتكتب البريف.",
  "about.philosophy2": "أشتغل بهدوء، في دورات قصيرة، وأسلّم شغل العملاء يقدروا يستخدموه فعلاً — منيوهات تتطبع، بوسترات تكبر، ومواقع مش محتاجة تحديث منّي.",

  "contact.eyebrow": "٠٥ — تواصل",
  "contact.title": "احكيلي عن المشروع.",
  "contact.lede": "كل ما شاركت تفاصيل أكتر، كل ما الرد الأول جه أدق. عادةً بأرد خلال يوم.",
  "contact.name": "الاسم",
  "contact.email": "البريد الإلكتروني",
  "contact.bundle": "مهتم بـ",
  "contact.bundle.none": "لسه مش متأكد",
  "contact.message": "عن المشروع",
  "contact.messagePlaceholder": "بتصمّم إيه، محتاجه إمتى، وأنت فين؟",
  "contact.send": "إرسال",
  "contact.sending": "جاري الإرسال…",
  "contact.success": "شكراً — هرد عليك قريب.",
  "contact.error": "حصل خطأ. ابعتلي إيميل مباشرة.",
  "contact.or": "أو تواصل مباشرة",
  "contact.email.label": "إيميل",
  "contact.phone.label": "اتصال",
  "contact.wa.label": "واتساب",

  "footer.tag": "تصميم مستقل، من القاهرة.",
  "footer.rights": "جميع الحقوق محفوظة.",
};

const DICTS: Record<Lang, Dict> = { en: EN, ar: AR };

interface I18nCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("hk-lang") as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem("hk-lang", lang);
    } catch {}
  }, [lang]);

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (key) => DICTS[lang][key] ?? key,
      setLang,
      toggle: () => setLang((l) => (l === "en" ? "ar" : "en")),
    }),
    [lang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
}
