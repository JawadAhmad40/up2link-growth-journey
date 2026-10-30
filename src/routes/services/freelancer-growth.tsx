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

export const Route = createFileRoute("/services/freelancer-growth")({
  head: () =>
    pageHead(
      "Freelancer Growth — Up2Linkd",
      "Guided support for existing freelancers: clearer positioning, stronger Upwork and LinkedIn profiles, personal-brand direction, and a more consistent acquisition routine.",
    ),
  component: FreelancerGrowth,
});

const fit = [
  "You deliver a skill clients already pay for",
  "You use Upwork, LinkedIn, or both, or plan to",
  "You can set aside time each week for agreed activities",
  "You want guidance rather than someone doing it for you",
];

const problems = [
  {
    title: "A profile that undersells you",
    text: "Your experience is real, but your Upwork or LinkedIn profile doesn't make it clear.",
  },
  {
    title: "Proposals that sound like everyone else's",
    text: "Generic proposals and messages make it hard for clients to see why you're the right choice.",
  },
  {
    title: "Visibility that comes and goes",
    text: "You post or reach out in bursts, then go quiet whenever client work gets busy.",
  },
];

const scope = [
  "Offer positioning",
  "Upwork profile",
  "LinkedIn profile",
  "Portfolio presentation",
  "LinkedIn content direction",
  "Proposals and outreach",
  "Follow-up routine",
];

function FreelancerGrowth() {
  return (
    <>
      <PageHero
        eyebrow="Freelancer Growth"
        title="Stronger positioning and steadier acquisition for working freelancers."
        lead="Guided support for existing freelancers who want to present their expertise clearly and win work more consistently through Upwork and LinkedIn."
      >
        <BookCallButton service="freelancer-growth" />
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-5"
            eyebrow="Who it's for"
            title="For freelancers who already work with clients."
          />
          <div className="reveal lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-soft">
              Freelancer Growth suits freelancers with real client experience whose profiles
              undersell them, or whose new work comes in bursts.
            </p>
            <CheckList items={fit} className="mt-8" />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead
          eyebrow="The problems it addresses"
          title="Where freelance acquisition stalls."
        />
        <PointGrid points={problems} className="mt-16" />
      </Section>

      <Section className="border-t border-line-light">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-5"
            eyebrow="What can be included"
            title="A focused scope, built around you."
            intro="We choose what matters most for your situation. You won't need everything on this list."
          />
          <div className="reveal lg:col-span-7 lg:pt-2">
            <CheckList items={scope} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead
          eyebrow="Who handles what"
          title="Guided support. You stay in charge."
          intro="This is guided support. You remain responsible for carrying out the agreed activities, with our direction and feedback along the way."
        />
        <div className="mt-14">
          <Responsibilities
            ours={[
              "Reviewing your positioning and profiles",
              "Clear recommendations and examples",
              "LinkedIn content direction and post ideas",
              "Feedback on proposals and outreach",
              "A simple follow-up routine",
              "Regular check-ins on progress",
            ]}
            yoursTitle="What you handle"
            yours={[
              "Updating your profiles and portfolio",
              "Writing and sending proposals and messages",
              "Publishing content on LinkedIn",
              "Following up with prospects",
              "Delivering client work",
            ]}
          />
        </div>
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead eyebrow="Engagement terms" title="How the support works." />
        <div className="mt-14">
          <Terms
            terms={[
              {
                label: "Support model",
                text: "Guided support. You carry out the agreed activities with our direction and feedback.",
              },
              {
                label: "Scope and duration",
                text: "Agreed after the discovery call and confirmed in writing.",
              },
              {
                label: "Pricing",
                text: "Shared in a written proposal before any work begins.",
              },
              {
                label: "Results",
                text: "No guaranteed clients, revenue, or audience growth. Results depend on your offer, your market, and your consistency.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Talk through your next step."
        text="Tell us what you offer, where you find clients today, and what you'd like to improve."
        service="freelancer-growth"
      />
    </>
  );
}
