import { User } from "lucide-react";
import { NeuBadge } from "./primitives";
import type { PortfolioData } from "./types";

export function AboutSection({ about }: { about: PortfolioData["about"] }) {
  return (
    <section
      className="neu-surface p-6 flex flex-col min-h-0 overflow-hidden"
      style={{ gridArea: "about" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{about.kicker}</p>
        <NeuBadge tone="success">{about.availability}</NeuBadge>
      </div>
      <div className="flex items-start gap-5 mb-4">
        <div className="neu-inset size-16 rounded-2xl grid place-items-center shrink-0">
          <User className="size-7 text-primary" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">{about.title}</h2>
          <p className="text-sm text-muted-foreground">{about.subtitle}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">{about.body}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {about.tags.map((t) => (
          <NeuBadge key={t.label} tone={t.tone}>{t.label}</NeuBadge>
        ))}
      </div>
    </section>
  );
}