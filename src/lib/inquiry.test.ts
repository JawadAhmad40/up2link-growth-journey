import { describe, expect, it } from "vitest";
import { applyContactSearch, emptyInquiry, validateInquiry, type InquiryData } from "./inquiry";

describe("applyContactSearch", () => {
  it("preselects the service, the customer type it serves, and the channel", () => {
    expect(
      applyContactSearch(emptyInquiry, { service: "upwork-launch", channel: "upwork" }),
    ).toMatchObject({ service: "upwork-launch", customerType: "new-to-upwork", channel: "upwork" });
  });

  it("preselects LinkedIn from the personal-brand CTA without choosing a service", () => {
    expect(applyContactSearch(emptyInquiry, { channel: "linkedin" })).toMatchObject({
      channel: "linkedin",
      service: "",
      customerType: "",
    });
  });

  it("keeps a customer type the visitor already chose", () => {
    const data = applyContactSearch(
      { ...emptyInquiry, customerType: "existing-freelancer" },
      { service: "agency-growth" },
    );
    expect(data.customerType).toBe("existing-freelancer");
  });
});

describe("validateInquiry", () => {
  const valid: InquiryData = {
    name: "Sam",
    email: "sam@example.com",
    website: "",
    customerType: "agency-owner",
    service: "agency-growth",
    channel: "both",
    challenge: "Our proposals rarely get replies.",
  };

  it("accepts a complete inquiry without a website", () => {
    expect(validateInquiry(valid)).toEqual({});
  });

  it("requires each choice and a valid email", () => {
    const errors = validateInquiry({
      ...valid,
      email: "sam@",
      customerType: "",
      service: "",
      channel: "",
    });
    expect(Object.keys(errors).sort()).toEqual(["channel", "customerType", "email", "service"]);
  });
});
