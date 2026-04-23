import { useState, useMemo, useEffect } from "react";
import LeakMap from "../components/map/LeakMap";
import LeakChart from "../components/dashboard/LeakChart";
import LeakTable from "../components/dashboard/LeakTable";
import ControlPanel from "../components/dashboard/ControlPanel";
import AboutSystem from "../components/modals/AboutSystem";
import WelcomePopup from "../components/modals/WelcomePopup";
import { useMethaneLeaks } from "../hooks/useMethaneLeaks";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const leaks = useMethaneLeaks();
  const [filterSeverity, setFilterSeverity] = useState<number | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true); // Auto-open on first load
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    // Automatically manage sidebar based on screen size changes
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredLeaks = useMemo(() => {
    if (filterSeverity === null) return leaks;
    return leaks.filter((l) => {
      if (filterSeverity === 5) return l.severity >= 5;
      if (filterSeverity === 3) return l.severity >= 3 && l.severity <= 4;
      if (filterSeverity === 1) return l.severity <= 2;
      return true;
    });
  }, [leaks, filterSeverity]);

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col lg:flex-row bg-linear-to-br from-slate-950 via-indigo-950/20 to-slate-950">
      {/* FULL-CANVAS MAP (FOUNDATION) */}
      <div className="absolute inset-0 z-0">
        <LeakMap leaks={filteredLeaks} />
      </div>

      {/* PRIMARY CONTROLS (FLOATING) */}
      <ControlPanel 
        onOpenAbout={() => setIsAboutOpen(true)}
        activeFilter={filterSeverity}
        onFilterChange={setFilterSeverity}
      />

      {/* OVERLAY ANALYTICS PANEL (SECONDARY LAYER) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="absolute bottom-0 md:bottom-auto md:top-0 right-0 h-55 sm:h-60 md:h-full w-full md:w-130 z-10 p-3 sm:p-4 md:p-8 flex flex-col gap-3 sm:gap-4 md:gap-6 pointer-events-none overflow-y-auto md:overflow-visible"
          >
             <div className="pointer-events-auto flex flex-col h-full gap-3 sm:gap-4 md:gap-6">
                <div className="flex-none">
                  <LeakChart leaks={filteredLeaks} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <LeakTable leaks={filteredLeaks} />
                </div>
             </div>
             
             {/* TOGGLE BUTTON (DESKTOP) */}
             <button 
               onClick={() => setIsSidebarOpen(false)}
               className="hidden md:flex absolute top-8 -left-12 w-10 h-10 bg-linear-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur border border-cyan-500/30 rounded-lg items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all pointer-events-auto hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30 group"
               title="Hide panel"
             >
                <span className="text-sm font-bold group-hover:scale-110 transition-transform">✕</span>
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE REVEAL BUTTON */}
      {!isSidebarOpen && (
        <motion.button 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setIsSidebarOpen(true)}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:top-1/2 md:right-0 md:-translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-10 bg-linear-to-br from-cyan-500 to-blue-600 md:from-cyan-500/20 md:to-purple-500/20 md:border md:border-cyan-500/30 rounded-full md:rounded-l-lg md:rounded-r-none flex items-center justify-center text-slate-950 md:text-cyan-400 hover:text-white md:hover:text-cyan-300 transition-all shadow-xl md:shadow-none z-20 font-bold text-xs"
        >
           {window.innerWidth < 768 ? "📊" : "→"}
        </motion.button>
      )}

      {/* SYSTEM MODALS & POPUPS */}
      <WelcomePopup isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
      <AboutSystem isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default Dashboard;