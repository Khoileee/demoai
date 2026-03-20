import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.35], [60, 0]);

  return (
    <section ref={sectionRef} className="relative py-40 sm:py-52 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600/5"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "18%", y: "25%", s: 2, d: 0, dur: 8 },
          { x: "82%", y: "30%", s: 3, d: 1.5, dur: 7 },
          { x: "40%", y: "75%", s: 2, d: 2, dur: 9 },
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
          Khám phá cách AI thay đổi quy trình làm việc của Business Analyst
          — từ meeting đến documentation.
        </p>

        <a
          href="#"
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm hover:from-brand-500 hover:to-brand-400 transition-all duration-500 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:shadow-xl"
        >
          Xem Demo
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        style={{ opacity: contentOpacity }}
        className="mt-36 text-center text-gray-600 text-sm"
      >
        Ứng dụng AI trong công việc của BA — Team BA · 2026
      </motion.footer>
    </section>
  );
}
