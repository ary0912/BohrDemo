import React, { useState, useMemo, useCallback, useSyncExternalStore, Suspense } from "react";
import LeakMap from "../components/map/LeakMap";
import LeakChart from "../components/dashboard/LeakChart";
import LeakTable from "../components/dashboard/LeakTable";
import ControlPanel from "../components/dashboard/ControlPanel";
import KPIWidget from "../components/dashboard/KPIWidget";
import { useMethaneLeaks } from "../hooks/useMethaneLeaks";
import { motion, AnimatePresence } from "framer-motion";

const AboutSystem = React.lazy(() => import("../components/modals/AboutSystem"));
const WelcomePopup = React.lazy(() => import("../components/modals/WelcomePopup"));

const subscribeToResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getIsDesktop = () => window.innerWidth >= 1024;

const Dashboard = () => {
  const leaks = useMethaneLeaks();
  const [filterSeverity, setFilterSeverity] = useState<number | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  const isDesktop = useSyncExternalStore(subscribeToResize, getIsDesktop, () => false);
  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const isSidebarOpen = userOverride ?? isDesktop;
  const toggleSidebar = useCallback((open: boolean) => setUserOverride(open), []);

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
    <div className="flex h-full w-full overflow-hidden bg-slate-50">
      {/* Map */}
      <div className="flex-1 relative h-full min-w-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 w-full h-full">
          <LeakMap leaks={filteredLeaks} />
        </div>

        {/* Controls */}
        <div
          className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-full px-2"
          style={{ zIndex: 25 }}
        >
          <div className="flex justify-center">
            <ControlPanel
              onOpenAbout={() => setIsAboutOpen(true)}
              activeFilter={filterSeverity}
              onFilterChange={setFilterSeverity}
            />
          </div>
        </div>

        {/* Mobile toggle */}
        <AnimatePresence>
          {!isSidebarOpen && !isDesktop && (
            <motion.button
              key="reveal-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSidebar(true)}
              className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
              style={{ zIndex: 15 }}
              aria-label="Show analytics panel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 15V9M7 15V5M11 15V8M15 15V3M19 15V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Analytics panel */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            key="analytics-panel"
            initial={isDesktop ? { opacity: 0, width: 0 } : { opacity: 0, y: 50 }}
            animate={isDesktop ? { opacity: 1, width: "28rem" } : { opacity: 1, y: 0 }}
            exit={isDesktop ? { opacity: 0, width: 0 } : { opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className={
              isDesktop
                ? "relative h-full shrink-0 border-l border-slate-200 bg-slate-50"
                : "absolute inset-x-0 bottom-0 top-auto z-40 bg-white/98 backdrop-blur-xl rounded-t-2xl shadow-2xl border-t border-slate-200"
            }
            role="complementary"
            aria-label="Analytics panel"
            style={{ zIndex: isDesktop ? 10 : 40 }}
          >
            <div className="w-full h-full p-4 md:p-5 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
              {/* Mobile close */}
              {!isDesktop && (
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-slate-800">Analytics</h3>
                  <button
                    onClick={() => toggleSidebar(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                    aria-label="Close analytics panel"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}

              <KPIWidget leaks={filteredLeaks} />
              <LeakChart leaks={filteredLeaks} />
              <div className="flex-1 min-h-0 overflow-hidden">
                <LeakTable leaks={filteredLeaks} />
              </div>
            </div>

            {/* Desktop collapse button */}
            {isDesktop && (
              <button
                onClick={() => toggleSidebar(false)}
                aria-label="Collapse analytics panel"
                className="absolute top-1/2 -translate-y-1/2 -left-8 w-8 h-8 bg-white border border-slate-200 rounded-l-lg flex items-center justify-center text-slate-400 hover:text-cyan-600 hover:border-cyan-200 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop expand button */}
      <AnimatePresence>
        {isDesktop && !isSidebarOpen && (
          <motion.button
            key="desktop-reveal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => toggleSidebar(true)}
            aria-label="Expand analytics panel"
            className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 bg-white border border-slate-200 rounded-l-lg flex items-center justify-center text-slate-400 hover:text-cyan-600 hover:border-cyan-200 shadow-sm transition-all z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M8 2l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modals */}
      <Suspense fallback={null}>
          <WelcomePopup isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
          <AboutSystem isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      </Suspense>
    </div>
  );
};

export default Dashboard;
