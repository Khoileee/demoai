import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Neural network nodes — positioned around center
const neuralNodes = [
  { x: 50, y: 50, size: 8, color: "60,165,250", pulse: true },  // center core
  { x: 30, y: 28, size: 5, color: "34,211,238", pulse: false },
  { x: 70, y: 25, size: 4, color: "139,92,246", pulse: false },
  { x: 20, y: 55, size: 4, color: "96,165,250", pulse: false },
  { x: 80, y: 52, size: 5, color: "167,139,250", pulse: false },
  { x: 35, y: 75, size: 4, color: "34,211,238", pulse: false },
  { x: 65, y: 78, size: 5, color: "59,130,246", pulse: false },
  { x: 15, y: 35, size: 3, color: "52,211,153", pulse: false },
  { x: 85, y: 38, size: 3, color: "251,191,36", pulse: false },
  { x: 50, y: 20, size: 4, color: "139,92,246", pulse: false },
  { x: 50, y: 82, size: 4, color: "34,211,238", pulse: false },
  { x: 10, y: 70, size: 3, color: "96,165,250", pulse: false },
  { x: 90, y: 68, size: 3, color: "167,139,250", pulse: false },
];

// Neural connections between nodes
const neuralConnections = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
  { from: 0, to: 5 }, { from: 0, to: 6 }, { from: 0, to: 9 }, { from: 0, to: 10 },
  { from: 1, to: 7 }, { from: 1, to: 9 }, { from: 2, to: 8 }, { from: 2, to: 9 },
  { from: 3, to: 7 }, { from: 3, to: 11 }, { from: 4, to: 8 }, { from: 4, to: 12 },
  { from: 5, to: 11 }, { from: 5, to: 10 }, { from: 6, to: 12 }, { from: 6, to: 10 },
];

// Data streams — vertical falling streams
const dataStreams = [
  { x: "15%", delay: 0, dur: 4, height: 120 },
  { x: "30%", delay: 1.5, dur: 3.5, height: 100 },
  { x: "45%", delay: 0.8, dur: 4.5, height: 140 },
  { x: "60%", delay: 2.2, dur: 3.8, height: 110 },
  { x: "75%", delay: 0.3, dur: 4.2, height: 130 },
  { x: "88%", delay: 1.8, dur: 3.2, height: 90 },
  { x: "8%", delay: 3, dur: 4, height: 100 },
  { x: "52%", delay: 2.8, dur: 3.6, height: 120 },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] overflow-hidden">
      {/* === BACKGROUND === */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-gray-950 to-[#030712]" />
        <div className="absolute inset-0 hex-grid opacity-30" />
      </div>

      {/* === MID LAYER: Futuristic AI visualization === */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* Aurora ribbons */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 10, -5, 8, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[900px] h-[500px] aurora-ribbon opacity-40"
          />
          <motion.div
            animate={{
              rotate: [0, -8, 6, -4, 0],
              scale: [1, 0.95, 1.08, 0.98, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute w-[700px] h-[400px] aurora-ribbon-alt opacity-30"
          />
        </div>

        {/* === NEURAL NETWORK VISUALIZATION === */}
        <div className="absolute inset-0">
          {/* SVG connections between nodes */}
          <svg className="absolute inset-0 w-full h-full">
            {neuralConnections.map((conn, i) => {
              const from = neuralNodes[conn.from];
              const to = neuralNodes[conn.to];
              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="rgba(96,165,250,0.08)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.5, 0.15] }}
                  transition={{
                    pathLength: { duration: 2, delay: i * 0.12, ease: "easeOut" },
                    opacity: { duration: 4, delay: i * 0.12, repeat: Infinity, repeatType: "reverse" },
                  }}
                />
              );
            })}

            {/* Traveling data pulses along connections */}
            {neuralConnections.slice(0, 8).map((conn, i) => {
              const from = neuralNodes[conn.from];
              const to = neuralNodes[conn.to];
              return (
                <motion.circle
                  key={`pulse-${i}`}
                  r="2"
                  fill="rgba(96,165,250,0.6)"
                  filter="url(#glow)"
                  initial={{ cx: `${from.x}%`, cy: `${from.y}%` }}
                  animate={{
                    cx: [`${from.x}%`, `${to.x}%`],
                    cy: [`${from.y}%`, `${to.y}%`],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 1.2,
                    repeat: Infinity,
                    repeatDelay: 5 + i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* SVG filter for glow effect */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Neural nodes */}
          {neuralNodes.map((node, i) => (
            <div key={`node-${i}`} className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%,-50%)" }}>
              {/* Pulse ring for important nodes */}
              {node.pulse && (
                <>
                  <motion.div
                    animate={{ scale: [1, 3.5], opacity: [0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{ width: node.size * 2, height: node.size * 2, marginLeft: -node.size / 2, marginTop: -node.size / 2, border: `1px solid rgba(${node.color},0.3)` }}
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    className="absolute inset-0 rounded-full"
                    style={{ width: node.size * 2, height: node.size * 2, marginLeft: -node.size / 2, marginTop: -node.size / 2, border: `1px solid rgba(${node.color},0.2)` }}
                  />
                </>
              )}
              {/* Node dot */}
              <motion.div
                animate={{ scale: node.pulse ? [1, 1.3, 1] : [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: node.pulse ? 2 : 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className="rounded-full"
                style={{
                  width: node.size,
                  height: node.size,
                  background: `rgba(${node.color}, 0.8)`,
                  boxShadow: `0 0 ${node.size * 2}px rgba(${node.color}, 0.5), 0 0 ${node.size * 5}px rgba(${node.color}, 0.2)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* === PULSING WAVE RINGS from center === */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1.5, 3, 4.5].map((delay, i) => (
            <motion.div
              key={`wave-${i}`}
              animate={{ scale: [0.3, 2.5], opacity: [0.25, 0] }}
              transition={{ duration: 5, delay, repeat: Infinity, ease: "easeOut" }}
              className="absolute rounded-full border"
              style={{
                width: 300,
                height: 300,
                borderColor: i % 2 === 0 ? "rgba(59,130,246,0.12)" : "rgba(34,211,238,0.08)",
              }}
            />
          ))}
        </div>

        {/* === HOLOGRAPHIC CORE === */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Morphing inner blob */}
          <motion.div
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "50% 50% 30% 70% / 60% 40% 60% 40%",
                "70% 30% 50% 50% / 40% 60% 40% 60%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
              scale: [1, 1.05, 0.98, 1],
              rotate: [0, 5, -3, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-[350px] h-[350px] hero-blob"
          />
          {/* Core glow */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-brand-400/50 to-cyan-400/40 blur-lg"
          />
          <motion.div
            animate={{ scale: [1, 0.85, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute w-6 h-6 rounded-full bg-white/30 blur-sm"
          />
        </div>

        {/* === DATA RAIN STREAMS === */}
        {dataStreams.map((stream, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px"
            style={{
              left: stream.x,
              height: stream.height,
              background: `linear-gradient(180deg, transparent, rgba(59,130,246,0.15) 30%, rgba(34,211,238,0.1) 70%, transparent)`,
            }}
            animate={{ top: ["-15%", "115%"] }}
            transition={{
              duration: stream.dur,
              delay: stream.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* === SCANNING BEAM === */}
        <motion.div
          animate={{ top: ["-5%", "105%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.15) 20%, rgba(34,211,238,0.25) 50%, rgba(59,130,246,0.15) 80%, transparent 100%)",
            boxShadow: "0 0 20px rgba(59,130,246,0.1), 0 0 60px rgba(34,211,238,0.05)",
          }}
        />
      </motion.div>

      {/* === FOREGROUND: Text === */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-[2]">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-brand-400 text-sm font-medium tracking-[0.25em] uppercase mb-6"
          >
            Chuyển đổi quy trình làm việc
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            <span className="text-white">Ứng dụng </span>
            <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-brand-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              AI
            </span>
            <br />
            <span className="text-white">trong công việc của </span>
            <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-brand-400 bg-clip-text text-transparent">
              BA
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Meeting → Requirement → Documentation & Prototype
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
