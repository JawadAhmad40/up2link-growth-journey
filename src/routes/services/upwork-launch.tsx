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
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/upwork-launch")({
  head: () =>
    pageHead(
      "Upwork Launch — Up2Linkd",
      "A professional start on Upwork for skilled professionals who already have a skill they can deliver: a focused offer, profile, portfolio plan, and proposal guidance.",
    ),
  component: UpworkLaunch,
});

const fit = [
  "You already have a skill you can deliver to clients",
  "You're new to Upwork, or your profile isn't live yet",
  "You want a clear, professional starting point",
];

const problems = [
  {
    title: "Unsure what to offer",
    text: "Without a focused offer, a new profile tries to cover everything and stands out for nothing.",
  },
  {
    title: "A profile that doesn't build trust",
    text: "New profiles have no history yet, so the offer, profile, and portfolio need to do more of the work.",
  },
  {
    title: "Applying to the wrong jobs",
    text: "Without clear criteria, it's easy to spend time and Connects on opportunities that aren't a good fit.",
  },
];

const included = [
  "Focused service offer",
  "Upwork profile preparation",
  "Portfolio planning",
  "Opportunity selection",
  "Proposal guidance",
  "Starting activity plan",
];

function UpworkLaunch() {
  return (
    <>
      <PageHero
        eyebrow="Upwork Launch"
        title="Start on Upwork with a clear offer and a professional profile."
        lead="For skilled professionals who are new to Upwork and already have a skill they can deliver."
      >
        <BookCallButton service="upwork-launch" channel="upwork" />
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-5"
            eyebrow="Who it's for"
            title="For people with a skill, starting on Upwork."
          />
          <div className="reveal lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-soft">
              Upwork Launch suits professionals who already deliver work clients pay for, such as
              development, design, writing, or marketing, and want to start on Upwork properly
              rather than by trial and error.
            </p>
            <CheckList items={fit} className="mt-8" />
            <p className="mt-8 border-l-2 border-obsidian pl-4 font-medium">
              This isn't a course for learning a new skill.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead
          eyebrow="The problems it addresses"
          title="Why a first Upwork profile often stalls."
        />
        <PointGrid points={problems} className="mt-16" />
      </Section>

      <Section className="border-t border-line-light">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-5"
            eyebrow="What's included"
            title="A focused start on Upwork."
            intro="Upwork Launch covers the essentials of starting on Upwork, and nothing more."
          />
          <div className="reveal lg:col-span-7 lg:pt-2">
            <CheckList items={included} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead
          eyebrow="Who handles what"
          title="Guidance from us, your account in your hands."
        />
        <div className="mt-14">
          <Responsibilities
            ours={[
              "Defining a focused offer with you",
              "Guidance on your profile and portfolio",
              "Criteria for choosing opportunities",
              "Proposal structure and feedback",
              "A starting activity plan",
            ]}
            yoursTitle="What you handle"
            yours={[
              "Creating and verifying your Upwork account",
              "Preparing portfolio samples",
              "Choosing jobs and sending proposals",
              "Any Upwork costs, such as Connects",
              "Delivering the work you win",
            ]}
            note="Upwork Launch is guided support. You carry out the agreed activities on your own account."
          />
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead eyebrow="Engagement terms" title="How the service works." />
        <div className="mt-14">
          <Terms
            terms={[
              {
                label: "Focus",
                text: "Starting professionally on Upwork. LinkedIn personal branding isn't part of this service; it's covered in Freelancer Growth.",
              },
              {
                label: "Scope",
                text: "Agreed after the discovery call and confirmed in writing.",
              },
              {
                label: "Pricing",
                text: "Shared in a written proposal before any work begins.",
              },
              {
                label: "Results",
                text: "No guaranteed jobs, clients, or earnings. Results depend on your skill, your offer, and your activity.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Ready to start on Upwork?"
        text="Tell us about your skill and where you are with Upwork today."
        service="upwork-launch"
        channel="upwork"
      />
    </>
  );
}
