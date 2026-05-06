# 3Cat Shows Web

Aplicació React per a la formació **GitHub Copilot Enterprise** amb 3Cat (Bloc 2 — frontend).

App minimal que mostra un formulari per crear/editar episodis. Conté problemes deliberats d'accessibilitat per provar la skill `accessibility-validator`.

## Stack

- React 18
- TypeScript 5
- Vite 6

## Posada en marxa

```bash
npm install
npm run dev          # arranca a http://localhost:5173
npm run build        # build de producció (dist/)
npm run preview      # preview del build
```

## Per a la formació

Aquest repo conté:

- `.github/copilot-instructions.md` — instructions repo-wide
- `.github/skills/accessibility-validator/` — skill RICA amb scripts i references (Bloc 2, taller 1)
- `src/components/EpisodeForm.tsx` — component amb problemes d'accessibilitat plantats

L'objectiu del taller és:
1. Demanar a Copilot que millori el component
2. Veure si la skill d'accessibilitat s'activa sola
3. Veure si invocar-la explícitament (`/accessibility-validator`) funciona millor
4. Comparar el resultat
