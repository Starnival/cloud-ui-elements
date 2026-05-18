import { useEffect, useState } from "react";
import { X, Copy, Check, Twitter, Linkedin, MessageCircle, Mail } from "lucide-react";

export function ShareModal({
  shareUrl,
  shareText,
  onClose,
}: {
  shareUrl: string;
  shareText: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(shareUrl)}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const networks = [
    { Icon: Twitter, label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
    { Icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { Icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}` },
    { Icon: Mail, label: "Email", href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Compartir portfolio"
      className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4 md:p-6 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="neu-surface p-6 md:p-8 max-w-sm w-full animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Compartir</p>
            <h3 className="text-xl font-bold tracking-tight mt-1">Mi portfolio</h3>
          </div>
          <button
            onClick={onClose}
            className="neu-surface-sm size-9 grid place-items-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="neu-inset rounded-2xl p-5 grid place-items-center mb-5">
          <div className="bg-white rounded-xl p-3">
            <img src={qrUrl} alt="QR del portfolio" width={200} height={200} className="block size-[200px]" />
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 text-center">Escanea para abrir en otro dispositivo</p>
        </div>

        <button
          onClick={copyLink}
          className="neu-surface-sm w-full rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:neu-press"
        >
          {copied ? <Check className="size-4 text-emerald-600 shrink-0" /> : <Copy className="size-4 text-primary shrink-0" />}
          <span className="text-xs font-mono truncate flex-1 text-left text-muted-foreground">{shareUrl}</span>
          <span className="text-[10px] font-bold text-primary shrink-0">{copied ? "Copiado" : "Copiar"}</span>
        </button>

        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Redes</p>
        <div className="grid grid-cols-4 gap-2">
          {networks.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="neu-surface-sm rounded-xl py-3 flex flex-col items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:text-primary active:neu-press"
            >
              <Icon className="size-4" />
              <span className="text-[10px] font-semibold">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}