import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  PenLine,
  Clock,
  FileText,
  LayoutTemplate,
  Repeat,
  AlertTriangle,
} from "lucide-react";

const problems = [
  {
    icon: PenLine,
    step: "Bước 1",
    title: "Ghi chép meeting thủ công",
    description:
      "BA phải vừa nghe, vừa ghi, vừa đặt câu hỏi trong cuộc họp. Thông tin dễ bị bỏ sót, ghi chép thiếu chính xác, mất thời gian tổng hợp lại sau mỗi buổi.",
    metric: "~1-2 giờ / buổi họp",
  },
  {
    icon: Clock,
    step: "Bước 1-2",
    title: "Tổng hợp & phân tích yêu cầu mất thời gian",
    description:
      "Sau mỗi buổi họp, cần nhiều giờ để sàng lọc, phân loại, chuẩn hóa requirement. Phân tích luồng nghiệp vụ phức tạp dễ thiếu sót.",
    metric: "~4-8 giờ tổng hợp",
  },
  {
    icon: LayoutTemplate,
    step: "Bước 2",
    title: "Prototype thiếu trực quan",
    description:
      "Wireframe truyền thống khó thể hiện tương tác thực tế. Stakeholder khó hình dung, dẫn đến nhiều vòng chỉnh sửa trước khi chốt giải pháp.",
    metric: "2-3 vòng review",
  },
  {
    icon: FileText,
    step: "Bước 3",
    title: "Viết tài liệu lặp lại, mất thời gian",
    description:
      "SRS, BRD, TKCT, CSDL — các tài liệu có cấu trúc tương tự nhưng phải viết lại từ đầu mỗi lần. Rất dễ thiếu sót, không nhất quán.",
    metric: "~1-2 ngày / tài liệu",
  },
  {
    icon: Repeat,
    step: "Bước 3-4",
    title: "Tra cứu thông tin dự án chậm",
    description:
      "Tìm lại requirement cũ, business rule, API spec nằm rải rác trong nhiều file. Mất thời gian tìm kiếm thay vì phân tích.",
    metric: "~30 phút / lần tra cứu",
  },
  {
    icon: AlertTriangle,
    step: "Bước 4",
    title: "Viết kịch bản test & HDSD thủ công",
    description:
      "Mỗi lần update requirement phải cập nhật lại kịch bản UAT và HDSD. Dễ bỏ sót, không đồng bộ với tài liệu đặc tả.",
    metric: "~4 giờ / lần cập nhật",
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
      <div className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-red-500/15 hover:bg-white/[0.04] transition-all duration-700 h-full">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />

        {/* Step badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-red-400/70 bg-red-500/10 px-2.5 py-1 rounded-full">
            {problem.step}
          </span>
          {problem.metric && (
            <span className="text-xs font-mono text-orange-400/60">
              {problem.metric}
            </span>
          )}
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
    <section id="problem" className="relative py-20 sm:py-28 px-6 overflow-hidden">
      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-30 pointer-events-none" />

      {/* Edge glow */}
      <div className="absolute top-0 left-0 right-0 h-32 edge-glow-top opacity-50 pointer-events-none" />

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
        {/* Shimmer */}
        <div className="absolute w-[250px] h-[250px] rounded-full bg-red-500/[0.02] blur-[50px] animate-grid-shimmer" style={{ top: '35%', right: '20%' }} />
      </div>

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] right-[15%] w-16 h-16 rounded-full border border-red-500/[0.06] animate-ring-float" />
        <div className="absolute bottom-[20%] left-[10%] w-12 h-12 rounded-full border border-orange-500/[0.05] animate-ring-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Sweep line */}
      <div className="absolute top-[55%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '9s' }} />

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
            Đâu là điểm nghẽn trong quy trình?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Những công việc lặp đi lặp lại, thủ công đang chiếm phần lớn thời gian
            — thay vì để BA tập trung vào phân tích nghiệp vụ và ra quyết định.
          </p>
        </motion.div>

        {/* Problem cards — 3 columns for 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
