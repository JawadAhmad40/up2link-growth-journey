import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { ContactSearch } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./buttonStyles";

/** The site's single primary CTA. Pass the service or channel to preselect on the form. */
export function BookCallButton({
  service,
  channel,
  className,
}: ContactSearch & { className?: string }) {
  const search: ContactSearch = {};
  if (service) search.service = service;
  if (channel) search.channel = channel;
  return (
    <Link to="/contact" search={search} className={cn(buttonStyles.primary, className)}>
      Book a Discovery Call
    </Link>
  );
}

/** Black page header used by every page except the homepage. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="surface-dark bg-obsidian text-paper">
      <div className="container-site pb-20 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+5.5rem)]">
        <p className="eyebrow text-ash">{eyebrow}</p>
        <h1 className="type-page mt-5 max-w-4xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">{lead}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("section-pad", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("reveal max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow text-ink-soft">{eyebrow}</p>}
      <h2 className={cn("type-section", eyebrow && "mt-4")}>{title}</h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  );
}

/** Short checked list for "what can be included" style content. */
export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-4 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-snug">
          <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Problems, principles and similar short points: a title and one or two lines each. */
export function PointGrid({
  points,
  className,
}: {
  points: { title: string; text: string }[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-12 md:grid-cols-3", className)}>
      {points.map((p) => (
        <li key={p.title} className="reveal border-t border-line-light pt-6">
          <h3 className="type-title">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{p.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** Who handles what: Up2Linkd on one side, the client on the other. */
export function Responsibilities({
  ours,
  yours,
  yoursTitle,
  note,
}: {
  ours: string[];
  yours: string[];
  yoursTitle: string;
  note?: ReactNode;
}) {
  return (
    <div className="reveal">
      <div className="grid overflow-hidden rounded-3xl border border-line-light md:grid-cols-2">
        <div className="bg-white/60 p-8 md:p-10">
          <h3 className="type-title flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-lime ring-1 ring-obsidian/20" aria-hidden />
            What Up2Linkd handles
          </h3>
          <CheckList items={ours} className="mt-6 sm:grid-cols-1" />
        </div>
        <div className="border-t border-line-light p-8 md:border-l md:border-t-0 md:p-10">
          <h3 className="type-title">{yoursTitle}</h3>
          <CheckList items={yours} className="mt-6 sm:grid-cols-1" />
        </div>
      </div>
      {note && <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{note}</p>}
    </div>
  );
}

/** Engagement terms as a quiet two-column list. */
export function Terms({ terms }: { terms: { label: string; text: string }[] }) {
  return (
    <dl className="reveal divide-y divide-line-light border-y border-line-light">
      {terms.map((t) => (
        <div key={t.label} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-10">
          <dt className="font-display font-semibold">{t.label}</dt>
          <dd className="leading-relaxed text-ink-soft">{t.text}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Closing call to action, in black so it leads into the footer. */
export function CtaBand({
  title,
  text,
  service,
  channel,
}: { title: ReactNode; text: ReactNode } & ContactSearch) {
  return (
    <section className="surface-dark bg-obsidian text-paper">
      <div className="container-site section-pad">
        <div className="reveal max-w-3xl">
          <h2 className="type-section">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">{text}</p>
          <BookCallButton service={service} channel={channel} className="mt-10" />
        </div>
      </div>
    </section>
  );
}
