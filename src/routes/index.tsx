import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sun, Moon, Mail, Github, Linkedin, MapPin,
  Code2, Database, Server, Cloud, Terminal, Cpu,
  Briefcase, ArrowUpRight, X, Circle, User,
  Search, ChevronLeft, ChevronRight,
  Share2, Download, Copy, Check, Twitter, MessageCircle,
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
      className="neu-inset h-9 w-16 rounded-full p-1 transition-all hover:scale-[1.03] active:scale-95"
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

function NeuBadge({
  tone = "neutral",
  children,
}: {
  tone?: "success" | "warning" | "primary" | "neutral";
  children: React.ReactNode;
}) {
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

/* ---------- Data ---------- */
type Tag = "Backend" | "API" | "Database" | "DevOps" | "Frontend";

type Project = {
  name: string;
  tag: Tag;
  status: "success" | "warning" | "primary";
  statusLabel: string;
  description: string;
  stack: string[];
  cover: string;
  gallery: string[];
};

const img = (seed: string, w = 800, h = 500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const projects: Project[] = [
  {
    name: "Helios API",
    tag: "API",
    status: "success",
    statusLabel: "Producción",
    description:
      "API REST para gestión de pedidos en tiempo real. Autenticación JWT, rate limiting y documentación OpenAPI auto-generada.",
    stack: ["Node", "Fastify", "Zod"],
    cover: img("helios"),
    gallery: [img("helios-1"), img("helios-2"), img("helios-3")],
  },
  {
    name: "Orion DB",
    tag: "Database",
    status: "primary",
    statusLabel: "Activo",
    description:
      "Capa de datos con migraciones, seeders y vistas materializadas. Optimización de consultas y particionado por fecha.",
    stack: ["Postgres", "Drizzle", "Redis"],
    cover: img("orion"),
    gallery: [img("orion-1"), img("orion-2"), img("orion-3")],
  },
  {
    name: "Atlas Pipelines",
    tag: "DevOps",
    status: "success",
    statusLabel: "CI/CD",
    description:
      "Pipelines de despliegue continuo con previews por PR, blue/green y rollback automático. Observabilidad integrada.",
    stack: ["GH Actions", "Docker", "K8s"],
    cover: img("atlas"),
    gallery: [img("atlas-1"), img("atlas-2"), img("atlas-3")],
  },
  {
    name: "Nimbus Workers",
    tag: "Backend",
    status: "warning",
    statusLabel: "Beta",
    description:
      "Workers serverless para procesar tareas en background: emails transaccionales, webhooks y reportes.",
    stack: ["Cloudflare", "Queues", "TS"],
    cover: img("nimbus"),
    gallery: [img("nimbus-1"), img("nimbus-2"), img("nimbus-3")],
  },
  {
    name: "Vega Auth",
    tag: "Backend",
    status: "success",
    statusLabel: "Producción",
    description:
      "Servicio de autenticación con OAuth, MFA y sesiones revocables. Logs de auditoría y rotación de claves.",
    stack: ["Go", "Postgres", "JWT"],
    cover: img("vega"),
    gallery: [img("vega-1"), img("vega-2"), img("vega-3")],
  },
  {
    name: "Pulse Metrics",
    tag: "API",
    status: "primary",
    statusLabel: "Diseño",
    description:
      "API de telemetría: ingesta de eventos, agregaciones por minuto y consultas por dimensión arbitraria.",
    stack: ["Rust", "ClickHouse", "gRPC"],
    cover: img("pulse"),
    gallery: [img("pulse-1"), img("pulse-2"), img("pulse-3")],
  },
  {
    name: "Lyra Cache",
    tag: "Database",
    status: "success",
    statusLabel: "Estable",
    description:
      "Capa de caché distribuida con invalidación por tags y warm-up automático tras despliegues.",
    stack: ["Redis", "Lua", "Node"],
    cover: img("lyra"),
    gallery: [img("lyra-1"), img("lyra-2"), img("lyra-3")],
  },
  {
    name: "Forge Console",
    tag: "Frontend",
    status: "warning",
    statusLabel: "Beta",
    description:
      "Consola web para administrar servicios internos: control de feature flags y despliegues con un click.",
    stack: ["React", "TS", "tRPC"],
    cover: img("forge"),
    gallery: [img("forge-1"), img("forge-2"), img("forge-3")],
  },
];

const skills: { icon: typeof Code2; label: string; tag: Tag | "All" }[] = [
  { icon: Cpu, label: "Todos", tag: "All" },
  { icon: Server, label: "Backend", tag: "Backend" },
  { icon: Terminal, label: "API", tag: "API" },
  { icon: Database, label: "Database", tag: "Database" },
  { icon: Cloud, label: "DevOps", tag: "DevOps" },
  { icon: Code2, label: "Frontend", tag: "Frontend" },
];

const experience = [
  { role: "Backend Developer", company: "Faro Studio", period: "2024 — Hoy" },
  { role: "Full-stack autodidacta", company: "Proyectos propios", period: "2022 — 2024" },
  { role: "Frontend Junior", company: "Lumière", period: "2021 — 2022" },
];

const PAGE_SIZE = 6;

/* ---------- Page ---------- */
function Portfolio() {
  const [dark, setDark] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Tag | "All">("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTag = filter === "All" || p.tag === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [filter, query]);

  useEffect(() => { setPage(0); }, [filter, query]);
  useEffect(() => { setSlide(0); }, [openProject]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <main className="min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:h-screen lg:overflow-hidden">
      <style>{`
          @media (min-width: 1024px) {
            .portfolio-grid {
              grid-template-areas:
                "hero hero hero about about about about about about tog tog tog"
                "hero hero hero about about about about about about contact contact contact"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "foot foot foot foot foot foot foot foot foot foot foot foot";
            }
          }
      `}</style>

      <div
        className="portfolio-grid w-full grid gap-4 md:gap-5 lg:h-full lg:grid-cols-12 lg:[grid-template-rows:repeat(8,minmax(0,1fr))]"
      >
        {/* HERO */}
        <section
          className="neu-surface p-6 flex flex-col justify-between min-h-0 overflow-hidden"
          style={{ gridArea: "hero" }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Portfolio · 2026</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95]">
              Ana<br/>Soler
            </h1>
            <p className="mt-3 text-xs text-primary font-mono">{"<"}backend.dev{"/>"}</p>
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
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Backend developer</h2>
              <p className="text-sm text-muted-foreground">Autodidacta · APIs, datos y servicios</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
            Construyo servicios backend escalables con foco en rendimiento, observabilidad y
            APIs limpias. Aprendizaje autodidacta y pragmático: del prototipo al despliegue,
            cuidando cada capa de datos.
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            <NeuBadge tone="primary">APIs</NeuBadge>
            <NeuBadge tone="neutral">SQL</NeuBadge>
            <NeuBadge tone="neutral">Cloud</NeuBadge>
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

        {/* CONTACT */}
        <section
          className="neu-surface p-4 flex items-center gap-3 min-h-0 overflow-hidden"
          style={{ gridArea: "contact" }}
        >
          <a
            href="mailto:hola@anasoler.dev"
            className="neu-surface-sm flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press min-w-0"
          >
            <Mail className="size-4 text-primary shrink-0" />
            <span className="text-xs font-semibold truncate">hola@anasoler.dev</span>
          </a>
          <button className="neu-surface-sm size-10 grid place-items-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press shrink-0">
            <Github className="size-4" />
          </button>
          <button className="neu-surface-sm size-10 grid place-items-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press shrink-0">
            <Linkedin className="size-4 text-primary" />
          </button>
        </section>

        {/* SKILLS = FILTER */}
        <section
          className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "skills" }}
        >
          <div className="flex items-center justify-between mb-4 shrink-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Skills · Filtro</p>
          </div>
          <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-auto pr-1">
            {skills.map((s) => {
              const active = filter === s.tag;
              return (
                <button
                  key={s.label}
                  onClick={() => setFilter(s.tag)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left ${
                    active
                      ? "neu-press text-primary"
                      : "neu-surface-sm hover:-translate-y-0.5 hover:text-primary"
                  }`}
                >
                  <div className={`size-9 grid place-items-center rounded-lg shrink-0 ${active ? "neu-inset" : "neu-surface-sm"}`}>
                    <s.icon className={`size-4 ${active ? "text-primary" : ""}`} />
                  </div>
                  <span className="text-xs font-bold tracking-tight truncate flex-1">{s.label}</span>
                  {active && <Circle className="size-2 fill-current text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="neu-surface p-5 flex flex-col min-h-0 overflow-hidden"
          style={{ gridArea: "proj" }}
        >
          <div className="flex items-center justify-between gap-3 mb-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Proyectos</p>
              <NeuBadge tone="primary">{filtered.length}</NeuBadge>
            </div>
            <div className="neu-inset flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[180px] max-w-xs">
              <Search className="size-3.5 text-muted-foreground shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar proyecto…"
                className="bg-transparent outline-none text-xs w-full placeholder:text-muted-foreground/70"
              />
            </div>
          </div>

          <div className="relative flex-1 min-h-0">
            {/* Edge fade overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-20 z-10 bg-gradient-to-r from-background via-background/80 to-transparent rounded-l-2xl" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-20 z-10 bg-gradient-to-l from-background via-background/80 to-transparent rounded-r-2xl" />

            {/* Edge-fade nav buttons */}
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 neu-surface-sm size-10 grid place-items-center rounded-full transition-all duration-200 hover:scale-110 hover:text-primary active:neu-press disabled:opacity-30 disabled:hover:scale-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Siguiente"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 neu-surface-sm size-10 grid place-items-center rounded-full transition-all duration-200 hover:scale-110 hover:text-primary active:neu-press disabled:opacity-30 disabled:hover:scale-100"
            >
              <ChevronRight className="size-4" />
            </button>

          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-3 h-full min-h-0 overflow-hidden px-12 md:px-14">
            {current.length === 0 && (
              <div className="col-span-full row-span-full grid place-items-center text-xs text-muted-foreground py-12">
                Sin resultados
              </div>
            )}
            {current.map((p) => (
              <article
                key={p.name}
                className="neu-inset p-3 rounded-2xl flex flex-col min-h-0 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-2 shrink-0 neu-press">
                  <img src={p.cover} alt={p.name} className="absolute inset-0 size-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2"><NeuBadge tone={p.status}>{p.statusLabel}</NeuBadge></span>
                </div>
                <div className="flex items-start justify-between gap-2 mb-1 shrink-0">
                  <h3 className="text-sm font-bold tracking-tight leading-tight">{p.name}</h3>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground shrink-0">{p.tag}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 mb-2">{p.description}</p>
                <button
                  onClick={() => setOpenProject(p)}
                  className="mt-auto neu-surface-sm rounded-xl py-2 px-3 text-xs font-semibold text-primary flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 active:neu-press shrink-0"
                >
                  Ver detalle <ArrowUpRight className="size-3.5" />
                </button>
              </article>
            ))}
          </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-1.5 pt-3 mt-2 shrink-0">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Página ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === page ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
                  }`}
                />
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
                <div className="flex items-center justify-between text-[10px] text-muted-foreground gap-2">
                  <span className="truncate">{x.company}</span>
                  <span className="font-mono shrink-0">{x.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section
          className="neu-surface px-4 py-3 flex items-center justify-between min-h-0 overflow-hidden"
          style={{ gridArea: "foot" }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">© 2026 · Ana Soler</p>
          <p className="text-[10px] font-mono text-muted-foreground">v2.0 · backend</p>
        </section>
      </div>

      {/* MODAL */}
      {openProject && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 md:p-6 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpenProject(null)}
        >
          <div
            className="neu-surface p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <NeuBadge tone={openProject.status}>{openProject.statusLabel}</NeuBadge>
              <button
                onClick={() => setOpenProject(null)}
                className="neu-surface-sm size-9 grid place-items-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Carousel */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden neu-press mb-5">
              {openProject.gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${openProject.name} ${i + 1}`}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                    i === slide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                onClick={() => setSlide((s) => (s - 1 + openProject.gallery.length) % openProject.gallery.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 neu-surface-sm size-9 grid place-items-center rounded-full transition-all duration-200 hover:-translate-y-1/2 hover:scale-105 active:neu-press"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setSlide((s) => (s + 1) % openProject.gallery.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 neu-surface-sm size-9 grid place-items-center rounded-full transition-all duration-200 hover:-translate-y-1/2 hover:scale-105 active:neu-press"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {openProject.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === slide ? "w-5 bg-primary" : "w-1.5 bg-background/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{openProject.tag}</p>
            <h3 className="text-2xl font-bold tracking-tighter mt-1 mb-3">{openProject.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{openProject.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {openProject.stack.map((s) => (
                <span key={s} className="text-[10px] font-mono px-2 py-1 rounded neu-surface-sm text-muted-foreground">{s}</span>
              ))}
            </div>
            <button className="w-full neu-surface-sm rounded-2xl py-3 font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 active:neu-press">
              Abrir caso de estudio
            </button>
          </div>
        </div>
      )}
    </main>
  );
}