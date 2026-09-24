# Repository Guidelines

## Project and scope
Flap Company is a local-first Next.js interface for an eight-agent research company. This phase implements the English public frontend with local fixture data. Worker orchestration, Firebase, authentication and X publication are future integrations. The matching personal project note is **Projects/flap-company**; resolve the vault through the owner's personal configuration.

## Structure
The npm workspace root coordinates `apps/web`. App Router routes live in `apps/web/app`; reusable components in `components`; typed, deterministic demo fixtures and retrieval functions in `lib/company-data.ts`. Public routes cover the office, agents, projects, activity, threads and Company Logs. All names are stable agent identities, never numeric agent IDs.

## Commands
Use Node 22 (pinned in `.nvmrc`). Install dependencies from the root with `npm ci`. The manifest defines `npm run dev` (loopback port 3100), `npm run build`, `npm run lint` and `npm run typecheck`. Record actual command results in the project note; a defined command is not evidence that it passed.

## Visual and asset conventions
The owner approved `design/references/live-office-illustrated-v04.png` and resumed implementation. Follow its illustrated conventional office, warm wood, evening windows, expressive cartoon employees and purple #5533FF / lime #DAFF00 branding. Eight actual illustrated X avatars are saved in `design/references/pfps/` with source URLs. Preserve the approved logo and original avatars; keep the supplied logo for interface branding. Decorative branding inside assets may be regenerated only when requested, using that logo as reference. Serve optimized assets from `apps/web/public/assets/`; originals and references stay in `design/`. Keep functional copy, hotspots, navigation and panels in HTML. Respect reduced motion, semantic landmarks, visible focus and keyboard controls.

## Validation and boundaries
The current home is a single-screen office with the rounded navbar floating over continuous artwork, a simple text overlay and the team/project/log dock. Nicol rejected the diagonal hero/wipe and requested removal of all lower home sections and footer; do not restore them. Current background: `office-sunburst-generated-v04-lossless.webp`, served directly with Next Image unoptimized; dock assets: `projects-folder-generated-v03.webp` and `company-journal-generated-v03.webp`. These regenerated illustrations integrate branding into their surfaces; rejected pasted SVG plaques must not return. Sources and metadata stay in `design/sources/`. Preserve reversible Look around, mobile controls and110% character hover. See `design/README.md` for revisions.

Check real desktop and mobile layouts, navigation, filters, keyboard focus, reduced motion, missing routes and asset requests. Run lint, typecheck and build. Demo activity must not impersonate an operating worker; no fabricated external findings. Do not expose prompts or credentials. Do not implement privileged admin actions as client-only security. Maintain an integration boundary around fixtures.

Keep development, installation, builds and previews local. The owner authorized initial delivery to SolClaude33/flapcompany on GitHub. Future pushes require task authorization; do not create another remote or deploy to Vercel on the owner's behalf. Higgsfield is for asset generation only; each image requires a current exact-cost estimate no greater than 3 credits. No video generation without specific authorization. One writer per file during delegation.

Agent portrait assets: use the enhanced `public/assets/agents/{slug}-upscaled-v01.webp` files via company-data.ts (1024px). The original400px references and2160px Higgsfield upscale sources/metadata remain under design/. Do not revert carousel images to the legacy160px thumbnails.

Interior routes use the Flap lime #DAFF00 outer canvas with dark rounded reading panels. Individual agent profiles are compact portrait/panel compositions with all assigned projects and previous/next navigation; preserve their one-screen normal-viewport layout and allow accessible overflow on unusually short/zoomed windows. The office route keeps its illustrated canvas.

Projects and Company Logs use compact master/detail workspaces with manual selection, status filters, project tabs and log chapters. Preserve the purple frame, lime outer canvas and approved folder/book assets. Nicol requested removal of user-facing simulation/preview notices; keep fixture provenance in developer documentation only.
Company Logs also exposes existing thread messages in a keyboard-accessible, independently scrolling panel. Internal scroll is explicitly allowed; preserve a viewport-sized outer page. Keep all agent filters and the empty state. Company Logs now shows Team messages only, at full width; do not restore the journal edition panel or mobile view switch.

Header X destination comes from optional `NEXT_PUBLIC_X_URL`; the button stays disabled when unset. Only a public HTTPS X/Twitter profile URL belongs there. See `apps/web/.env.example` and README for local/Vercel setup. The prepared Vercel project root is `apps/web`, using the root workspace lockfile; GitHub Actions runs local frontend checks. Preparation does not authorize pushing or deploying. Keep the authored September 23–24 story coherent across agents, projects, messages and reports: two active projects, one queued, no completed project or executed coin launch. Preserve fixture provenance in code/docs without restoring user-facing demo notices.
