import { createFileRoute } from "@tanstack/react-router";
import {
  BookCallButton,
  CheckList,
  CtaBand,
  PageHero,
  PointGrid,
  Responsibilities,
  Section,
  SectionHead,
  Terms,
} from "@/components/site/PageBlocks";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/agency-growth")({
  head: () =>
    pageHead(
      "Agency Growth — Up2Linkd",
      "A stronger client-acquisition process for established agencies through Upwork, LinkedIn, or both, including founder LinkedIn personal branding. 90-day minimum engagement.",
    ),
  component: AgencyGrowth,
});

const fit = [
  "A defined service and a team that delivers it",
  "Experience with Upwork or LinkedIn, or a clear wish to start",
  "Time to approve messaging and take sales calls",
  `Readiness for a ${siteConfig.agencyMinimumDays}-day engagement`,
];

const problems = [
  {
    title: "Positioning that blends in",
    text: "Your agency looks like many others, so buyers can't quickly see why you're the right fit.",
  },
  {
    title: "Activity without direction",
    text: "Proposals and outreach go out without clear targeting, and it's hard to tell what's working.",
  },
  {
    title: "Follow-up left to chance",
    text: "Conversations stall because follow-up depends on memory rather than a routine.",
  },
];

const scopes = [
  {
    name: "Upwork",
    text: "Agency profile and positioning, opportunity selection, proposals, and follow-up on Upwork.",
  },
  {
    name: "LinkedIn",
    text: "Founder presence, target-account engagement, outreach, and follow-up on LinkedIn.",
  },
  {
    name: "Upwork and LinkedIn",
    text: "Both channels, coordinated around one positioning and one follow-up routine.",
  },
];

const linkedinScope = [
  "Founder profile optimization",
  "Founder positioning",
  "Content pillars",
  "Content planning",
  "Target-account engagement",
  "Outreach and follow-up",
];

function AgencyGrowth() {
  return (
    <>
      <PageHero
        eyebrow="Agency Growth"
        title="A stronger acquisition process for established agencies."
        lead="For agencies that want a clearer, more consistent way to win clients through Upwork, LinkedIn, or both."
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <BookCallButton service="agency-growth" />
          <p className="text-sm text-ash">{siteConfig.agencyMinimumDays}-day minimum engagement</p>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-5"
            eyebrow="Who it's for"
            title="Built for agencies with a proven service."
          />
          <div className="reveal lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-soft">
              Agency Growth suits established agencies that deliver consistently and want new
              clients to depend less on referrals and one-off efforts.
            </p>
            <CheckList items={fit} className="mt-8" />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead eyebrow="The problems it addresses" title="Where agency acquisition stalls." />
        <PointGrid points={problems} className="mt-16" />
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead
          eyebrow="What can be included"
          title="Choose the channel scope that fits."
          intro="Every engagement is built around one of three channel scopes. We confirm the right one with you on the discovery call."
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {scopes.map((scope) => (
            <li
              key={scope.name}
              className="reveal rounded-3xl border border-line-light bg-white/50 p-7 md:p-8"
            >
              <h3 className="type-title">{scope.name}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{scope.text}</p>
            </li>
          ))}
        </ul>
        <div className="reveal mt-14 max-w-3xl">
          <h3 className="type-title">When LinkedIn is part of the scope, it may include:</h3>
          <CheckList items={linkedinScope} className="mt-6" />
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead eyebrow="Who handles what" title="A clear split of responsibilities." />
        <div className="mt-14">
          <Responsibilities
            ours={[
              "Positioning and offer clarity",
              "Upwork and LinkedIn profile improvements",
              "Opportunity and target-account selection",
              "Preparing proposals and outreach messages",
              "A follow-up structure",
              "Regular performance reviews",
            ]}
            yoursTitle="What your agency handles"
            yours={[
              "Approving positioning and messaging",
              "Portfolio examples and project details",
              "Access to the accounts we agree to work in",
              "Sales calls and client conversations",
              "Delivering the work you win",
            ]}
          />
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead eyebrow="Engagement terms" title="How an engagement works." />
        <div className="mt-14">
          <Terms
            terms={[
              {
                label: "Minimum engagement",
                text: `${siteConfig.agencyMinimumDays} days. An acquisition process needs time to set up, run, and improve.`,
              },
              {
                label: "Scope",
                text: "Channels and responsibilities are agreed after the discovery call and confirmed in writing.",
              },
              {
                label: "Pricing",
                text: "Shared in a written proposal before any work begins.",
              },
              {
                label: "Reviews",
                text: "Regular reviews to check progress and adjust the plan.",
              },
              {
                label: "Results",
                text: "No guaranteed clients or revenue. Results depend on your offer, your market, and consistent follow-through.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Start with a discovery call."
        text="Tell us about your agency, your current channels, and what you want to improve."
        service="agency-growth"
      />
    </>
  );
}
