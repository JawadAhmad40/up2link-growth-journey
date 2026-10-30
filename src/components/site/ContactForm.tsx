import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { channels, customerTypes, services, type ContactSearch } from "@/config/site";
import {
  applyContactSearch,
  emptyInquiry,
  submitInquiry,
  validateInquiry,
  type InquiryData,
} from "@/lib/inquiry";
import { buttonStyles } from "./buttonStyles";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof InquiryData, string>>;
type Status = "idle" | "sending" | "not_configured" | "sent" | "error";

const serviceOptions = [
  ...services.map((s) => ({ id: s.id, label: s.name })),
  { id: "not-sure" as const, label: "Not sure yet" },
];

const input =
  "mt-2 w-full rounded-xl border border-line-light bg-white px-4 py-3.5 text-obsidian placeholder:text-ink-soft/60 focus:border-obsidian";

export function ContactForm({ search }: { search: ContactSearch }) {
  const [data, setData] = useState(() => applyContactSearch(emptyInquiry, search));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // A CTA followed while already on this page still preselects its service or channel
  useEffect(() => {
    setData((d) => applyContactSearch(d, { service: search.service, channel: search.channel }));
  }, [search.service, search.channel]);

  function update<K extends keyof InquiryData>(key: K, value: InquiryData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateInquiry(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`field-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitInquiry(data);
    setStatus(
      result.status === "sent" || result.status === "not_configured" ? result.status : "error",
    );
  }

  const error = (key: keyof InquiryData) =>
    errors[key] ? (
      <p id={`error-${key}`} className="mt-2 text-sm font-medium text-danger">
        {errors[key]}
      </p>
    ) : null;
  const describedBy = (key: keyof InquiryData) => (errors[key] ? `error-${key}` : undefined);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Discovery call request"
      className="rounded-3xl border border-line-light bg-white/60 p-6 sm:p-8 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block font-medium">
          Name
          <input
            id="field-name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={input}
          />
          {error("name")}
        </label>
        <label className="block font-medium">
          Email
          <input
            id="field-email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={input}
          />
          {error("email")}
        </label>
        <label className="block font-medium sm:col-span-2">
          Website or profile <span className="font-normal text-ink-soft">(optional)</span>
          <input
            id="field-website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="Your website, Upwork or LinkedIn profile"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
            className={input}
          />
        </label>
      </div>

      <Choice
        name="customerType"
        legend="Which best describes you?"
        options={customerTypes}
        value={data.customerType}
        onChange={(v) => update("customerType", v)}
        error={error("customerType")}
        describedBy={describedBy("customerType")}
      />
      <Choice
        name="service"
        legend="Service interest"
        options={serviceOptions}
        value={data.service}
        onChange={(v) => update("service", v)}
        error={error("service")}
        describedBy={describedBy("service")}
      />
      <Choice
        name="channel"
        legend="Preferred channel"
        options={channels}
        value={data.channel}
        onChange={(v) => update("channel", v)}
        error={error("channel")}
        describedBy={describedBy("channel")}
      />

      <label className="mt-8 block font-medium">
        Main challenge
        <textarea
          id="field-challenge"
          rows={5}
          value={data.challenge}
          onChange={(e) => update("challenge", e.target.value)}
          placeholder="For example: our Upwork proposals rarely get replies, and we have no routine for following up."
          aria-invalid={!!errors.challenge}
          aria-describedby={describedBy("challenge")}
          className={cn(input, "resize-y")}
        />
        {error("challenge")}
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(buttonStyles.dark, "mt-8 w-full disabled:opacity-60 sm:w-auto")}
      >
        {status === "sending" ? "Sending…" : "Send my details"}
      </button>

      <div aria-live="polite" className="mt-6 empty:hidden">
        {status === "not_configured" && (
          <p className="rounded-2xl border border-line-light bg-paper p-4 text-sm leading-relaxed">
            <b>Your details were not sent.</b> This form isn't connected to an inbox yet, so we
            can't receive it. Your answers are still here.
          </p>
        )}
        {status === "sent" && (
          <p className="text-sm font-medium">
            Thanks, your details were received. We'll be in touch to arrange the call.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-danger">
            Something went wrong and your details weren't sent. Your answers are still here, so
            please try again.
          </p>
        )}
      </div>
    </form>
  );
}

/** A set of pill-shaped radio options. */
function Choice<V extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  describedBy,
}: {
  name: keyof InquiryData;
  legend: string;
  options: readonly { id: V; label: string }[];
  value: string;
  onChange: (value: V) => void;
  error: ReactNode;
  describedBy?: string | undefined;
}) {
  return (
    <fieldset className="mt-8" aria-describedby={describedBy}>
      <legend className="font-medium">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option, i) => (
          <label key={option.id} className="cursor-pointer">
            <input
              id={i === 0 ? `field-${name}` : undefined}
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="peer sr-only"
            />
            <span className="inline-flex rounded-full border border-line-light bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-obsidian/40 peer-checked:border-obsidian peer-checked:bg-obsidian peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-obsidian">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error}
    </fieldset>
  );
}
