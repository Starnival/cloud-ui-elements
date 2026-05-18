import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { NeuBadge } from "./primitives";
import type { Project, Tag } from "./types";

export function ProjectsSection({
  projects,
  filter,
  pageSize,
  onOpen,
}: {
  projects: Project[];
  filter: Tag | "All";
  pageSize: number;
  onOpen: (p: Project) => void;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

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
  }, [projects, filter, query]);

  useEffect(() => { setPage(0); }, [filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-20 z-10 bg-gradient-to-r from-background via-background/80 to-transparent rounded-l-2xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-20 z-10 bg-gradient-to-l from-background via-background/80 to-transparent rounded-r-2xl" />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 lg:h-full min-h-0 lg:overflow-hidden px-10 sm:px-12 md:px-14">
          {current.length === 0 && (
            <div className="col-span-full lg:row-span-full grid place-items-center text-xs text-muted-foreground py-12">
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
                onClick={() => onOpen(p)}
                className="mt-auto neu-surface-sm rounded-xl py-2 px-3 text-xs font-semibold text-primary flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 active:neu-press shrink-0"
              >
                Ver detalle <ArrowUpRight className="size-3.5" />
              </button>
            </article>
          ))}
        </div>
      </div>

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
  );
}