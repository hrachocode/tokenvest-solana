import CrowdfundingTechnology from "@/components/CrowdfundingTechnology/CrowdfundingTechnology";
import CrowdfundingSolutions from "@/components/CrowdfundingSolutions/CrowdfundingSolutions";
import FeeStructure from "@/components/FeeStructure/FeeStructure";
import EmpoweringInnovators from "@/components/EmpoweringInnovators/EmpoweringInnovators";
import ReadyGetStarted from "@/components/ReadyGetStarted/ReadyGetStarted";

export default function Home() {
  return (
    <main>
      <CrowdfundingTechnology />
      <CrowdfundingSolutions />
      <FeeStructure />
      <EmpoweringInnovators />
      <ReadyGetStarted title="Ready to Get Started?" />
    </main>
  );
}
