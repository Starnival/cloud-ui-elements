import { Briefcase } from "lucide-react";
import type { Experience } from "./types";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section
      className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
      style={{ gridArea: "exp" }}
    >
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 shrink-0">Experiencia</p>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:flex lg:flex-col lg:justify-around min-h-0 lg:overflow-auto">
        {experience.map((x) => (
          <div key={x.company} className="neu-inset p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="size-3.5 text-primary shrink-0" />
              <p className="text-xs font-bold tracking-tight truncate">{x.role}</p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground gap-2">
              <span className="truncate">{x.company}</span>
              <span className="font-mono shrink-0">{x.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}