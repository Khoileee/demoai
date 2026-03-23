import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MessageCircle, Bot, Code2, GitCommit } from "lucide-react";

const flowSteps = [
  { icon: MessageCircle, label: "Yêu cầu", color: "from-cyan-500 to-blue-500" },
  { icon: Bot, label: "Agent", color: "from-brand-500 to-violet-500" },
  { icon: Code2, label: "Phân tích", color: "from-emerald-500 to-teal-500" },
  { icon: GitCommit, label: "Output", color: "from-amber-500 to-orange-500" },
];

const terminalLines = [
  { type: "prompt", text: "@doc Sinh tài liệu SRS cho module Quản lý hợp đồng" },
  { type: "ai", text: "Đang đọc source code và requirement..." },
  { type: "ai", text: "Tìm thấy: 12 components, 8 API endpoints, 5 DB tables" },
  { type: "ai", text: "Phân tích CRUD operations, validation rules..." },
  { type: "code", text: "+ Sinh phần 3.1: Mô tả chức năng (CRUD matrix)" },
  { type: "code", text: "+ Sinh phần 3.2: UI Specification (5 màn hình)" },
  { type: "code", text: "+ Sinh phần 4: Data Model (ERD + Data Dictionary)" },
  { type: "success", text: "✓ SRS_QuanLyHopDong.md — 2,450 dòng" },
];

function useTypingEffect(lines: typeof terminalLines, shouldStart: boolean) {
  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar < line.text.length) {
      const timer = setTimeout(
        () => setCurrentChar((c) => c + 1),
        line.type === "code" ? 15 : 25
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [shouldStart, currentLine, currentChar, lines]);

  const typingText =
    currentLine < lines.length
      ? lines[currentLine].text.slice(0, currentChar)
      : "";
  const typingType =
    currentLine < lines.length ? lines[currentLine].type : "prompt";

  return { visibleLines, typingText, typingType, isDone: currentLine >= lines.length };
}

function TerminalLine({ line }: { line: (typeof terminalLines)[0] }) {
  const colorMap: Record<string, string> = {
    prompt: "text-gray-300",
    ai: "text-brand-400",
    code: "text-emerald-400",
    success: "text-green-400",
    commit: "text-cyan-400",
  };

  const prefixMap: Record<string, string> = {
    prompt: "❯ ",
    ai: "  ◆ ",
    code: "  ",
    success: "  ",
    commit: "  $ ",
  };

  return (
    <div className={`${colorMap[line.type]} terminal-text text-[13px] leading-6`}>
      <span className="text-gray-600">{prefixMap[line.type]}</span>
      {line.text}
    </div>
  );
}

export default function OrchestrationSection() {
  const sectionRef = useRef(null);
  const { ref: headerRef, isInView: headerVisible } = useScrollReveal();
  const { ref: termRef, isInView: termVisible } = useScrollReveal({
    margin: "-50px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgGlowOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const { visibleLines, typingText, typingType, isDone } = useTypingEffect(
    terminalLines,
    termVisible
  );

  const colorMap: Record<string, string> = {
    prompt: "text-gray-300",
    ai: "text-brand-400",
    code: "text-emerald-400",
    success: "text-green-400",
    commit: "text-cyan-400",
  };

  const prefixMap: Record<string, string> = {
    prompt: "❯ ",
    ai: "  ◆ ",
    code: "  ",
    success: "  ",
    commit: "  $ ",
  };

  return (
    <section ref={sectionRef} className="relative h-screen px-4 sm:px-6 overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-35 pointer-events-none" />

      {/* Breathe border */}
      <div className="absolute inset-4 rounded-3xl border border-amber-400/[0.12] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-28 edge-glow-top opacity-55 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.07) 0%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 edge-glow-bottom opacity-40 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(249,115,22,0.05) 0%, transparent 100%)' }} />

      {/* Animated background glow — amber/orange theme, desktop only */}
      <motion.div
        style={{ opacity: bgGlowOpacity }}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        <div className="depth-glow w-[600px] h-[400px] top-[20%] left-1/2 -translate-x-1/2 bg-amber-600/5 animate-depth-glow-1" />
        <div className="depth-glow w-[400px] h-[300px] top-[40%] right-[10%] bg-orange-600/4 animate-depth-glow-2" style={{ animationDelay: '3s' }} />
        {/* Plasma blob */}
        <div className="absolute w-[300px] h-[200px] top-[35%] left-[30%] bg-amber-500/[0.07] blur-[45px] animate-plasma" style={{ animationDelay: '4s' }} />
        {/* Shimmer */}
        <div className="absolute w-[250px] h-[250px] rounded-full bg-amber-500/[0.025] blur-[50px] animate-grid-shimmer" style={{ top: '30%', left: '45%' }} />
      </motion.div>

      {/* Floating rings + orbit — desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-[22%] left-[15%] w-16 h-16 rounded-full border border-amber-500/[0.14] animate-ring-float" />
        <div className="absolute bottom-[18%] right-[10%] w-12 h-12 rounded-full border border-orange-500/[0.12] animate-ring-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[55%] left-[50%] w-20 h-20 rounded-full border border-amber-400/[0.10] animate-ring-float" style={{ animationDelay: '3.5s' }} />
        {/* Orbiting dot */}
        <div className="absolute top-[40%] left-[52%]">
          <div className="w-2 h-2 rounded-full bg-amber-400/55 animate-orbit" style={{ boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '10s', animationDelay: '3s' }} />
      <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '12s', animationDelay: '7s' }} />

      {/* Data streams */}
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '12%', background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.22), transparent)', animationDelay: '1s', animationDuration: '5.5s' }} />
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '88%', background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.18), transparent)', animationDelay: '4s', animationDuration: '7s' }} />

      {/* Signal beacon */}
      <div className="absolute left-[70%] top-[25%] w-2 h-2 rounded-full border border-amber-400/35 animate-signal pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Floating hex */}
      <div className="absolute top-[12%] right-[6%] w-10 h-10 border border-amber-500/[0.14] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[15%] left-[8%] w-8 h-8 border border-orange-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Floating particles — amber theme, desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute rounded-full bg-amber-400/20 animate-float-particle" style={{ left: '15%', top: '20%', width: 2, height: 2, animationDuration: '8s' }} />
        <div className="absolute rounded-full bg-amber-400/20 animate-float-particle" style={{ left: '80%', top: '15%', width: 3, height: 3, animationDuration: '7s', animationDelay: '1.5s' }} />
        <div className="absolute rounded-full bg-amber-400/20 animate-float-particle" style={{ left: '35%', top: '80%', width: 2, height: 2, animationDuration: '9s', animationDelay: '0.8s' }} />
        <div className="absolute rounded-full bg-amber-400/20 animate-float-particle" style={{ left: '70%', top: '70%', width: 2, height: 2, animationDuration: '6.5s', animationDelay: '2.2s' }} />
        <div className="absolute rounded-full bg-amber-400/20 animate-float-particle" style={{ left: '50%', top: '45%', width: 2, height: 2, animationDuration: '7.5s', animationDelay: '1s' }} />
        <div className="absolute rounded-full bg-amber-400/20 animate-float-particle" style={{ left: '25%', top: '55%', width: 3, height: 3, animationDuration: '8.5s', animationDelay: '3s' }} />
        <div className="absolute top-[25%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-sweep-travel" />
        <div className="absolute top-[75%] left-0 w-[160px] h-px bg-gradient-to-r from-transparent via-orange-400/8 to-transparent animate-sweep-travel-reverse" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 sm:mb-8"
        >
          <p className="text-amber-400 text-sm font-medium tracking-[0.25em] uppercase mb-3">
            Demo thực tế
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-3 leading-tight">
            Agent đang làm việc thật
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Agent đọc source code, phân tích nghiệp vụ, và sinh tài liệu SRS hoàn chỉnh
            — chỉ với một câu lệnh trong VS Code.
          </p>
        </motion.div>

        {/* Flow icons: Chat → AI → Code → Commit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-10"
        >
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 sm:gap-6">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-black/30`}
                >
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {step.label}
                </span>
              </div>
              {i < flowSteps.length - 1 && (
                <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-gray-700 to-gray-700/50 mb-6" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Terminal window */}
        <div ref={termRef}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={termVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Terminal chrome */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] overflow-hidden shadow-2xl shadow-black/50">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#161B22]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 text-xs text-gray-500 terminal-text">
                  VS Code — BA Agent + Skills
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 sm:p-6 min-h-[280px]">
                {visibleLines.map((line, i) => (
                  <TerminalLine key={i} line={line} />
                ))}

                {/* Currently typing line */}
                {!isDone && typingText && (
                  <div
                    className={`${colorMap[typingType]} terminal-text text-[13px] leading-6`}
                  >
                    <span className="text-gray-600">
                      {prefixMap[typingType]}
                    </span>
                    {typingText}
                    <span className="typing-cursor" />
                  </div>
                )}

                {/* Blinking cursor when idle */}
                {isDone && (
                  <div className="terminal-text text-[13px] leading-6 text-gray-300">
                    <span className="text-gray-600">❯ </span>
                    <span className="typing-cursor" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
