import React, { useState, useMemo, useEffect, Suspense } from "react";
import LeakMap from "../components/map/LeakMap";
import LeakChart from "../components/dashboard/LeakChart";
import LeakTable from "../components/dashboard/LeakTable";
import ControlPanel from "../components/dashboard/ControlPanel";
import KPIWidget from "../components/dashboard/KPIWidget";
import { useMethaneLeaks } from "../hooks/useMethaneLeaks";
import { motion, AnimatePresence } from "framer-motion";

const AboutSystem = React.lazy(() => import("../components/modals/AboutSystem"));
const WelcomePopup = React.lazy(() => import("../components/modals/WelcomePopup"));

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
    <div className="flex h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      
      {/* LEFT AREA: MAP (FOUNDATION) */}
      <div className="flex-1 relative h-full min-w-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 w-full h-full">
          <LeakMap leaks={filteredLeaks} />
        </div>

        {/* PRIMARY CONTROLS (TOP CENTER) */}
        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-full px-2" style={{ zIndex: 25 }}>
          <div className="flex justify-center">
            <ControlPanel 
              onOpenAbout={() => setIsAboutOpen(true)}
              activeFilter={filterSeverity}
              onFilterChange={setFilterSeverity}
            />
          </div>
        </div>

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
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl font-bold text-2xl hover:shadow-cyan-500/50 transition-all"
              style={{ zIndex: 15 }}
              title="Show analytics"
            >
              📊
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ANALYTICS PANEL (STATS PAGE) - Side-by-side on desktop, absolute overlay on mobile */}
      <AnimatePresence mode="wait">
        {isHydrated && isSidebarOpen && (
          <motion.div 
            key="analytics-panel"
            initial={isDesktop ? { opacity: 0, width: 0 } : { opacity: 0, y: 50 }}
            animate={isDesktop ? { opacity: 1, width: "32rem" } : { opacity: 1, y: 0 }}
            exit={isDesktop ? { opacity: 0, width: 0 } : { opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`
              ${isDesktop ? 'relative h-full shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur-md' : 'absolute inset-x-0 bottom-0 top-auto z-40 bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-slate-200'}
            `}
            style={{ zIndex: isDesktop ? 10 : 40 }}
          >
            {/* CONTENT PANEL */}
            <div className="w-full h-full p-4 md:p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center md:hidden mb-2">
                <h3 className="text-title-lg text-slate-800">Analytics</h3>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex flex-col gap-4 md:gap-5 h-full">
                {/* KPI Summary Row */}
                <div className="flex-none">
                  <KPIWidget leaks={filteredLeaks} />
                </div>
                {/* Live Telemetry Chart */}
                <div className="flex-none">
                  <LeakChart leaks={filteredLeaks} />
                </div>
                {/* Detection Log Table */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <LeakTable leaks={filteredLeaks} />
                </div>
              </div>
            </div>

            {/* DESKTOP PANEL TOGGLE - Only on desktop */}
            {isDesktop && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Collapse analytics panel"
                className="absolute top-1/2 -translate-y-1/2 -left-10 w-10 h-10 bg-white border border-slate-200 rounded-l-lg flex items-center justify-center text-slate-600 hover:text-cyan-600 hover:border-cyan-500/50 shadow-md transition-all z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                title="Collapse panel"
              >
                <span className="text-lg" aria-hidden="true">→</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP REVEAL BUTTON (when closed) */}
      <AnimatePresence>
        {isHydrated && isDesktop && !isSidebarOpen && (
          <motion.button 
            key="desktop-reveal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Expand analytics panel"
            className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-white border border-slate-200 rounded-l-lg flex items-center justify-center text-slate-600 hover:text-cyan-600 hover:border-cyan-500/50 shadow-md transition-all z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            title="Expand panel"
          >
            <span className="text-lg" aria-hidden="true">←</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* MODALS */}
      {isHydrated && (
        <div style={{ zIndex: 300 }}>
          <Suspense fallback={null}>
            <WelcomePopup isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
            <AboutSystem isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Dashboard;