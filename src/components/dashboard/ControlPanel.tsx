import { useRef, useEffect } from "react";
import gsap from "gsap";
import type React from "react";

interface ControlPanelProps {
  onOpenAbout: () => void;
  activeFilter: number | null;
  onFilterChange: (severity: number | null) => void;
}

const ControlPanel = ({ onOpenAbout, activeFilter, onFilterChange }: ControlPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filters = [
    { label: "Alert", severity: 5, color: "var(--color-alert)" },
    { label: "Warn", severity: 3, color: "var(--color-warn)" },
    { label: "Safe", severity: 1, color: "var(--color-safe)" },
  ];

  useEffect(() => {
    // Animate container on mount
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleFilterClick = (severity: number | null, index: number) => {
    const btn = buttonRefs.current[index + 1]; // +1 for "All" button
    if (btn) {
      gsap.timeline()
        .to(btn, { scale: 0.95, duration: 0.1 }, 0)
        .to(btn, { scale: 1, duration: 0.15 }, 0.1);
    }
    onFilterChange(severity);
  };

  return (
    <div ref={containerRef} className="w-[calc(100%-1rem)] md:w-[calc(100%-3rem)] max-w-3xl pointer-events-none px-2 md:px-0">
      <div className="bohr-panel px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between md:justify-start md:space-x-6 md:space-y-0 space-y-3 pointer-events-auto gap-3 md:gap-0">
        {/* Info Button */}
        <button 
          ref={(el) => { buttonRefs.current[0] = el; }}
          onClick={onOpenAbout}
          className="flex items-center space-x-2 group cursor-pointer p-2 -m-2 hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-all">
            <span className="text-xs font-bold">i</span>
          </div>
          <span className="hidden sm:block text-label text-cyan-400">System Info</span>
        </button>

        {/* Filters */}
        <div className="flex items-center space-x-2 md:space-x-3 flex-wrap md:flex-nowrap justify-center md:justify-start">
          <span className="text-label hidden md:block text-cyan-400/70">Severity</span>
          <div className="flex space-x-2">
            <button 
              ref={(el) => { buttonRefs.current[1] = el; }}
              onClick={() => handleFilterClick(null, -1)}
              className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold uppercase tracking-[0.06em] transition-all duration-300 ${
                activeFilter === null 
                ? "bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-cyan-100 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-500/20" 
                : "text-slate-400 hover:text-cyan-300 hover:bg-slate-900/40"
              }`}
            >
              All
            </button>
            {filters.map((f, idx) => (
              <button 
                key={f.label}
                ref={(el) => { buttonRefs.current[idx + 2] = el; }}
                onClick={() => handleFilterClick(f.severity, idx)}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold uppercase tracking-[0.06em] flex items-center space-x-1.5 transition-all duration-300 ${
                  activeFilter === f.severity 
                  ? "ring-1 ring-inset shadow-lg" 
                  : "hover:opacity-75"
                }`}
                style={{ 
                  color: f.color,
                  backgroundColor: activeFilter === f.severity ? `${f.color}25` : 'transparent',
                  borderColor: activeFilter === f.severity ? f.color : 'transparent',
                  boxShadow: activeFilter === f.severity ? `0 8px 24px ${f.color}30` : 'none',
                  '--tw-ring-color': `${f.color}50`
                } as React.CSSProperties}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.color }} />
                <span className="hidden xs:inline">{f.label}</span>
                <span className="xs:hidden uppercase">{f.label.slice(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
