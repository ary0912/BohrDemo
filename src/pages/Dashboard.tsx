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
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  
  // MOBILE-FIRST: Start closed, only open on desktop after mount
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Set hydrated flag and initialize sidebar state based on screen size
    const updateSidebarState = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setIsSidebarOpen(desktop);
      setIsHydrated(true);
    };

    // Run after component mounts to avoid hydration mismatch
    updateSidebarState();

    // Handle resize events
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setIsSidebarOpen(desktop);
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* FULL-CANVAS MAP (FOUNDATION) - Always visible */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <LeakMap leaks={filteredLeaks} />
      </div>

      {/* PRIMARY CONTROLS (TOP CENTER - Always visible) */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-full px-2" style={{ zIndex: 25 }}>
        <div className="flex justify-center">
          <ControlPanel 
            onOpenAbout={() => setIsAboutOpen(true)}
            activeFilter={filterSeverity}
            onFilterChange={setFilterSeverity}
          />
        </div>
      </div>

      {/* ANALYTICS PANEL - Only render after hydration to avoid flicker */}
      <AnimatePresence mode="wait">
        {isHydrated && isSidebarOpen && (
          <motion.div 
            key="analytics-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-0 md:top-0 md:bottom-auto right-0 w-full md:w-130 md:h-full pointer-events-none"
            style={{ zIndex: 20 }}
          >
            {/* MOBILE: Bottom sheet overlay */}
            <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pointer-events-auto" />
            
            {/* CONTENT PANEL */}
            <div className="absolute bottom-0 md:top-0 md:bottom-auto right-0 w-full md:w-full h-auto md:h-full p-3 sm:p-4 md:p-8 flex flex-col gap-3 sm:gap-4 md:gap-6 pointer-events-auto overflow-y-auto md:overflow-visible custom-scrollbar">
              <div className="flex flex-col max-h-52 md:max-h-none md:h-full gap-3 sm:gap-4 md:gap-6">
                <div className="flex-none">
                  <LeakChart leaks={filteredLeaks} />
                </div>
                <div className="flex-1 min-h-32 md:min-h-0 md:overflow-hidden">
                  <LeakTable leaks={filteredLeaks} />
                </div>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <motion.button 
              onClick={() => setIsSidebarOpen(false)}
              whileTap={{ scale: 0.95 }}
              className="absolute md:absolute md:top-8 md:-left-12 bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-auto md:right-auto pointer-events-auto px-4 md:px-0 py-2.5 md:py-0 h-auto md:h-10 bg-linear-to-r from-cyan-500 to-blue-600 md:from-cyan-500/20 md:to-purple-500/20 md:border md:border-cyan-500/30 rounded-lg md:rounded-l-lg flex items-center justify-center text-white md:text-cyan-400 hover:md:text-cyan-300 hover:md:border-cyan-500/50 transition-all text-sm md:text-base font-bold gap-2"
              title="Close analytics"
            >
              <span className="md:hidden">Close 📊</span>
              <span className="hidden md:block">✕</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE REVEAL BUTTON - Shown when sidebar is closed on mobile */}
      <AnimatePresence>
        {isHydrated && !isSidebarOpen && !isDesktop && (
          <motion.button 
            key="reveal-button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(true)}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl font-bold text-2xl hover:shadow-cyan-500/50 transition-all"
            style={{ zIndex: 15 }}
            title="Show analytics"
          >
            📊
          </motion.button>
        )}
      </AnimatePresence>

      {/* DESKTOP PANEL TOGGLE - Only on desktop */}
      <AnimatePresence>
        {isHydrated && isDesktop && isSidebarOpen && (
          <motion.button 
            key="desktop-toggle"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(false)}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-l-lg items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30"
            style={{ zIndex: 15 }}
            title="Collapse panel"
          >
            <span className="text-lg">←</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* MODALS */}
      {isHydrated && (
        <div style={{ zIndex: 300 }}>
          <WelcomePopup isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
          <AboutSystem isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;