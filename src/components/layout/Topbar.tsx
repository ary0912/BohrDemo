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
    <div ref={topbarRef} className="h-16 bohr-panel rounded-none border-0 flex items-center px-3 sm:px-4 md:px-8 justify-between relative shadow-xl bg-linear-to-r from-slate-950/50 to-indigo-950/20 border-b border-cyan-500/10" style={{ zIndex: 200 }}>
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-8 min-w-0">
        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden w-10 h-10 rounded-lg bg-slate-900/60 border border-cyan-500/30 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:bg-slate-900 hover:border-cyan-500/50 transition-all group active:scale-95"
        >
           <div className="space-y-1">
             <div className="w-4 h-0.5 bg-current group-hover:w-5 transition-all" />
             <div className="w-3 h-0.5 bg-current" />
             <div className="w-4 h-0.5 bg-current group-hover:w-5 transition-all" />
           </div>
        </button>

        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all shrink-0">
            <span className="text-slate-950 font-black text-sm sm:text-base tracking-tight">B</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="font-bold text-xs sm:text-sm tracking-tight text-white uppercase leading-none truncate">
              Bohr <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Ops</span>
            </h1>
            <p className="text-[10px] text-cyan-400/70 font-medium hidden xs:block">Telemetry</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4 md:space-x-8 pl-4 md:pl-8 border-l border-cyan-500/15 shrink-0">
          <div className="flex flex-col">
            <span className="text-label text-cyan-400/70 mb-1">Mesh Status</span>
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <motion.div 
                  key={i}
                  animate={i < 5 ? { opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className={`w-3 h-1 rounded-full transition-all ${i < 5 ? "bg-linear-to-r from-cyan-400 to-blue-400" : "bg-slate-700"}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        {/* STATUS BADGE - HIDDEN ON VERY SMALL SCREENS */}
        <div className="hidden sm:flex items-center space-x-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full" 
          />
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-[0.06em] whitespace-nowrap">
            Live
          </span>
        </div>
        
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-br from-slate-900/80 to-slate-800/80 border border-cyan-500/20 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all shadow-lg active:scale-95 cursor-pointer">
           <span className="text-xs sm:text-sm font-bold">AL</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;