import HeroSection from "@/components/HeroSection";
import SiteHeader from "@/components/SiteHeader";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import WaitlistSection from "@/components/WaitlistSection";
import FaqSection from "@/components/FaqSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <AudienceSection />
        <WaitlistSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
