import { useEffect, useRef } from "react";

const STAR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%2360a5fa' stroke='%231e3a8a' stroke-width='0.8' stroke-linecap='round' stroke-linejoin='round'><path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'/><path d='M20 3v4'/><path d='M22 5h-4'/><path d='M4 17v2'/><path d='M5 18H3'/></svg>`;
const STAR_URI = `data:image/svg+xml,${STAR_SVG}`;

const POOL_SIZE = 18;
const SPAWN_INTERVAL = 40; // ms between stars

/**
 * Cursor glow + star trail.
 * Object-pool pattern: pre-create N elements, recycle them.
 * All movement via CSS transform (GPU). No DOM creation at runtime.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const pos = useRef({ x: -200, y: -200 });
  const lastSpawn = useRef(0);
  const poolIdx = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container) return;

    // Build object pool
    const pool: HTMLImageElement[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const img = document.createElement("img");
      img.src = STAR_URI;
      img.style.cssText =
        "position:fixed;top:0;left:0;width:8px;height:8px;pointer-events:none;opacity:0;z-index:29;will-change:transform,opacity;transition:opacity 0.6s ease,transform 0.6s ease;";
      container.appendChild(img);
      pool.push(img);
    }
    poolRef.current = pool;

    const spawnStar = (x: number, y: number) => {
      const star = pool[poolIdx.current % POOL_SIZE];
      poolIdx.current++;

      // Random offset & size for organic feel
      const ox = (Math.random() - 0.5) * 16;
      const oy = (Math.random() - 0.5) * 16;
      const scale = 0.6 + Math.random() * 0.8;
      const rot = Math.random() * 360;

      // Place instantly (no transition on placement)
      star.style.transition = "none";
      star.style.transform = `translate(${x + ox}px, ${y + oy}px) scale(${scale}) rotate(${rot}deg)`;
      star.style.opacity = "0.7";

      // Force reflow then enable transition for fade-out
      star.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-expressions
      star.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      star.style.transform = `translate(${x + ox}px, ${y + oy + 12}px) scale(${scale * 0.3}) rotate(${rot + 60}deg)`;
      star.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      const now = performance.now();
      if (now - lastSpawn.current > SPAWN_INTERVAL) {
        lastSpawn.current = now;
        spawnStar(e.clientX, e.clientY);
      }

      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          glow.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
          glow.style.opacity = "1";
          raf.current = 0;
        });
      }
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
      pool.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-30"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(34,211,238,0.06) 35%, transparent 45%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
        }}
      />
    </div>
  );
}
