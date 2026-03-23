import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function KeyboardHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    // Hide after first scroll or keypress
    window.addEventListener("scroll", hide, { once: true, passive: true });
    window.addEventListener("keydown", hide, { once: true });
    // Auto-hide after 6 seconds
    const timer = setTimeout(hide, 6000);
    return () => {
      window.removeEventListener("scroll", hide);
      window.removeEventListener("keydown", hide);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded border border-white/20 bg-white/[0.04] flex items-center justify-center">
              <ChevronUp className="w-3 h-3 text-gray-400" />
            </span>
            <span className="w-6 h-6 rounded border border-white/20 bg-white/[0.04] flex items-center justify-center">
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium">Dùng phím mũi tên để chuyển trang</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
