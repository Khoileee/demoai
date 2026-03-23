import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  PencilRuler,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Users,
    title: "Thu thập & Làm rõ Yêu cầu",
    tasks: [
      "• Tiếp nhận phiếu yêu cầu (PYC)",
      "• Họp với stakeholder, ghi nhận thông tin",
      "• Làm rõ nghiệp vụ, quy trình hiện trạng / nâng cấp",
      "• Xác nhận scope và phạm vi",
    ],
    gradient: "from-cyan-500 to-blue-500",
    dotColor: "bg-cyan-500",
    borderColor: "border-cyan-500/10",
    glowColor: "bg-cyan-500/8",
  },
  {
    step: "02",
    icon: PencilRuler,
    title: "Phân tích & dựng Prototype",
    tasks: [
      "• Phân tích giải pháp nghiệp vụ",
      "• Đề xuất luồng xử lý, business flow",
      "• Dựng Prototype UI để trao đổi",
      "• Review & chốt giải pháp với stakeholder",
    ],
    gradient: "from-violet-500 to-purple-500",
    dotColor: "bg-violet-500",
    borderColor: "border-violet-500/10",
    glowColor: "bg-violet-500/8",
  },
  {
    step: "03",
    icon: FileText,
    title: "Đặc tả tài liệu",
    tasks: [
      "• Viết tài liệu SRS (Software Requirement Specification)",
      "• Mô tả business rules, validation rules",
      "• Thiết kế chi tiết (TKCT), mô hình CSDL",
      "• Review tài liệu với Tech Lead / Dev",
    ],
    gradient: "from-emerald-500 to-teal-500",
    dotColor: "bg-emerald-500",
    borderColor: "border-emerald-500/10",
    glowColor: "bg-emerald-500/8",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Kiểm thử, nghiệm thu & bàn giao",
    tasks: [
      "• Viết kịch bản kiểm thử nghiệm thu (UAT)",
      "• Hỗ trợ QC test theo đặc tả",
      "• Hỗ trợ viết hướng dẫn sử dụng (HDSD)",
      "• Bàn giao, đào tạo người dùng",
    ],
    gradient: "from-amber-500 to-orange-500",
    dotColor: "bg-amber-500",
    borderColor: "border-amber-500/10",
    glowColor: "bg-amber-500/8",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WorkflowSection() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });

  return (
    <section className="relative h-screen px-6 overflow-hidden flex flex-col justify-center">
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

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-2">
            Quy trình làm việc
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            BA đang làm gì mỗi ngày?
          </h2>
        </motion.div>

        {/* 2x2 step grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 relative">
          {/* Connecting arrows between cards — desktop only */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <ArrowRight className="w-5 h-5 text-gray-600/50" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              custom={i}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={cardVariants}
              style={{ transformPerspective: 800 }}
              className="group relative"
            >
              <div className={`relative p-6 rounded-2xl border ${step.borderColor} bg-gray-950/80 hover:bg-gray-900/60 transition-all duration-500 h-full glass-depth`}>
                <div className={`absolute -inset-px rounded-2xl ${step.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`} />

                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0`}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      Bước {step.step}
                    </span>
                    <h3 className="text-[15px] font-semibold text-white leading-tight">{step.title}</h3>
                  </div>
                </div>

                <ul className="space-y-1.5 pl-1">
                  {step.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
                      <span className={`mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full ${step.dotColor}/50`} />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
