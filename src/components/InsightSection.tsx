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
      <div className="absolute inset-0 circuit-dots opacity-30 pointer-events-none" />

      {/* Breathe border */}
      <div className="absolute inset-6 rounded-3xl border border-brand-400/[0.12] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-24 edge-glow-top opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 edge-glow-bottom opacity-40 pointer-events-none" />

      {/* Background effects */}
      <motion.div
        style={{ opacity: bgGlowOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="depth-glow w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600/5 animate-depth-glow-1" />
        <div className="depth-glow w-[400px] h-[300px] top-[30%] right-[5%] bg-violet-600/3 animate-depth-glow-2" style={{ animationDelay: '3s' }} />
        {/* Plasma blob */}
        <div className="absolute w-[350px] h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500/[0.07] blur-[50px] animate-plasma" />
        {/* Shimmer */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-500/[0.02] blur-[60px] animate-grid-shimmer" style={{ top: '40%', left: '35%' }} />
      </motion.div>

      {/* Floating rings + orbit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] right-[12%] w-20 h-20 rounded-full border border-brand-500/[0.14] animate-ring-float" />
        <div className="absolute bottom-[25%] left-[15%] w-14 h-14 rounded-full border border-violet-500/[0.12] animate-ring-float" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[50%] left-[50%] w-24 h-24 rounded-full border border-cyan-500/[0.10] animate-ring-float" style={{ animationDelay: '1s' }} />
        {/* Orbiting dots */}
        <div className="absolute top-[45%] left-[48%]">
          <div className="w-2 h-2 rounded-full bg-brand-400/55 animate-orbit" style={{ boxShadow: '0 0 8px rgba(96,165,250,0.5)' }} />
        </div>
        <div className="absolute top-[55%] right-[20%]">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400/50 animate-orbit-reverse" style={{ boxShadow: '0 0 6px rgba(139,92,246,0.4)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/5 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '14s', animationDelay: '6s' }} />

      {/* Data streams */}
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '10%', background: 'linear-gradient(180deg, transparent, rgba(96,165,250,0.22), transparent)', animationDelay: '0s', animationDuration: '5.5s' }} />
      <div className="absolute w-[2px] h-20 animate-data-stream pointer-events-none" style={{ left: '88%', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.18), transparent)', animationDelay: '3s', animationDuration: '6.5s' }} />

      {/* Signal beacons */}
      <div className="absolute left-[25%] top-[20%] w-2 h-2 rounded-full border border-brand-400/35 animate-signal pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute left-[75%] top-[75%] w-2 h-2 rounded-full border border-violet-400/30 animate-signal pointer-events-none" style={{ animationDelay: '2.5s' }} />

      {/* Floating hex */}
      <div className="absolute top-[18%] left-[8%] w-10 h-10 border border-brand-500/[0.14] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-8 h-8 border border-violet-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '20%', top: '25%', width: 2, height: 2, animationDuration: '8s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '75%', top: '35%', width: 3, height: 3, animationDuration: '7s', animationDelay: '1.2s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '40%', top: '70%', width: 2, height: 2, animationDuration: '9s', animationDelay: '2.5s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '55%', top: '15%', width: 2, height: 2, animationDuration: '7.5s', animationDelay: '1.8s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '88%', top: '50%', width: 3, height: 3, animationDuration: '6.5s', animationDelay: '0.5s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '12%', top: '60%', width: 2, height: 2, animationDuration: '8.5s', animationDelay: '3s' }} />
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
