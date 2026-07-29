import { useI18n } from "@/lib/i18n";
import { HKMark } from "./nav";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-foreground/15 py-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex items-end gap-4">
          <HKMark className="text-6xl md:text-8xl" />
          <div className="pb-2">
            <div className="font-display text-lg">Hamdy Khaled</div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("footer.tag")}
            </div>
          </div>
        </div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          © {new Date().getFullYear()} HK Studio — {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
