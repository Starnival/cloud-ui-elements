export function FooterSection({ left, right }: { left: string; right: string }) {
  return (
    <section
      className="neu-surface px-4 py-3 flex items-center justify-between min-h-0 overflow-hidden"
      style={{ gridArea: "foot" }}
    >
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{left}</p>
      <p className="text-[10px] font-mono text-muted-foreground">{right}</p>
    </section>
  );
}