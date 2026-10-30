import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms of Service — Up2Linkd", "Up2Linkd terms of service."),
  component: () => <LegalPage title="Terms of Service" />,
});
