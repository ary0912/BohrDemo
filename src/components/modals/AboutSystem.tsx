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
          <div className="fixed inset-0 z-2001 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl pointer-events-none"
            >
              <div className="bohr-panel bg-white p-6 sm:p-8 md:p-10 pointer-events-auto overflow-hidden relative max-h-[85vh] md:max-h-[80vh] overflow-y-auto border border-slate-200 rounded-xl shadow-xl">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-tl from-cyan-50 to-blue-50 blur-[100px] rounded-full -mr-20 sm:-mr-32 -mt-32" />
              
              <div className="flex justify-between items-start mb-6 sm:mb-8 relative z-10 gap-3">
                <div className="flex flex-col flex-1">
                  <h2 className="text-label text-cyan-700">Technical Artifact</h2>
                  <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2">System Overview</h1>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 shrink-0 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-300 transition-all active:scale-95"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6 relative z-10">
                <section>
                  <h3 className="text-label text-slate-500 mb-2 sm:mb-3 font-bold">Core Goal</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A real-time methane leak monitoring dashboard inspired by Bohr/Tectrac systems, designed to help engineers quickly detect, understand, and act on gas network issues.
                  </p>
                </section>

                <section>
                  <h3 className="text-label text-slate-500 mb-2 sm:mb-3 font-bold">Design Philosophy</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                       <p className="text-xs font-bold text-cyan-700 uppercase tracking-tight">Inspiration</p>
                       <p className="text-xs text-slate-600">Linear (clarity), Apple (minimalism), and Industrial function-first logic.</p>
                    </div>
                    <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                       <p className="text-xs font-bold text-cyan-700 uppercase tracking-tight">Principles</p>
                       <p className="text-xs text-slate-600">Map-first UX, Data → Insight → Action, and consistent semantic spacing.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-label text-slate-500 mb-2 sm:mb-3 font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Leaflet", "Recharts", "Framer Motion", "GSAP"].map(tech => (
                      <span key={tech} className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-cyan-700 hover:border-cyan-300 transition-all shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="pt-4 sm:pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-lg">
                  <p className="text-label text-slate-500">
                    Developed for Bohr | Tectrac Operations
                  </p>
                  <div className="text-xs sm:text-sm font-bold text-white px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg border border-cyan-700 shrink-0 shadow-sm">
                    Ready for Staging
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AboutSystem;
