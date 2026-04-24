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
    <div ref={containerRef} className="w-64 bohr-panel p-6 md:p-8 space-y-8 md:space-y-12 h-full flex flex-col bg-white border-r border-slate-200 overflow-y-auto shadow-sm">
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-label text-slate-500">Command Nodes</h2>
        
        <div className="space-y-2">
          {nodes.map((node, index) => (
            <NavLink 
              key={node.id}
              ref={(el) => { navItemsRef.current[index] = el; }}
              to={index === 0 ? "/" : "#"} 
              className={({ isActive }) => 
                `px-4 py-3 rounded-lg flex flex-col transition-all group relative ${
                  isActive && index === 0
                  ? "bg-cyan-50 border border-cyan-100 shadow-sm" 
                  : "hover:bg-slate-50 border border-transparent"
                }`
              }
            >
              <span className={`text-sm font-bold tracking-tight transition-colors ${index === 0 ? "text-cyan-700" : "text-slate-600 group-hover:text-cyan-600"}`}>
                {node.label}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.06em] text-slate-400 mt-1">
                {node.sub}
              </span>
              {index === 0 && (
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                 />
              )}
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="pt-6 md:pt-8 border-t border-slate-200">
        <h2 className="text-label text-slate-500 mb-3 md:mb-4">System Analytics</h2>
        <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 hover:border-cyan-300 transition-all">
           <p className="text-xs text-slate-500 font-medium leading-relaxed text-center">
             Cross-border telemetry visualization protocols (v2.1) ready for deployment.
           </p>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-cyan-50 p-4 rounded-lg border border-cyan-100 flex items-center space-x-3 hover:border-cyan-200 transition-all shadow-sm"
      >
         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-cyan-200 shrink-0">
           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
         </div>
         <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-700 tracking-tight">Mesh Latency</span>
            <span className="text-xs text-cyan-600 font-bold">12ms (Optimal)</span>
         </div>
      </motion.div>
    </div>
  );
};

import { motion } from "framer-motion";

export default Sidebar;