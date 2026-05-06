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
