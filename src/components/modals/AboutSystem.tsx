import { motion, AnimatePresence } from "framer-motion";

interface AboutSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutSystem = ({ isOpen, onClose }: AboutSystemProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-2000 cursor-pointer"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-2001 p-6 pointer-events-none"
          >
            <div className="bohr-panel p-6 sm:p-8 md:p-10 pointer-events-auto overflow-hidden relative max-h-[85vh] md:max-h-[80vh] overflow-y-auto">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-linear-to-tl from-cyan-500/10 to-purple-500/10 blur-[100px] rounded-full -mr-20 sm:-mr-32 -mt-32" />
              
              <div className="flex justify-between items-start mb-6 sm:mb-8 relative z-10 gap-3">
                <div className="flex flex-col flex-1">
                  <h2 className="text-label text-cyan-400">Technical Artifact</h2>
                  <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight mt-2">System Overview</h1>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 shrink-0 rounded-lg bg-linear-to-br from-slate-800 to-slate-900 border border-cyan-500/20 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all active:scale-95"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6 relative z-10">
                <section>
                  <h3 className="text-label text-cyan-400/70 mb-2 sm:mb-3 font-bold">Core Goal</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    A real-time methane leak monitoring dashboard inspired by Bohr/Tectrac systems, designed to help engineers quickly detect, understand, and act on gas network issues.
                  </p>
                </section>

                <section>
                  <h3 className="text-label text-cyan-400/70 mb-2 sm:mb-3 font-bold">Design Philosophy</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 bg-linear-to-br from-slate-900/40 to-indigo-950/20 p-3 rounded-lg border border-cyan-500/10">
                       <p className="text-xs font-bold text-cyan-400 uppercase tracking-tight">Inspiration</p>
                       <p className="text-xs text-slate-400">Linear (clarity), Apple (minimalism), and Industrial function-first logic.</p>
                    </div>
                    <div className="space-y-2 bg-linear-to-br from-slate-900/40 to-purple-950/20 p-3 rounded-lg border border-cyan-500/10">
                       <p className="text-xs font-bold text-cyan-400 uppercase tracking-tight">Principles</p>
                       <p className="text-xs text-slate-400">Map-first UX, Data → Insight → Action, and consistent semantic spacing.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-label text-cyan-400/70 mb-2 sm:mb-3 font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Leaflet", "Recharts", "Framer Motion", "GSAP"].map(tech => (
                      <span key={tech} className="px-2.5 py-1.5 bg-linear-to-r from-slate-900/60 to-indigo-950/40 ring-1 ring-inset ring-cyan-500/10 rounded-lg text-xs font-bold text-slate-400 hover:text-cyan-400 hover:ring-cyan-500/20 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="pt-4 sm:pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-linear-to-r from-cyan-500/5 to-purple-500/5 p-4 rounded-lg">
                  <p className="text-label text-cyan-400/60">
                    Developed for Bohr | Tectrac Operations
                  </p>
                  <div className="text-xs sm:text-sm font-bold text-cyan-400 px-3 py-1.5 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/20 shrink-0">
                    Ready for Staging
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AboutSystem;
