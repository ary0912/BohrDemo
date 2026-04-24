import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Leak } from "../../types/leak";
import gsap from "gsap";

const getColor = (severity: number) => {
  if (severity <= 2) return "var(--color-safe)";
  if (severity <= 4) return "var(--color-warn)";
  return "var(--color-alert)";
};

const getStatus = (severity: number) => {
  if (severity <= 2) return "NOMINAL";
  if (severity <= 4) return "ANALYZE";
  return "ACTION";
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
    <div ref={tableContainerRef} className="bohr-panel bg-white p-4 sm:p-5 md:p-6 h-full shadow-md relative overflow-hidden group flex flex-col border border-slate-200 rounded-xl">
      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10 flex-wrap gap-2">
        <h3 className="text-label text-slate-500">Sensor Mesh Alert Log</h3>
        <div className="text-hint text-slate-400 hidden sm:block text-xs">v2.14 TELEMETRY</div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 relative z-10">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead className="sticky top-0 bg-white/95 backdrop-blur z-20 border-b border-slate-200">
            <tr>
              <th className="py-2 md:py-3 text-label text-slate-500 px-2 font-bold">Node</th>
              <th className="py-2 md:py-3 text-label text-slate-500 font-bold">PPM</th>
              <th className="py-2 md:py-3 text-label text-slate-500 hidden md:table-cell font-bold">Signal</th>
              <th className="py-2 md:py-3 text-label text-slate-500 hidden lg:table-cell font-bold">Coordinates</th>
              <th className="py-2 md:py-3 text-label text-slate-500 text-right pr-2 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {displayLeaks.map((l) => (
                <motion.tr 
                  key={l.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="group/row hover:bg-slate-50 border-b border-slate-100 transition-colors"
                >
                  <td className="py-2 md:py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: getColor(l.severity) }} />
                      <span className="text-xs font-medium text-slate-700 font-mono">ID-{l.id.slice(0, 3)}</span>
                    </div>
                  </td>
                  <td className="py-2 md:py-3">
                    <span className="text-xs md:text-sm font-bold" style={{ color: getColor(l.severity) }}>
                      {l.severity * 14}.2
                    </span>
                  </td>
                  <td className="py-2 md:py-3 hidden md:table-cell">
                      <div className="flex items-end space-x-0.5">
                        {[1, 2, 3, 4].map(i => <div key={i} className={`w-1.5 h-${i + 1} rounded-sm transition-all ${i < 3 ? "bg-gradient-to-t from-cyan-400 to-blue-500" : "bg-slate-200"}`} />)}
                    </div>
                  </td>
                  <td className="py-2 md:py-3 hidden lg:table-cell">
                    <span className="text-xs text-slate-500 font-medium font-mono">
                      {l.lat.toFixed(4)}, {l.lng.toFixed(4)}
                    </span>
                  </td>
                  <td className="py-2 md:py-3 text-right pr-2">
                    <span 
                      className="px-2 py-1 rounded-md border text-[10px] md:text-xs font-bold tracking-tight uppercase transition-all group-hover/row:shadow-sm"
                      style={{ 
                        backgroundColor: `${getColor(l.severity)}10`, 
                        color: getColor(l.severity),
                        borderColor: `${getColor(l.severity)}30`
                      } as React.CSSProperties}
                    >
                      {getStatus(l.severity)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {displayLeaks.length === 0 && (
           <div className="h-40 flex flex-col items-center justify-center opacity-40 italic p-4 md:p-10 text-center">
              <div className="text-3xl md:text-4xl mb-2">📡</div>
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.06em] text-slate-400">Awaiting Signal Matrix...</span>
           </div>
        )}
      </div>
    </div>
  );
};

export default LeakTable;