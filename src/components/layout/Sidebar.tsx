import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Sidebar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const nodes = [
    { label: "Dashboard", sub: "Live Mesh", id: "mesh" },
    { label: "Network Topology", sub: "Grid Analysis", id: "topo" },
    { label: "Alert Matrix", sub: "Protocol v4.2", id: "alert" },
    { label: "Sensor Health", sub: "10x Analytics", id: "health" },
  ];

  useEffect(() => {
    // Stagger animation on mount
    if (navItemsRef.current) {
      gsap.fromTo(
        navItemsRef.current.filter(Boolean),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-64 bohr-panel p-6 md:p-8 space-y-8 md:space-y-12 h-full flex flex-col bg-linear-to-b from-slate-900/40 to-indigo-950/20 overflow-y-auto">
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-label text-cyan-400/70">Command Nodes</h2>
        
        <div className="space-y-2">
          {nodes.map((node, index) => (
            <NavLink 
              key={node.id}
              ref={(el) => { navItemsRef.current[index] = el; }}
              to={index === 0 ? "/" : "#"} 
              className={({ isActive }) => 
                `px-4 py-3 rounded-lg flex flex-col transition-all group relative ${
                  isActive && index === 0
                  ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 ring-1 ring-inset ring-cyan-500/40 shadow-lg shadow-cyan-500/10" 
                  : "hover:bg-slate-800/40 opacity-60 hover:opacity-100"
                }`
              }
            >
              <span className={`text-sm font-bold tracking-tight transition-colors ${index === 0 ? "text-white" : "text-slate-300 group-hover:text-cyan-300"}`}>
                {node.label}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.06em] text-cyan-400/60 mt-1">
                {node.sub}
              </span>
              {index === 0 && (
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full" 
                 />
              )}
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="pt-6 md:pt-8 border-t border-cyan-500/10">
        <h2 className="text-label text-cyan-400/70 mb-3 md:mb-4">System Analytics</h2>
        <div className="bg-linear-to-br from-slate-900/50 to-indigo-950/30 ring-1 ring-inset ring-cyan-500/10 p-4 rounded-lg border border-dashed border-cyan-500/10 hover:border-cyan-500/20 transition-all">
           <p className="text-xs text-slate-400 font-medium leading-relaxed text-center">
             Cross-border telemetry visualization protocols (v2.1) ready for deployment.
           </p>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-linear-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg ring-1 ring-inset ring-cyan-500/20 flex items-center space-x-3 hover:ring-cyan-500/40 transition-all"
      >
         <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center border border-cyan-500/30 shrink-0">
           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
         </div>
         <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white tracking-tight">Mesh Latency</span>
            <span className="text-xs text-cyan-400 font-bold">12ms (Optimal)</span>
         </div>
      </motion.div>
    </div>
  );
};

import { motion } from "framer-motion";

export default Sidebar;