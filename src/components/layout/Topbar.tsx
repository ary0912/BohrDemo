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

    <div ref={topbarRef} className="h-16 bohr-panel rounded-none border-0 flex items-center px-3 sm:px-4 md:px-8 justify-between relative shadow-sm bg-white/90 border-b border-slate-200" style={{ zIndex: 200 }}>
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-8 min-w-0">
        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-cyan-600 hover:bg-slate-100 hover:border-cyan-300 transition-all group active:scale-95"
        >
           <div className="space-y-1">
             <div className="w-4 h-0.5 bg-current group-hover:w-5 transition-all" />
             <div className="w-3 h-0.5 bg-current" />
             <div className="w-4 h-0.5 bg-current group-hover:w-5 transition-all" />
           </div>
        </button>

        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all shrink-0">
            <span className="text-white font-black text-sm sm:text-base tracking-tight">B</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="font-bold text-xs sm:text-sm tracking-tight text-slate-800 uppercase leading-none truncate">
              Bohr <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Ops</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium hidden xs:block">Telemetry</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4 md:space-x-8 pl-4 md:pl-8 border-l border-slate-200 shrink-0">
          <div className="flex flex-col">
            <span className="text-label text-slate-500 mb-1">Mesh Status</span>
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <motion.div 
                  key={i}
                  animate={i < 5 ? { opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className={`w-3 h-1 rounded-full transition-all ${i < 5 ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-slate-300"}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        {/* STATUS BADGE - HIDDEN ON VERY SMALL SCREENS */}
        <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-cyan-100 hover:border-cyan-200 transition-all">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
          />
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-[0.06em] whitespace-nowrap">
            Live
          </span>
        </div>
        
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-cyan-600 hover:border-cyan-300 hover:bg-slate-100 transition-all shadow-sm active:scale-95 cursor-pointer">
           <span className="text-xs sm:text-sm font-bold">AL</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;