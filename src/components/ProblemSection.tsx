import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  PenLine,
  Clock,
  FileText,
  LayoutTemplate,
} from "lucide-react";

const problems = [
  {
    icon: PenLine,
    title: "Ghi chép meeting thủ công",
    description:
      "BA phải vừa nghe, vừa ghi, vừa đặt câu hỏi. Thông tin bị bỏ sót, ghi chép thiếu chính xác.",
  },
  {
    icon: Clock,
    title: "Tổng hợp yêu cầu mất thời gian",
    description:
      "Sau mỗi buổi họp, cần nhiều giờ để sàng lọc, phân loại và chuẩn hóa requirement.",
  },
  {
    icon: FileText,
    title: "Viết tài liệu lặp lại",
    description:
      "SRS, BRD, TKCT — các tài liệu có cấu trúc tương tự nhưng phải viết lại từ đầu mỗi lần.",
  },
  {
    icon: LayoutTemplate,
    title: "Prototype thiếu trực quan",
    description:
      "Wireframe bằng Balsamiq khó thể hiện luồng phức tạp, thiếu tương tác thực tế để trao đổi với stakeholder.",
  },
];

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="group relative"
    >
      <div className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-red-500/15 hover:bg-white/[0.04] transition-all duration-700">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />

        {/* Number badge */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/10 flex items-center justify-center">
          <span className="text-xs font-bold text-red-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/15 to-orange-500/15 flex items-center justify-center border border-red-500/10">
            <problem.icon className="w-5 h-5 text-red-400/80" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">
              {problem.title}
            </h3>
            <p className="text-gray-400/80 text-sm leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });
  const headerY = useTransform(headerProgress, [0, 1], [60, 0]);
  const headerOpacity = useTransform(headerProgress, [0, 0.5], [0, 1]);

  return (
    <section id="problem" className="relative py-32 sm:py-44 px-6 overflow-hidden">
      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[600px] h-[400px] top-[20%] right-[5%] bg-red-600/4"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="depth-glow w-[400px] h-[300px] top-[50%] left-[8%] bg-orange-600/3"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "10%", y: "15%", s: 2, d: 0, dur: 7 },
          { x: "82%", y: "25%", s: 3, d: 1.5, dur: 8 },
          { x: "30%", y: "75%", s: 2, d: 0.5, dur: 9 },
          { x: "65%", y: "60%", s: 2, d: 2, dur: 6.5 },
          { x: "88%", y: "80%", s: 3, d: 3, dur: 7.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-400/20"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
        <motion.div
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          className="absolute top-[35%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-red-400/10 to-transparent"
        />
        <motion.div
          animate={{ x: ["250%", "-100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 6, delay: 3 }}
          className="absolute top-[65%] left-0 w-[180px] h-px bg-gradient-to-r from-transparent via-orange-400/8 to-transparent"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-24"
        >
          <p className="text-red-400/80 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Vấn đề
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            BA đang gặp phải điều gì?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Những công việc lặp đi lặp lại hàng ngày đang chiếm phần lớn thời gian
            — thay vì tập trung vào phân tích nghiệp vụ.
          </p>
        </motion.div>

        {/* Problem cards — staggered scroll reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
