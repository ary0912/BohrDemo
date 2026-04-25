import { motion, AnimatePresence } from "framer-motion";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup = ({ isOpen, onClose }: WelcomePopupProps) => {
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
            style={{ zIndex: 5000 }}
          />

          <div
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            style={{ zIndex: 5001 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="welcome-title"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/20">
                  <span className="text-white font-black text-xl">B</span>
                </div>

                <h2
                  id="welcome-title"
                  className="text-xl font-bold text-slate-900 tracking-tight mb-2"
                >
                  Bohr Operations
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600 mb-4">
                  Methane Leak Intelligence
                </p>

                <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
                  <p>
                    Real-time monitoring dashboard for gas network methane detection across the{" "}
                    <span className="font-semibold text-slate-800">Bristol &amp; South West</span> region.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500">
                    Powered by AMLD (Advanced Mobile Leak Detection) and Tectrac sensor technology.
                    Supporting EU Methane Regulation compliance.
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                >
                  Enter Dashboard
                </button>

                <p className="mt-4 text-[10px] font-medium text-slate-400">
                  Bohr Digital Services v2.1
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
