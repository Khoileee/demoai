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
import TiltCard from "./TiltCard";

const problems = [
  {
    icon: PenLine,
    step: "Bước 1",
    title: "Ghi chép meeting thủ công",
    bullets: [
      "Vừa nghe, vừa ghi, vừa đặt câu hỏi",
      "Thông tin dễ bị sót, ghi thiếu chính xác",
      "Mất thời gian tổng hợp lại sau họp",
    ],
    metric: "~1-2h / buổi họp",
    frequency: "2-4 buổi/tuần",
  },
  {
    icon: Clock,
    step: "Bước 1-2",
    title: "Tổng hợp & phân tích yêu cầu chậm",
    bullets: [
      "Sàng lọc, phân loại, chuẩn hóa requirement",
      "Phân tích luồng nghiệp vụ phức tạp",
      "Dễ thiếu sót khi nhiều nguồn thông tin",
    ],
    metric: "~1h tổng hợp",
    frequency: "Mỗi buổi họp",
  },
  {
    icon: LayoutTemplate,
    step: "Bước 2",
    title: "Prototype nhiều vòng chỉnh sửa",
    bullets: [
      "Vẽ tay mockup tốn thời gian",
      "Stakeholder khó hình dung tương tác",
      "Nhiều vòng chỉnh sửa trước khi chốt",
    ],
    metric: "~3-4h / 4 chức năng CRUD",
    frequency: "Mỗi sprint",
  },
  {
    icon: FileText,
    step: "Bước 3",
    title: "Viết tài liệu lặp lại, mất thời gian",
    bullets: [
      "SRS, TKCT, CSDL có cấu trúc tương tự",
      "Viết lại từ đầu mỗi chức năng",
      "Dễ thiếu sót, không nhất quán",
    ],
    metric: "~3-4h / 4 chức năng CRUD",
    frequency: "Mỗi chức năng",
  },
  {
    icon: Repeat,
    step: "Bước 3-4",
    title: "Tra cứu thông tin dự án chậm",
    bullets: [
      "Requirement, business rule rải rác",
      "Nằm trong nhiều file, nhiều nguồn",
      "Mất thời gian tìm và xác minh",
    ],
    metric: "~15-30p / lần",
    frequency: "2-3 lần/ tuần",
  },
  {
    icon: AlertTriangle,
    step: "Bước 4",
    title: "Viết kịch bản test & HDSD thủ công",
    bullets: [
      "Update req → cập nhật lại UAT, HDSD",
      "Dễ bỏ sót, không đồng bộ",
      "Repeat mỗi lần thay đổi yêu cầu",
    ],
    metric: "~1-2h / lần",
    frequency: "Mỗi lần đổi req",
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
      <TiltCard className="h-full">
      <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-gray-950/80 hover:border-red-500/20 hover:bg-gray-900/60 transition-all duration-500 h-full">
        <div className="absolute -inset-px rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />

        {/* Step badge + metrics */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-red-400/70 bg-red-500/10 px-2.5 py-1 rounded-full">
            {problem.step}
          </span>
          <div className="flex items-center gap-2">
            {problem.frequency && (
              <span className="text-[11px] font-medium text-orange-300/50 bg-orange-500/8 px-2.5 py-1 rounded-full">
                {problem.frequency}
              </span>
            )}
            {problem.metric && (
              <span className="text-xs font-mono text-orange-400/60">
                {problem.metric}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-red-500/15 to-orange-500/15 flex items-center justify-center border border-red-500/10">
            <problem.icon className="w-5 h-5 text-red-400/80" />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-white/90 mb-2">
              {problem.title}
            </h3>
            <ul className="space-y-1.5">
              {problem.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400/80 leading-relaxed">
                  <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400/40" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </TiltCard>
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
    <section id="problem" className="relative h-screen px-6 overflow-hidden flex flex-col justify-center">
      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-35 pointer-events-none" />

      {/* Breathe border frame */}
      <div className="absolute inset-4 rounded-3xl border border-red-400/[0.12] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-32 edge-glow-top opacity-60 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.07) 0%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 edge-glow-bottom opacity-45 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(249,115,22,0.05) 0%, transparent 100%)' }} />

      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="depth-glow w-[600px] h-[400px] top-[20%] right-[5%] bg-red-600/4 animate-depth-glow-1" />
        <div className="depth-glow w-[400px] h-[300px] top-[50%] left-[8%] bg-orange-600/3 animate-depth-glow-2" style={{ animationDelay: '3s' }} />
        {/* Plasma morph blob */}
        <div className="absolute w-[300px] h-[200px] top-[40%] right-[20%] bg-red-500/[0.07] blur-[40px] animate-plasma" style={{ animationDelay: '5s' }} />
        {/* Shimmer */}
        <div className="absolute w-[250px] h-[250px] rounded-full bg-red-500/[0.02] blur-[50px] animate-grid-shimmer" style={{ top: '35%', right: '20%' }} />
      </div>

      {/* Floating rings + orbit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] right-[15%] w-16 h-16 rounded-full border border-red-500/[0.14] animate-ring-float" />
        <div className="absolute bottom-[20%] left-[10%] w-12 h-12 rounded-full border border-orange-500/[0.12] animate-ring-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[45%] w-20 h-20 rounded-full border border-red-400/[0.10] animate-ring-float" style={{ animationDelay: '4s' }} />
        {/* Orbiting dot */}
        <div className="absolute top-[22%] right-[18%]">
          <div className="w-2 h-2 rounded-full bg-red-400/60 animate-orbit-reverse" style={{ boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[55%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '9s' }} />
      <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '11s', animationDelay: '4s' }} />

      {/* Data stream */}
      <div className="absolute w-[2px] h-20 animate-data-stream pointer-events-none" style={{ left: '15%', background: 'linear-gradient(180deg, transparent, rgba(239,68,68,0.2), transparent)', animationDelay: '2s', animationDuration: '5.5s' }} />
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '85%', background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.18), transparent)', animationDelay: '5s', animationDuration: '7s' }} />

      {/* Signal ripple */}
      <div className="absolute left-[60%] top-[70%] w-2 h-2 rounded-full border border-red-400/35 animate-signal pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Floating hex shapes */}
      <div className="absolute top-[12%] left-[5%] w-10 h-10 border border-red-500/[0.14] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[15%] right-[6%] w-8 h-8 border border-orange-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full bg-red-400/20 animate-float-particle" style={{ left: '10%', top: '15%', width: 2, height: 2, animationDuration: '7s' }} />
        <div className="absolute rounded-full bg-red-400/20 animate-float-particle" style={{ left: '82%', top: '25%', width: 3, height: 3, animationDuration: '8s', animationDelay: '1.5s' }} />
        <div className="absolute rounded-full bg-red-400/20 animate-float-particle" style={{ left: '30%', top: '75%', width: 2, height: 2, animationDuration: '9s', animationDelay: '0.5s' }} />
        <div className="absolute rounded-full bg-red-400/20 animate-float-particle" style={{ left: '65%', top: '60%', width: 2, height: 2, animationDuration: '6.5s', animationDelay: '2s' }} />
        <div className="absolute rounded-full bg-red-400/20 animate-float-particle" style={{ left: '88%', top: '80%', width: 3, height: 3, animationDuration: '7.5s', animationDelay: '3s' }} />
        <div className="absolute top-[35%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-red-400/10 to-transparent animate-sweep-travel" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-8"
        >
          <p className="text-red-400/80 text-sm font-medium tracking-[0.25em] uppercase mb-3">
            Vấn đề
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            Đâu là điểm nghẽn trong quy trình?
          </h2>
        </motion.div>

        {/* Problem cards — 6 cards, 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
