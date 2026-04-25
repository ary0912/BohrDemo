import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const navItems = [
  {
    label: "Dashboard",
    description: "Live monitoring",
    path: "/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="7" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Survey Planning",
    description: "Route management",
    path: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 3h12M2 7h8M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="13" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Alert Centre",
    description: "Notifications",
    path: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1v1M8 14v1M3 8H2M14 8h-1M4.5 4.5L3.8 3.8M11.5 4.5l.7-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Reports",
    description: "LDAR compliance",
    path: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 1h6l4 4v10H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 1v4h4M7 8h4M7 11h4M5 8h.5M5 11h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const items = navItemsRef.current.filter(Boolean);
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="w-60 bohr-panel p-5 space-y-6 h-full flex flex-col bg-white border-r border-slate-200 overflow-y-auto shadow-sm"
    >
      <div className="space-y-1">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Navigation
        </h2>
        {navItems.map((item, index) => (
          <NavLink
            key={item.label}
            ref={(el) => { navItemsRef.current[index] = el; }}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                isActive && item.path === "/"
                  ? "bg-cyan-50 border border-cyan-200 text-cyan-700"
                  : "hover:bg-slate-50 border border-transparent text-slate-600 hover:text-slate-800"
              }`
            }
            aria-current={item.path === "/" ? "page" : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold leading-tight truncate">{item.label}</span>
              <span className="text-[10px] text-slate-400 leading-tight truncate">{item.description}</span>
            </div>
            {item.path === "/" && (
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-auto w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0"
                aria-hidden="true"
              />
            )}
          </NavLink>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          System
        </h2>
        <div className="space-y-3 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Detector Status</span>
            <span className="text-xs font-semibold text-emerald-600">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Last Survey</span>
            <span className="text-xs font-semibold text-slate-700">2h ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Network Latency</span>
            <span className="text-xs font-semibold text-slate-700">12ms</span>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-cyan-50 to-blue-50 p-3.5 rounded-lg border border-cyan-100"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-700">
            EU Methane Reg.
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Compliant with Regulation (EU) 2024/1787 LDAR requirements.
        </p>
      </motion.div>
    </nav>
  );
};

export default Sidebar;
