# Portfolio Build Progress

## Current stage

Design change request v10.1 — Part F: Projects

## Completed

- Completed and approved the v10.1 design plan.
- Recorded approval to move the Hero from `src/components/Hero.tsx` to `src/sections/Hero.tsx` during the Hero part, not Part A.
- Read-only approved inspection measured supplied avatar PNGs at 3,691,018 bytes total.
- Read-only approved contrast calculations completed for the proposed warm-neutral theme and accents.
- Approved avatar conversion conditions: user obtains `cwebp`; verify only after user confirms it is present; dry-run file/width listing before conversion; conversion output is separate; source images remain untouched.
- Read-only Stage 1 inspection and plan approved.
- The temporary scaffold command initially used an unsafe Windows path and created `CUsersuserAppDataLocalTempportfolio-scaffold` inside the repository.
- The accidental folder was deleted manually in VS Code.
- Verified the folder was gone and protected root files remained present.
- Created a temporary scaffold outside the repository at `C:\Users\user\AppData\Local\Temp\portfolio-scaffold`.
- Copied only the approved scaffold files.
- Did not copy the template README or `.gitignore`.
- Confirmed existing `.gitignore` already ignores `node_modules/` and `dist`.
- Pinned and installed the approved Stage 2 dependencies.
- Package name changed to `solar-portfolio`.
- Added the Solar Amber design tokens and no-flash theme script.
- Added reusable button, container, heading and reveal/theme hooks.
- Added placeholder personal, skills, projects and GitHub data files.
- Implemented the localized manual Projects section and reusable project card; no GitHub fetching was added.
- Previous Projects horizontal scroll-snap carousel implementation is superseded.
- Reworked Projects as a permanent localized 3D ring for four or more projects, with simple layouts below four and a reduced-motion static list.
- Added five temporary PREVIEW ONLY ring fixtures with localized copy and alt text, two technology placeholders each, inline SVG thumbnails, and `#` links; remove them only in a separate step when requested.
- Resized the permanent 3D ring with fluid CSS custom properties and aria-hidden zero-layout measurement elements.
- Reserved a 72px right gutter for the fixed contact strip; heading is above the ring at every width.
- Ring revision 3 uses 200px cards, 115px radius and 70px lift at 320px, reaching 380px cards, 330px radius and 150px lift from 1280px upward.
- Ring revision 3 build passed; lint passed with no findings.
- Cascade fix: removed project-ring custom-property fallback declarations from the base theme block and covered widths below 320px with the `max-width: 359px` rule.
- Cascade fix validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- Added an opaque ring-card surface with a pointer-transparent depth tint overlay; front cards have no tint and opacity remains 1.
- Solid-card tint overlay validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- E1 fix pass: replaced cloud pseudo-elements with a measured scalloped SVG, fixed 72px player cards, and preserved/repaired rewind/forward focus.
- E1 fix-pass validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- E1 cloud fix 2: ported the puffed irregular SVG outline generator, applied 36px safe padding, and made player/bar content shrink inside narrow clouds.
- Repaired the cloud size effect placement and reran final build/lint validation.
- E1 cloud fix 2 final validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- E1-b: under-player cloud expansion and fluid desktop/mobile cloud sizing are being implemented.
- E1-b final validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- E1-b feedback: 72px gutter retained, minimum cloud width lowered to 200px, and available-width clouds now wrap player controls below 200px of timeline width.
- E2 corner menu: desktop half-fan/active-pill, hysteresis, mobile hamburger fan, heading focus and 400ms leave delay implemented.
- E2 final validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- E1-b minimum cloud width reduced to 200px with the 200px anchor; narrower columns use their actual available width and 240px-anchor metrics.
- E1 cloud fix 2 validation pending build and lint.
- E1 Education redesign: converted entries to compact player cards with accessible detail clouds, start/end periods, looping rewind/forward controls and reduced-motion period dots.
- Fixed the Education outside-click/Escape effect dependency before final lint validation.
- E1 final validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.
- Added the localized Education timeline section with UTAR Year 1 real values and placeholder-only remaining entries.
- E2 corner menu implementation in progress: desktop fan geometry, hysteresis, mobile hamburger fan and heading focus behavior added.
- Made existing skill cards float with subtle irregular motion and pause/hover lift, preserving non-interactive behavior and all skill content.
- Part G final validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.

## In progress

- Part G Education implemented; awaiting build/lint feedback.

## Validation

- `npm.cmd run build` passed: TypeScript and Vite production build completed successfully.
- `npm.cmd run lint` passed with no Oxlint findings.
- Navigation validation: `npm.cmd run build` and `npm.cmd run lint` passed.
- Part B final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.
- Part C final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.
- Part D final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.
- Part E final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.
- Revised Part F 3D ring build passed; lint passed with no findings.
- Ring size revision: build passed; lint passed with no findings.
- Ring size revision 2: cards enlarged with piecewise continuous CSS ranges; heading remains at the smaller h2 size and the side-by-side breakpoint is 1235px.
- Ring size revision 2 build passed; lint passed with no findings.
- Revised Part F validation: `npm.cmd run build` passed; `npm.cmd run lint` passed with no findings.

### Design change request v10.1 — Part A validation

- `npm.cmd run build` passed after fixing an initial JSX-in-`.ts` error.
- `npm.cmd run lint` passed with no findings after separating the language context hook.

## Pending

- Remove the three temporary PREVIEW ONLY entries from `src/data/projects.ts` only after a separate request.
- Continue with the next approved portfolio part.
- GitHub integration.
- Testing and deployment preparation.

## Decisions

- Theme: light first visit using `#EDE8E0`; saved choice in `localStorage`, applied before first paint.
- Palette: warm-neutral light/dark tokens and approved accent set from v10.1.
- Navigation: hash anchors.
- Tailwind: v4 with the Vite plugin.
- Languages: English default, Simplified Chinese and German; typed dictionaries, no i18n package.
- React Icons deferred/not planned for the redesign; custom SVGs for contact marks.
- Playwright deferred to Stage 5.
- Avatar originals stay unchanged; any WebP conversion requires a dry run and separate approval.

## Stage 3: Navigation

- Added a sticky, responsive single-page navigation bar.
- Added active-section tracking, hash links, mobile-menu Escape handling and focus management.
- Moved the theme toggle into the navigation bar.
- Added the approved Solar Amber SVG favicon placeholder.
- The original navigation and first Hero version are superseded by design change request v10.1.

## Design change request v10.1

- Part A completed: added the approved warm-neutral tokens, subtle CSS-only background, light-first theme persistence, and typed English/Simplified Chinese/German dictionary foundation.
- Theme and language choices are applied before first paint when saved values exist; light and English are the defaults.
- Personal Hero text now has language-specific placeholders in `src/data/personalInfo.ts`.
- Part C moved the old Hero to `src/sections/Hero.tsx`, added avatar data, interest controls, the fixed contact strip, and Scroll down/Certificates links.
- Original PNG avatars remain in use. No conversion or `index.html` preload was added.

## Deferred items

- Before deployment, replace or remove the five PREVIEW ONLY entries in src/data/projects.ts (real projects need real links, thumbnails with width, height and alt text, and at least four projects for the ring). Search the whole project for 'PREVIEW ONLY' and '[[' and confirm both return nothing unexpected.
- 3D avatar (Part K): do not start until I say a GLB file is ready. I need to get or commission a model first.
- Convert avatar PNGs to optimized WebP copies (cwebp setup and dry run), then switch src/data/avatar.ts.
- Rabbits pose image is missing.
- Decide whether the navbar initials logo stays visible at 801-1100px.
- Replace all [[PLACEHOLDERS]] with my real details, then run the leftover "[[" check.
- Native-speaker check of the Chinese and German interface text.
- Configure the GitHub username and hide list.
- Add real certificates and projects.
- Run Lighthouse on the production build and test Firefox, Safari and Edge manually.
- Deployment to Vercel, including the Open Graph image URL.
