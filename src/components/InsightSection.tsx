import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Brain, ShieldCheck, Rocket } from "lucide-react";

const insights = [
  {
    icon: Brain,
    title: "AI không thay thế BA",
    description:
      "AI là công cụ hỗ trợ — không thay thế con người. BA vẫn cần hiểu sâu nghiệp vụ, đặt đúng câu hỏi, và ra quyết định. AI chỉ giúp tăng tốc những công việc lặp lại.",
    accentColor: "text-brand-400",
    borderColor: "border-brand-500/10",
    glowColor: "bg-brand-500/8",
    iconBg: "from-brand-500/15 to-cyan-500/15",
    iconBorder: "border-brand-500/10",
  },
  {
    icon: ShieldCheck,
    title: "An toàn dữ liệu",
    description:
      "3/4 công cụ chạy local hoặc self-hosted, không gửi dữ liệu ra ngoài. Mọi output đều qua bước human-in-the-loop — BA kiểm tra trước khi sử dụng chính thức.",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/10",
    glowColor: "bg-emerald-500/8",
    iconBg: "from-emerald-500/15 to-teal-500/15",
    iconBorder: "border-emerald-500/10",
  },
  {
    icon: Rocket,
    title: "Nhân rộng được",
    description:
      "Template chuẩn hóa, chi phí vận hành ~$10-20/tháng, đào tạo 1-2 buổi là BA có thể sử dụng. Dễ dàng áp dụng cho các dự án và team khác.",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/10",
    glowColor: "bg-violet-500/8",
    iconBg: "from-violet-500/15 to-purple-500/15",
    iconBorder: "border-violet-500/10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function InsightSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgGlowOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-30 pointer-events-none" />

      {/* Breathe border */}
      <div className="absolute inset-6 rounded-3xl border border-brand-400/[0.12] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-24 edge-glow-top opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 edge-glow-bottom opacity-40 pointer-events-none" />

      {/* Background effects */}
      <motion.div
        style={{ opacity: bgGlowOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="depth-glow w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600/5 animate-depth-glow-1" />
        <div className="depth-glow w-[400px] h-[300px] top-[30%] right-[5%] bg-violet-600/3 animate-depth-glow-2" style={{ animationDelay: '3s' }} />
        {/* Plasma blob */}
        <div className="absolute w-[350px] h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500/[0.07] blur-[50px] animate-plasma" />
        {/* Shimmer */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-500/[0.02] blur-[60px] animate-grid-shimmer" style={{ top: '40%', left: '35%' }} />
      </motion.div>

      {/* Floating rings + orbit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] right-[12%] w-20 h-20 rounded-full border border-brand-500/[0.14] animate-ring-float" />
        <div className="absolute bottom-[25%] left-[15%] w-14 h-14 rounded-full border border-violet-500/[0.12] animate-ring-float" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[50%] left-[50%] w-24 h-24 rounded-full border border-cyan-500/[0.10] animate-ring-float" style={{ animationDelay: '1s' }} />
        {/* Orbiting dots */}
        <div className="absolute top-[45%] left-[48%]">
          <div className="w-2 h-2 rounded-full bg-brand-400/55 animate-orbit" style={{ boxShadow: '0 0 8px rgba(96,165,250,0.5)' }} />
        </div>
        <div className="absolute top-[55%] right-[20%]">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400/50 animate-orbit-reverse" style={{ boxShadow: '0 0 6px rgba(139,92,246,0.4)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/5 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '14s', animationDelay: '6s' }} />

      {/* Data streams */}
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '10%', background: 'linear-gradient(180deg, transparent, rgba(96,165,250,0.22), transparent)', animationDelay: '0s', animationDuration: '5.5s' }} />
      <div className="absolute w-[2px] h-20 animate-data-stream pointer-events-none" style={{ left: '88%', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.18), transparent)', animationDelay: '3s', animationDuration: '6.5s' }} />

      {/* Signal beacons */}
      <div className="absolute left-[25%] top-[20%] w-2 h-2 rounded-full border border-brand-400/35 animate-signal pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute left-[75%] top-[75%] w-2 h-2 rounded-full border border-violet-400/30 animate-signal pointer-events-none" style={{ animationDelay: '2.5s' }} />

      {/* Floating hex */}
      <div className="absolute top-[18%] left-[8%] w-10 h-10 border border-brand-500/[0.14] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-8 h-8 border border-violet-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '20%', top: '25%', width: 2, height: 2, animationDuration: '8s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '75%', top: '35%', width: 3, height: 3, animationDuration: '7s', animationDelay: '1.2s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '40%', top: '70%', width: 2, height: 2, animationDuration: '9s', animationDelay: '2.5s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '55%', top: '15%', width: 2, height: 2, animationDuration: '7.5s', animationDelay: '1.8s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '88%', top: '50%', width: 3, height: 3, animationDuration: '6.5s', animationDelay: '0.5s' }} />
        <div className="absolute rounded-full bg-brand-400/25 animate-float-particle" style={{ left: '12%', top: '60%', width: 2, height: 2, animationDuration: '8.5s', animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Góc nhìn
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-tight">
            <span className="block leading-[1.4] mb-4">
              <span className="text-white">AI giúp BA làm </span>
              <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">nhanh hơn</span>
              <span className="text-white">, </span>
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">chuẩn hơn</span>
              <span className="text-white"> —</span>
            </span>
            <span className="block leading-[1.4]">
              <span className="text-white">nhưng BA vẫn là người </span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">quyết định nghiệp vụ</span>
              <span className="text-white">.</span>
            </span>
          </h2>
        </motion.div>

        {/* 3 insight cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative"
            >
              <div className={`relative p-8 rounded-2xl border ${item.borderColor} bg-gray-950/80 hover:bg-gray-900/60 transition-all duration-500 h-full glass-depth`}>
                <div className={`absolute -inset-px rounded-2xl ${item.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center border ${item.iconBorder} mb-5`}>
                  <item.icon className={`w-5 h-5 ${item.accentColor}`} />
                </div>

                <h3 className={`text-lg font-semibold mb-3 ${item.accentColor}`}>
                  {item.title}
                </h3>

                <p className="text-gray-400/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
