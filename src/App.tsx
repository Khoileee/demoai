import GlobalBackground from "@/components/GlobalBackground";
import CursorGlow from "@/components/CursorGlow";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WorkflowSection from "@/components/WorkflowSection";
import OrchestrationSection from "@/components/OrchestrationSection";
import ToolsSection from "@/components/ToolsSection";
import InsightSection from "@/components/InsightSection";
import CTASection from "@/components/CTASection";
import ScrollProgress from "@/components/ScrollProgress";
import DotNav from "@/components/DotNav";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <DotNav />
      <CursorGlow />
      <GlobalBackground />
      <main className="relative z-[1] noise-overlay">
        <div id="hero"><HeroSection /></div>
        <div id="workflow" className="cv-auto"><WorkflowSection /></div>
        <div id="problem" className="cv-auto"><ProblemSection /></div>
        <div id="solution" className="cv-auto"><SolutionSection /></div>
        <div id="tools" className="cv-auto"><ToolsSection /></div>
        <div id="orchestration" className="cv-auto"><OrchestrationSection /></div>
        <div id="insight" className="cv-auto"><InsightSection /></div>
        <div id="cta"><CTASection /></div>
      </main>
    </>
  );
}
