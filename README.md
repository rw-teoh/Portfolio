# Rei Wen Portfolio

A multilingual personal portfolio for presenting software engineering education, skills, interests, projects, and learning history. The site uses a warm-neutral visual system with light and dark themes.

## Status

### Built

- Responsive single-page portfolio
- Saved light/dark theme preference
- English, Simplified Chinese, and German language dictionaries
- Hero section with avatar poses and interest controls
- About, Skills, Projects, and Education sections
- 3D Projects ring with preview fixtures
- Education player-style timeline with looping controls
- Measured navigation fan menu
- Fixed contact strip
- Keyboard focus and reduced-motion behavior

### Planned

- Replace all `[[PLACEHOLDERS]]` and preview content
- Add real GitHub repository data
- Build the certificates hash page and certificate viewer
- Add a dedicated Contact section
- Add 3D avatar support
- Add E3 decorative animations
- Deploy to Vercel

## Features

- **Themes:** Light first, with dark as an alternative. The choice is saved in `localStorage` and applied before first paint.
- **Languages:** English, Simplified Chinese, and German, managed by typed dictionaries without an i18n dependency.
- **Hero:** Localized introduction, typing phrases, avatar poses, interest buttons, certificates link, and fixed contact links.
- **About:** University, programme, academic year, interests, career direction, and learning focus.
- **Skills:** Six localized skill categories with placeholder skill names.
- **Projects:** Permanent 3D ring when at least four entries exist, with a simple layout below four entries and a reduced-motion static list.
- **Education:** Compact player cards with expandable outlined detail clouds, period bars, and rewind/forward controls.
- **Navigation fan:** Measured active-section pill that expands into a fan, with Escape, outside-click, heading-focus, and scroll-hysteresis behavior.
- **Accessibility:** Native controls, live announcements, visible focus styles, keyboard project ring navigation, and reduced-motion fallbacks.
- **Motion:** Custom cubic-bezier easing is used for intentional transitions; no linear or default `ease-in-out` curves are used for portfolio interactions.

## Tech stack

Exact versions from `package.json`:

| Package | Version |
|---|---|
| React | 19.3.1 |
| React DOM | 19.3.1 |
| Vite | 8.3.8 |
| Tailwind CSS | 4.3.5 |
| `@tailwindcss/vite` | 4.3.5 |
| `@vitejs/plugin-react` | 6.3.0 |
| TypeScript | 7.0.2 |
| Oxlint | 1.90.0 |
| Lucide React | 1.77.0 |
| `@types/react` | 19.3.0 |
| `@types/react-dom` | 19.3.0 |
| `@types/node` | 24.19.2 |

No i18n library, additional icon library, or browser-testing package is added.

## Getting started

The project does not contain a `.nvmrc` or `.node-version`. The pinned Vite 8.3.8 package declares this Node requirement:

- Node.js `^20.19.0` or `>=22.12.0`

### Windows PowerShell

Use npm commands normally. If PowerShell script execution blocks `npm.ps1`, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
npm.cmd run lint
```

### Commands

| Purpose | npm command |
|---|---|
| Install from `package-lock.json` | `npm install` |
| Start development server | `npm run dev` |
| Production build | `npm run build` |
| Preview production build | `npm run preview` |
| Lint source | `npm run lint` |

## Project structure

```text
.
├── public/
│   └── avatar/             # Theme default images, expressions, and interest poses
├── src/
│   ├── components/         # Reusable layout, navigation, cards, icons, and controls
│   ├── data/               # Personal, avatar, education, skills, projects, and GitHub data
│   ├── hooks/              # Theme and reveal behavior
│   ├── i18n/               # Typed dictionaries and language context
│   ├── lib/                # Pure navigation fan geometry
│   └── sections/           # Hero, About, Skills, Projects, and Education
├── index.html              # HTML metadata, theme bootstrap, and application entry
├── package.json            # Scripts and exact dependency versions
└── package-lock.json       # npm dependency lockfile
```

## Editing content

### Personal information

Edit `src/data/personalInfo.ts`:

- English and base personal fields live in `personalInfo`.
- English, Simplified Chinese, and German hero/About data live in `personalInfoByLanguage`.
- Replace `[[UPPER_SNAKE_CASE]]` values only when real approved data is available.

### Skills

Edit `src/data/skills.ts`. Each category contains a stable `id` and skill objects:

```ts
{ id: 'skill-placeholder-1', name: '[[SKILL_NAME_1]]' }
```

- Add a skill: insert an object in the appropriate category.
- Edit a skill: replace its `name`.
- Remove a skill: delete its object.
- Keep a stable ID and add an icon only after an icon decision.

### Projects

Edit `src/data/projects.ts`. A project uses this shape:

```ts
{
  id: 'stable-project-id',
  title: { en: 'Title', 'zh-Hans': '标题', de: 'Titel' },
  description: { en: 'Description', 'zh-Hans': '说明', de: 'Beschreibung' },
  technologies: ['Technology'],
  image: {
    src: '/project-thumbnail.webp',
    width: 320,
    height: 180,
    alt: { en: 'Alt text', 'zh-Hans': '替代文本', de: 'Alt-Text' }
  },
  repositoryUrl: 'https://example.invalid/repository',
  demoUrl: 'https://example.invalid/demo'
}
```

Five entries beginning with `PREVIEW ONLY` are temporary fixtures. Delete or replace them only after separate approval. Delete an entry to remove it from the section. Keep intrinsic image dimensions and localized alt text.

### Education

Edit `src/data/education.ts`. Replace `[[EDU_*]]` values for the three entries. `startYear`, `endYear`, institution, period, programme, and achievements accept localized text.

Set an optional `logo` path for an institution logo. The current implementation also displays a text logo placeholder when no logo is supplied.

### Certificates

Certificate links currently point to `#/certificates`. A certificates hash page and certificate viewer are **Planned**; do not describe them as built.

### Interests and avatars

Edit the interest IDs and pose mappings in `src/data/avatar.ts`.

Avatar files currently live under:

```text
public/avatar/
├── big/
├── expressions/
└── poses/
```

Keep matching light-theme and dark-theme default images. Pose names are matched to `reading`, `drums`, `computer`, `gym`, and `photography`; `rabbits` is the unavailable-pose state.

Expression assets are currently stored and declared, but expression switching is not implemented in the active Hero.

### GitHub integration

`src/data/github.ts` contains:

```ts
{
  username: '[[GITHUB_USERNAME]]',
  hiddenRepos: []
}
```

GitHub fetching is **not built**. Configure the username and hidden repository list only as part of the later integration stage.

## Design system

### Light theme

| Token | Hex | Purpose |
|---|---|---|
| `--color-background` | `#EDE8E0` | Page canvas |
| `--color-surface` | `#F5F1EA` | Cards and controls |
| `--color-surface-raised` | `#FBF8F3` | Raised surfaces |
| `--color-text` | `#1F1A17` | Primary text |
| `--color-muted` | `#5E554C` | Secondary text |
| `--color-accent` | `#00716C` | Primary accent |
| `--color-accent-fill` | `#FF6A2B` | Accent fills |
| `--color-accent-secondary` | `#00A19B` | Secondary accent |
| `--color-accent-highlight` | `#FFC72C` | Highlight accent |
| `--color-border` | `#D4CABC` | Borders and lines |
| `--color-button-text` | `#1F1A17` | Accent-filled button text |
| `--color-link-primary` | `#00716C` | Primary links |
| `--color-link-secondary` | `#C21860` | Secondary links |

### Dark theme

| Token | Hex | Purpose |
|---|---|---|
| `--color-background` | `#1B1815` | Page canvas |
| `--color-surface` | `#27231F` | Cards and controls |
| `--color-surface-raised` | `#332D27` | Raised surfaces |
| `--color-text` | `#EDE8E0` | Primary text |
| `--color-muted` | `#B8AEA1` | Secondary text |
| `--color-accent` | `#FF6A2B` | Primary accent |
| `--color-accent-fill` | `#FF6A2B` | Accent fills |
| `--color-accent-secondary` | `#00A19B` | Secondary accent |
| `--color-accent-highlight` | `#FFC72C` | Highlight accent |
| `--color-border` | `#4A4138` | Borders and lines |
| `--color-button-text` | `#1F1A17` | Accent-filled button text |
| `--color-link-primary` | `#FF6A2B` | Primary links |
| `--color-link-secondary` | `#4CC3FF` | Secondary links |

The project uses a warm-neutral type, card, and background palette rather than the Tailwind default palette.

### Typography

The body stack begins with `Inter` and then uses local system sans-serif fallbacks. No external font loader or font package is configured.

### Motion and banned visual treatments

- Use custom cubic-bezier curves; do not use linear or default `ease-in-out`.
- Reduced motion uses static or near-static behavior.
- Do not use purple or indigo.
- Do not use the Tailwind default palette.
- Do not use emoji as icons.
- Do not use ghosting or partial-opacity cards that can show through one another.
- Do not use blur or filter effects.

## Languages

Supported locale IDs are `en`, `zh-Hans`, and `de`. Edit visible text in:

- `src/i18n/en.ts`
- `src/i18n/zh.ts`
- `src/i18n/de.ts`
- `src/i18n/types.ts`

German and Simplified Chinese dictionaries are marked as draft translations needing native-speaker review. To add a language:

1. Add a locale ID to `Language` in `src/i18n/types.ts`.
2. Add its typed dictionary.
3. Register it in `src/i18n/index.ts`.
4. Update the pre-paint locale bootstrap in `index.html`.
5. Update localized data records and avatar alt text.

## Accessibility and performance

- Keyboard-accessible navigation and project ring controls
- Visible focus rings
- Live announcements for Education and Projects
- Reduced-motion behavior
- Coarse-pointer targets use at least 44px where defined
- Images include intrinsic dimensions where known
- Lighthouse scores are a **goal**, not a measured claim
- The target Lighthouse score is 90+; production-build measurements are not yet recorded

## Browser support and testing

### Automated checks

No browser-testing dependency is currently configured. The available automatic checks are:

```powershell
npm.cmd run build
npm.cmd run lint
npm.cmd run preview
```

### Manual checklist

Test at 320, 360, 768, 1024, 1286, and 1440px:

- Light and dark themes
- English, Simplified Chinese, and German
- Header and navigation fan
- Fixed contact strip
- Hero and interest controls
- About and Skills layouts
- Projects ring and simple/static layouts
- Education timeline and focus after rewind/forward
- Horizontal overflow
- Keyboard navigation and Escape behavior
- Reduced-motion setting
- Firefox and Safari
- Safari and Firefox `backdrop-filter` behavior only if it remains in use

## Known limitations and deferred items

- Many personal and education values remain `[[PLACEHOLDER]]` data.
- The five Projects entries are marked `PREVIEW ONLY`.
- The GitHub username and repository hide list remain placeholders.
- GitHub repository fetching is not implemented.
- Certificates are not yet built as a separate hash page.
- The dedicated Contact section is not built.
- 3D avatar support requires an approved GLB asset.
- Rabbits pose image is missing.
- Expression PNG switching is planned only as asset metadata; the active interface does not switch expressions.
- Lighthouse, Safari, Firefox, and viewport measurements are pending.

## Screenshots

Screenshots will be added here after the user approves real content and a deployed or locally reviewed layout.

## Deployment

**Planned.** Deployment has not been performed.

When ready:

1. Replace placeholders and preview entries.
2. Run `npm.cmd run build`.
3. Run `npm.cmd run lint`.
4. Preview the production build with `npm.cmd run preview`.
5. Test required widths, themes, languages, Firefox, and Safari.
6. Create or configure the Vercel project.
7. Set the framework preset to Vite.
8. Confirm build and output settings match the generated `dist` folder.
9. Add the approved Open Graph image and metadata.

Do not assume a deployment URL or deployment configuration until Vercel setup is approved.

## Licence

`[[LICENSE_NAME]]` — licence text pending approval.

## Credits

- Project and design: `[[YOUR_NAME]]`
- Icons: Lucide React for interface icons where used
- Avatar illustrations: `[[AVATAR_CREDIT]]`
- Other assets: `[[ASSET_CREDIT]]`
