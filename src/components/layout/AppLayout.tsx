import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const newIsLarge = window.innerWidth >= 1024;
      setIsLargeScreen(newIsLarge);
      // Close mobile menu when resizing to large screen
      if (newIsLarge && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-cyan-500/30 overflow-hidden">
      <Topbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* DESKTOP SIDEBAR */}
        {isLargeScreen && (
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-4 md:p-6 pr-0 shrink-0 hidden lg:block"
          >
            <Sidebar />
          </motion.div>
        )}

        {/* MOBILE SIDEBAR OVERLAY */}
        <AnimatePresence>
          {!isLargeScreen && isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
                style={{ zIndex: 100 }}
              />
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="absolute inset-y-0 left-0 w-72 p-4 overflow-y-auto"
                style={{ zIndex: 101 }}
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-hidden relative w-full"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AppLayout;
