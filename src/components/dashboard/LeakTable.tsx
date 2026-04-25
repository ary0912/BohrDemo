import React, { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Leak } from "../../types/leak";
import { getSeverityConfig } from "../../types/leak";
import gsap from "gsap";

const statusStyles: Record<string, { text: string; bg: string }> = {
  detected:      { text: "text-blue-700",    bg: "bg-blue-50" },
  investigating: { text: "text-amber-700",   bg: "bg-amber-50" },
  confirmed:     { text: "text-red-700",     bg: "bg-red-50" },
  repaired:      { text: "text-emerald-700", bg: "bg-emerald-50" },
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

const IntensityBar = ({ concentration, severity }: { concentration: number; severity: number }) => {
  const pct = Math.min((concentration / 100) * 100, 100);
  const { color } = getSeverityConfig(severity);
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-xs font-bold leading-none" style={{ color }}>
        {concentration}{" "}
        <span className="text-[10px] font-medium text-slate-400">ppb</span>
      </span>
      <div className="h-1 w-full max-w-[60px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const LeakTable = ({ leaks }: { leaks: Leak[] }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const displayLeaks = useMemo(() => [...leaks].slice(-15).reverse(), [leaks]);

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
      className="bg-white p-4 sm:p-5 h-full border border-slate-200 rounded-xl shadow-sm flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
            Detection Log
          </h3>
          <span className="text-sm font-bold text-slate-800">
            Live <span className="text-cyan-600">Detections</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {displayLeaks.length} records
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        <table className="w-full text-left border-collapse" role="table">
          <thead className="sticky top-0 bg-white/95 backdrop-blur z-20 border-b border-slate-100">
            <tr>
              <th scope="col" className="py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2">
                ID
              </th>
              <th scope="col" className="py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Concentration
              </th>
              <th scope="col" className="py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 hidden md:table-cell">
                Location
              </th>
              <th scope="col" className="py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 hidden sm:table-cell">
                Time
              </th>
              <th scope="col" className="py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 text-right pr-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {displayLeaks.map((leak) => {
                const severity = getSeverityConfig(leak.severity);
                const status = statusStyles[leak.status] ?? statusStyles.detected;
                return (
                  <motion.tr
                    key={leak.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="group hover:bg-slate-50 border-b border-slate-50 transition-colors"
                  >
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: severity.color }}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-mono font-semibold text-slate-700">
                          {leak.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <IntensityBar concentration={leak.concentration_ppb} severity={leak.severity} />
                    </td>
                    <td className="py-2.5 hidden md:table-cell">
                      <span className="text-xs text-slate-500 font-medium truncate block max-w-[140px]">
                        {leak.address}
                      </span>
                    </td>
                    <td className="py-2.5 hidden sm:table-cell">
                      <span className="text-xs text-slate-400 font-medium tabular-nums">
                        {getTimeElapsed(leak.timestamp)}
                      </span>
                    </td>
                    <td className="py-2.5 text-right pr-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${status.text} ${status.bg}`}
                      >
                        {leak.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {displayLeaks.length === 0 && (
          <div className="h-32 flex flex-col items-center justify-center text-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-2 text-slate-300" aria-hidden="true">
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 10v4M16 20v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Awaiting detections...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LeakTable);
