import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mic, Bot, LayoutDashboard, MessageCircle } from "lucide-react";

const tools = [
  {
    id: "whisper",
    icon: Mic,
    name: "Whisper",
    tagline: "Speech-to-Text",
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/10",
    glowColor: "bg-cyan-500/8",
    details: [
      "Mô hình AI của OpenAI chuyên chuyển giọng nói → văn bản",
      "Hỗ trợ tiếng Việt với độ chính xác cao",
      "Chạy offline trên máy cá nhân (self-host)",
      "Tích hợp ghi âm realtime trong cuộc họp",
    ],
    limits: ["Độ chính xác chưa cao với ngữ cảnh phức tạp", "Phụ thuộc vào GPU"],
  },
  {
    id: "agent",
    icon: Bot,
    name: "Agent + Skills",
    tagline: "BA Assistant trong VS Code",
    color: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500/10",
    glowColor: "bg-violet-500/8",
    details: [
      "Agent được cấu hình sẵn với vai trò BA chuyên nghiệp",
      "Nhiều skill: phân tích CRUD, sinh SRS, thiết kế UI spec",
      "Đọc source code + tài liệu → output chuẩn template",
      "Chạy ngay trong VS Code với GitHub Copilot",
    ],
    limits: ["Chi phí cao nếu viết prompt không tối ưu"],
  },
  {
    id: "lovable",
    icon: LayoutDashboard,
    name: "Lovable",
    tagline: "Generate UI Prototype",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/10",
    glowColor: "bg-emerald-500/8",
    details: [
      "Mô tả giao diện bằng lời → sinh code React hoàn chỉnh",
      "Tự động deploy lên domain tạm để demo",
      "Sync code lên GitHub, chỉnh sửa trên VS Code",
      "Phù hợp cho BA tạo prototype nhanh không cần dev",
    ],
    limits: ["Bảo mật thông tin", "Chi phí subscription"],
  },
  {
    id: "openclaw",
    icon: MessageCircle,
    name: "OpenClaw",
    tagline: "AI qua Telegram",
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/10",
    glowColor: "bg-amber-500/8",
    details: [
      "Nền tảng AI agent mã nguồn mở, self-host",
      "Kết nối Telegram Bot — chat từ điện thoại",
      "Tra cứu tài liệu, hỏi đáp nghiệp vụ",
      "Hỗ trợ sửa code nhẹ và commit từ xa",
    ],
    limits: ["Setup phức tạp ban đầu", "Cần bảo mật token"],
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
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group relative"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`relative p-6 rounded-2xl border ${tool.borderColor} bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-700 cursor-pointer h-full`}
      >
        {/* Glow */}
        <div
          className={`absolute -inset-px rounded-2xl ${tool.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10`}
        />

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg shadow-black/20 mb-5`}
        >
          <tool.icon className="w-5 h-5 text-white" />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-white mb-1">{tool.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{tool.tagline}</p>

        {/* Expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 mb-3">
                {tool.details.map((d, i) => (
                  <p key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-emerald-400/70 mt-0.5 flex-shrink-0 text-xs">+</span>
                    {d}
                  </p>
                ))}
              </div>
              {tool.limits.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  {tool.limits.map((l, i) => (
                    <p key={i} className="text-sm text-gray-500 flex items-start gap-2">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0 text-xs">–</span>
                      {l}
                    </p>
                  ))}
                </div>
              )}
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
    <section className="relative py-40 sm:py-52 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

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
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "12%", y: "22%", s: 2, d: 0, dur: 7 },
          { x: "88%", y: "18%", s: 3, d: 1, dur: 8.5 },
          { x: "25%", y: "78%", s: 2, d: 2, dur: 9 },
          { x: "75%", y: "65%", s: 2, d: 0.5, dur: 6 },
          { x: "50%", y: "88%", s: 3, d: 3, dur: 7.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/20"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [-10, 10, -10], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}
        <motion.div
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          className="absolute top-[40%] left-0 w-[220px] h-px bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Công cụ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-tight">
            Bộ công cụ AI cho BA
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mỗi công cụ đảm nhận một phần trong quy trình — kết hợp lại tạo thành hệ thống hoàn chỉnh.
          </p>
        </motion.div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
