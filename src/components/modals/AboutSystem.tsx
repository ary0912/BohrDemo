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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
            style={{ zIndex: 2000 }}
          />

          <div
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            style={{ zIndex: 2001 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-title"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6 gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600">
                      About This System
                    </span>
                    <h1 id="about-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                      Methane Leak Intelligence
                    </h1>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="w-8 h-8 shrink-0 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-5">
                  <Section title="Purpose">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      A real-time methane leak monitoring dashboard built to demonstrate how utilities
                      can monitor gas networks, detect high-risk leaks, and optimise field operations.
                      Inspired by Bohr/Tectrac LDAR (Leak Detection and Repair) workflows.
                    </p>
                  </Section>

                  <Section title="Capabilities">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <CapabilityCard
                        title="Geospatial Mapping"
                        description="Interactive Leaflet map with severity-coded markers and detailed leak popups."
                      />
                      <CapabilityCard
                        title="Live Telemetry"
                        description="Real-time concentration charts with configurable action thresholds."
                      />
                      <CapabilityCard
                        title="LDAR Compliance"
                        description="Tracks detection status, flow rates, and compliance metrics per EU regulation."
                      />
                      <CapabilityCard
                        title="Multi-Detector Support"
                        description="Supports AMLD drive-by, handheld, and fixed sensor detection types."
                      />
                    </div>
                  </Section>

                  <Section title="Technology">
                    <div className="flex flex-wrap gap-2">
                      {["React 19", "TypeScript", "Tailwind CSS", "Leaflet", "Recharts", "Framer Motion", "GSAP", "Vite"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </Section>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Built for Bohr | Tectrac Operations
                    </p>
                    <span className="text-xs font-bold text-white px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-sm">
                      Production Ready
                    </span>
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
      {title}
    </h3>
    {children}
  </section>
);

const CapabilityCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
    <p className="text-xs font-bold text-slate-800 mb-1">{title}</p>
    <p className="text-[11px] text-slate-500 leading-relaxed">{description}</p>
  </div>
);

export default AboutSystem;
