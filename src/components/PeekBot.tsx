/**
 * PeekBot — EVE-inspired mascot that peeks from the top-left and waves.
 * Sleek white egg body, glowing blue visor, minimal arms.
 * Pure CSS animation, no JS.
 */
export default function PeekBot() {
  return (
    <div className="peek-bot-wrapper" aria-hidden="true">
      <div className="peek-bot">
        <svg
          viewBox="0 0 100 130"
          width="100"
          height="130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="peek-bot-svg"
        >
          <defs>
            {/* Body gradient — pearlescent white/silver */}
            <linearGradient id="eveBody" x1="50" y1="5" x2="50" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="40%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            {/* Visor glow */}
            <radialGradient id="visorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            {/* Eye glow */}
            <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Soft shadow */}
            <filter id="botShadow" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Hover shadow */}
          <ellipse cx="50" cy="122" rx="22" ry="4" fill="rgba(0,0,0,0.1)" className="peek-bot-shadow" />

          {/* Body — smooth egg capsule */}
          <g filter="url(#botShadow)">
            <ellipse cx="50" cy="58" rx="34" ry="46" fill="url(#eveBody)" />
            {/* Subtle rim light */}
            <ellipse cx="50" cy="58" rx="34" ry="46" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
            {/* Specular highlight */}
            <ellipse cx="40" cy="32" rx="14" ry="10" fill="rgba(255,255,255,0.4)" transform="rotate(-15 40 32)" />
          </g>

          {/* Visor area — glowing zone */}
          <ellipse cx="50" cy="50" rx="26" ry="12" fill="url(#visorGlow)" />

          {/* Eyes — glowing ovals (EVE style) */}
          <g filter="url(#eyeGlow)">
            <ellipse cx="38" cy="50" rx="6" ry="7" fill="#3b82f6" className="peek-bot-eye" />
            <ellipse cx="62" cy="50" rx="6" ry="7" fill="#3b82f6" className="peek-bot-eye" />
            {/* Eye highlights */}
            <ellipse cx="36" cy="47" rx="2" ry="2.5" fill="rgba(255,255,255,0.7)" />
            <ellipse cx="60" cy="47" rx="2" ry="2.5" fill="rgba(255,255,255,0.7)" />
          </g>

          {/* Left arm — resting, slightly visible */}
          <g>
            <path
              d="M16 60 Q10 65 12 74"
              stroke="#cbd5e1"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="12" cy="75" r="4" fill="#e2e8f0" />
          </g>

          {/* Right arm — waving */}
          <g className="peek-bot-wave-arm">
            <path
              d="M84 55 Q92 42 96 32"
              stroke="#cbd5e1"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Hand — small round */}
            <circle cx="96" cy="30" r="5" fill="#e2e8f0" />
            <circle cx="96" cy="30" r="5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
