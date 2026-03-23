import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Mở đầu" },
  { id: "workflow", label: "Quy trình" },
  { id: "problem", label: "Thách thức" },
  { id: "solution", label: "Giải pháp & Công cụ" },
  { id: "limitation", label: "Hạn chế" },
  { id: "orchestration", label: "Điều phối" },
  { id: "cta", label: "Trải nghiệm" },
  { id: "insight", label: "Góc nhìn" },
  { id: "thank", label: "Cảm ơn" },
];

export default function DotNav() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    // Show dots only after scrolling past first 200px
    setVisible(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.4 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
      aria-label="Page navigation"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-2"
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label tooltip */}
            <span
              className={`text-[11px] font-medium transition-all duration-300 pointer-events-none ${
                isActive
                  ? "opacity-100 translate-x-0 text-brand-300"
                  : "opacity-0 translate-x-2 text-gray-500 group-hover:opacity-80 group-hover:translate-x-0"
              }`}
            >
              {s.label}
            </span>

            {/* Dot */}
            <span className="relative flex items-center justify-center w-3 h-3">
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-brand-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                    : "w-1.5 h-1.5 bg-gray-600 group-hover:bg-gray-400"
                }`}
              />
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
