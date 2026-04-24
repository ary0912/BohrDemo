import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Leak } from "../../types/leak";
import gsap from "gsap";

const getColor = (severity: number) => {
  if (severity <= 2) return { hex: "#10b981", label: "NOMINAL", bg: "#10b98115", border: "#10b98130" };
  if (severity <= 4) return { hex: "#f59e0b", label: "ANALYZE", bg: "#f59e0b15", border: "#f59e0b30" };
  return { hex: "#ef4444", label: "ACTION", bg: "#ef444415", border: "#ef444430" };
};

const getTimeElapsed = (timestamp: string): string => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 5) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
};

const IntensityBar = ({ severity }: { severity: number }) => {
  const pct = Math.min((severity / 10) * 100, 100);
  const { hex } = getColor(severity);
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-xs font-bold leading-none" style={{ color: hex }}>
        {Math.round(severity * 14.2)}{" "}
        <span className="text-[10px] font-medium text-slate-400">ppm</span>
      </span>
      <div className="h-1 w-full max-w-[60px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: hex }}
        />
      </div>
    </div>
  );
};

const LeakTable = ({ leaks }: { leaks: Leak[] }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const displayLeaks = [...leaks].slice(-12).reverse();

  useEffect(() => {
    if (tableContainerRef.current) {
      gsap.fromTo(
        tableContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={tableContainerRef}
      className="bohr-panel bg-white p-4 sm:p-5 md:p-6 h-full shadow-md relative overflow-hidden group flex flex-col border border-slate-200 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10 flex-wrap gap-2">
        <div className="flex flex-col">
          <h3 className="text-label text-slate-500">Sensor Mesh Alert Log</h3>
          <span className="text-title-sm text-slate-800 mt-0.5">
            Live <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Detections</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {displayLeaks.length} / 12 records
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 relative z-10">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white/95 backdrop-blur z-20 border-b-2 border-slate-100">
            <tr>
              <th className="py-2.5 text-[10px] font-bold uppercase tracking-[0.07em] text-slate-400 px-2">Node</th>
              <th className="py-2.5 text-[10px] font-bold uppercase tracking-[0.07em] text-slate-400">Intensity</th>
              <th className="py-2.5 text-[10px] font-bold uppercase tracking-[0.07em] text-slate-400 hidden sm:table-cell">Detected</th>
              <th className="py-2.5 text-[10px] font-bold uppercase tracking-[0.07em] text-slate-400 text-right pr-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {displayLeaks.map((l) => {
                const style = getColor(l.severity);
                return (
                  <motion.tr
                    key={l.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="group/row hover:bg-slate-50 border-b border-slate-100 transition-colors"
                  >
                    {/* Node ID */}
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: style.hex }}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-mono font-semibold text-slate-700 tracking-tight">
                          {l.id.slice(0, 8).toUpperCase()}
                        </span>
                      </div>
                    </td>

                    {/* Intensity Bar */}
                    <td className="py-3">
                      <IntensityBar severity={l.severity} />
                    </td>

                    {/* Time Elapsed */}
                    <td className="py-3 hidden sm:table-cell">
                      <span className="text-xs text-slate-400 font-medium tabular-nums">
                        {getTimeElapsed(l.timestamp)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 text-right pr-2">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-bold tracking-tight uppercase transition-all group-hover/row:shadow-sm"
                        style={{
                          backgroundColor: style.bg,
                          color: style.hex,
                          borderColor: style.border,
                        }}
                      >
                        {style.label === "ACTION" && (
                          <span aria-hidden="true">⚠</span>
                        )}
                        {style.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {displayLeaks.length === 0 && (
          <div className="h-40 flex flex-col items-center justify-center opacity-40 italic p-4 md:p-10 text-center">
            <div className="text-3xl md:text-4xl mb-2">📡</div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.06em] text-slate-400">
              Awaiting Signal Matrix...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LeakTable);