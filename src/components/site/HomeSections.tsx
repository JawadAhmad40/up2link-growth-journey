import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonStyles } from "./buttonStyles";
import { PointGrid, Section, SectionHead } from "./PageBlocks";
import { services, siteConfig, type Service } from "@/config/site";
import { cn } from "@/lib/utils";

/* 2. The problem */
const problems = [
  {
    title: "Unclear positioning",
    text: "Your offer and strengths are hard to grasp at a glance, and a weak LinkedIn presence makes your expertise easy to overlook.",
  },
  {
    title: "Unfocused acquisition activity",
    text: "Proposals and outreach go to opportunities that were never a good fit, so effort is spread thin.",
  },
  {
    title: "Inconsistent follow-up",
    text: "Promising conversations go quiet because there's no simple routine for following up and reviewing what works.",
  },
];

export function ProblemSection() {
  return (
    <Section>
      <SectionHead
        eyebrow="The problem"
        title="Strong expertise needs visibility and a clear acquisition process."
      />
      <PointGrid points={problems} className="mt-16" />
    </Section>
  );
}

/* 3. Choose your service */
const cardTags: Record<Service["id"], string> = {
  "agency-growth": "Flagship service",
  "freelancer-growth": "For existing freelancers",
  "upwork-launch": "New to Upwork",
};

function ServiceCard({ service: s }: { service: Service }) {
  const dark = s.flagship;
  return (
    <article
      className={cn(
        "reveal flex flex-col rounded-3xl p-8 md:p-9",
        dark ? "surface-dark bg-obsidian text-paper" : "border border-line-light bg-white/50",
      )}
    >
      <p className={cn("eyebrow", dark ? "text-lime" : "text-ink-soft")}>{cardTags[s.id]}</p>
      <h3 className="mt-4 font-display text-[1.7rem] font-bold leading-tight tracking-[-0.02em]">
        {s.name}
      </h3>
      <p className={cn("mt-3 leading-relaxed", dark ? "text-ash" : "text-ink-soft")}>
        {s.audience}
      </p>
      <p className="mt-8 text-sm font-semibold">{s.includesLabel}</p>
      <ul className="mt-4 flex-1 space-y-3 text-[0.95rem]">
        {s.includes.map((item) => (
          <li key={item} className="flex gap-3 leading-snug">
            <span
              className={cn(
                "mt-[0.45rem] size-1.5 shrink-0 rounded-full",
                dark ? "bg-lime" : "bg-obsidian",
              )}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
      {s.flagship && (
        <p className="mt-8 border-t border-line-dark pt-6 text-sm font-semibold">
          {siteConfig.agencyMinimumDays}-day minimum engagement
        </p>
      )}
      <Link to={s.path} className={cn("mt-8", dark ? buttonStyles.light : buttonStyles.quietLight)}>
        Explore {s.name}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </article>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" className="border-t border-line-light">
      <SectionHead
        eyebrow="Services"
        title="Choose the service that fits where you are."
        intro="Three focused services. Each one starts with a discovery call to confirm the right scope."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-[1.12fr_1fr_1fr]">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </Section>
  );
}

/* 4. What we help build */
const buildItems = [
  {
    title: "Clear positioning",
    text: "A focused offer and a simple way to explain who you help.",
  },
  {
    title: "Stronger professional profiles",
    text: "Upwork and LinkedIn profiles that present your expertise clearly.",
  },
  {
    title: "LinkedIn personal visibility",
    text: "A professional presence that keeps your expertise in view.",
  },
  {
    title: "Relevant targeting",
    text: "Clients and opportunities that match what you do best.",
  },
  {
    title: "Proposals and outreach",
    text: "Messages written for the person and opportunity in front of you.",
  },
  {
    title: "Follow-up and improvement",
    text: "A steady follow-up routine and regular reviews of what to adjust.",
  },
];

export function BuildSection() {
  return (
    <Section className="border-t border-line-light">
      <div className="grid gap-14 lg:grid-cols-12">
        <SectionHead
          className="lg:col-span-4"
          eyebrow="What we help build"
          title="The parts of a clearer acquisition process."
        />
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:pt-2">
          {buildItems.map((item, i) => (
            <div key={item.title} className="reveal grid grid-cols-[2.25rem_1fr]">
              <span className="pt-1 font-display text-sm font-semibold text-ink-soft" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <dt className="font-display text-lg font-semibold tracking-[-0.01em]">
                  {item.title}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{item.text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* 5. LinkedIn personal brand */
const brandParts = [
  {
    title: "Profile positioning",
    text: "A headline, about section and featured work that match your offer.",
  },
  {
    title: "Content pillars",
    text: "A few clear themes that reflect your expertise.",
  },
  {
    title: "Post ideas and content planning",
    text: "Practical post ideas and a plan you can keep up with.",
  },
  {
    title: "Engagement and conversation strategy",
    text: "A considered way to engage with your audience and start conversations.",
  },
];

export function LinkedInBrandSection() {
  return (
    <Section className="border-t border-line-light">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="LinkedIn personal brand"
            title="Build authority before starting the conversation."
            intro="For agency founders and freelancers using LinkedIn, we help shape a professional presence that makes their expertise, audience, and offer easier to understand."
          />
          <Link
            to="/contact"
            search={{ channel: "linkedin" }}
            className={cn(buttonStyles.dark, "mt-10")}
          >
            Discuss My LinkedIn Strategy
          </Link>
        </div>
        <div className="lg:col-span-7">
          <ol className="divide-y divide-line-light border-y border-line-light">
            {brandParts.map((part, i) => (
              <li key={part.title} className="reveal grid grid-cols-[2.75rem_1fr] py-6">
                <span className="pt-1 font-display text-sm font-semibold text-ink-soft" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="type-title">{part.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{part.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft">
            LinkedIn personal-brand support is included when relevant to the selected Agency Growth
            or Freelancer Growth scope.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* 6. How it works */
const steps = [
  {
    title: "Assess",
    text: "We review your positioning, profiles, and current acquisition activity to see what works and where it stalls.",
  },
  {
    title: "Define",
    text: "We agree on your channel, target clients, and a focused scope, including who handles what.",
  },
  {
    title: "Implement",
    text: "The agreed improvements are put in place, from positioning and profiles to proposals, outreach, and follow-up.",
  },
  {
    title: "Improve",
    text: "We review progress regularly and refine the approach based on what we learn.",
  },
];

export function HowItWorksSection() {
  return (
    <Section className="border-t border-line-light">
      <SectionHead
        eyebrow="How it works"
        title="Four steps, from first review to steady improvement."
      />
      <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="reveal border-t-2 border-obsidian pt-6">
            <span className="font-display text-sm font-semibold text-ink-soft" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* 7. FAQ */
const faqs: [string, string][] = [
  [
    "Who does Up2Linkd work with?",
    "Established agencies, existing freelancers, and skilled professionals who are new to Upwork. Agency Growth is for agencies, Freelancer Growth is for freelancers who already work with clients, and Upwork Launch is for people starting on Upwork with a skill they can already deliver.",
  ],
  [
    "Should I use Upwork, LinkedIn, or both?",
    "It depends on your offer, your ideal clients, and the time you can commit. Upwork suits responding to active demand, while LinkedIn suits building visibility and relationships with a defined audience. We'll suggest a focus on the discovery call, and starting with one channel is fine.",
  ],
  [
    "Does the service include LinkedIn personal branding?",
    "Yes, when it's relevant. LinkedIn personal-brand support is part of Agency Growth and Freelancer Growth when it fits the agreed scope. It isn't a separate service, and Upwork Launch focuses on Upwork only.",
  ],
  [
    "What does Up2Linkd handle?",
    "It depends on the service. Agency Growth includes more hands-on work within the agreed scope. Freelancer Growth and Upwork Launch are guided support: we provide direction, reviews, and structure, and you carry out the agreed activities. Each service page sets out who handles what.",
  ],
  [
    "Do you guarantee clients or revenue?",
    "No. We don't guarantee clients, revenue, audience growth, engagement, or viral content. Results depend on your offer, your market, and consistent follow-through. What we commit to is clear, focused work within the agreed scope.",
  ],
  [
    "How does pricing work?",
    `Pricing depends on the service and the scope we agree after the discovery call. You'll receive a clear written proposal before any work begins. Agency Growth engagements have a ${siteConfig.agencyMinimumDays}-day minimum.`,
  ],
];

export function FaqSection() {
  return (
    <Section id="faq" className="border-t border-line-light">
      <div className="grid gap-12 lg:grid-cols-12">
        <SectionHead className="lg:col-span-4" eyebrow="FAQ" title="Questions, answered." />
        <div className="reveal lg:col-span-8">
          {faqs.map(([question, answer]) => (
            <details
              key={question}
              name="faq"
              className="group border-t border-line-light last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-semibold tracking-[-0.01em] md:text-xl [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  className="size-5 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="max-w-2xl pb-7 pr-10 leading-relaxed text-ink-soft">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
