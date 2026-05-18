import { Moon, Sun, Circle } from "lucide-react";
import type { BadgeTone } from "./types";

export function NeuToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
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

export function NeuBadge({
  tone = "neutral",
  children,
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
}) {
  const tones: Record<BadgeTone, string> = {
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