import { PageHero, Section } from "./PageBlocks";

export function LegalPage({ title }: { title: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <Section>
        <div className="max-w-2xl rounded-3xl border border-line-light bg-white/60 p-8">
          <p className="font-display font-semibold">This page still needs to be written</p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            The final {title.toLowerCase()} has not been written or legally reviewed yet, so nothing
            on this page should be treated as legal terms.
          </p>
        </div>
      </Section>
    </>
  );
}
