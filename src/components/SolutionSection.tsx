import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mic,
  Bot,
  LayoutDashboard,
  MessageCircle,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Shield,
  DollarSign,
  Cpu,
  Zap,
  RotateCcw,
} from "lucide-react";

type Benchmark = {
  scope: string;
  before: string;
  after: string;
};

type ToolFeature = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
};

type Badge = { label: string; color: string };

type SolutionCard = {
  problem: string;
  solution: string;
  benchmarks: Benchmark[];
  accuracy: string;
  note: string;
  toolIcon: React.ComponentType<{ className?: string }>;
  toolColor: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  toolName: string;
  toolTagline: string;
  toolDescription: string;
  toolFeatures: ToolFeature[];
  toolLimits: string[];
  toolBadges: Badge[];
};

const cards: SolutionCard[] = [
  {
    problem: "Ghi chép meeting & tổng hợp yêu cầu thủ công",
    solution: "Tự động chuyển giọng nói → meeting notes, action items, requirement list",
    benchmarks: [
      { scope: "Họp ngắn (30p)", before: "~1h ghi + tổng hợp", after: "~15p review notes" },
      { scope: "Workshop dài (2-3h)", before: "~3-4h tổng hợp", after: "~30p review + sửa" },
    ],
    accuracy: "Transcript chính xác ~90-95%, BA chỉ cần review lại nội dung",
    note: "Tùy chất lượng audio và số người tham gia",
    toolIcon: Mic,
    toolColor: "from-cyan-500 to-blue-500",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/10",
    glowColor: "bg-cyan-500/8",
    toolName: "Whisper (OpenAI)",
    toolTagline: "Speech-to-Text — Ghi âm cuộc họp tự động",
    toolDescription: "Mô hình AI của OpenAI chuyên chuyển giọng nói thành văn bản. Chạy hoàn toàn trên máy local (self-host), không cần gửi dữ liệu ra ngoài.",
    toolFeatures: [
      { icon: Shield, text: "Chạy local, bảo mật tuyệt đối — dữ liệu không ra khỏi máy" },
      { icon: Mic, text: "Hỗ trợ tiếng Việt, ghi âm realtime trong cuộc họp" },
      { icon: Zap, text: "Tích hợp Agent phân tích transcript → meeting notes, action items" },
    ],
    toolLimits: [
      "Phụ thuộc vào cấu hình GPU máy tính (RAM, VRAM)",
      "Độ chính xác giảm với môi trường ồn hoặc nhiều giọng nói",
      "Chạy trên máy cá nhân, không phải máy công ty",
    ],
    toolBadges: [
      { label: "Miễn phí", color: "text-emerald-400 bg-emerald-500/10" },
      { label: "Local", color: "text-cyan-400 bg-cyan-500/10" },
    ],
  },
  {
    problem: "Prototype thiếu trực quan, nhiều vòng chỉnh sửa",
    solution: "Mô tả nghiệp vụ → AI sinh giao diện React, BA review và chỉnh",
    benchmarks: [
      { scope: "Tính năng CRUD cơ bản", before: "~3-4h vẽ tay mockup", after: "~1-2h AI gen + review sửa" },
      { scope: "Tính năng phức tạp", before: "~6-8h wireframe", after: "~3-4h gen + chỉnh interaction" },
    ],
    accuracy: "AI gen layout chính xác ~70-80%, BA cần chỉnh lại UX/interaction",
    note: "Tùy số màn hình, độ phức tạp nghiệp vụ của dự án",
    toolIcon: LayoutDashboard,
    toolColor: "from-violet-500 to-purple-500",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/10",
    glowColor: "bg-violet-500/8",
    toolName: "Lovable",
    toolTagline: "Generate UI — Tạo prototype UI từ mô tả",
    toolDescription: "Mô tả giao diện bằng ngôn ngữ tự nhiên → AI tự sinh code hoàn chỉnh. Tự động deploy lên domain tạm để demo với stakeholder.",
    toolFeatures: [
      { icon: Zap, text: "Mô tả bằng tiếng Việt → sinh UI React ngay lập tức" },
      { icon: LayoutDashboard, text: "Auto-deploy, sync GitHub — chỉnh sửa code trên VS Code" },
      { icon: DollarSign, text: "Phù hợp cho BA tạo prototype nhanh, không cần Dev" },
    ],
    toolLimits: [
      "Chi phí subscription (~$25/tháng)",
      "Dữ liệu gửi lên cloud — cần cân nhắc bảo mật thông tin",
      "UI phức tạp vẫn cần chỉnh sửa thủ công",
    ],
    toolBadges: [
      { label: "Trả phí", color: "text-amber-400 bg-amber-500/10" },
      { label: "Cloud", color: "text-blue-400 bg-blue-500/10" },
    ],
  },
  {
    problem: "Viết tài liệu & kịch bản test lặp lại, mất thời gian",
    solution: "Agent đọc source code + requirement → sinh SRS, TKCT, KBNT, HDSD theo template",
    benchmarks: [
      { scope: "Chức năng CRUD (SRS + diagram)", before: "~5-6h", after: "~1h gen + ~2h review, sửa, lên Confluence" },
      { scope: "Bộ tài liệu đầy đủ (SRS + TKCT + CSDL + test case)", before: "~2-3 ngày", after: "~1 ngày gen + review tổng" },
      { scope: "Update tài liệu khi đổi req", before: "~2-4h", after: "~30p AI detect thay đổi + BA review" },
    ],
    accuracy: "Template chuẩn → ít sai cấu trúc, BA tập trung review nội dung nghiệp vụ",
    note: "Tùy số lượng use case và độ phức tạp dự án",
    toolIcon: Bot,
    toolColor: "from-emerald-500 to-teal-500",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/10",
    glowColor: "bg-emerald-500/8",
    toolName: "Agent + Skills (VS Code)",
    toolTagline: "BA Assistant — Phân tích, sinh tài liệu trong VS Code",
    toolDescription: "Agent được cấu hình sẵn với vai trò BA chuyên nghiệp trong GitHub Copilot. Có nhiều skill chuyên biệt: phân tích CRUD, sinh SRS, UI spec, data model.",
    toolFeatures: [
      { icon: Bot, text: "Đọc source code + tài liệu → tự sinh SRS, TKCT, CSDL theo template" },
      { icon: Shield, text: "Chạy trong VS Code, bảo mật tốt — code không rời máy" },
      { icon: Zap, text: "Nhiều skill: CRUD analysis, UI spec, diagram, doc-generator" },
    ],
    toolLimits: [
      "Setup ban đầu phức tạp (cấu hình Agent, Skills, template)",
      "Cần trả phí GitHub Copilot subscription (~$10-20/tháng)",
      "Cần có kỹ năng viết prompt tốt để có output chất lượng",
    ],
    toolBadges: [
      { label: "Trả phí", color: "text-amber-400 bg-amber-500/10" },
      { label: "Bảo mật", color: "text-emerald-400 bg-emerald-500/10" },
    ],
  },
  {
    problem: "Tra cứu thông tin dự án chậm, dữ liệu rải rác",
    solution: "Chat qua Telegram → tra cứu workspace, tìm business rule, cross-check",
    benchmarks: [
      { scope: "Tìm 1 business rule / API spec", before: "~15-30p lục file", after: "Tức thì — trả về file + dòng" },
      { scope: "Cross-check req vs code", before: "~2-3h đối chiếu", after: "~1h AI so sánh tự động + cập nhật" },
    ],
    accuracy: "Chính xác với context trong workspace, BA cần verify với stakeholder",
    note: "Hiệu quả phụ thuộc vào cách tổ chức workspace",
    toolIcon: MessageCircle,
    toolColor: "from-amber-500 to-orange-500",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/10",
    glowColor: "bg-amber-500/8",
    toolName: "OpenClaw + Telegram + 9Router",
    toolTagline: "AI Agent qua Telegram — Trợ lý mọi lúc mọi nơi",
    toolDescription: "Hệ thống AI agent mã nguồn mở, self-host trên máy cá nhân. Kết nối Telegram Bot để chat từ điện thoại — tra cứu workspace, sửa code, thậm chí commit.",
    toolFeatures: [
      { icon: MessageCircle, text: "Chat qua Telegram — tra cứu thông tin workspace nhanh chóng" },
      { icon: Cpu, text: "Rất mạnh: tìm file, đọc code, sửa code, commit từ xa" },
      { icon: DollarSign, text: "Chi phí thấp — chỉ trả API cost (~vài USD/tháng)" },
    ],
    toolLimits: [
      "Setup rất phức tạp (OpenClaw + 9Router + Telegram Bot + MCP)",
      "Cần kiến thức kỹ thuật để cài đặt và bảo trì",
      "Phụ thuộc vào wifi và cấu hình máy (chạy local server)",
    ],
    toolBadges: [
      { label: "Chi phí thấp", color: "text-emerald-400 bg-emerald-500/10" },
      { label: "Self-host", color: "text-cyan-400 bg-cyan-500/10" },
      { label: "Rất mạnh", color: "text-amber-400 bg-amber-500/10" },
    ],
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

const flowSteps = [
  {
    step: "Vấn đề",
    icon: AlertCircle,
    items: ["Ghi chép thủ công", "Prototype nhiều vòng", "Viết tài liệu lặp", "Tra cứu chậm"],
    color: "text-red-400",
    borderColor: "border-red-500/20",
    bgColor: "bg-red-500/5",
    dotColor: "bg-red-400",
  },
  {
    step: "AI hỗ trợ",
    icon: Bot,
    items: ["Whisper transcript", "Lovable gen UI", "Agent sinh tài liệu", "Chat tra cứu"],
    color: "text-brand-400",
    borderColor: "border-brand-500/20",
    bgColor: "bg-brand-500/5",
    dotColor: "bg-brand-400",
  },
  {
    step: "BA review",
    icon: UserCheck,
    items: ["Kiểm tra nội dung", "Chỉnh sửa UX", "Review nghiệp vụ", "Verify kết quả"],
    color: "text-amber-400",
    borderColor: "border-amber-500/20",
    bgColor: "bg-amber-500/5",
    dotColor: "bg-amber-400",
  },
  {
    step: "Kết quả",
    icon: CheckCircle2,
    items: ["Nhanh hơn 50-80%", "Chuẩn theo template", "Đồng bộ tài liệu", "Tập trung nghiệp vụ"],
    color: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
    dotColor: "bg-emerald-400",
  },
];

export default function SolutionSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, amount: 0.3 });

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const toggleFlip = (i: number) => setFlippedCards(prev => ({ ...prev, [i]: !prev[i] }));

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

      {/* Breathe border */}
      <div className="absolute inset-4 rounded-3xl border border-emerald-400/[0.12] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-28 edge-glow-top opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 edge-glow-bottom opacity-45 pointer-events-none" />

      {/* Animated background depth */}
      <motion.div style={{ opacity: bgGlow }} className="absolute inset-0 pointer-events-none">
        <div className="depth-glow w-[500px] h-[400px] top-[30%] left-[10%] bg-brand-600/4 animate-depth-glow-1" />
        <div className="depth-glow w-[400px] h-[300px] top-[40%] right-[15%] bg-cyan-600/3 animate-depth-glow-2" style={{ animationDelay: '2s' }} />
        {/* Plasma blob */}
        <div className="absolute w-[280px] h-[200px] top-[55%] left-[25%] bg-emerald-500/[0.07] blur-[45px] animate-plasma" style={{ animationDelay: '3s' }} />
        {/* Shimmer */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-cyan-500/[0.02] blur-[50px] animate-grid-shimmer" style={{ top: '25%', left: '40%' }} />
      </motion.div>

      {/* Floating rings + orbit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[8%] w-16 h-16 rounded-full border border-cyan-500/[0.15] animate-ring-float" />
        <div className="absolute bottom-[25%] right-[12%] w-20 h-20 rounded-full border border-brand-500/[0.12] animate-ring-float" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[50%] left-[55%] w-14 h-14 rounded-full border border-emerald-500/[0.10] animate-ring-float" style={{ animationDelay: '4s' }} />
        {/* Orbiting dot */}
        <div className="absolute top-[45%] left-[15%]">
          <div className="w-2 h-2 rounded-full bg-emerald-400/55 animate-orbit" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.5)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[45%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '11s', animationDelay: '1s' }} />
      <div className="absolute top-[75%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '13s', animationDelay: '5s' }} />

      {/* Data streams */}
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '30%', background: 'linear-gradient(180deg, transparent, rgba(52,211,153,0.22), transparent)', animationDelay: '1s', animationDuration: '6s' }} />
      <div className="absolute w-[2px] h-28 animate-data-stream pointer-events-none" style={{ left: '70%', background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.18), transparent)', animationDelay: '4s', animationDuration: '7.5s' }} />

      {/* Signal beacon */}
      <div className="absolute left-[85%] top-[30%] w-2 h-2 rounded-full border border-emerald-400/35 animate-signal pointer-events-none" />

      {/* Floating hex */}
      <div className="absolute top-[10%] right-[5%] w-10 h-10 border border-cyan-500/[0.14] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[12%] left-[12%] w-8 h-8 border border-emerald-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '12%', top: '20%', width: 2, height: 2, animationDuration: '8s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '78%', top: '30%', width: 3, height: 3, animationDuration: '7s', animationDelay: '1.2s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '45%', top: '75%', width: 2, height: 2, animationDuration: '9s', animationDelay: '2.5s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '90%', top: '55%', width: 2, height: 2, animationDuration: '6.5s', animationDelay: '0.8s' }} />
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
            Giải pháp & Công cụ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            AI giải quyết ở đâu?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mỗi điểm nghẽn trong quy trình đều có công cụ AI phù hợp —
            ấn vào thẻ để xem chi tiết công cụ.
          </p>
        </motion.div>

        {/* Solution + Tool flip cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.toolName}
              custom={i}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative"
            >
              <div
                className="relative cursor-pointer h-[480px] sm:h-[500px]"
                style={{ perspective: '1200px' }}
                onClick={() => toggleFlip(i)}
              >
                <motion.div
                  animate={{ rotateY: flippedCards[i] ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative h-full"
                >
                  {/* === FRONT — Giải pháp === */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className={`absolute inset-0 p-8 rounded-2xl border ${card.borderColor} bg-gray-950/80 transition-all duration-500 glass-depth overflow-y-auto scrollbar-thin`}
                  >
                    <div className={`absolute -inset-px rounded-2xl ${card.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`} />

                    <div className="mb-5">
                      <p className="text-sm text-red-400/70 mb-1.5 line-through decoration-red-500/30">{card.problem}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <ArrowRight className="w-4 h-4 text-emerald-400/60 flex-shrink-0" />
                        <p className={`text-[15px] font-medium leading-snug ${card.accentColor}`}>{card.solution}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.toolColor} flex items-center justify-center shadow-lg shadow-black/20`}>
                        <card.toolIcon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">{card.toolName}</span>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] space-y-3">
                      {card.benchmarks.map((b, j) => (
                        <div key={j} className="rounded-lg bg-white/[0.03] px-4 py-3">
                          <p className="text-xs text-gray-400 font-medium mb-2">{b.scope}</p>
                          <div className="flex items-center gap-2.5 text-[13px] font-mono">
                            <span className="text-red-400/80">{b.before}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                            <span className="text-emerald-400 font-semibold">{b.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 px-1">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        <span className="text-gray-300 font-medium">Chính xác:</span> {card.accuracy}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.04] space-y-2">
                      <div className="flex items-start gap-2">
                        <UserCheck className="w-4 h-4 text-brand-400/60 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400 italic">BA review & chỉnh sửa trước khi sử dụng</p>
                      </div>
                      <p className="text-[11px] text-gray-600 italic pl-6">* {card.note}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-1.5 text-gray-500 text-xs">
                      <RotateCcw className="w-3 h-3" />
                      <span>Ấn để xem công cụ</span>
                    </div>
                  </div>

                  {/* === BACK — Công cụ === */}
                  <div
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    className={`absolute inset-0 p-8 rounded-2xl border ${card.borderColor} bg-gray-950/80 transition-all duration-500 glass-depth overflow-y-auto scrollbar-thin`}
                  >
                    <div className={`absolute -inset-px rounded-2xl ${card.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`} />

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.toolColor} flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0`}>
                        <card.toolIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white">{card.toolName}</h3>
                        <p className="text-gray-500 text-sm">{card.toolTagline}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.toolBadges.map((b) => (
                        <span key={b.label} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${b.color}`}>{b.label}</span>
                      ))}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.toolDescription}</p>

                    <div className="space-y-2.5 mb-4">
                      {card.toolFeatures.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <f.icon className="w-3.5 h-3.5 mt-0.5 text-emerald-400/70 flex-shrink-0" />
                          <span>{f.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                      <p className="text-xs text-gray-500 font-medium mb-2">Hạn chế:</p>
                      {card.toolLimits.map((l, li) => (
                        <p key={li} className="text-sm text-gray-500 flex items-start gap-2.5">
                          <span className="text-red-400/50 mt-0.5 flex-shrink-0 text-xs">⚠</span>
                          {l}
                        </p>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-1.5 text-gray-500 text-xs">
                      <RotateCcw className="w-3 h-3" />
                      <span>Ấn để xem giải pháp</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated flow diagram */}
        <div ref={flowRef} className="mt-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={flowInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center text-sm text-gray-500 font-medium tracking-[0.2em] uppercase mb-10"
          >
            Quy trình AI hỗ trợ BA
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={flowInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-red-500/30 via-brand-500/30 via-amber-500/30 to-emerald-500/30 origin-left"
              />
            </div>

            {flowSteps.map((fs, i) => (
              <motion.div
                key={fs.step}
                initial={{ opacity: 0, y: 30 }}
                animate={flowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step icon */}
                <div className={`w-24 h-24 rounded-2xl ${fs.bgColor} border ${fs.borderColor} flex items-center justify-center mb-4 relative z-10`}>
                  <fs.icon className={`w-8 h-8 ${fs.color}`} />
                </div>

                {/* Arrow between steps — desktop */}
                {i < flowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={flowInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.25 }}
                    className="hidden lg:block absolute top-10 -right-2 z-20"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </motion.div>
                )}

                <p className={`text-sm font-semibold mb-3 ${fs.color}`}>{fs.step}</p>
                <ul className="space-y-1.5">
                  {fs.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={flowInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.2 + j * 0.08 }}
                      className="flex items-center gap-2 justify-center"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${fs.dotColor} flex-shrink-0`} />
                      <span className="text-xs text-gray-400">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* General limitation banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-6 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-300 mb-1.5">Hạn chế chung</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Tất cả công cụ hiện đang được cài đặt trên <span className="text-amber-300/80">máy tính cá nhân</span>,
                không phải máy tính công ty. Hiệu năng phụ thuộc vào cấu hình phần cứng (GPU, RAM)
                và tốc độ mạng wifi. Đây là giai đoạn thử nghiệm — cần đánh giá thêm trước khi triển khai chính thức.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
