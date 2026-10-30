import { HeroWorkflow } from "./HeroWorkflow";
import { buttonStyles } from "./buttonStyles";
import { BookCallButton } from "./PageBlocks";

export function HeroSection() {
  return (
    <section className="surface-dark bg-obsidian text-paper">
      <div className="container-site grid items-center gap-14 pb-20 pt-[calc(var(--nav-h)+3rem)] md:gap-16 md:pb-24 lg:min-h-[min(100svh,56rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:pt-[calc(var(--nav-h)+2rem)]">
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-3 text-ash">
            <span className="size-1.5 rounded-full bg-lime" aria-hidden />
            Upwork &amp; LinkedIn client acquisition
          </p>
          <h1 className="type-hero mt-6">Build a clearer path to your next client.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
            Up2Linkd helps agencies and skilled freelancers strengthen their positioning, build
            professional visibility, and create a focused client-acquisition process through Upwork
            and LinkedIn.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <BookCallButton />
            <a href="#services" className={buttonStyles.quietDark}>
              Explore Our Services
            </a>
          </div>
        </div>
        <HeroWorkflow />
      </div>
    </section>
  );
}
