import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { buttonStyles } from "@/components/site/buttonStyles";
import { BookCallButton } from "@/components/site/PageBlocks";
import { Footer } from "@/components/site/Footer";
import { Navigation } from "@/components/site/Navigation";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <section className="surface-dark bg-obsidian text-paper">
      <div className="container-site flex min-h-[70svh] flex-col justify-center pb-24 pt-[calc(var(--nav-h)+4rem)]">
        <p className="eyebrow text-ash">404</p>
        <h1 className="type-page mt-5">Page not found</h1>
        <p className="mt-5 max-w-md text-lg text-ash">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookCallButton />
          <Link to="/" className={buttonStyles.quietDark}>
            Go to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="surface-dark flex min-h-screen items-center justify-center bg-obsidian px-5 text-paper">
      <div className="max-w-md text-center">
        <h1 className="type-section">This page didn't load</h1>
        <p className="mt-4 text-ash">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonStyles.primary}
          >
            Try again
          </button>
          <a href="/" className={buttonStyles.quietDark}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Up2Linkd" },
      {
        name: "description",
        content:
          "Upwork and LinkedIn client acquisition for agencies and skilled freelancers: clearer positioning, professional profiles, and a focused acquisition process.",
      },
      { property: "og:site_name", content: "Up2Linkd" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#0A0A0A" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-obsidian"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="overflow-x-clip">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
