import GlobalBackground from "@/components/GlobalBackground";
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
      <GlobalBackground />
      <main className="relative z-[1] noise-overlay">
        <div id="hero"><HeroSection /></div>
        <div id="workflow"><WorkflowSection /></div>
        <div id="problem"><ProblemSection /></div>
        <div id="solution"><SolutionSection /></div>
        <div id="tools"><ToolsSection /></div>
        <div id="orchestration"><OrchestrationSection /></div>
        <div id="insight"><InsightSection /></div>
        <div id="cta"><CTASection /></div>
      </main>
    </>
  );
}
