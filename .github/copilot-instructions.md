# Project: 3Cat Shows Web

## What this is
React app showing forms for editing 3Cat episodes. Used as the training repository for GitHub Copilot Enterprise workshops at 3Cat (Bloc 2 frontend).

## Tech stack
- React 18 (functional components + hooks)
- TypeScript 5.7
- Vite 6 (dev server + build)

## Coding conventions
- Functional components only — no class components
- Use `React.FC` for component types when props are minimal
- Hooks at the top of the component, separated from rendering by a blank line
- Named exports for components (no default exports except in `App.tsx`)
- Keep components small; extract sub-components when JSX exceeds ~50 lines
- CSS in `App.css` for global styles; component-scoped CSS modules for component styles

## Project structure
- `src/components/` — reusable React components
- `src/App.tsx` — root component
- `src/App.css` — global styles
- `src/main.tsx` — entry point (Vite mounts the React tree here)
- `index.html` — Vite root HTML (at the project root, NOT under `public/`)

## Scripts
- `npm run dev` — start Vite dev server at localhost:5173
- `npm run build` — type-check + production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — ESLint over `src/`

## Accessibility
This project must follow accessibility guidelines from the `accessibility-validator` skill in `.github/skills/`. When generating UI components, ALWAYS check that skill's guidelines first.


---

## Skill / instruction transparency (MANDATORY)

This is a training repository. Learners must be able to **see** when a custom skill, instruction file, or agent is influencing your reply. Therefore:

### Activation banner — required on every reply

Every single reply MUST begin with an activation banner on its own line(s), in this exact format:

```
> 🧩 **Active context:** `<source-1>`, `<source-2>`, ...
```

- List every file under `.github/` whose guidance you applied to produce this reply.
- Use the file's `name` (from front-matter) when present; otherwise use the filename without extension.
- Categorise each entry with a prefix so the learner sees which mechanism fired:
  - `repo:` for this file (`copilot-instructions.md`) — always present
  - `instructions:` for any `.github/instructions/*.instructions.md` that auto-applied via its `applyTo` glob
  - `skill:` for any `.github/skills/<name>/SKILL.md` you invoked
  - `agent:` for any `.github/agents/*.agent.md` you are running as

Example:

```
> 🧩 **Active context:** `repo:copilot-instructions`, `instructions:routes`, `skill:vitest-test-generator`
```

If only the repo-wide instructions apply, the banner is still required:

```
> 🧩 **Active context:** `repo:copilot-instructions`
```

### Rules for the banner

- The banner is **the first content** in the reply — before any prose, plan, tool call summary, or code block.
- Never omit it, even for one-line answers, follow-ups, or clarifying questions.
- Never invent sources. Only list files you actually consulted or whose rules you applied. If you are unsure whether an instruction file applied, do **not** list it.
- Do not translate the banner — keep `Active context:` in English so it is grep-able across the workshop.
- The banner overrides any "be concise" instruction; conciseness applies to the rest of the reply, not to the banner.

### Self-check before sending

Before finalising any reply, re-read it and confirm:
1. The banner is present and is the first line.
2. Every source listed corresponds to a real file in `.github/`.
3. If you touched files matching an `applyTo` glob (e.g. you edited `src/routes/**`), the matching `instructions:` entry is included.
4. If you used a skill's steps (e.g. generated Vitest tests using the test-generator skill), the matching `skill:` entry is included.