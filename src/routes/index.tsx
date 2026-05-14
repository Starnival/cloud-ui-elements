import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart, Bell, Search, Settings, User, Play, Pause, Plus, Check, X,
  Sun, Moon, Music, Camera, Mail, Home, ArrowUpRight, Circle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function NeuButton({
  children, variant = "default", size = "md", onClick, className = "",
}: { children: React.ReactNode; variant?: "default" | "primary" | "icon"; size?: "sm" | "md" | "lg"; onClick?: () => void; className?: string }) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  const isIcon = variant === "icon";
  return (
    <button
      onClick={onClick}
      className={`font-semibold tracking-tight transition-all duration-200
        ${isIcon ? "h-14 w-14 grid place-items-center rounded-2xl" : `${sizes[size]} rounded-2xl`}
        ${variant === "primary" ? "text-primary" : "text-foreground/80"}
        neu-surface-sm active:neu-press hover:-translate-y-px active:translate-y-0 ${className}`}
    >
      {children}
    </button>
  );
}

function NeuInput({ icon: Icon, placeholder }: { icon: React.ElementType; placeholder: string }) {
  return (
    <div className="neu-inset flex items-center gap-3 px-5 py-4">
      <Icon className="size-5 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/70"
      />
    </div>
  );
}

function NeuToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      aria-label="Cambiar tema"
      className="neu-inset h-10 w-20 rounded-full p-1.5 transition-all"
    >
      <div
        className={`h-7 w-7 rounded-full neu-surface-sm transition-transform duration-300 ${
          value ? "translate-x-10 text-primary" : "translate-x-0"
        } grid place-items-center`}
      >
        {value ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </div>
    </button>
  );
}

function NeuBadge({ tone = "neutral", children }: { tone?: "success" | "warning" | "danger" | "primary" | "neutral"; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
    primary: "text-primary",
    neutral: "text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full neu-surface-sm px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      <Circle className="size-2 fill-current" />
      {children}
    </span>
  );
}

type Project = {
  name: string; client: string; status: "success" | "warning" | "danger" | "primary";
  statusLabel: string; progress: number; tag: string; description: string;
};

const projects: Project[] = [
  {
    name: "Aurora Dashboard", client: "Northwind Co.", status: "success", statusLabel: "Activo",
    progress: 72, tag: "Producto",
    description:
      "Rediseño completo del panel analítico de Northwind. Incluye sistema de tokens, librería de gráficos personalizada y un flujo de onboarding guiado por IA. Lanzamiento previsto para Q3.",
  },
  {
    name: "Lumen Mobile", client: "Faro Studio", status: "warning", statusLabel: "En revisión",
    progress: 45, tag: "Mobile",
    description:
      "App nativa de meditación con sesiones generativas de audio. Estamos puliendo la transición de pantalla de inicio y la sincronización offline antes de la beta cerrada.",
  },
  {
    name: "Atlas CMS", client: "Ediciones Lumière", status: "primary", statusLabel: "En diseño",
    progress: 28, tag: "Web",
    description:
      "CMS editorial multilingüe para una casa de moda. Foco en composición tipográfica refinada, bloques modulares y previsualización en tiempo real para los editores.",
  },
];

function Index() {
  const [modal, setModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dark, setDark] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Restore preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  // Persist + apply
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const tableRows = [
    { id: "#A-2401", name: "Marina Ortiz", role: "Diseño", status: "success" as const, label: "Activo", value: "98%" },
    { id: "#A-2402", name: "Iván Cortés", role: "Frontend", status: "warning" as const, label: "Pendiente", value: "64%" },
    { id: "#A-2403", name: "Lía Romero", role: "Producto", status: "primary" as const, label: "Revisión", value: "81%" },
    { id: "#A-2404", name: "Hugo Méndez", role: "Backend", status: "danger" as const, label: "Bloqueado", value: "22%" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:px-16">
      <header className="max-w-6xl mx-auto mb-16 flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Kit UI · v1.1</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Neumorphism</h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Componentes suaves, esculpidos en la superficie. Sombras dobles, profundidad táctil.
          </p>
        </div>
        <NeuToggle value={dark} onChange={setDark} />
      </header>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Buttons */}
        <section className="neu-surface p-8">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Botones</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <NeuButton size="sm">Pequeño</NeuButton>
            <NeuButton>Default</NeuButton>
            <NeuButton variant="primary" size="lg">Primario</NeuButton>
          </div>
          <div className="flex flex-wrap gap-4">
            <NeuButton variant="icon"><Heart className="size-5 text-primary" /></NeuButton>
            <NeuButton variant="icon"><Bell className="size-5" /></NeuButton>
            <NeuButton variant="icon"><Settings className="size-5" /></NeuButton>
            <NeuButton variant="icon" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause className="size-5 text-primary" /> : <Play className="size-5 text-primary" />}
            </NeuButton>
            <NeuButton variant="icon"><Plus className="size-5" /></NeuButton>
          </div>
        </section>

        {/* Inputs */}
        <section className="neu-surface p-8">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Inputs</h2>
          <div className="space-y-5">
            <NeuInput icon={Search} placeholder="Buscar componentes..." />
            <NeuInput icon={Mail} placeholder="hola@ejemplo.com" />
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <NeuBadge tone="success">Estable</NeuBadge>
              <NeuBadge tone="primary">Beta</NeuBadge>
              <NeuBadge tone="warning">Borrador</NeuBadge>
              <NeuBadge tone="danger">Crítico</NeuBadge>
            </div>
          </div>
        </section>

        {/* Panel */}
        <section className="neu-surface p-8 md:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Panel</h2>
            <div className="flex gap-3">
              <NeuButton variant="icon"><Home className="size-5" /></NeuButton>
              <NeuButton variant="icon"><Camera className="size-5" /></NeuButton>
              <NeuButton variant="icon"><Music className="size-5" /></NeuButton>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="neu-inset p-6 flex flex-col items-center text-center">
              <div className="neu-surface-sm size-20 grid place-items-center mb-4">
                <User className="size-8 text-primary" />
              </div>
              <p className="font-semibold">Ana Soler</p>
              <p className="text-sm text-muted-foreground">Diseñadora</p>
            </div>
            <div className="neu-inset p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Progreso</p>
              <p className="text-4xl font-bold tracking-tighter">82%</p>
              <div className="mt-4 neu-press h-3 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: "82%" }} />
              </div>
            </div>
            <div className="neu-inset p-6 flex flex-col justify-between">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Acción</p>
              <button
                onClick={() => setModal(true)}
                className="mt-4 neu-surface-sm rounded-2xl py-3 font-semibold text-primary active:neu-press transition-all"
              >
                Abrir modal
              </button>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="neu-surface p-8 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Equipo</h2>
            <NeuBadge tone="neutral">{tableRows.length} miembros</NeuBadge>
          </div>
          <div className="neu-inset p-3 rounded-2xl">
            <div className="grid grid-cols-[1fr_2fr_1.2fr_1.2fr_0.8fr] gap-4 px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span>ID</span><span>Nombre</span><span>Rol</span><span>Estado</span><span className="text-right">KPI</span>
            </div>
            <div className="space-y-2">
              {tableRows.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[1fr_2fr_1.2fr_1.2fr_0.8fr] items-center gap-4 px-4 py-4 rounded-xl neu-surface-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                  <div className="flex items-center gap-3">
                    <div className="neu-surface-sm size-9 rounded-full grid place-items-center">
                      <User className="size-4 text-primary" />
                    </div>
                    <span className="font-semibold">{r.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{r.role}</span>
                  <NeuBadge tone={r.status}>{r.label}</NeuBadge>
                  <span className="text-right font-bold tracking-tight">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project cards */}
        <section className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Proyectos</h2>
            <NeuBadge tone="primary">{projects.length} activos</NeuBadge>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.name} className="neu-surface p-6 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <NeuBadge tone={p.status}>{p.statusLabel}</NeuBadge>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.tag}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{p.client}</p>

                <div className="neu-inset p-3 rounded-xl mb-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Progreso</span><span className="font-bold text-foreground">{p.progress}%</span>
                  </div>
                  <div className="neu-press h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => setOpenProject(p)}
                  className="mt-auto neu-surface-sm rounded-2xl py-3 px-4 font-semibold text-primary flex items-center justify-between active:neu-press transition-all"
                >
                  Ver detalle <ArrowUpRight className="size-4" />
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Modal genérico */}
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <div className="flex items-start justify-between mb-6">
            <div className="neu-surface-sm size-14 grid place-items-center">
              <Check className="size-6 text-primary" />
            </div>
            <button onClick={() => setModal(false)} className="neu-surface-sm size-10 grid place-items-center rounded-xl active:neu-press">
              <X className="size-4" />
            </button>
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">Confirmación suave</h3>
          <p className="text-muted-foreground mb-8">
            Este modal flota sobre la superficie con sombras dobles, conservando la sensación táctil del kit.
          </p>
          <div className="flex gap-3">
            <NeuButton onClick={() => setModal(false)}>Cancelar</NeuButton>
            <button
              onClick={() => setModal(false)}
              className="flex-1 neu-surface-sm rounded-2xl py-3 font-semibold text-primary active:neu-press"
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}

      {/* Project modal */}
      {openProject && (
        <Modal onClose={() => setOpenProject(null)}>
          <div className="flex items-start justify-between mb-6">
            <NeuBadge tone={openProject.status}>{openProject.statusLabel}</NeuBadge>
            <button onClick={() => setOpenProject(null)} className="neu-surface-sm size-10 grid place-items-center rounded-xl active:neu-press">
              <X className="size-4" />
            </button>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{openProject.tag} · {openProject.client}</p>
          <h3 className="text-3xl font-bold tracking-tighter mt-1 mb-4">{openProject.name}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{openProject.description}</p>

          <div className="neu-inset p-4 rounded-xl mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Avance global</span>
              <span className="font-bold text-foreground">{openProject.progress}%</span>
            </div>
            <div className="neu-press h-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: `${openProject.progress}%` }} />
            </div>
          </div>

          <div className="flex gap-3">
            <NeuButton onClick={() => setOpenProject(null)}>Cerrar</NeuButton>
            <button className="flex-1 neu-surface-sm rounded-2xl py-3 font-semibold text-primary active:neu-press">
              Abrir proyecto
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-6 bg-background/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="neu-surface p-10 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
