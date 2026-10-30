import {
  getService,
  type Channel,
  type ContactSearch,
  type CustomerType,
  type ServiceId,
} from "@/config/site";

/**
 * Inquiry submission integration point.
 * No backend or email service is connected yet, so this returns
 * `not_configured` and the UI says honestly that nothing was sent.
 * Connect a real handler here (e.g. a server function writing to a database
 * or sending email) and return `{ status: "sent" }` on success.
 */
export interface InquiryData {
  name: string;
  email: string;
  website: string;
  customerType: CustomerType | "";
  service: ServiceId | "not-sure" | "";
  channel: Channel | "";
  challenge: string;
}

export type InquiryResult =
  { status: "sent" } | { status: "not_configured" } | { status: "error"; message: string };

export const INQUIRY_BACKEND_CONFIGURED = false;

export async function submitInquiry(_data: InquiryData): Promise<InquiryResult> {
  if (!INQUIRY_BACKEND_CONFIGURED) return { status: "not_configured" };
  return { status: "error", message: "No handler implemented." };
}

export const emptyInquiry: InquiryData = {
  name: "",
  email: "",
  website: "",
  customerType: "",
  service: "",
  channel: "",
  challenge: "",
};

/**
 * Preselect what the visitor chose before arriving: the service or channel from the CTA they
 * clicked, plus the customer type that service is for (unless they already picked one).
 */
export function applyContactSearch(data: InquiryData, search: ContactSearch): InquiryData {
  const next = { ...data };
  if (search.service) {
    next.service = search.service;
    if (!next.customerType) next.customerType = getService(search.service).customerType;
  }
  if (search.channel) next.channel = search.channel;
  return next;
}

export function validateInquiry(d: InquiryData) {
  const e: Partial<Record<keyof InquiryData, string>> = {};
  if (!d.name.trim()) e.name = "Please enter your name.";
  if (!d.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
    e.email = "Please enter a valid email address.";
  if (!d.customerType) e.customerType = "Please choose what describes you best.";
  if (!d.service) e.service = "Please choose a service, or “Not sure yet”.";
  if (!d.channel) e.channel = "Please choose a channel, or “Not sure”.";
  if (d.challenge.trim().length < 10)
    e.challenge = "Tell us a little more (at least 10 characters).";
  return e;
}
