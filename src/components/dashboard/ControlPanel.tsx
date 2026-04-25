import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface ControlPanelProps {
  onOpenAbout: () => void;
  activeFilter: number | null;
  onFilterChange: (severity: number | null) => void;
}

const filters = [
  { label: "Action", severity: 5, color: "#dc2626" },
  { label: "Review", severity: 3, color: "#d97706" },
  { label: "Nominal", severity: 1, color: "#059669" },
];

const ControlPanel = ({ onOpenAbout, activeFilter, onFilterChange }: ControlPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-[calc(100%-1rem)] md:w-auto max-w-3xl pointer-events-none">
      <div className="bg-white/95 backdrop-blur-sm px-3 md:px-5 py-2.5 md:py-3 flex items-center gap-3 md:gap-4 pointer-events-auto rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={onOpenAbout}
          aria-label="System information"
          className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 hover:text-cyan-700 hover:bg-cyan-100 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="h-5 w-px bg-slate-200 hidden md:block" />

        <div className="flex items-center gap-2" role="group" aria-label="Severity filter">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 hidden md:block">
            Filter
          </span>
          <button
            onClick={() => onFilterChange(null)}
            aria-pressed={activeFilter === null}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              activeFilter === null
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-slate-500 hover:text-cyan-600 hover:bg-slate-50"
            }`}
          >
            All
          </button>
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => onFilterChange(f.severity)}
              aria-pressed={activeFilter === f.severity}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                activeFilter === f.severity
                  ? "shadow-sm"
                  : "hover:opacity-80"
              }`}
              style={{
                color: f.color,
                backgroundColor: activeFilter === f.severity ? `${f.color}12` : "transparent",
                border: activeFilter === f.severity ? `1px solid ${f.color}40` : "1px solid transparent",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: f.color }}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">{f.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ControlPanel);
