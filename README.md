# Up2link Growth Journey

Marketing site for Up2Linkd, built with TanStack Start (React 19, TypeScript, Tailwind CSS 4).
Up2Linkd helps agencies and skilled freelancers win clients through Upwork and LinkedIn.

## Pages

| Route                         | Page                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| `/`                           | Homepage                                                    |
| `/services/agency-growth`     | Agency Growth (flagship, 90-day minimum)                    |
| `/services/freelancer-growth` | Freelancer Growth                                           |
| `/services/upwork-launch`     | Upwork Launch                                               |
| `/our-approach`               | Our Approach                                                |
| `/contact`                    | Contact form. `?service=` and `?channel=` preselect answers |

Services, form options and links live in `src/config/site.ts`. The contact form is not
connected to an inbox yet: `src/lib/inquiry.ts` is the place to wire one up, and until then the
form tells visitors their details were not sent.

## Development

You need [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

The dev server runs at http://localhost:8080.

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `bun run dev`   | Start the dev server             |
| `bun run test`  | Run the tests (Vitest)           |
| `bun run lint`  | Lint with ESLint                 |
| `bun run build` | Production build into `.output/` |

## Deployment

`bun run build` produces a Cloudflare Workers bundle in `.output/` using Nitro's
`cloudflare-module` preset, and Nitro prints the deploy command when the build finishes.
The Worker name is pinned in `wrangler.jsonc`. To target another host, set `NITRO_PRESET`
(for example `NITRO_PRESET=node-server`) or change the preset in `vite.config.ts`.
