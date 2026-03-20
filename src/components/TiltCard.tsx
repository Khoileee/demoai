import { useRef, useCallback, useEffect, type ReactNode, type CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tiltMax?: number;       // max rotation degrees (default 10)
  glareOpacity?: number;  // 0-1, glare highlight strength (default 0.15)
  liftPx?: number;        // translateZ lift on hover (default 20)
}

export default function TiltCard({
  children,
  className = "",
  style,
  tiltMax = 10,
  glareOpacity = 0.15,
  liftPx = 20,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current) return; // skip if RAF pending
      isHovering.current = true;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * tiltMax;
        const rotateY = (x - 0.5) * tiltMax;

        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${liftPx}px) scale3d(1.03,1.03,1)`;

        if (glareRef.current) {
          glareRef.current.style.opacity = "1";
          glareRef.current.style.background = `radial-gradient(ellipse at ${x * 100}% ${y * 100}%, rgba(255,255,255,${glareOpacity}) 0%, rgba(255,255,255,${glareOpacity * 0.3}) 40%, transparent 70%)`;
        }
      });
    },
    [tiltMax, glareOpacity, liftPx]
  );

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1,1,1)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      style={style}
    >
      {children}
      {/* Glare overlay — fades in/out */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
        style={{ background: "transparent", opacity: 0 }}
      />
    </div>
  );
}
