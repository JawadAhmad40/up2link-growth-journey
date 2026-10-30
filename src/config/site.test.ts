import { describe, expect, it } from "vitest";
import { parseContactSearch, services, siteConfig } from "./site";

describe("services", () => {
  it("offers exactly three services, in menu order", () => {
    expect(services.map((s) => s.id)).toEqual([
      "agency-growth",
      "freelancer-growth",
      "upwork-launch",
    ]);
  });

  it("highlights only Agency Growth as the flagship", () => {
    expect(services.filter((s) => s.flagship).map((s) => s.id)).toEqual(["agency-growth"]);
  });

  it("links each service to its own page", () => {
    for (const s of services) expect(s.path).toBe(`/services/${s.id}`);
  });

  it("keeps the Agency Growth minimum at 90 days", () => {
    expect(siteConfig.agencyMinimumDays).toBe(90);
  });
});

describe("contact search params", () => {
  it("keeps a known service and channel", () => {
    expect(parseContactSearch({ service: "upwork-launch", channel: "upwork" })).toEqual({
      service: "upwork-launch",
      channel: "upwork",
    });
  });

  it("drops unknown or missing values", () => {
    expect(parseContactSearch({ service: "seo", channel: 3 })).toEqual({});
    expect(parseContactSearch({})).toEqual({});
  });
});
