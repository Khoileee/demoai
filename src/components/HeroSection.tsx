import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EveBot3D = lazy(() => import("./EveBot3D"));

/**
 * HeroSection — Framer Motion ONLY for scroll-linked parallax.
 * All repetitive animations use CSS @keyframes (GPU compositor thread).
 */

export default function HeroSection() {
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

      {/* === MID LAYER: Futuristic AI visualization — scroll-linked === */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity, willChange: "transform, opacity" }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* Aurora ribbons — CSS animated */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute w-[900px] h-[500px] aurora-ribbon opacity-40 animate-aurora-1" />
          <div className="absolute w-[700px] h-[400px] aurora-ribbon-alt opacity-30 animate-aurora-2" />
        </div>

        {/* === NEURAL NETWORK — static SVG lines + CSS animated nodes === */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full">
            {/* Static connection lines — no JS animation needed */}
            <line x1="50%" y1="50%" x2="30%" y2="28%" stroke="rgba(96,165,250,0.08)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="70%" y2="25%" stroke="rgba(96,165,250,0.08)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="20%" y2="55%" stroke="rgba(96,165,250,0.08)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="80%" y2="52%" stroke="rgba(96,165,250,0.08)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="35%" y2="75%" stroke="rgba(96,165,250,0.06)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="65%" y2="78%" stroke="rgba(96,165,250,0.06)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="rgba(96,165,250,0.06)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="50%" y2="82%" stroke="rgba(96,165,250,0.06)" strokeWidth="1" />
            <line x1="30%" y1="28%" x2="15%" y2="35%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="30%" y1="28%" x2="50%" y2="20%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="70%" y1="25%" x2="85%" y2="38%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="70%" y1="25%" x2="50%" y2="20%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="20%" y1="55%" x2="15%" y2="35%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="20%" y1="55%" x2="10%" y2="70%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="80%" y1="52%" x2="85%" y2="38%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="80%" y1="52%" x2="90%" y2="68%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
            <line x1="35%" y1="75%" x2="10%" y2="70%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
            <line x1="35%" y1="75%" x2="50%" y2="82%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
            <line x1="65%" y1="78%" x2="90%" y2="68%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
            <line x1="65%" y1="78%" x2="50%" y2="82%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
          </svg>

          {/* Neural nodes — CSS pulse (no Framer Motion) */}
          {/* Center core node */}
          <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
            <div className="absolute rounded-full animate-pulse-ring" style={{ width: 16, height: 16, marginLeft: -4, marginTop: -4, border: "1px solid rgba(60,165,250,0.3)" }} />
            <div className="absolute rounded-full animate-pulse-ring" style={{ width: 16, height: 16, marginLeft: -4, marginTop: -4, border: "1px solid rgba(60,165,250,0.2)", animationDelay: "1s" }} />
            <div className="w-2 h-2 rounded-full animate-node-pulse-strong" style={{ background: "rgba(60,165,250,0.8)", boxShadow: "0 0 16px rgba(60,165,250,0.5), 0 0 40px rgba(60,165,250,0.2)" }} />
          </div>
          {/* Outer nodes — CSS animated */}
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "30%", top: "28%", width: 5, height: 5, background: "rgba(34,211,238,0.8)", boxShadow: "0 0 10px rgba(34,211,238,0.5)", animationDelay: "0.3s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "70%", top: "25%", width: 4, height: 4, background: "rgba(139,92,246,0.8)", boxShadow: "0 0 8px rgba(139,92,246,0.5)", animationDelay: "0.6s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "20%", top: "55%", width: 4, height: 4, background: "rgba(96,165,250,0.8)", boxShadow: "0 0 8px rgba(96,165,250,0.5)", animationDelay: "0.9s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "80%", top: "52%", width: 5, height: 5, background: "rgba(167,139,250,0.8)", boxShadow: "0 0 10px rgba(167,139,250,0.5)", animationDelay: "1.2s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "35%", top: "75%", width: 4, height: 4, background: "rgba(34,211,238,0.8)", boxShadow: "0 0 8px rgba(34,211,238,0.5)", animationDelay: "1.5s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "65%", top: "78%", width: 5, height: 5, background: "rgba(59,130,246,0.8)", boxShadow: "0 0 10px rgba(59,130,246,0.5)", animationDelay: "1.8s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "15%", top: "35%", width: 3, height: 3, background: "rgba(52,211,153,0.8)", boxShadow: "0 0 6px rgba(52,211,153,0.5)", animationDelay: "2.1s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "85%", top: "38%", width: 3, height: 3, background: "rgba(251,191,36,0.8)", boxShadow: "0 0 6px rgba(251,191,36,0.5)", animationDelay: "2.4s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "50%", top: "20%", width: 4, height: 4, background: "rgba(139,92,246,0.8)", boxShadow: "0 0 8px rgba(139,92,246,0.5)", animationDelay: "0.4s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "50%", top: "82%", width: 4, height: 4, background: "rgba(34,211,238,0.8)", boxShadow: "0 0 8px rgba(34,211,238,0.5)", animationDelay: "1.1s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "10%", top: "70%", width: 3, height: 3, background: "rgba(96,165,250,0.8)", boxShadow: "0 0 6px rgba(96,165,250,0.5)", animationDelay: "0.7s" }} />
          <div className="absolute rounded-full animate-node-pulse" style={{ left: "90%", top: "68%", width: 3, height: 3, background: "rgba(167,139,250,0.8)", boxShadow: "0 0 6px rgba(167,139,250,0.5)", animationDelay: "2s" }} />
        </div>

        {/* === PULSING WAVE RINGS from center — CSS === */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[300px] h-[300px] rounded-full border border-brand-500/[0.12] animate-wave-ring" style={{ animationDelay: "0s" }} />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/[0.08] animate-wave-ring" style={{ animationDelay: "1.5s" }} />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-brand-500/[0.12] animate-wave-ring" style={{ animationDelay: "3s" }} />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/[0.08] animate-wave-ring" style={{ animationDelay: "4.5s" }} />
        </div>

        {/* === HOLOGRAPHIC CORE — CSS morph === */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[350px] h-[350px] hero-blob animate-morph-blob" />
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-brand-400/50 to-cyan-400/40 blur-lg animate-core-glow" />
          <div className="absolute w-6 h-6 rounded-full bg-white/30 blur-sm animate-core-inner" />
        </div>

        {/* === DATA RAIN STREAMS — CSS translateY === */}
        <div className="absolute w-px animate-data-rain" style={{ left: "15%", height: 120, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.15) 30%, rgba(34,211,238,0.1) 70%, transparent)", animationDuration: "4s", animationDelay: "0s" }} />
        <div className="absolute w-px animate-data-rain" style={{ left: "30%", height: 100, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.15) 30%, rgba(34,211,238,0.1) 70%, transparent)", animationDuration: "3.5s", animationDelay: "1.5s" }} />
        <div className="absolute w-px animate-data-rain" style={{ left: "52%", height: 130, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.15) 30%, rgba(34,211,238,0.1) 70%, transparent)", animationDuration: "4.5s", animationDelay: "0.8s" }} />
        <div className="absolute w-px animate-data-rain" style={{ left: "75%", height: 110, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.15) 30%, rgba(34,211,238,0.1) 70%, transparent)", animationDuration: "4s", animationDelay: "2.2s" }} />
        <div className="absolute w-px animate-data-rain" style={{ left: "88%", height: 90, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.15) 30%, rgba(34,211,238,0.1) 70%, transparent)", animationDuration: "3.5s", animationDelay: "1.8s" }} />

        {/* === SCANNING BEAM — CSS === */}
        <div
          className="absolute left-0 right-0 h-px animate-scan-h"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.15) 20%, rgba(34,211,238,0.25) 50%, rgba(59,130,246,0.15) 80%, transparent 100%)",
            boxShadow: "0 0 20px rgba(59,130,246,0.1), 0 0 60px rgba(34,211,238,0.05)",
            animationDuration: "8s",
            animationDelay: "0s",
          }}
        />
      </motion.div>

      {/* === 3D EVE BOT MASCOT === */}
      <Suspense fallback={null}>
        <EveBot3D />
      </Suspense>

      {/* === FOREGROUND: Text === */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-[2]">
        <motion.div
          style={{ y: textY, opacity: textOpacity, willChange: "transform, opacity" }}
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
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            <span className="text-white">Ứng dụng </span>
            <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-brand-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              AI
            </span>
            <br />
            <span className="text-white">trong công việc của </span>
            <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-brand-400 bg-clip-text text-transparent">
              BA
            </span>
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
