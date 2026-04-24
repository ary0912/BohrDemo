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
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950/20 to-slate-950">
      {/* FULL-CANVAS MAP (FOUNDATION - z-base) */}
      <div className="absolute inset-0 z-map">
        <LeakMap leaks={filteredLeaks} />
      </div>

      {/* PRIMARY CONTROLS (FLOATING - TOPMOST on mobile, LEFT on desktop) */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 z-control-panel md:right-6 md:bottom-auto">
        <ControlPanel 
          onOpenAbout={() => setIsAboutOpen(true)}
          activeFilter={filterSeverity}
          onFilterChange={setFilterSeverity}
        />
      </div>

      {/* ANALYTICS PANEL - DESKTOP: Right sidebar | MOBILE: Bottom sheet */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="absolute z-panels bottom-0 md:top-0 md:bottom-auto right-0 h-auto md:h-full w-full md:w-130 p-3 sm:p-4 md:p-8 flex flex-col gap-3 sm:gap-4 md:gap-6 pointer-events-none"
          >
             <div className="pointer-events-auto flex flex-col max-h-55 md:max-h-none md:h-full gap-3 sm:gap-4 md:gap-6 overflow-y-auto md:overflow-visible custom-scrollbar">
                <div className="flex-none">
                  <LeakChart leaks={filteredLeaks} />
                </div>
                <div className="flex-1 min-h-32 md:overflow-hidden">
                  <LeakTable leaks={filteredLeaks} />
                </div>
             </div>
             
             {/* CLOSE BUTTON (VISIBLE on all screens) */}
             <motion.button 
               onClick={() => setIsSidebarOpen(false)}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               className="md:absolute md:top-8 md:-left-12 pointer-events-auto w-full md:w-10 h-10 bg-linear-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur border border-cyan-500/30 rounded-lg md:rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30 group text-sm font-bold"
               title="Close panel"
             >
                <span className="md:hidden">Hide Analytics</span>
                <span className="hidden md:block">✕</span>
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE REVEAL BUTTON - Only shown when sidebar is closed */}
      {!isSidebarOpen && (
        <motion.button 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSidebarOpen(true)}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:hidden z-floating-button w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-slate-950 hover:text-white transition-all shadow-xl font-bold text-lg"
        >
           📊
        </motion.button>
      )}

      {/* DESKTOP SIDEBAR TOGGLE - Only on desktop */}
      {isSidebarOpen && (
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 z-floating-button w-10 h-10 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-l-lg items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30"
          title="Close panel (keyboard: ESC)"
        >
          <span>→</span>
        </motion.button>
      )}

      {/* SYSTEM MODALS & POPUPS (Highest z-index) */}
      <WelcomePopup isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
      <AboutSystem isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default Dashboard;