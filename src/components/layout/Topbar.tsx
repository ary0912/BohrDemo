import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TopbarProps {
  onMenuToggle: () => void;
}

const Topbar = ({ onMenuToggle }: TopbarProps) => {
  const topbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topbarRef.current) {
      gsap.fromTo(
        topbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <header
      ref={topbarRef}
      role="banner"
      className="h-14 flex items-center px-3 sm:px-4 md:px-6 justify-between bg-white border-b border-slate-200 shadow-sm"
      style={{ zIndex: 200 }}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-6 min-w-0">
        <button
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
          className="lg:hidden w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 hover:border-cyan-200 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h12M2 8h8M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <a
          href="/"
          aria-label="Bohr Operations home"
          className="flex items-center gap-2 sm:gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1 -m-1"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all shrink-0">
            <span className="text-white font-black text-sm tracking-tight">B</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-800 leading-none">
              Bohr <span className="text-cyan-600">Ops</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-tight hidden sm:block">
              Methane Intelligence
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6 pl-6 border-l border-slate-200 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Network Region
            </span>
            <span className="text-xs font-bold text-slate-700">Bristol &amp; South West</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Survey Mode
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700">AMLD Drive-by</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
            aria-hidden="true"
          />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Live
          </span>
        </div>

        <button
          aria-label="User profile"
          className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
