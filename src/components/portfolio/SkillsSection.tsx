import { Code2, Database, Server, Cloud, Terminal, Cpu, Circle } from "lucide-react";
import type { SkillItem, Tag } from "./types";

const ICONS: Record<string, typeof Code2> = {
  Code2, Database, Server, Cloud, Terminal, Cpu,
};

export function SkillsSection({
  skills,
  filter,
  setFilter,
}: {
  skills: SkillItem[];
  filter: Tag | "All";
  setFilter: (t: Tag | "All") => void;
}) {
  return (
    <section
      className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
      style={{ gridArea: "skills" }}
    >
      <div className="flex items-center justify-between mb-4 shrink-0">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Skills · Filtro</p>
      </div>
      <div className="flex-1 flex flex-row lg:flex-col gap-2 min-h-0 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1 -mx-1 px-1 lg:mx-0 lg:px-0 snap-x snap-mandatory lg:snap-none">
        {skills.map((s) => {
          const Icon = ICONS[s.icon] ?? Cpu;
          const active = filter === s.tag;
          return (
            <button
              key={s.label}
              onClick={() => setFilter(s.tag)}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left shrink-0 lg:shrink snap-start ${
                active
                  ? "neu-press text-primary"
                  : "neu-surface-sm hover:-translate-y-0.5 hover:text-primary"
              }`}
            >
              <div className={`size-9 grid place-items-center rounded-lg shrink-0 ${active ? "neu-inset" : "neu-surface-sm"}`}>
                <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
              </div>
              <span className="text-xs font-bold tracking-tight truncate lg:flex-1">{s.label}</span>
              {active && <Circle className="hidden lg:block size-2 fill-current text-primary shrink-0" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}