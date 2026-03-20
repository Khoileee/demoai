import { useRef, useState, useEffect } from "react";
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

function TimelineStep({ step, index, isMobile }: { step: (typeof steps)[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mobile: no x shift (full width display), Desktop: bell-curve slide right
  const peak = isMobile ? 0 : 60;
  const mid = isMobile ? 0 : 48;
  const small = isMobile ? 0 : 16;

  const x = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.42, 0.5, 0.58, 0.72, 0.88, 1],
    [0, 0, small, mid, peak, mid, small, 0, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2, 0.8, 0.92, 1],
    [0, 0.4, 1, 1, 0.4, 0]
  );

  // Mobile: subtler scale, Desktop: normal
  const sPeak = isMobile ? 1.01 : 1.025;
  const sMid = isMobile ? 1.005 : 1.015;

  const scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.35, 0.5, 0.65, 0.88, 1],
    [0.97, 1, sMid, sPeak, sMid, 1, 0.97]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, scale, willChange: "transform, opacity" }}
      className="relative flex items-start gap-6 md:gap-10 origin-left"
    >
      {/* Timeline spine — dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Glow ring */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-black/30 relative z-10 float-3d-icon float-3d-icon-pulse`} style={{ animationDelay: `${index * 0.5}s` }}>
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

  // Detect mobile once + on resize (breakpoint 768px = md)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-40 pointer-events-none" />

      {/* Breathe border frame */}
      <div className="absolute inset-4 rounded-3xl border border-brand-400/[0.15] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-28 edge-glow-top opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 edge-glow-bottom opacity-40 pointer-events-none" />

      {/* Animated background depth — CSS only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="depth-glow animate-depth-glow-1 w-[700px] h-[500px] top-[15%] left-1/2 -translate-x-1/2 bg-brand-600/4" />
        <div className="depth-glow animate-depth-glow-2 w-[400px] h-[350px] top-[45%] right-[5%] bg-violet-600/3" style={{ animationDelay: '4s' }} />
        {/* Plasma morph blob */}
        <div className="absolute w-[350px] h-[250px] top-[30%] left-[15%] bg-brand-500/[0.08] blur-[50px] animate-plasma" />
        {/* Grid shimmer highlight */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-500/[0.025] blur-[60px] animate-grid-shimmer" style={{ top: '20%', left: '30%' }} />
      </div>

      {/* Floating rings + orbiting dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[12%] w-20 h-20 rounded-full border border-brand-500/[0.15] animate-ring-float" />
        <div className="absolute top-[60%] right-[8%] w-14 h-14 rounded-full border border-violet-500/[0.12] animate-ring-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[50%] w-24 h-24 rounded-full border border-cyan-500/[0.10] animate-ring-float" style={{ animationDelay: '1.5s' }} />
        {/* Orbiting dot */}
        <div className="absolute top-[35%] left-[55%]">
          <div className="w-2 h-2 rounded-full bg-brand-400/60 animate-orbit" style={{ boxShadow: '0 0 8px rgba(96,165,250,0.5)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDelay: '2s', animationDuration: '10s' }} />
      <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDelay: '6s', animationDuration: '12s' }} />

      {/* Data stream columns */}
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '20%', background: 'linear-gradient(180deg, transparent, rgba(96,165,250,0.25), transparent)', animationDelay: '0s', animationDuration: '6s' }} />
      <div className="absolute w-[2px] h-28 animate-data-stream pointer-events-none" style={{ left: '75%', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.2), transparent)', animationDelay: '3s', animationDuration: '7s' }} />

      {/* Signal beacon */}
      <div className="absolute left-[80%] top-[20%] w-2 h-2 rounded-full border border-brand-400/40 animate-signal pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Floating hex */}
      <div className="absolute top-[15%] right-[18%] w-10 h-10 border border-brand-500/[0.15] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[20%] left-[8%] w-8 h-8 border border-violet-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Floating particles — CSS only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full bg-violet-400/25 animate-float-particle" style={{ left: '8%', top: '18%', width: 2, height: 2, animationDuration: '7.5s' }} />
        <div className="absolute rounded-full bg-violet-400/25 animate-float-particle" style={{ left: '85%', top: '22%', width: 3, height: 3, animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute rounded-full bg-violet-400/25 animate-float-particle" style={{ left: '20%', top: '68%', width: 2, height: 2, animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute rounded-full bg-violet-400/25 animate-float-particle" style={{ left: '72%', top: '72%', width: 2, height: 2, animationDuration: '6s', animationDelay: '0.5s' }} />
        <div className="absolute rounded-full bg-violet-400/25 animate-float-particle" style={{ left: '45%', top: '42%', width: 2, height: 2, animationDuration: '7s', animationDelay: '1.5s' }} />
        <div className="absolute rounded-full bg-violet-400/25 animate-float-particle" style={{ left: '55%', top: '85%', width: 3, height: 3, animationDuration: '8.5s', animationDelay: '3s' }} />
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
            <TimelineStep key={step.step} step={step} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
