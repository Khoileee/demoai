import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mic,
  Bot,
  LayoutDashboard,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    problem: "Ghi chép meeting thủ công",
    solution: "Tự động chuyển giọng nói → meeting notes + action items",
    tool: "Whisper",
    toolIcon: Mic,
    toolColor: "from-cyan-500 to-blue-500",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/10",
    glowColor: "bg-cyan-500/8",
    before: "1-2 giờ",
    after: "30 phút",
  },
  {
    problem: "Prototype thiếu trực quan",
    solution: "Mô tả nghiệp vụ bằng lời → sinh giao diện React hoàn chỉnh",
    tool: "Lovable + Agent",
    toolIcon: LayoutDashboard,
    toolColor: "from-violet-500 to-purple-500",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/10",
    glowColor: "bg-violet-500/8",
    before: "2-3 vòng",
    after: "2-3 giờ",
  },
  {
    problem: "Viết tài liệu lặp lại",
    solution: "Agent đọc source code + requirement → sinh SRS, TKCT theo template",
    tool: "Agent + Skills",
    toolIcon: Bot,
    toolColor: "from-emerald-500 to-teal-500",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/10",
    glowColor: "bg-emerald-500/8",
    before: "1-2 ngày",
    after: "0.5-1 ngày",
  },
  {
    problem: "Viết kịch bản test & HDSD thủ công",
    solution: "Agent đọc requirement + UI spec → sinh kịch bản UAT tự động",
    tool: "Agent + Skills",
    toolIcon: Bot,
    toolColor: "from-rose-500 to-pink-500",
    accentColor: "text-rose-400",
    borderColor: "border-rose-500/10",
    glowColor: "bg-rose-500/8",
    before: "4 giờ",
    after: "1-2 giờ",
  },
  {
    problem: "Tra cứu thông tin chậm",
    solution: "Chat qua Telegram → tra cứu workspace, sửa code, commit",
    tool: "OpenClaw + Telegram",
    toolIcon: MessageCircle,
    toolColor: "from-amber-500 to-orange-500",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/10",
    glowColor: "bg-amber-500/8",
    before: "30 phút/lần",
    after: "Tức thì",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SolutionSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgGlow = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-35 pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-24 edge-glow-top opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 edge-glow-bottom opacity-30 pointer-events-none" />

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
        {/* Shimmer */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-cyan-500/[0.02] blur-[50px] animate-grid-shimmer" style={{ top: '25%', left: '40%' }} />
      </motion.div>

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[8%] w-16 h-16 rounded-full border border-cyan-500/[0.07] animate-ring-float" />
        <div className="absolute bottom-[25%] right-[12%] w-20 h-20 rounded-full border border-brand-500/[0.06] animate-ring-float" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Sweep line */}
      <div className="absolute top-[45%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '11s', animationDelay: '1s' }} />

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
      </div>

      <div className="max-w-6xl mx-auto">
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
            AI giải quyết ở đâu?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mỗi điểm nghẽn trong quy trình đều có công cụ AI phù hợp —
            giúp BA tập trung vào phân tích và quyết định nghiệp vụ.
          </p>
        </motion.div>

        {/* Solution mapping grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((s, i) => (
            <motion.div
              key={s.problem}
              custom={i}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={cardVariants}
              className={`group relative ${i === solutions.length - 1 && solutions.length % 2 !== 0 ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto" : ""}`}
            >
              <div className={`relative p-8 rounded-2xl border ${s.borderColor} bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-700 h-full`}>
                {/* Glow */}
                <div className={`absolute -inset-px rounded-2xl ${s.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`} />

                {/* Problem → Solution flow */}
                <div className="mb-5">
                  <p className="text-sm text-red-400/70 mb-1 line-through decoration-red-500/30">
                    {s.problem}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400/60 flex-shrink-0" />
                    <p className={`text-sm font-medium ${s.accentColor}`}>
                      {s.solution}
                    </p>
                  </div>
                </div>

                {/* Tool badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.toolColor} flex items-center justify-center shadow-lg shadow-black/20`}>
                    <s.toolIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">{s.tool}</span>
                </div>

                {/* Before → After metric */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Trước</p>
                    <p className="text-sm font-mono text-red-400/70">{s.before}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Sau</p>
                    <p className="text-sm font-mono text-emerald-400">{s.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
