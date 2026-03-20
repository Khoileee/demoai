import { motion } from "framer-motion";

/**
 * Fixed background layer – futuristic AI theme.
 * Neural constellation, scanning beams, traveling orbs, data rain.
 */

// Constellation nodes — fixed positions scattered across viewport
const constellationNodes = [
  { x: 8, y: 12, size: 3, color: "96,165,250" },
  { x: 22, y: 28, size: 2, color: "34,211,238" },
  { x: 35, y: 8, size: 2, color: "139,92,246" },
  { x: 48, y: 35, size: 3, color: "59,130,246" },
  { x: 62, y: 15, size: 2, color: "167,139,250" },
  { x: 75, y: 30, size: 2, color: "34,211,238" },
  { x: 88, y: 18, size: 3, color: "96,165,250" },
  { x: 15, y: 52, size: 2, color: "52,211,153" },
  { x: 30, y: 60, size: 3, color: "59,130,246" },
  { x: 50, y: 55, size: 2, color: "139,92,246" },
  { x: 68, y: 48, size: 2, color: "251,191,36" },
  { x: 82, y: 58, size: 3, color: "34,211,238" },
  { x: 92, y: 42, size: 2, color: "96,165,250" },
  { x: 12, y: 75, size: 2, color: "167,139,250" },
  { x: 28, y: 85, size: 3, color: "34,211,238" },
  { x: 42, y: 78, size: 2, color: "59,130,246" },
  { x: 58, y: 88, size: 2, color: "52,211,153" },
  { x: 72, y: 72, size: 3, color: "139,92,246" },
  { x: 85, y: 82, size: 2, color: "96,165,250" },
  { x: 95, y: 70, size: 2, color: "251,191,36" },
];

// Connections between constellation nodes
const constellationEdges = [
  [0, 1], [1, 3], [2, 4], [3, 4], [4, 5], [5, 6],
  [0, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [7, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19],
  [1, 8], [3, 9], [5, 11], [8, 15], [10, 17], [12, 19],
  [2, 3], [6, 12], [14, 8], [9, 16],
];

// Traveling orbs
const travelingOrbs = [
  { startX: "-5%", startY: "10%", endX: "105%", endY: "35%", size: 4, blur: 10, color: "96,165,250", dur: 20, delay: 0 },
  { startX: "105%", startY: "25%", endX: "-5%", endY: "55%", size: 3, blur: 8, color: "34,211,238", dur: 25, delay: 4 },
  { startX: "20%", startY: "-5%", endX: "75%", endY: "105%", size: 5, blur: 12, color: "139,92,246", dur: 22, delay: 8 },
  { startX: "80%", startY: "105%", endX: "15%", endY: "-5%", size: 3, blur: 8, color: "52,211,153", dur: 28, delay: 2 },
  { startX: "-5%", startY: "70%", endX: "105%", endY: "45%", size: 4, blur: 10, color: "251,191,36", dur: 24, delay: 12 },
  { startX: "105%", startY: "80%", endX: "-5%", endY: "15%", size: 3, blur: 8, color: "96,165,250", dur: 30, delay: 6 },
];

// Data rain columns
const dataRain = [
  { x: "5%", delay: 0, dur: 6, h: 80 },
  { x: "18%", delay: 2, dur: 7, h: 100 },
  { x: "32%", delay: 4.5, dur: 5.5, h: 70 },
  { x: "48%", delay: 1, dur: 6.5, h: 90 },
  { x: "63%", delay: 3.5, dur: 5, h: 80 },
  { x: "77%", delay: 0.5, dur: 7, h: 110 },
  { x: "92%", delay: 2.5, dur: 6, h: 85 },
];

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 hex-grid opacity-[0.025]" />

      {/* === AURORA BLOBS === */}
      <motion.div
        animate={{ x: [0, 80, -40, 60, 0], y: [0, -60, 40, -30, 0], scale: [1, 1.1, 0.95, 1.08, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vh] rounded-full bg-brand-600/[0.04] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -70, 50, -40, 0], y: [0, 50, -30, 60, 0], scale: [1, 0.95, 1.12, 0.98, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[25%] right-[-8%] w-[45vw] h-[45vh] rounded-full bg-violet-600/[0.03] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 60, -50, 30, 0], y: [0, -40, 50, -20, 0], scale: [1, 1.08, 0.92, 1.05, 1] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute top-[55%] left-[10%] w-[40vw] h-[40vh] rounded-full bg-cyan-600/[0.03] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -50, 40, -60, 0], y: [0, 30, -50, 40, 0], scale: [1, 1.06, 0.94, 1.1, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 15 }}
        className="absolute bottom-[-5%] right-[5%] w-[48vw] h-[45vh] rounded-full bg-emerald-600/[0.025] blur-[120px]"
      />

      {/* === NEURAL CONSTELLATION === */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="globalGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Constellation edges — faint connecting lines */}
        {constellationEdges.map(([a, b], i) => (
          <motion.line
            key={`edge-${i}`}
            x1={`${constellationNodes[a].x}%`}
            y1={`${constellationNodes[a].y}%`}
            x2={`${constellationNodes[b].x}%`}
            y2={`${constellationNodes[b].y}%`}
            stroke="rgba(96,165,250,0.04)"
            strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        {/* Data pulses traveling along edges */}
        {constellationEdges.slice(0, 10).map(([a, b], i) => {
          const from = constellationNodes[a];
          const to = constellationNodes[b];
          return (
            <motion.circle
              key={`gpulse-${i}`}
              r="1.5"
              fill={`rgba(${from.color},0.5)`}
              filter="url(#globalGlow)"
              animate={{
                cx: [`${from.x}%`, `${to.x}%`],
                cy: [`${from.y}%`, `${to.y}%`],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 2.5,
                repeat: Infinity,
                repeatDelay: 8 + i,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Constellation node dots */}
      {constellationNodes.map((node, i) => (
        <motion.div
          key={`cnode-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            transform: "translate(-50%,-50%)",
            background: `rgba(${node.color}, 0.5)`,
            boxShadow: `0 0 ${node.size * 3}px rgba(${node.color}, 0.3)`,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* === TRAVELING ORBS === */}
      {travelingOrbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `rgba(${orb.color}, 0.7)`,
            boxShadow: `0 0 ${orb.blur}px rgba(${orb.color}, 0.5), 0 0 ${orb.blur * 4}px rgba(${orb.color}, 0.2)`,
          }}
          animate={{
            left: [orb.startX, orb.endX],
            top: [orb.startY, orb.endY],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "linear",
            delay: orb.delay,
            times: [0, 0.08, 0.92, 1],
          }}
        />
      ))}

      {/* === DATA RAIN === */}
      {dataRain.map((col, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-px"
          style={{
            left: col.x,
            height: col.h,
            background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.08) 30%, rgba(34,211,238,0.06) 70%, transparent)",
          }}
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: col.dur, delay: col.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* === SCANNING BEAMS === */}
      <motion.div
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
        className="absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 20%, rgba(34,211,238,0.12) 50%, rgba(59,130,246,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 30px rgba(59,130,246,0.06), 0 0 80px rgba(34,211,238,0.03)",
        }}
      />
      <motion.div
        animate={{ left: ["-2%", "102%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 8, delay: 5 }}
        className="absolute top-0 bottom-0 w-px"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.08) 20%, rgba(167,139,250,0.12) 50%, rgba(139,92,246,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 30px rgba(139,92,246,0.06)",
        }}
      />
    </div>
  );
}
