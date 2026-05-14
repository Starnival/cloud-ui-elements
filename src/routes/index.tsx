import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Bell, Search, Settings, User, Play, Pause, Plus, Check, X,
  Sun, Moon, Music, Camera, Mail, Home,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function NeuButton({
  children, variant = "default", size = "md", onClick,
}: { children: React.ReactNode; variant?: "default" | "primary" | "icon"; size?: "sm" | "md" | "lg"; onClick?: () => void }) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  const isIcon = variant === "icon";
  return (
    <button
      onClick={onClick}
      className={`group relative font-semibold tracking-tight transition-all duration-200
        ${isIcon ? "h-14 w-14 grid place-items-center rounded-2xl" : `${sizes[size]} rounded-2xl`}
        ${variant === "primary" ? "text-primary" : "text-foreground/80"}
        neu-surface-sm active:neu-press hover:-translate-y-px active:translate-y-0`}
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
      className="neu-inset h-10 w-20 rounded-full p-1.5 transition-all"
    >
      <div
        className={`h-7 w-7 rounded-full neu-surface-sm transition-transform duration-300 ${
          value ? "translate-x-10 text-primary" : "translate-x-0"
        } grid place-items-center`}
      >
        {value ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </div>
    </button>
  );
}

function Index() {
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:px-16">
      <header className="max-w-6xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Kit UI · v1.0</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Neumorphism</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Componentes suaves, esculpidos en la superficie. Sombras dobles, profundidad táctil.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Buttons panel */}
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

        {/* Inputs panel */}
        <section className="neu-surface p-8">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Inputs</h2>
          <div className="space-y-5">
            <NeuInput icon={Search} placeholder="Buscar componentes..." />
            <NeuInput icon={Mail} placeholder="hola@ejemplo.com" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Modo claro / oscuro</span>
              <NeuToggle value={toggle} onChange={setToggle} />
            </div>
          </div>
        </section>

        {/* Profile panel */}
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
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-6 bg-background/60 backdrop-blur-sm"
          onClick={() => setModal(false)}
        >
          <div
            className="neu-surface p-10 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
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
          </div>
        </div>
      )}
    </main>
  );
}
