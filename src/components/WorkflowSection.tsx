import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mic, LayoutDashboard, FileText, Bot } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Mic,
    title: "Thu thập yêu cầu",
    subtitle: "Speech-to-Text",
    description:
      "Ghi âm cuộc họp, tự động chuyển thành văn bản bằng Whisper. Agent phân tích transcript → meeting notes, action items, danh sách requirement.",
    gradient: "from-cyan-500 to-blue-500",
    glowColor: "bg-cyan-500/8",
    borderColor: "border-cyan-500/10",
    accentColor: "text-cyan-400",
  },
  {
    step: "02",
    icon: LayoutDashboard,
    title: "Tạo Prototype",
    subtitle: "Generate UI",
    description:
      "Mô tả nghiệp vụ bằng lời → Lovable tự sinh giao diện React hoàn chỉnh. Chỉnh sửa trực tiếp trên VS Code với Agent hỗ trợ.",
    gradient: "from-violet-500 to-purple-500",
    glowColor: "bg-violet-500/8",
    borderColor: "border-violet-500/10",
    accentColor: "text-violet-400",
  },
  {
    step: "03",
    icon: FileText,
    title: "Sinh tài liệu",
    subtitle: "SRS, TKCT, CSDL",
    description:
      "Agent đọc source code + requirement → tự sinh tài liệu SRS, thiết kế chi tiết, mô hình CSDL theo template chuẩn.",
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "bg-emerald-500/8",
    borderColor: "border-emerald-500/10",
    accentColor: "text-emerald-400",
  },
  {
    step: "04",
    icon: Bot,
    title: "Trợ lý AI",
    subtitle: "OpenClaw + Telegram",
    description:
      "Chat với AI qua Telegram để tra cứu tài liệu, hỏi đáp nghiệp vụ, sửa code nhẹ — mọi lúc mọi nơi, ngay trên điện thoại.",
    gradient: "from-amber-500 to-orange-500",
    glowColor: "bg-amber-500/8",
    borderColor: "border-amber-500/10",
    accentColor: "text-amber-400",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="group relative"
    >
      {/* Connector line to next card (vertical on mobile, hidden on desktop) */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 glow-line" />
      )}

      <div
        className={`relative p-8 lg:p-10 rounded-2xl border ${step.borderColor} bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-700 h-full`}
      >
        {/* Glow on hover */}
        <div
          className={`absolute -inset-px rounded-2xl ${step.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`}
        />

        {/* Step number */}
        <span
          className={`text-xs font-bold tracking-[0.3em] bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
        >
          BƯỚC {step.step}
        </span>

        {/* Icon + Title */}
        <div className="flex items-center gap-4 mt-5 mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-black/20`}
          >
            <step.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function WorkflowSection() {
  const { ref: headerRef, isInView } = useScrollReveal();

  return (
    <section className="relative py-40 sm:py-52 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

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
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "8%", y: "18%", s: 2, d: 0, dur: 7.5 },
          { x: "85%", y: "22%", s: 3, d: 1, dur: 8 },
          { x: "20%", y: "68%", s: 2, d: 2, dur: 9 },
          { x: "72%", y: "72%", s: 2, d: 0.5, dur: 6 },
          { x: "50%", y: "90%", s: 3, d: 3, dur: 7 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-violet-400/20"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-12, 12, -12], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
        <motion.div
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 6 }}
          className="absolute top-[30%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-violet-400/10 to-transparent"
        />
        <motion.div
          animate={{ x: ["250%", "-100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 5, delay: 4 }}
          className="absolute top-[70%] left-0 w-[180px] h-px bg-gradient-to-r from-transparent via-brand-400/8 to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Quy trình
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            4 bước chuyển đổi
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Từ cuộc họp đầu tiên đến tài liệu hoàn chỉnh — AI đồng hành cùng BA ở mọi giai đoạn.
          </p>
        </motion.div>

        {/* Step cards — scroll-based stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
