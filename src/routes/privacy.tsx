import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy Policy — Up2Linkd", "Up2Linkd privacy policy."),
  component: () => <LegalPage title="Privacy Policy" />,
});
