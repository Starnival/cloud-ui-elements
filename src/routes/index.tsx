import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sun, Moon, Mail, Github, Linkedin, MapPin, GraduationCap,
  Code2, Palette, Database, Sparkles, Briefcase, ArrowUpRight,
  X, Circle, User,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* ---------- Primitives ---------- */
function NeuToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      aria-label="Cambiar tema"
      className="neu-inset h-9 w-16 rounded-full p-1 transition-all"
    >
      <div
        className={`h-7 w-7 rounded-full neu-surface-sm transition-transform duration-300 grid place-items-center ${
          value ? "translate-x-7 text-primary" : "translate-x-0"
        }`}
      >
        {value ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </div>
    </button>
  );
}

function NeuBadge({ tone = "neutral", children }: { tone?: "success" | "warning" | "primary" | "neutral"; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    success: "text-emerald-600",
    warning: "text-amber-600",
    primary: "text-primary",
    neutral: "text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full neu-surface-sm px-2.5 py-1 text-[10px] font-semibold ${tones[tone]}`}>
      <Circle className="size-1.5 fill-current" />
      {children}
    </span>
  );
}

function Panel({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`neu-surface p-5 flex flex-col min-h-0 overflow-hidden ${className}`}>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 shrink-0">{label}</p>
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
    </section>
  );
}

/* ---------- Data ---------- */
type Project = {
  name: string; tag: string; status: "success" | "warning" | "primary";
  statusLabel: string; description: string; stack: string[];
};

const projects: Project[] = [
  {
    name: "Aurora Dashboard", tag: "Producto", status: "success", statusLabel: "Activo",
    description: "Rediseño del panel analítico de Northwind. Sistema de tokens, gráficos personalizados y onboarding guiado por IA.",
    stack: ["React", "TS", "D3"],
  },
  {
    name: "Lumen Mobile", tag: "Mobile", status: "warning", statusLabel: "Beta",
    description: "App nativa de meditación con sesiones generativas de audio, transiciones fluidas y sincronización offline.",
    stack: ["RN", "Expo", "Audio"],
  },
  {
    name: "Atlas CMS", tag: "Web", status: "primary", statusLabel: "Diseño",
    description: "CMS editorial multilingüe para casa de moda. Composición tipográfica refinada y previsualización en tiempo real.",
    stack: ["Next", "tRPC", "Postgres"],
  },
];

const skills = [
  { icon: Code2, label: "Frontend", level: 92 },
  { icon: Palette, label: "Diseño UI", level: 88 },
  { icon: Database, label: "Backend", level: 74 },
  { icon: Sparkles, label: "Motion", level: 81 },
];

const experience = [
  { role: "Senior Product Designer", company: "Faro Studio", period: "2023 — Hoy" },
  { role: "Product Designer", company: "Northwind Co.", period: "2020 — 2023" },
  { role: "UI Designer", company: "Lumière", period: "2018 — 2020" },
];

const education = [
  { title: "MA Interaction Design", school: "ELISAVA", year: "2019" },
  { title: "BA Diseño Gráfico", school: "UB", year: "2017" },
];

/* ---------- Page ---------- */
function Portfolio() {
  const [dark, setDark] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-background text-foreground p-4 md:p-6">
      <div
        className="h-full w-full grid gap-4 md:gap-5"
        style={{
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gridTemplateRows: "repeat(8, minmax(0, 1fr))",
          gridTemplateAreas: `
            "hero hero hero about about about about about about tog tog tog"
            "hero hero hero about about about about about about edu edu edu"
            "contact contact contact about about about about about about edu edu edu"
            "skills skills proj proj proj proj proj proj proj exp exp exp"
            "skills skills proj proj proj proj proj proj proj exp exp exp"
            "skills skills proj proj proj proj proj proj proj exp exp exp"
            "skills skills proj proj proj proj proj proj proj exp exp exp"
            "skills skills proj proj proj proj proj proj proj foot foot foot"
          `,
        }}
      >
        {/* HERO */}
        <section
          className="neu-surface p-6 flex flex-col justify-between min-h-0 overflow-hidden"
          style={{ gridArea: "hero" }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Portfolio · 2026</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95]">
              Ana<br/>Soler
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-3.5" /> Barcelona, ES
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="neu-surface p-6 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "about" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Sobre mí</p>
            <NeuBadge tone="success">Disponible</NeuBadge>
          </div>
          <div className="flex items-start gap-5 mb-4">
            <div className="neu-inset size-16 rounded-2xl grid place-items-center shrink-0">
              <User className="size-7 text-primary" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Diseñadora de producto</h2>
              <p className="text-sm text-muted-foreground">Interfaces táctiles, sistemas y motion</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
            Diseño productos digitales con foco en sistemas escalables y micro-interacciones precisas.
            Trabajo con equipos pequeños para llevar ideas de cero a producto, cuidando cada detalle
            de la superficie hasta el flujo completo.
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            <NeuBadge tone="primary">Design Systems</NeuBadge>
            <NeuBadge tone="neutral">Prototipado</NeuBadge>
            <NeuBadge tone="neutral">Brand</NeuBadge>
          </div>
        </section>

        {/* TOGGLE */}
        <section
          className="neu-surface p-4 flex items-center justify-between gap-3 min-h-0 overflow-hidden"
          style={{ gridArea: "tog" }}
        >
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tema</p>
            <p className="text-sm font-semibold truncate">{dark ? "Oscuro" : "Claro"}</p>
          </div>
          <NeuToggle value={dark} onChange={setDark} />
        </section>

        {/* EDUCATION */}
        <section
          className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "edu" }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 shrink-0">Educación</p>
          <div className="flex-1 flex flex-col justify-around gap-2 min-h-0 overflow-auto">
            {education.map((e) => (
              <div key={e.title} className="neu-inset p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="size-3.5 text-primary shrink-0" />
                  <p className="text-xs font-bold tracking-tight truncate">{e.title}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="truncate">{e.school}</span><span>{e.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          className="neu-surface p-4 flex items-center gap-3 min-h-0 overflow-hidden"
          style={{ gridArea: "contact" }}
        >
          <a href="mailto:hola@anasoler.dev" className="neu-surface-sm flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl active:neu-press transition-all min-w-0">
            <Mail className="size-4 text-primary shrink-0" />
            <span className="text-xs font-semibold truncate">hola@anasoler.dev</span>
          </a>
          <button className="neu-surface-sm size-10 grid place-items-center rounded-xl active:neu-press shrink-0">
            <Github className="size-4" />
          </button>
          <button className="neu-surface-sm size-10 grid place-items-center rounded-xl active:neu-press shrink-0">
            <Linkedin className="size-4 text-primary" />
          </button>
        </section>

        {/* SKILLS */}
        <section
          className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "skills" }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 shrink-0">Skills</p>
          <div className="flex-1 flex flex-col justify-around gap-3 min-h-0">
            {skills.map((s) => (
              <div key={s.label}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="neu-surface-sm size-8 grid place-items-center rounded-lg shrink-0">
                    <s.icon className="size-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{s.label}</p>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{s.level}</span>
                </div>
                <div className="neu-press h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "proj" }}
        >
          <div className="flex items-center justify-between mb-4 shrink-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Proyectos destacados</p>
            <NeuBadge tone="primary">{projects.length} activos</NeuBadge>
          </div>
          <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
            {projects.map((p) => (
              <article key={p.name} className="neu-inset p-4 rounded-2xl flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-start justify-between mb-2 shrink-0">
                  <NeuBadge tone={p.status}>{p.statusLabel}</NeuBadge>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{p.tag}</span>
                </div>
                <h3 className="text-base font-bold tracking-tight leading-tight mb-1.5">{p.name}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[9px] font-mono px-1.5 py-0.5 rounded neu-surface-sm text-muted-foreground">{s}</span>
                  ))}
                </div>
                <button
                  onClick={() => setOpenProject(p)}
                  className="mt-auto neu-surface-sm rounded-xl py-2 px-3 text-xs font-semibold text-primary flex items-center justify-between active:neu-press transition-all shrink-0"
                >
                  Ver detalle <ArrowUpRight className="size-3.5" />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "exp" }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 shrink-0">Experiencia</p>
          <div className="flex-1 flex flex-col justify-around gap-2 min-h-0 overflow-auto">
            {experience.map((x) => (
              <div key={x.company} className="neu-inset p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="size-3.5 text-primary shrink-0" />
                  <p className="text-xs font-bold tracking-tight truncate">{x.role}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="truncate">{x.company}</span><span className="font-mono">{x.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section
          className="neu-surface px-4 flex items-center justify-between min-h-0 overflow-hidden"
          style={{ gridArea: "foot" }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">© 2026</p>
          <p className="text-[10px] font-mono text-muted-foreground">v1.2</p>
        </section>
      </div>

      {/* MODAL */}
      {openProject && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-6 bg-background/60 backdrop-blur-sm"
          onClick={() => setOpenProject(null)}
        >
          <div className="neu-surface p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <NeuBadge tone={openProject.status}>{openProject.statusLabel}</NeuBadge>
              <button onClick={() => setOpenProject(null)} className="neu-surface-sm size-9 grid place-items-center rounded-xl active:neu-press">
                <X className="size-4" />
              </button>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{openProject.tag}</p>
            <h3 className="text-2xl font-bold tracking-tighter mt-1 mb-3">{openProject.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{openProject.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {openProject.stack.map((s) => (
                <span key={s} className="text-[10px] font-mono px-2 py-1 rounded neu-surface-sm text-muted-foreground">{s}</span>
              ))}
            </div>
            <button className="w-full neu-surface-sm rounded-2xl py-3 font-semibold text-primary active:neu-press">
              Abrir caso de estudio
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
