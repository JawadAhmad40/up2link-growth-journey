import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero, Section } from "@/components/site/PageBlocks";
import { parseContactSearch, siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: parseContactSearch,
  head: () =>
    pageHead(
      "Book a Discovery Call — Up2Linkd",
      "Tell Up2Linkd where you are today and what you want to improve on Upwork, LinkedIn, or both, and book a discovery call.",
    ),
  component: Contact,
});

const nextSteps = [
  {
    title: "We read your answers",
    text: "So the call starts from your situation, not a generic pitch.",
  },
  {
    title: "Discovery call",
    text: "We talk through your goals and channels, and whether one of our services is a good fit.",
  },
  {
    title: "Clear proposal",
    text: "If there's a fit, you'll receive a written scope and pricing before any work begins.",
  },
];

function Contact() {
  const search = Route.useSearch();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a Discovery Call"
        lead="Tell us where you are today and what you want to improve. Your answers help us prepare for the call."
      />
      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm search={search} />
          </div>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <h2 className="type-title">What happens next</h2>
              <ol className="mt-6 space-y-7">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr]">
                    <span
                      className="pt-0.5 font-display text-sm font-semibold text-ink-soft"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink-soft">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {siteConfig.bookingUrl && (
                <p className="mt-8 leading-relaxed">
                  Prefer to pick a time now?{" "}
                  <a
                    href={siteConfig.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-4"
                  >
                    Choose a time for your call
                  </a>
                </p>
              )}
              <p className="mt-10 border-t border-line-light pt-6 text-sm leading-relaxed text-ink-soft">
                Not sure which service fits? Choose “Not sure yet” and we'll talk it through on the
                call.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
