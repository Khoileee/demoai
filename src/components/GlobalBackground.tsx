/**
 * Fixed background layer – futuristic AI theme.
 * PERFORMANCE: All repetitive animations use CSS @keyframes (GPU compositor).
 * Framer Motion is NOT used here to avoid JS main-thread overhead.
 */

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 hex-grid opacity-[0.025]" />

      {/* === AURORA BLOBS — CSS animated, reduced blur === */}
      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vh] rounded-full bg-brand-600/[0.04] blur-[80px] animate-aurora-1" />
      <div className="absolute top-[25%] right-[-8%] w-[45vw] h-[45vh] rounded-full bg-violet-600/[0.03] blur-[80px] animate-aurora-2" />
      <div className="absolute top-[55%] left-[10%] w-[40vw] h-[40vh] rounded-full bg-cyan-600/[0.03] blur-[80px] animate-aurora-3" />
      <div className="absolute bottom-[-5%] right-[5%] w-[48vw] h-[45vh] rounded-full bg-emerald-600/[0.025] blur-[80px] animate-aurora-4" />

      {/* === NEURAL CONSTELLATION — static lines + CSS animated nodes === */}
      <svg className="absolute inset-0 w-full h-full" style={{ willChange: "auto" }}>
        {/* Static constellation edges — no animation, pure SVG */}
        <line x1="8%" y1="12%" x2="22%" y2="28%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="22%" y1="28%" x2="48%" y2="35%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="35%" y1="8%" x2="62%" y2="15%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="48%" y1="35%" x2="62%" y2="15%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="62%" y1="15%" x2="75%" y2="30%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="75%" y1="30%" x2="88%" y2="18%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="8%" y1="12%" x2="15%" y2="52%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="15%" y1="52%" x2="30%" y2="60%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="30%" y1="60%" x2="50%" y2="55%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="50%" y1="55%" x2="68%" y2="48%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="68%" y1="48%" x2="82%" y2="58%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="82%" y1="58%" x2="92%" y2="42%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="15%" y1="52%" x2="12%" y2="75%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="12%" y1="75%" x2="28%" y2="85%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="28%" y1="85%" x2="42%" y2="78%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="42%" y1="78%" x2="58%" y2="88%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="58%" y1="88%" x2="72%" y2="72%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        <line x1="72%" y1="72%" x2="85%" y2="82%" stroke="rgba(96,165,250,0.04)" strokeWidth="0.5" />
        <line x1="85%" y1="82%" x2="95%" y2="70%" stroke="rgba(96,165,250,0.03)" strokeWidth="0.5" />
        {/* Cross connections */}
        <line x1="22%" y1="28%" x2="30%" y2="60%" stroke="rgba(96,165,250,0.02)" strokeWidth="0.5" />
        <line x1="48%" y1="35%" x2="50%" y2="55%" stroke="rgba(96,165,250,0.02)" strokeWidth="0.5" />
        <line x1="75%" y1="30%" x2="82%" y2="58%" stroke="rgba(96,165,250,0.02)" strokeWidth="0.5" />
        <line x1="68%" y1="48%" x2="72%" y2="72%" stroke="rgba(96,165,250,0.02)" strokeWidth="0.5" />
      </svg>

      {/* Constellation node dots — CSS pulse animation */}
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "8%", top: "12%", width: 3, height: 3, background: "rgba(96,165,250,0.5)", boxShadow: "0 0 6px rgba(96,165,250,0.3)", animationDelay: "0s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "22%", top: "28%", width: 2, height: 2, background: "rgba(34,211,238,0.5)", boxShadow: "0 0 4px rgba(34,211,238,0.3)", animationDelay: "0.5s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "48%", top: "35%", width: 3, height: 3, background: "rgba(59,130,246,0.5)", boxShadow: "0 0 6px rgba(59,130,246,0.3)", animationDelay: "1s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "62%", top: "15%", width: 2, height: 2, background: "rgba(167,139,250,0.5)", boxShadow: "0 0 4px rgba(167,139,250,0.3)", animationDelay: "1.5s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "75%", top: "30%", width: 2, height: 2, background: "rgba(34,211,238,0.5)", boxShadow: "0 0 4px rgba(34,211,238,0.3)", animationDelay: "2s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "88%", top: "18%", width: 3, height: 3, background: "rgba(96,165,250,0.5)", boxShadow: "0 0 6px rgba(96,165,250,0.3)", animationDelay: "2.5s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "30%", top: "60%", width: 3, height: 3, background: "rgba(59,130,246,0.5)", boxShadow: "0 0 6px rgba(59,130,246,0.3)", animationDelay: "0.8s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "50%", top: "55%", width: 2, height: 2, background: "rgba(139,92,246,0.5)", boxShadow: "0 0 4px rgba(139,92,246,0.3)", animationDelay: "1.3s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "82%", top: "58%", width: 3, height: 3, background: "rgba(34,211,238,0.5)", boxShadow: "0 0 6px rgba(34,211,238,0.3)", animationDelay: "1.8s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "42%", top: "78%", width: 2, height: 2, background: "rgba(59,130,246,0.5)", boxShadow: "0 0 4px rgba(59,130,246,0.3)", animationDelay: "2.3s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "72%", top: "72%", width: 3, height: 3, background: "rgba(139,92,246,0.5)", boxShadow: "0 0 6px rgba(139,92,246,0.3)", animationDelay: "0.3s" }} />
      <div className="absolute rounded-full animate-node-pulse" style={{ left: "95%", top: "70%", width: 2, height: 2, background: "rgba(251,191,36,0.5)", boxShadow: "0 0 4px rgba(251,191,36,0.3)", animationDelay: "1.6s" }} />

      {/* === TRAVELING ORBS — CSS with transform instead of top/left === */}
      <div className="absolute left-0 top-[10%] w-1 h-1 rounded-full animate-orb-1" style={{ background: "rgba(96,165,250,0.7)", boxShadow: "0 0 10px rgba(96,165,250,0.5), 0 0 40px rgba(96,165,250,0.2)" }} />
      <div className="absolute left-full top-[25%] w-[3px] h-[3px] rounded-full animate-orb-2" style={{ background: "rgba(34,211,238,0.7)", boxShadow: "0 0 8px rgba(34,211,238,0.5), 0 0 32px rgba(34,211,238,0.2)" }} />
      <div className="absolute left-[20%] top-0 w-[5px] h-[5px] rounded-full animate-orb-3" style={{ background: "rgba(139,92,246,0.7)", boxShadow: "0 0 12px rgba(139,92,246,0.5), 0 0 48px rgba(139,92,246,0.2)" }} />
      <div className="absolute left-[80%] bottom-0 w-[3px] h-[3px] rounded-full animate-orb-4" style={{ background: "rgba(52,211,153,0.7)", boxShadow: "0 0 8px rgba(52,211,153,0.5), 0 0 32px rgba(52,211,153,0.2)" }} />

      {/* === DATA RAIN — CSS translateY === */}
      <div className="absolute w-px animate-data-rain" style={{ left: "12%", height: 80, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.08) 30%, rgba(34,211,238,0.06) 70%, transparent)", animationDelay: "0s", animationDuration: "7s" }} />
      <div className="absolute w-px animate-data-rain" style={{ left: "35%", height: 100, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.08) 30%, rgba(34,211,238,0.06) 70%, transparent)", animationDelay: "2.5s", animationDuration: "6s" }} />
      <div className="absolute w-px animate-data-rain" style={{ left: "58%", height: 90, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.08) 30%, rgba(34,211,238,0.06) 70%, transparent)", animationDelay: "1s", animationDuration: "7.5s" }} />
      <div className="absolute w-px animate-data-rain" style={{ left: "82%", height: 85, background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.08) 30%, rgba(34,211,238,0.06) 70%, transparent)", animationDelay: "4s", animationDuration: "6.5s" }} />

      {/* === SCANNING BEAM — CSS translateY === */}
      <div
        className="absolute left-0 right-0 h-px animate-scan-h"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 20%, rgba(34,211,238,0.12) 50%, rgba(59,130,246,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 30px rgba(59,130,246,0.06)",
        }}
      />
    </div>
  );
}
