import { useEffect, useRef } from "react";

/**
 * Subtle radial glow that follows the cursor.
 * Pure CSS transform + opacity — GPU composited, no repaints.
 * Hidden on touch devices (no mousemove).
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Skip on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
          el.style.opacity = "1";
          raf.current = 0;
        });
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-30"
      style={{
        width: 180,
        height: 180,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(34,211,238,0.06) 35%, transparent 65%)",
        opacity: 0,
        transition: "opacity 0.4s ease",
        willChange: "transform",
      }}
    />
  );
}
