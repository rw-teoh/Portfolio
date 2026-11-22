# Portfolio Build Progress

## Current stage

Design change request v10.1 — Part A: Tokens, Theme and Language Foundation

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

## In progress

- Part D About complete; awaiting feedback before Part E.

## Validation

- `npm.cmd run build` passed: TypeScript and Vite production build completed successfully.
- `npm.cmd run lint` passed with no Oxlint findings.
- Navigation validation: `npm.cmd run build` and `npm.cmd run lint` passed.
- Part B final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.
- Part C final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.
- Part D final validation: `npm.cmd run build` and `npm.cmd run lint` passed with no findings.

### Design change request v10.1 — Part A validation

- `npm.cmd run build` passed after fixing an initial JSX-in-`.ts` error.
- `npm.cmd run lint` passed with no findings after separating the language context hook.

## Pending

- Part B: reworked Navbar with language and theme controls.
- Part C: replace Hero according to v10.1.
- About and remaining website sections.
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
