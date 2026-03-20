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
    <section ref={sectionRef} className="relative py-44 sm:py-56 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

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
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="depth-glow w-[400px] h-[300px] top-[30%] left-[15%] bg-violet-600/3"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "20%", y: "25%", s: 2, d: 0, dur: 8 },
          { x: "75%", y: "35%", s: 3, d: 1.2, dur: 7 },
          { x: "40%", y: "70%", s: 2, d: 2.5, dur: 9 },
          { x: "85%", y: "65%", s: 2, d: 0.8, dur: 6.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-400/25"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
        <motion.div
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 6 }}
          className="absolute top-[40%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-brand-400/10 to-transparent"
        />
      </div>

      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-10">
          Thông điệp
        </p>

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

        <div className="mt-14 flex justify-center">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
