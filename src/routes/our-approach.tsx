import { createFileRoute } from "@tanstack/react-router";
import {
  BookCallButton,
  CtaBand,
  PageHero,
  PointGrid,
  Section,
  SectionHead,
} from "@/components/site/PageBlocks";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/our-approach")({
  head: () =>
    pageHead(
      "Our Approach — Up2Linkd",
      "How Up2Linkd works: positioning before activity, the right channel rather than every channel, consistent follow-up, clear responsibilities, and honest expectations.",
    ),
  component: OurApproach,
});

const principles = [
  {
    title: "Positioning before activity",
    text: "More proposals or posts won't help if the offer is unclear. We start with who you help and why it matters.",
  },
  {
    title: "The right channel, not every channel",
    text: "Upwork, LinkedIn, or both. We recommend the focus that fits your offer and the time you have.",
  },
  {
    title: "Consistency over volume",
    text: "A steady routine of relevant activity and follow-up does more than occasional bursts of effort.",
  },
  {
    title: "Honest expectations",
    text: "We don't guarantee clients or revenue. We commit to clear, focused work and regular review.",
  },
];

const steps = [
  {
    title: "Assess",
    text: "We review your offer, your Upwork and LinkedIn presence, and how you find clients today, so we start from facts rather than assumptions.",
  },
  {
    title: "Define",
    text: "Together we agree on the channel, the clients to focus on, and a scope with clear responsibilities on both sides.",
  },
  {
    title: "Implement",
    text: "The agreed work is put in place: positioning, profiles, proposals, outreach, content direction, and follow-up, depending on the scope.",
  },
  {
    title: "Improve",
    text: "We review progress at regular points, keep what works, and adjust what doesn't.",
  },
];

function OurApproach() {
  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="Clear positioning first. Consistent activity after."
        lead="We help agencies and freelancers build a focused acquisition process they can understand, run, and improve."
      >
        <BookCallButton />
      </PageHero>

      <Section>
        <SectionHead eyebrow="Principles" title="What guides the work." />
        <PointGrid points={principles} className="mt-16 md:grid-cols-2 lg:grid-cols-4" />
      </Section>

      <Section className="border-t border-line-light">
        <SectionHead eyebrow="How we work" title="Four steps, repeated and refined." />
        <ol className="mt-14 border-b border-line-light">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal grid gap-3 border-t border-line-light py-8 md:grid-cols-[4rem_14rem_1fr] md:gap-8"
            >
              <span className="font-display text-sm font-semibold text-ink-soft" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold">{step.title}</h3>
              <p className="max-w-2xl leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-line-light">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 className="type-section">Clear responsibilities.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Every engagement sets out what Up2Linkd handles and what you handle. Agency Growth
              includes more hands-on work within the agreed scope. Freelancer Growth and Upwork
              Launch are guided support, and you carry out the agreed activities.
            </p>
          </div>
          <div className="reveal">
            <h2 className="type-section">No inflated promises.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We don't promise clients, revenue, followers, impressions, leads, or meetings. Results
              depend on many things, including your offer, your market, and consistent
              follow-through.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Ready to build a clearer path to clients?"
        text="Tell us where you are today and what you want to improve."
      />
    </>
  );
}
