import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Users,
  PencilRuler,
  FileText,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Users,
    title: "Thu thập & Làm rõ Yêu cầu",
    tasks: [
      "Tiếp nhận phiếu yêu cầu (PYC)",
      "Họp với stakeholder, ghi nhận thông tin",
      "Làm rõ nghiệp vụ, quy trình AS-IS / TO-BE",
      "Xác nhận scope và phạm vi",
    ],
    gradient: "from-cyan-500 to-blue-500",
    accentColor: "text-cyan-400",
    dotColor: "bg-cyan-500",
    lineColor: "from-cyan-500/40 to-violet-500/40",
  },
  {
    step: "02",
    icon: PencilRuler,
    title: "Phân tích & dựng Prototype",
    tasks: [
      "Phân tích giải pháp nghiệp vụ",
      "Đề xuất luồng xử lý, business flow",
      "Dựng Prototype UI để trao đổi",
      "Review & chốt giải pháp với stakeholder",
    ],
    gradient: "from-violet-500 to-purple-500",
    accentColor: "text-violet-400",
    dotColor: "bg-violet-500",
    lineColor: "from-violet-500/40 to-emerald-500/40",
  },
  {
    step: "03",
    icon: FileText,
    title: "Đặc tả tài liệu",
    tasks: [
      "Viết tài liệu SRS (Software Requirement Specification)",
      "Mô tả business rules, validation rules",
      "Thiết kế chi tiết (TKCT), mô hình CSDL",
      "Review tài liệu với Tech Lead / Dev",
    ],
    gradient: "from-emerald-500 to-teal-500",
    accentColor: "text-emerald-400",
    dotColor: "bg-emerald-500",
    lineColor: "from-emerald-500/40 to-amber-500/40",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Kiểm thử, nghiệm thu & bàn giao",
    tasks: [
      "Viết kịch bản kiểm thử nghiệm thu (UAT)",
      "Hỗ trợ QC test theo đặc tả",
      "Viết hướng dẫn sử dụng (HDSD)",
      "Bàn giao, đào tạo người dùng",
    ],
    gradient: "from-amber-500 to-orange-500",
    accentColor: "text-amber-400",
    dotColor: "bg-amber-500",
    lineColor: "",
  },
];

function TimelineStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -40 : 40, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="relative flex items-start gap-6 md:gap-10"
    >
      {/* Timeline spine — dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Glow ring */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-black/30 relative z-10`}>
          <step.icon className="w-5 h-5 text-white" />
        </div>
        {/* Connecting line */}
        {index < steps.length - 1 && (
          <div className={`w-px flex-1 min-h-[40px] bg-gradient-to-b ${step.lineColor}`} />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 md:pb-14 flex-1 min-w-0">
        <span
          className={`text-[10px] font-bold tracking-[0.3em] uppercase bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
        >
          Bước {step.step}
        </span>
        <h3 className="text-xl font-semibold text-white mt-1.5 mb-4">{step.title}</h3>
        <ul className="space-y-2">
          {step.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
              <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${step.dotColor}/50`} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function WorkflowSection() {
  const { ref: headerRef, isInView } = useScrollReveal();

  return (
    <section className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-40 pointer-events-none" />

      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[700px] h-[500px] top-[15%] left-1/2 -translate-x-1/2 bg-brand-600/4"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="depth-glow w-[400px] h-[350px] top-[45%] right-[5%] bg-violet-600/3"
        />
        {/* Grid shimmer highlight */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-500/[0.025] blur-[60px] animate-grid-shimmer" style={{ top: '20%', left: '30%' }} />
      </div>

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[12%] w-20 h-20 rounded-full border border-brand-500/[0.07] animate-ring-float" />
        <div className="absolute top-[60%] right-[8%] w-14 h-14 rounded-full border border-violet-500/[0.06] animate-ring-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Sweep line */}
      <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDelay: '2s', animationDuration: '10s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "8%", y: "18%", s: 2, d: 0, dur: 7.5 },
          { x: "85%", y: "22%", s: 3, d: 1, dur: 8 },
          { x: "20%", y: "68%", s: 2, d: 2, dur: 9 },
          { x: "72%", y: "72%", s: 2, d: 0.5, dur: 6 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-violet-400/20"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-12, 12, -12], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Quy trình làm việc
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            BA đang làm gì mỗi ngày?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            4 giai đoạn chính trong quy trình làm việc của Business Analyst
            — từ tiếp nhận yêu cầu đến bàn giao sản phẩm.
          </p>
        </motion.div>

        {/* Timeline flow */}
        <div className="relative">
          {steps.map((step, i) => (
            <TimelineStep key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
