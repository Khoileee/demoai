import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function InsightSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.85], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.35], [0.92, 1]);
  const bgGlowOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-25 pointer-events-none" />

      {/* Background effects */}
      <motion.div
        style={{ opacity: bgGlowOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600/5"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="depth-glow w-[400px] h-[300px] top-[30%] right-[5%] bg-violet-600/3"
        />
        {/* Shimmer */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-500/[0.02] blur-[60px] animate-grid-shimmer" style={{ top: '40%', left: '35%' }} />
      </motion.div>

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] right-[12%] w-20 h-20 rounded-full border border-brand-500/[0.06] animate-ring-float" />
        <div className="absolute bottom-[25%] left-[15%] w-14 h-14 rounded-full border border-violet-500/[0.05] animate-ring-float" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Sweep line */}
      <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '12s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "20%", y: "25%", s: 2, d: 0, dur: 8 },
          { x: "75%", y: "35%", s: 3, d: 1.2, dur: 7 },
          { x: "40%", y: "70%", s: 2, d: 2.5, dur: 9 },
          { x: "55%", y: "15%", s: 2, d: 1.8, dur: 7.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-400/25"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <blockquote className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-tight">
          <span className="block leading-[1.4] mb-3">
            <span className="text-white">AI giúp BA làm </span>
            <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">nhanh hơn</span>
            <span className="text-white">, </span>
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">chuẩn hơn</span>
            <span className="text-white"> —</span>
          </span>
          <span className="block leading-[1.4]">
            <span className="text-white">nhưng BA vẫn là người </span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">quyết định nghiệp vụ</span>
            <span className="text-white">.</span>
          </span>
        </blockquote>

        <p className="mt-10 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          AI là công cụ hỗ trợ — không thay thế con người. BA vẫn cần hiểu sâu nghiệp vụ,
          đặt đúng câu hỏi, và ra quyết định. AI chỉ giúp <span className="text-white/80">tăng tốc</span> những
          công việc lặp lại để BA có thời gian tập trung vào giá trị thực sự.
        </p>

        <div className="mt-14 flex justify-center">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
