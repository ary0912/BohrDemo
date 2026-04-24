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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-5000 cursor-pointer"
          />
          
          <div className="fixed inset-0 z-5001 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm pointer-events-none"
            >
              <div className="bohr-panel bg-white p-6 sm:p-8 pointer-events-auto text-center relative overflow-hidden border border-slate-200 rounded-xl shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-100 blur-[100px] rounded-full" />
              
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md shadow-cyan-500/20 relative z-10">
                 <span className="text-white font-black text-xl sm:text-2xl">B</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight uppercase mb-3 sm:mb-4 relative z-10">
                Bohr Operations
              </h2>
              
              <div className="space-y-3 sm:space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 relative z-10">
                <p>
                  This command center provides <span className="text-slate-900 font-bold">real-time telemetry</span> for gas mesh detection across Europe.
                </p>
                <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-200 text-xs sm:text-xs font-medium text-slate-600 shadow-sm">
                  Making networks cleaner, safer, and ready for Net Zero via 10x more efficient mobile sensing.
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.08em] rounded-lg transition-all shadow-md hover:shadow-lg hover:shadow-cyan-500/30 relative z-10 active:scale-95 border border-cyan-700"
              >
                Access Command Mesh
              </button>
              
              <p className="mt-4 sm:mt-6 text-label text-slate-400">Operational Telemetry v2.14</p>
            </div>
          </motion.div>
        </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
