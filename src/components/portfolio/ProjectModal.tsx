import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { NeuBadge } from "./primitives";
import type { Project } from "./types";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => { setSlide(0); }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      const n = project.gallery.length;
      if (e.key === "ArrowLeft") setSlide((s) => (s - 1 + n) % n);
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${project.name}`}
      className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4 md:p-6 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="neu-surface p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <NeuBadge tone={project.status}>{project.statusLabel}</NeuBadge>
          <button
            onClick={onClose}
            className="neu-surface-sm size-9 grid place-items-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden neu-press mb-5">
          {project.gallery.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.name} ${i + 1}`}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                i === slide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <button
            onClick={() => setSlide((s) => (s - 1 + project.gallery.length) % project.gallery.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 neu-surface-sm size-9 grid place-items-center rounded-full transition-all duration-200 hover:-translate-y-1/2 hover:scale-105 active:neu-press"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => setSlide((s) => (s + 1) % project.gallery.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 neu-surface-sm size-9 grid place-items-center rounded-full transition-all duration-200 hover:-translate-y-1/2 hover:scale-105 active:neu-press"
          >
            <ChevronRight className="size-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {project.gallery.map((_, i) => (
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

        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{project.tag}</p>
        <h3 className="text-2xl font-bold tracking-tighter mt-1 mb-3">{project.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((s) => (
            <span key={s} className="text-[10px] font-mono px-2 py-1 rounded neu-surface-sm text-muted-foreground">{s}</span>
          ))}
        </div>
        <button className="w-full neu-surface-sm rounded-2xl py-3 font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 active:neu-press">
          Abrir caso de estudio
        </button>
      </div>
    </div>
  );
}