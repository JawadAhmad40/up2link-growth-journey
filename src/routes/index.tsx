import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/site/HeroSection";
import {
  BuildSection,
  FaqSection,
  HowItWorksSection,
  LinkedInBrandSection,
  ProblemSection,
  ServicesSection,
} from "@/components/site/HomeSections";
import { CtaBand } from "@/components/site/PageBlocks";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Up2Linkd — Upwork & LinkedIn client acquisition",
      "Up2Linkd helps agencies and skilled freelancers strengthen their positioning, build professional visibility, and create a focused client-acquisition process through Upwork and LinkedIn.",
    ),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <BuildSection />
      <LinkedInBrandSection />
      <HowItWorksSection />
      <FaqSection />
      <CtaBand
        title="Ready to build a clearer path to clients?"
        text="Tell us where you are today and what you want to improve."
      />
    </>
  );
}
