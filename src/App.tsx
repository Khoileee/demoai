import { useEffect, useCallback } from "react";
import GlobalBackground from "@/components/GlobalBackground";
import CursorGlow from "@/components/CursorGlow";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WorkflowSection from "@/components/WorkflowSection";
import OrchestrationSection from "@/components/OrchestrationSection";
import InsightSection from "@/components/InsightSection";
import CTASection from "@/components/CTASection";
import ThankSection from "@/components/ThankSection";
import LimitationSection from "@/components/LimitationSection";
import ScrollProgress from "@/components/ScrollProgress";
import DotNav from "@/components/DotNav";

const sectionIds = ["hero", "workflow", "problem", "solution", "limitation", "orchestration", "cta", "insight", "thank"];

export default function App() {
  const navigateSlide = useCallback((direction: 1 | -1) => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    let currentIdx = 0;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollY + vh * 0.3) {
        currentIdx = i;
        break;
      }
    }

    const targetIdx = Math.max(0, Math.min(sectionIds.length - 1, currentIdx + direction));
    document.getElementById(sectionIds[targetIdx])?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          navigateSlide(1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          navigateSlide(-1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateSlide]);

  return (
    <>
      <ScrollProgress />
      <DotNav />
      <CursorGlow />
      <GlobalBackground />
      <main className="relative z-[1] noise-overlay">
        <div id="hero" className="h-screen snap-start overflow-hidden"><HeroSection /></div>
        <div id="workflow" className="h-screen snap-start overflow-hidden cv-auto"><WorkflowSection /></div>
        <div id="problem" className="h-screen snap-start overflow-hidden cv-auto"><ProblemSection /></div>
        <div id="solution" className="h-screen snap-start overflow-hidden cv-auto"><SolutionSection /></div>
        <div id="limitation" className="h-screen snap-start overflow-hidden cv-auto"><LimitationSection /></div>
        <div id="orchestration" className="h-screen snap-start overflow-hidden cv-auto"><OrchestrationSection /></div>
        <div id="cta" className="h-screen snap-start overflow-hidden"><CTASection /></div>
        <div id="insight" className="h-screen snap-start overflow-hidden cv-auto"><InsightSection /></div>
        <div id="thank" className="h-screen snap-start overflow-hidden"><ThankSection /></div>
      </main>
    </>
  );
}
