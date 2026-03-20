import GlobalBackground from "@/components/GlobalBackground";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WorkflowSection from "@/components/WorkflowSection";
import OrchestrationSection from "@/components/OrchestrationSection";
import ToolsSection from "@/components/ToolsSection";
import InsightSection from "@/components/InsightSection";
import CTASection from "@/components/CTASection";

export default function App() {
  return (
    <>
      <GlobalBackground />
      <main className="relative z-[1] noise-overlay">
        <HeroSection />
        <WorkflowSection />
        <ProblemSection />
        <SolutionSection />
        <ToolsSection />
        <OrchestrationSection />
        <InsightSection />
        <CTASection />
      </main>
    </>
  );
}
