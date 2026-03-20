import { useRef } from "react";
import { useInView, useScroll, useTransform, type UseInViewOptions } from "framer-motion";

export function useScrollReveal(options?: UseInViewOptions) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px 0px",
    ...options,
  });
  return { ref, isInView };
}

export function useParallax(offset: number = 100) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return { ref, y, opacity, scrollYProgress };
}

export function useSectionProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, scrollYProgress };
}
