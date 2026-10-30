/**
 * Central business configuration for Up2Linkd.
 * Edit values here — the navigation, service cards and contact form render from this file.
 * Unknown values are `null` on purpose so the UI never invents them.
 */

export const siteConfig = {
  name: "Up2Linkd",
  /** External booking link (e.g. Calendly). null → the contact page offers only the form. */
  bookingUrl: null as string | null,
  /** Company LinkedIn page. null → the footer hides the link. */
  linkedinUrl: null as string | null,
  /** Minimum Agency Growth engagement, in days. */
  agencyMinimumDays: 90,
};

export const customerTypes = [
  { id: "agency-owner", label: "Agency owner" },
  { id: "existing-freelancer", label: "Existing freelancer" },
  { id: "new-to-upwork", label: "Skilled professional new to Upwork" },
] as const;
export type CustomerType = (typeof customerTypes)[number]["id"];

export const channels = [
  { id: "upwork", label: "Upwork" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "both", label: "Both" },
  { id: "not-sure", label: "Not sure" },
] as const;
export type Channel = (typeof channels)[number]["id"];

export const serviceIds = ["agency-growth", "freelancer-growth", "upwork-launch"] as const;
export type ServiceId = (typeof serviceIds)[number];

export interface Service {
  id: ServiceId;
  name: string;
  path: `/services/${ServiceId}`;
  /** One line under the name in the Services menu. */
  menuLine: string;
  /** Who the service is for, as shown on the homepage card. */
  audience: string;
  includesLabel: string;
  includes: string[];
  /** Customer type the contact form assumes when opened from this service. */
  customerType: CustomerType;
  flagship: boolean;
}

export const services: Service[] = [
  {
    id: "agency-growth",
    name: "Agency Growth",
    path: "/services/agency-growth",
    menuLine: "Upwork and LinkedIn acquisition for established agencies",
    audience:
      "For established agencies wanting a stronger acquisition process through Upwork, LinkedIn, or both.",
    includesLabel: "May include",
    includes: [
      "Agency positioning",
      "Upwork acquisition",
      "LinkedIn outreach",
      "Founder LinkedIn personal brand",
      "Follow-up and performance reviews",
    ],
    customerType: "agency-owner",
    flagship: true,
  },
  {
    id: "freelancer-growth",
    name: "Freelancer Growth",
    path: "/services/freelancer-growth",
    menuLine: "Stronger positioning and steadier acquisition for freelancers",
    audience:
      "For existing freelancers who need stronger positioning and more consistent acquisition.",
    includesLabel: "May include",
    includes: [
      "Service positioning",
      "Upwork profile and portfolio",
      "LinkedIn profile optimization",
      "Personal-brand direction",
      "Content pillars and post ideas",
      "Proposal and outreach improvement",
      "Follow-up process",
    ],
    customerType: "existing-freelancer",
    flagship: false,
  },
  {
    id: "upwork-launch",
    name: "Upwork Launch",
    path: "/services/upwork-launch",
    menuLine: "A professional start on Upwork for skilled professionals",
    audience:
      "For skilled professionals who are new to Upwork and already have a skill they can deliver.",
    includesLabel: "Includes",
    includes: [
      "Focused service offer",
      "Upwork profile preparation",
      "Portfolio planning",
      "Opportunity selection",
      "Proposal guidance",
      "Starting activity plan",
    ],
    customerType: "new-to-upwork",
    flagship: false,
  },
];

export function getService(id: ServiceId): Service {
  return services.find((s) => s.id === id)!;
}

/** Search params the contact page accepts, so each CTA can preselect a service or channel. */
export interface ContactSearch {
  service?: ServiceId | undefined;
  channel?: Channel | undefined;
}

export function parseContactSearch(search: Record<string, unknown>): ContactSearch {
  const parsed: ContactSearch = {};
  const service = serviceIds.find((id) => id === search["service"]);
  const channel = channels.find((c) => c.id === search["channel"])?.id;
  if (service) parsed.service = service;
  if (channel) parsed.channel = channel;
  return parsed;
}
