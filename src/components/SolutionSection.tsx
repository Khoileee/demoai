import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" },
  }),
};

export default function SolutionSection() {
  const sectionRef = useRef(null);
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, amount: 0.4 });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgGlow = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-40 sm:py-52 px-6 overflow-hidden">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Animated background depth */}
      <motion.div style={{ opacity: bgGlow }} className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[500px] h-[400px] top-[30%] left-[10%] bg-brand-600/4"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="depth-glow w-[400px] h-[300px] top-[40%] right-[15%] bg-cyan-600/3"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "12%", y: "20%", s: 2, d: 0, dur: 8 },
          { x: "78%", y: "30%", s: 3, d: 1.2, dur: 7 },
          { x: "45%", y: "75%", s: 2, d: 2.5, dur: 9 },
          { x: "90%", y: "55%", s: 2, d: 0.8, dur: 6.5 },
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
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          className="absolute top-[45%] left-0 w-[220px] h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Giải pháp
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            AI tự động hóa workflow của BA
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Từ thu thập yêu cầu đến sinh tài liệu — AI hỗ trợ toàn bộ quy trình,
            giúp BA tập trung vào phân tích và quyết định nghiệp vụ.
          </p>
        </motion.div>

        {/* Flow: Input → AI → Output — all visible together */}
        <div
          ref={flowRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-0"
        >
          {/* Step 1: Input */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="relative p-8 sm:p-10 rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.04] min-w-[220px] text-center"
          >
            <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
            </div>
            <p className="text-lg font-semibold text-cyan-400 mb-1">Đầu vào</p>
            <p className="text-gray-500 text-sm">Cuộc họp, tài liệu, yêu cầu</p>
          </motion.div>

          {/* Line 1 */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={lineVariants}
            className="origin-left hidden sm:block w-20 lg:w-32 h-[2px] bg-gradient-to-r from-cyan-500/40 to-brand-500/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          />
          <motion.div
            custom={1}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={{ hidden: { scaleY: 0 }, visible: (i: number) => ({ scaleY: 1, transition: { duration: 0.4, delay: 0.2 + i * 0.15 } }) }}
            className="origin-top sm:hidden h-8 w-[2px] my-2 bg-gradient-to-b from-cyan-500/40 to-brand-500/40"
          />

          {/* Step 2: AI Processing */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="relative p-8 sm:p-10 rounded-2xl border border-brand-500/15 bg-brand-500/[0.06] min-w-[220px] text-center"
          >
            {/* Pulse ring */}
            {flowInView && (
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl border border-brand-400/20"
              />
            )}
            <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brand-500/30 to-violet-500/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-brand-400 rotate-45" />
            </div>
            <p className="text-lg font-semibold text-brand-400 mb-1">AI xử lý</p>
            <p className="text-gray-500 text-sm">Phân tích, tổng hợp, sinh output</p>
          </motion.div>

          {/* Line 2 */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={lineVariants}
            className="origin-left hidden sm:block w-20 lg:w-32 h-[2px] bg-gradient-to-r from-brand-500/40 to-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          />
          <motion.div
            custom={3}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={{ hidden: { scaleY: 0 }, visible: (i: number) => ({ scaleY: 1, transition: { duration: 0.4, delay: 0.2 + i * 0.15 } }) }}
            className="origin-top sm:hidden h-8 w-[2px] my-2 bg-gradient-to-b from-brand-500/40 to-emerald-500/40"
          />

          {/* Step 3: Output */}
          <motion.div
            custom={4}
            initial="hidden"
            animate={flowInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="relative p-8 sm:p-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.04] min-w-[220px] text-center"
          >
            <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <p className="text-lg font-semibold text-emerald-400 mb-1">Kết quả</p>
            <p className="text-gray-500 text-sm">Tài liệu, prototype, báo cáo</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
