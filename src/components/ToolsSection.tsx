import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Mic,
  Bot,
  LayoutDashboard,
  MessageCircle,
  Shield,
  DollarSign,
  Cpu,
  Zap,
  ChevronDown,
} from "lucide-react";

const tools = [
  {
    id: "whisper",
    icon: Mic,
    name: "Whisper (OpenAI)",
    tagline: "Speech-to-Text — Ghi âm cuộc họp tự động",
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/10",
    glowColor: "bg-cyan-500/8",
    description:
      "Mô hình AI của OpenAI chuyên chuyển giọng nói thành văn bản. Chạy hoàn toàn trên máy local (self-host), không cần gửi dữ liệu ra ngoài.",
    features: [
      { icon: Shield, text: "Chạy local, bảo mật tuyệt đối — dữ liệu không ra khỏi máy" },
      { icon: Mic, text: "Hỗ trợ tiếng Việt, ghi âm realtime trong cuộc họp" },
      { icon: Zap, text: "Tích hợp Agent phân tích transcript → meeting notes, action items" },
    ],
    limits: [
      "Phụ thuộc vào cấu hình GPU máy tính (RAM, VRAM)",
      "Độ chính xác giảm với môi trường ồn hoặc nhiều giọng nói",
      "Chạy trên máy cá nhân, không phải máy công ty",
    ],
    badges: [
      { label: "Miễn phí", color: "text-emerald-400 bg-emerald-500/10" },
      { label: "Local", color: "text-cyan-400 bg-cyan-500/10" },
    ],
  },
  {
    id: "agent",
    icon: Bot,
    name: "Agent + Skills (VS Code)",
    tagline: "BA Assistant — Phân tích, sinh tài liệu trong VS Code",
    color: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500/10",
    glowColor: "bg-violet-500/8",
    description:
      "Agent được cấu hình sẵn với vai trò BA chuyên nghiệp trong GitHub Copilot. Có nhiều skill chuyên biệt: phân tích CRUD, sinh SRS, UI spec, data model.",
    features: [
      { icon: Bot, text: "Đọc source code + tài liệu → tự sinh SRS, TKCT, CSDL theo template" },
      { icon: Shield, text: "Chạy trong VS Code, bảo mật tốt — code không rời máy" },
      { icon: Zap, text: "Nhiều skill: CRUD analysis, UI spec, diagram, doc-generator" },
    ],
    limits: [
      "Setup ban đầu phức tạp (cấu hình Agent, Skills, template)",
      "Cần trả phí GitHub Copilot subscription (~$10-19/tháng)",
      "Cần viết prompt tốt để có output chất lượng",
    ],
    badges: [
      { label: "Trả phí", color: "text-amber-400 bg-amber-500/10" },
      { label: "Bảo mật", color: "text-emerald-400 bg-emerald-500/10" },
    ],
  },
  {
    id: "lovable",
    icon: LayoutDashboard,
    name: "Lovable",
    tagline: "Generate UI — Tạo prototype UI từ mô tả",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/10",
    glowColor: "bg-emerald-500/8",
    description:
      "Mô tả giao diện bằng lời → AI tự sinh code React hoàn chỉnh. Tự động deploy lên domain tạm để demo với stakeholder.",
    features: [
      { icon: Zap, text: "Mô tả bằng tiếng Việt → sinh UI React ngay lập tức" },
      { icon: LayoutDashboard, text: "Auto-deploy, sync GitHub — chỉnh sửa code trên VS Code" },
      { icon: DollarSign, text: "Phù hợp cho BA tạo prototype nhanh, không cần Dev" },
    ],
    limits: [
      "Chi phí subscription (~$20/tháng)",
      "Dữ liệu gửi lên cloud — cần cân nhắc bảo mật thông tin",
      "UI phức tạp vẫn cần chỉnh sửa thủ công",
    ],
    badges: [
      { label: "Trả phí", color: "text-amber-400 bg-amber-500/10" },
      { label: "Cloud", color: "text-blue-400 bg-blue-500/10" },
    ],
  },
  {
    id: "openclaw",
    icon: MessageCircle,
    name: "OpenClaw + Telegram + 9Router",
    tagline: "AI Agent qua Telegram — Trợ lý mọi lúc mọi nơi",
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/10",
    glowColor: "bg-amber-500/8",
    description:
      "Hệ thống AI agent mã nguồn mở, self-host trên máy cá nhân. Kết nối Telegram Bot để chat từ điện thoại — tra cứu workspace, sửa code, thậm chí commit.",
    features: [
      { icon: MessageCircle, text: "Chat qua Telegram — tra cứu thông tin workspace nhanh chóng" },
      { icon: Cpu, text: "Rất mạnh: tìm file, đọc code, sửa code, commit từ xa" },
      { icon: DollarSign, text: "Chi phí thấp — chỉ trả API cost (~vài USD/tháng)" },
    ],
    limits: [
      "Setup rất phức tạp (OpenClaw + 9Router + Telegram Bot + MCP)",
      "Cần kiến thức kỹ thuật để cài đặt và bảo trì",
      "Phụ thuộc vào wifi và cấu hình máy (chạy local server)",
    ],
    badges: [
      { label: "Chi phí thấp", color: "text-emerald-400 bg-emerald-500/10" },
      { label: "Self-host", color: "text-cyan-400 bg-cyan-500/10" },
      { label: "Rất mạnh", color: "text-amber-400 bg-amber-500/10" },
    ],
  },
];

function ToolCard({ tool }: { tool: (typeof tools)[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="group relative">
      <div
        className={`relative p-7 rounded-2xl border ${tool.borderColor} bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-700 h-full`}
      >
        {/* Glow */}
        <div
          className={`absolute -inset-px rounded-2xl ${tool.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`}
        />

        {/* Header: Icon + Name */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0`}
          >
            <tool.icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
            <p className="text-gray-500 text-sm">{tool.tagline}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.badges.map((b) => (
            <span key={b.label} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${b.color}`}>
              {b.label}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{tool.description}</p>

        {/* Features */}
        <div className="space-y-2.5 mb-4">
          {tool.features.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
              <f.icon className="w-3.5 h-3.5 mt-0.5 text-emerald-400/70 flex-shrink-0" />
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors mt-2"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
          {isExpanded ? "Ẩn hạn chế" : "Xem hạn chế"}
        </button>

        {/* Expandable limits */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-4 mt-4 border-t border-white/[0.06]">
                {tool.limits.map((l, i) => (
                  <p key={i} className="text-sm text-gray-500 flex items-start gap-2.5">
                    <span className="text-red-400/50 mt-0.5 flex-shrink-0 text-xs">⚠</span>
                    {l}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ToolsSection() {
  const { ref: headerRef, isInView } = useScrollReveal();

  return (
    <section className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-35 pointer-events-none" />

      {/* Edge glow */}
      <div className="absolute top-0 left-0 right-0 h-28 edge-glow-top opacity-40 pointer-events-none" />

      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="depth-glow w-[600px] h-[450px] top-[20%] left-1/2 -translate-x-1/2 bg-brand-600/3"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="depth-glow w-[350px] h-[250px] top-[50%] left-[10%] bg-emerald-600/3"
        />
        {/* Extra depth glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="depth-glow w-[300px] h-[300px] top-[35%] right-[8%] bg-violet-600/3"
        />
        {/* Shimmer */}
        <div className="absolute w-[320px] h-[320px] rounded-full bg-emerald-500/[0.02] blur-[60px] animate-grid-shimmer" style={{ top: '30%', left: '25%' }} />
      </div>

      {/* Floating rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-24 h-24 rounded-full border border-emerald-500/[0.06] animate-ring-float" />
        <div className="absolute top-[55%] left-[6%] w-14 h-14 rounded-full border border-brand-500/[0.05] animate-ring-float" style={{ animationDelay: '3.5s' }} />
        <div className="absolute bottom-[15%] right-[25%] w-10 h-10 rounded-full border border-violet-500/[0.04] animate-ring-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '12s', animationDelay: '5s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "12%", y: "22%", s: 2, d: 0, dur: 7 },
          { x: "88%", y: "18%", s: 3, d: 1, dur: 8.5 },
          { x: "25%", y: "78%", s: 2, d: 2, dur: 9 },
          { x: "75%", y: "65%", s: 2, d: 0.5, dur: 6 },
          { x: "50%", y: "42%", s: 2, d: 1.5, dur: 7.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/20"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-10, 10, -10], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Công cụ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            Bộ công cụ AI cho BA
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mỗi công cụ phục vụ một phần trong quy trình —
            kết hợp lại tạo thành hệ thống trợ lý AI toàn diện cho BA.
          </p>
        </motion.div>

        {/* Tool cards — 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* General limitation banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-6 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-300 mb-1.5">
                Hạn chế chung
              </h4>
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
