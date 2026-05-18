import { NeuToggle } from "./primitives";

export function ThemeSection({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <section
      className="neu-surface p-5 flex flex-col justify-between gap-3 min-h-0 overflow-hidden"
      style={{ gridArea: "tog" }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tema</p>
        <p className="text-lg font-bold truncate mt-1">{dark ? "Oscuro" : "Claro"}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">Cambiar apariencia</p>
        <NeuToggle value={dark} onChange={setDark} />
      </div>
    </section>
  );
}