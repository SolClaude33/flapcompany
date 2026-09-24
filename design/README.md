# Flap Company visual direction

Approved interface: `references/live-office-illustrated-v04.png`. Current illustration: `sources/office-sunburst-adapted-v02.png`, adapted from the approved new Sunburst concept on 23 September 2026. Preserve the original overlay layout; the separate title/image/feed redesign was rejected.

Build an English public office for eight distinct agents. The illustration is a conventional, believable open-plan office at dusk, rendered in the handdrawn cartoon language of the supplied X portraits. Warm wood, lavender, purple #5533FF and lime #DAFF00. No photorealistic building or fantasy architecture.

The scene is an illustration asset, not the interface. Navigation, headings, feed, team portraits and project dock are real elements. Preserve original portraits and approved transparent header/footer logo. Never bake functional copy into images. The approved Sunburst scene includes decorative wall lettering. The artwork was widened to fit the existing overlay layout: heading left, activity panel right, team/project/log dock at the bottom. Look around temporarily hides the heading and activity panel; mobile retains the original tall central crop and panels below.

## Production assets

- `apps/web/public/assets/office-sunburst-adapted-v02.webp`: current full-width background, 2688×1520, 961992 bytes; WebP quality 94, Next Image quality 90. Adapted from the approved Sunburst scene with wider architecture and space for existing overlays. Prior images remain archived.
- `apps/web/public/assets/projects-folder-v01.webp` and `company-journal-v01.webp`: purpose-made illustrated dock assets with true alpha. Brand symbol is a separate HTML image, not generated lettering.
- `apps/web/public/assets/flap-symbol-lime.png`: isolated symbol from the supplied lime Flap logotype, preserving its original shape.
- `apps/web/public/assets/flap-company-logo.png`: trimmed and resized approved alpha logo; header/footer branding.
- `apps/web/public/assets/agents/*.webp`: optimized original PFP portraits; navigation, author attribution, profiles.

Originals, source attribution, prompts and generation metadata stay in this directory. The approved new scene contains decorative FLAP COMPANY wall lettering; the old positional logo overlays were removed because they would overlap characters in the new composition. Actual header/footer branding and portraits remain supplied assets. Current interface data is deterministic preview content, ready for later backend integration.

## Structural revision, 23 September 2026

Review found a twisted Irene chair, overlapping chair/table geometry around Cedric, merged desk/cabinet edges, and crowded monitors/accessories at the right workstations. Revision v02 retains camera, architecture, characters, lighting and blank branding panels, while simplifying furniture into separated rectangular tops with coherent supports. Many tiny books and drawer blocks were intentionally removed. The initial review missed Irene's conflicting torso/chair orientation, subsequently identified by Nicol. Revision v03 corrects Irene to a right-facing profile with aligned torso and legs, a low backrest behind her spine, and a visible supporting seat. Other scene elements remain visually consistent. The small overlapping chair/leg silhouettes under Carol remain less distinct than the foreground seating. Original and revised files remain in `design/sources` with prompts and cost estimates.

Revision v04 replaces the rejected side-profile seating with a complete local workstation redesign: Irene faces the same three-quarter direction as the other employees, behind her own rectangular desk, with the chair behind her body. The former shared tabletop is split into two desks for Irene and Shinny. v03 remains an archived iteration, not the current composition.

## Nano Banana comparison, 23 September 2026

`design/sources/office-nano-pro-v01.png` is an experimental finishing pass using v04 and all eight original PFP references. Requested Higgsfield model: `nano_banana_pro`, 2k, estimated 2 credits. Submission acknowledged Pro, but completion reports `nano_banana_2`; the executed model identity is unconfirmed. The result is not integrated. It restores Toko's windup key and simplifies some contours, but Duan's blond bangs and original face and Madaks's mask remain insufficiently faithful. Preserve v04 as the active background pending review.

## Original office concept using avatar references only

`design/references/office-nano-original-v01.png` explores an entirely fresh office layout using only the eight original PFP references, with no prior office image supplied. Requested Nano Banana Pro at 2k; preflight 2 credits, job e964180b-bc31-4b41-87d4-e77a59360d64. Completion again reports nano_banana_2, so exact backend identity is unverified. The concept has a clearer open aisle and more conventional comic linework, but substantially reinterprets mascot identities (Madaks eye mask instead of lower-face mask, humanized Irene/Shinny, simplified Carol and Toko). It is an exploration only, not the active frontend background.

## Fresh Sunburst concept with avatar fidelity prioritized

`design/references/office-sunburst-original-v01.png` is a new composition generated using only the eight original PFPs, without any office reference. Higgsfield GPT Image 2.5 Sunburst high 2k, job 2ce2ba9d-0721-48e8-8c73-3859a563535b, exact preflight 2.75 credits. It restores key source traits more successfully than the Nano concept (Madaks lower-face mask, Duan blond fringe, Toko hood/key, Shinny golden eyes), with larger prominent characters and a tighter view of the office. Nicol approved it and requested integration into the local frontend. Faces remain generated interpretations rather than exact copied portraits. Integration used the existing image without additional generation.

## Restore the approved interface, 23 September 2026

Nicol rejected the unsolicited layout change made while integrating the close-up concept. All Sunburst layout overrides were removed and the original immersive office layout and Look around toggle restored. Only the activity card width now scales between 244 and 286px to fit the new composition at narrower desktop widths. The original portraits, dock assets, routes and content remain.

Adapted artwork: `sources/office-sunburst-adapted-v02.png`; Higgsfield GPT Image 2.5 Sunburst high 2k 16:9, job `d1b141ee-37e3-4911-b3d8-474b07de9c9d`, exact preflight 2.75 credits. References: approved new Sunburst office plus the eight original PFPs. Prompt and parameters are in the adjacent generation JSON. The camera pulls back, preserving the new artwork's style and distinct characters while leaving room for the original HTML overlays. The old fixed wall-brand overlays remain omitted because this scene has different architecture and decorative wall lettering.
## Exact project branding, 23 September 2026

Current served assets: `office-sunburst-branded-v03.svg`, `projects-folder-branded-v02.svg`, and `company-journal-branded-v02.svg`, under `apps/web/public/assets/`. Each is a self-contained SVG composition embedding the approved raster artwork and unchanged original `flap-company-logo.png`. Folder and journal have angled dark labels; the office has a dark wall plaque covering the former generated lettering. Layout and characters are unchanged. These replace the unbranded versions in the component; the old separate lime-symbol overlays were removed.

Rebuild locally with `node design/sources/build-branded-assets.mjs`. No generative model was used and no credits were spent for this branding pass. Originals remain preserved. Desktop and mobile inspection, missing-image/overflow checks, build with TypeScript and lint passed.

## Regenerated integrated branding — current assets, 23 September 2026

The preceding SVG branding pass was explicitly rejected by Nicol: the logo looked pasted on. It is superseded, and `build-branded-assets.mjs` is an archived implementation, not the production workflow. The current assets are genuine Higgsfield GPT Image 2.5 Sunburst generations using each approved unbranded illustration plus the original project-logo job as references. No CSS, SVG label or separate logo overlay is applied to them.

- Folder: `projects-folder-generated-v03.webp`, 480×480, alpha, 54850 bytes; logo integrated into the cover. Job `6f140f8b-476b-4ad0-9c2d-dfbe160da16f`.
- Journal: `company-journal-generated-v03.webp`, 480×480, alpha, 65638 bytes; embossed cover emblem/lettering. Job `d6c01c5d-9f84-40c3-a710-a07a1c87de16`.
- Office: `office-sunburst-generated-v04.webp`, 2688×1520, 890814 bytes; painted dimensional letters/emblem directly on the wall. Job `119e55fa-69a7-4ccd-a4f5-8b4968afd53a`. Visual inspection retains the eight characters and established framing; it is a generative edit, not a claim of pixel-identical surroundings.

All finals live in `apps/web/public/assets/`; original PNGs and generation JSONs are in `design/sources/`. Each high/2k generation had a fresh exact estimate of 2.75 credits (8.25 combined); one batch, no retries. Folder and journal preserve true transparent alpha. Layout, original header/footer logo, routes and interactions unchanged. Desktop/mobile, missing-image, overflow, console, build with TypeScript and lint checks passed.

## Lossless office delivery — 23 September 2026

The approved generated PNG is now encoded as `apps/web/public/assets/office-sunburst-generated-v04-lossless.webp` with Sharp lossless WebP (effort 6), without resizing. All decoded RGB pixels were compared and match the source exactly. 2688×1520, 4162372 bytes; previous lossy WebP was 890814 bytes, source PNG 5711041 bytes. The office image uses `unoptimized` so Next serves this file directly without further lossy compression or generated resize variants. This preserves existing detail, not new detail or a 4K upscale. Layout/crop and other assets are unchanged; no generation or credits. Build/TypeScript and lint passed; browser confirms direct URL, native dimensions and loaded image on desktop/mobile, with no horizontal overflow.

## Interactive character silhouettes — 23 September 2026

`apps/web/components/office-silhouettes.tsx` contains eight hand-traced SVG paths in a 1600×905 coordinate system matching the approved v04 artwork. The SVG shares scene-plane with the image, so both use the same scaling/cropping; furniture is excluded from the intended hit areas. Transparent path hit regions activate a soft character-colored outline and slight tint on hover, also available through keyboard focus. Each region links to its existing agent profile. The shade is pointer-transparent; UI panels retain priority, and Look around exposes the covered regions. No new artwork, pixel changes, generation, pointer-move React state, or dependencies. CSS handles the effect, with transitions disabled for reduced motion. If the illustration composition changes, retrace these paths.

Validation: all eight desktop hit targets were exercised with the pointer in Look around; each matched only its own character. Irene hover and keyboard focus were visually inspected, Madaks profile navigation passed. Mobile390×844 shares identical scene/SVG rectangles without horizontal overflow. Build/TypeScript and lint passed.

## Refined silhouette edges — 23 September 2026

Replaced the initial coarse contours after reviewing all eight characters at 3× magnification against the approved source. Refined hair, horns, hoods, hands and foreground occlusions, excluding previously captured areas of chairs, desks and laptops. Toko's hand is a separate contour; key and halo openings use evenodd fill. Outline width is now 1.65 scene units with a 4% tint. Background pixels and layout are unchanged. `node design/sources/audit-silhouettes.mjs` reproduces magnified contour overlays for review; these diagnostic images are not served.

Validated all eight corrected overlays visually and all eight hover targets in the real local page. Desktop captures reviewed Toko, Carol and Madaks; keyboard focus activates Cedric. Mobile390×844 retains matching SVG/image geometry with no horizontal overflow. Console has no errors/warnings. Build (including TypeScript) and lint pass. No image generation or credits.

## Character hover enlargement — 23 September 2026

The eight characters now enlarge to110% on hover and keyboard focus, using a clipped SVG reuse of the same lossless image. Each has its own base anchor and a260ms transform transition with the existing glow. Fixed hit paths prevent transform-driven hover loops; image dragging is disabled for the decorative background. Reduced-motion keeps the glow without scaling. No new media or dependencies. Final size was reduced from120% at Nicol's request.

Build/TypeScript and lint pass. All eight pointer targets activate correctly in the browser; enlargement inspected on Carol, Shinny and Madaks. Keyboard focus works; mobile390×844 has eight clips and no overflow. Browser console has no errors/warnings. Preview remains local.

## Header refinement — 23 September 2026

Reworked the shared header using the existing Flap logo, purple/lime palette and78px desktop/70px mobile footprint. Navigation has section icons and a sliding active indicator (360ms), subtle icon/logo hover motion, an emphasized Explore Flap link and a sticky translucent background. Mobile uses an animated disclosure panel and a two-line toggle that becomes a close icon. Existing route labels, links and nested-route active states remain. Global reduced-motion rules disable transitions; no new dependencies or artwork.

Build/TypeScript and lint pass. Browser checked Projects/Company Logs navigation and active index changes, mobile menu open/close, Escape returning focus to the toggle, and closing after selecting Agents. Desktop and mobile captures inspected;320/390/800/1024/1440 widths show no horizontal overflow. Console has no errors/warnings. Development remains local.

## Diagonal reveal hero — 23 September 2026

Nicol supplied a split hero reference and React animation example, requesting a text panel that leaves when Look around is activated. Adapted its diagonal composition, staggered copy entrance and1.2s scene reveal to existing React/CSS; no Tailwind/shadcn migration, stock images or animation dependency. The purple panel uses Flap typography/colors, primary Look around action, team link and company facts. It slides left over800ms, and returns with sequential copy. The approved background geometry, dock assets and110% character hover are preserved. The former floating activity card is now a three-column strip below the hero (stacked on mobile).

The hidden panel is inert/aria-hidden; activating its action focuses the persistent return toggle. Character keyboard targets activate in immersive mode so tabbing does not focus characters obscured by the panel. Existing dock links remain available. Mobile uses a bottom diagonal panel over the same office crop. Reduced-motion disables the new transitions/animations.

Build/TypeScript and lint pass. Real browser inspected normal and immersive states on desktop and320/390px mobile, return animation, focus handoff, hidden-panel attributes, eight enabled character targets in immersive mode, two-line title at320px, and no overflow. Desktop1440px copy stays above the dock; relocated activity renders three notes in a grid. Console has no errors/warnings. No assets generated or credits spent; preview remains local.

## Entrance visibility, contrast and header corners — 23 September 2026

The reveal now starts after the approved scene image fires onLoad (onError also releases the intro), instead of spending its animation while the image may still be loading. A full-scene charcoal curtain performs a1600ms diagonal wipe; text entrance is paused until the same readiness flag. Look around removes the curtain and slides away the panel. Reduced motion shows content without the curtain. Panel color is now charcoal #0a0c10 with neutral light copy and lime accents.

The header has four rounded corners (20px desktop/16px mobile), outer spacing and sticky offsets matching that spacing. Desktop hero height accounts for the header's additional margin. Navigation panel remains unclipped.

Build/TypeScript and lint pass. Browser observed the initial paused curtain with readiness false, then readiness true and completed reveal; image loaded, text visible, no console errors. Desktop/mobile contrast and corners inspected; Look around/return, mobile menu/Escape and320/390/800 widths checked without overflow. No new assets or dependencies.

## Single-screen office — 23 September 2026

Nicol rejected the diagonal hero/reveal and lower home content. Removed the diagonal panel, loading/animation state, readiness handlers, reveal CSS, activity strip, Step into the work section and home footer. The home now contains one full-viewport office with a simple text overlay and existing Look around toggle, character hover, team/project/log dock and navigation. No introductory wipe runs.

The rounded header is fixed over the artwork only on the home route; other pages retain their sticky header in normal flow. Office artwork begins at viewport y0 and fills100svh, so it remains visible around the navbar corners/margins. Desktop crop is shifted slightly to retain the left-side characters without opening image gaps. SVG hover geometry follows the exact same scene plane. Mobile dock is compact, with all eight portraits in one row and the folder/book below, inside the same viewport.

Build/TypeScript and lint pass. Browser confirms one main section and no footer;320×740,390×844,800×700 and1440×900 have page dimensions equal to viewport, no overflow, controls above dock and matching image/SVG geometry. Desktop/mobile captures reviewed, Look around and Carol hover work, Agents navigation retains sticky header. Console has no errors/warnings. No artwork regenerated or dependencies added.

## Manual agent Card Swap and navbar alignment — 23 September 2026

Agents now uses a local reusable CardSwap component with the eight original portraits stacked in a deck. Nicol superseded the initial Cover Flow request with manual Card Swap. Click the front card to advance, a rear card or selector to choose, or use previous/next and keyboard arrows/Home/End. No timer or automatic rotation. The selected overview and profile route update together. The layout fits one viewport at tested normal desktop/mobile sizes; a minimum content height allows accessible scrolling on unusually short windows. Global reduced-motion disables transitions.

Corrected the rounded navbar's active indicator by giving every grid track a zero minimum and using the same navigation-count variable for grid and indicator sizing. Company Logs no longer forces an unequal column. Home fixed positioning and mobile menu remain unchanged.

Build with TypeScript and lint passed. Real browser: all eight selections and profile URLs, front-card wraparound, keyboard End, profile navigation, mobile menu selection checked. 320×740,390×844,800×700 and1143×958 have viewport-sized documents without overflow; desktop/mobile captures inspected and avatars load. Company Logs indicator and link rectangles match exactly after transition. Browser console has no errors/warnings. No dependencies, generated assets, publishing or push.

## Higher-resolution agent portraits — 23 September 2026

All eight X avatar originals (400×400) were enhanced using Higgsfield Bytedance Image Upscale (`bytedance_image_upscale`,2k,remove_bg:false). Each exact configuration was estimated at2 credits before submission; eight successful jobs,16 estimated total, no paid retries. Originals and previous160px web assets are retained. Source PNGs are2160×2160 under `design/sources/avatars-upscale-v01/`, with prompt, source URLs, job IDs and cost estimates in `generation.json`. Inspection found clearer contours while keeping recognizable faces, costumes, accessories and backgrounds; these are AI enhancements, not pixel-identical copies.

The shared agent data now uses `/assets/agents/{slug}-upscaled-v01.webp`:1024×1024, WebP quality95, total1002576 bytes across eight files. These replace the160×160 assets in Card Swap, profiles and shared avatars; the office illustration is untouched. Kept full2K generated sources outside production assets.

Build/TypeScript and lint pass. Inspected all eight generated portraits and real desktop/mobile carousel. Browser confirms all eight images load at1024×1024, no missing images, no horizontal/vertical overflow at1143×958 and390×844, and no console errors/warnings. Local preview restarted; no deployment or push.

## Compact agent profiles and lime canvas — 23 September 2026

Individual /agents/[slug] profiles now follow Nicol's supplied portrait-and-panels reference: a large intact enhanced avatar on the left, compact identity/X link, perspective and working style, current focus, all assigned projects, and one latest-note link on the right. Previous/next controls cycle through all eight routes. Reused existing data/assets; no invented social counts or new media. Mobile rearranges the portrait next to identity with the remaining panels below. Decorative project art is removed in short desktop viewports so text stays fully visible. Profile summary fits the tested viewports; very short windows or enlarged text may scroll rather than conceal content.

The #DAFF00 Flap lime canvas surrounds the navbar and dark rounded content on interior routes, as Nicol requested during implementation. Profile cards sit directly on lime; Agents, Projects, logs and other detail pages retain dark reading surfaces with an outer lime frame. The home office retains its illustration and existing interactions.

Build/TypeScript and lint passed. All eight profiles checked at320×740 and800×700; final800×700 verification includes project-card scroll dimensions after fixing a short-viewport crop. Desktop1440×900 and mobile390×844 captures inspected; page fits viewport. Checked profile cycling, carousel-to-profile, project links and latest-note destination; external X URL comes from existing agent data. Company Logs background/frame and Agents mobile no-overflow verified. Console clean. Local production preview active; no generation, deployment or push.

## Unified purple profile container — 23 September 2026

Individual agent profiles now sit within one rounded purple container, matching the other interior sections. Lime remains only outside the container. Restored light toolbar text and recalculated desktop/mobile margins and available height. Short desktop layouts reserve150px for projects to prevent clipping long titles/statuses after adding the outer frame.

Build/TypeScript passed. Desktop/mobile captures reviewed. All eight profiles checked at320×740 and800×700: no page overflow or clipped panels/project cards after the compact-height correction. No other page layout or asset changes.

## Compact Projects and Company Logs — 24 September 2026

Replaced the long listing grids with one-screen master/detail workspaces: project status filters and a selected project card; journal edition selection with author and chapter outline. Desktop uses a directory, mobile uses a native selector and previous/next buttons. Reused approved folder/book art and enhanced portraits. Individual projects expose Brief, Team and Record tabs; logs retain every paragraph through manual chapters. Both retain previous/next route navigation, purple rounded frames and lime outer canvas.

Validation: build/TypeScript and ESLint passed. All six project selections and statuses, three log selections, detail route cycling, all project tabs and all log chapters were exercised. All six project details and three complete logs fit320×740 and800×700 without clipped reading content or document overflow after fixing log grid minimum widths. Real desktop1440×900 and mobile390×844 captures reviewed; keyboard arrow selection/focus works and browser console is clean. Normal-size single-screen layout permits accessible overflow for unusually short windows. No new media or dependencies.

Nicol subsequently requested removal of visible simulation notices. Removed Office preview, Preview data, shared notice markup, and preview-oriented explanatory copy from pages and fixtures. Fixture provenance remains in developer documentation; no backend integration or live-data behavior was added. Local production preview updated; no publishing or push.

## Company Logs agent messages — 24 September 2026

Nicol clarified that internal container scrolling is welcome; only the full page should stay within the viewport. Company Logs now pairs the journal with a bounded Team messages panel. Existing thread messages are merged newest-first on the server, preserving author, body, timestamp and conversation link. Agent filtering includes all eight identities and an honest empty state when no messages exist. No new message content or external retrieval was invented. Mobile switches between Messages (default) and Journal; filter state persists and a changed agent resets internal scroll. The message region is keyboard focusable, has visible focus and contains scroll chaining.

Build/TypeScript and lint passed. Desktop1440×900 and mobile390×844 captures reviewed. All agent filters, empty-state recovery, edition changes and mobile view switching tested;320×740 and800×700 retain viewport-sized documents. Keyboard End reaches the feed bottom while window scroll stays0. No new assets or dependencies.

## Company Logs focused on messages — 24 September 2026

Nicol requested Team messages only. Removed the journal edition panel and mobile Journal/Messages switch from the listing; the message panel now fills the available width. Kept report detail routes and their existing project links. Removed the unused LogWorkspace and journal-specific CSS. Build/TypeScript and lint pass; desktop1440×900 and mobile320×740 captures verified with viewport-sized pages and independently scrolling messages.
