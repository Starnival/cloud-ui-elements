import { Mail, Github, Linkedin, MapPin, Share2, Download } from "lucide-react";
import type { PortfolioData } from "./types";

export function HeroSection({
  hero,
  onShare,
}: {
  hero: PortfolioData["hero"];
  onShare: () => void;
}) {
  return (
    <section
      className="neu-surface p-6 flex flex-col justify-between min-h-0 overflow-hidden"
      style={{ gridArea: "hero" }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{hero.kicker}</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95]">
          {hero.firstName}<br />{hero.lastName}
        </h1>
        <p className="mt-3 text-xs text-primary font-mono">{hero.tagline}</p>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${hero.email}`}
          className="neu-surface-sm flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press min-w-0"
        >
          <Mail className="size-4 text-primary shrink-0" />
          <span className="text-xs font-semibold truncate">{hero.email}</span>
        </a>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onShare}
            className="neu-surface-sm rounded-xl py-2.5 px-3 text-xs font-bold text-primary flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:neu-press"
          >
            <Share2 className="size-3.5" /> Compartir
          </button>
          <a
            href={hero.cvUrl}
            download={hero.cvFileName}
            className="neu-surface-sm rounded-xl py-2.5 px-3 text-xs font-bold text-primary flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:neu-press"
          >
            <Download className="size-3.5" /> Descargar CV
          </a>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <MapPin className="size-3.5" /> {hero.location}
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={hero.socials.github}
              target="_blank" rel="noreferrer"
              className="neu-surface-sm size-8 grid place-items-center rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press"
            >
              <Github className="size-3.5" />
            </a>
            <a
              href={hero.socials.linkedin}
              target="_blank" rel="noreferrer"
              className="neu-surface-sm size-8 grid place-items-center rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press"
            >
              <Linkedin className="size-3.5 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}