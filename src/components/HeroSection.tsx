import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    setMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return mobile;
}

/**
 * HeroSection — Framer Motion ONLY for scroll-linked parallax.
 * All repetitive animations use CSS @keyframes (GPU compositor thread).
 */

export default function HeroSection() {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* === BACKGROUND === */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-gray-950 to-[#030712]" />
        <div className="absolute inset-0 hex-grid opacity-30" />
      </div>

      {/* === MID LAYER: Hero focal point — desktop only === */}
      {!isMobile && (
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-[1] pointer-events-none"
        >
          {/* Wave rings — expands from center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[300px] h-[300px] rounded-full border border-brand-500/[0.12] animate-wave-ring" style={{ animationDelay: "0s" }} />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/[0.08] animate-wave-ring" style={{ animationDelay: "2s" }} />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-brand-500/[0.10] animate-wave-ring" style={{ animationDelay: "4s" }} />
          </div>

          {/* Holographic core — CSS morph */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[350px] h-[350px] hero-blob animate-morph-blob" />
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-brand-400/50 to-cyan-400/40 blur-lg animate-core-glow" />
            <div className="absolute w-6 h-6 rounded-full bg-white/30 blur-sm animate-core-inner" />
          </div>
        </motion.div>
      )}

      {/* === FOREGROUND: Text === */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-[2]">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-6"
          >
            Chuyển đổi quy trình làm việc
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8"
            style={{ lineHeight: 1.3 }}
          >
            <span className="hero-text-3d">Ứng dụng </span>
            <span className="hero-3d-rock hero-grad-blue" data-text="AI">AI</span>
            <br />
            <span className="hero-text-3d">trong công việc của </span>
            <span className="hero-3d-rock hero-grad-violet" data-text="BA">BA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Quy trình → Điểm nghẽn → Giải pháp AI → Công cụ cụ thể
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
