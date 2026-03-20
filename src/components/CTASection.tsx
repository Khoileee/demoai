import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function CTASection() {
  const sectionRef = useRef(null);
  const thankRef = useRef<HTMLDivElement>(null);
  const [showThank, setShowThank] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.35], [60, 0]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-25 pointer-events-none" />

      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600/5"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="depth-glow w-[350px] h-[250px] top-[35%] left-[15%] bg-violet-600/3"
        />
        {/* Shimmer */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-brand-500/[0.02] blur-[60px] animate-grid-shimmer" style={{ top: '40%', left: '40%' }} />
      </div>

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-16 h-16 rounded-full border border-brand-500/[0.06] animate-ring-float" />
        <div className="absolute bottom-[30%] right-[15%] w-12 h-12 rounded-full border border-cyan-500/[0.05] animate-ring-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Sweep line */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '10s', animationDelay: '2s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "18%", y: "25%", s: 2, d: 0, dur: 8 },
          { x: "82%", y: "30%", s: 3, d: 1.5, dur: 7 },
          { x: "40%", y: "75%", s: 2, d: 2, dur: 9 },
          { x: "65%", y: "15%", s: 2, d: 0.8, dur: 6.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-400/20"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
        <motion.div
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 6 }}
          className="absolute top-[35%] left-0 w-[180px] h-px bg-gradient-to-r from-transparent via-brand-400/10 to-transparent"
        />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          Sẵn sàng trải nghiệm?
        </h2>

        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Từ meeting đầu tiên đến tài liệu bàn giao —
          AI đồng hành cùng BA ở mọi giai đoạn.
        </p>

        <a
          href="https://youtu.be/x9xTHFL9aO8"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (!showThank) {
              setShowThank(true);
              setTimeout(() => {
                thankRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 100);
            }
          }}
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm hover:from-brand-500 hover:to-brand-400 transition-all duration-500 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:shadow-xl"
        >
          Xem Demo
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>

      {/* Thank you — only appears after clicking Xem Demo */}
      <AnimatePresence>
        {showThank && (
          <motion.div
            ref={thankRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 text-center"
          >
            <Sparkles className="w-6 h-6 text-brand-400/60 mx-auto mb-4" />
            <p className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-brand-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent leading-relaxed">
              Chân thành cảm ơn quý vị đã chú ý lắng nghe!
            </p>
            <p className="text-gray-500 text-sm mt-3">
              Mọi ý kiến đóng góp xin gửi về Team BA
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        style={{ opacity: contentOpacity }}
        className="mt-16 text-center text-gray-600 text-sm"
      >
        Ứng dụng AI trong công việc của BA — Team BA · 2025
      </motion.footer>
    </section>
  );
}
