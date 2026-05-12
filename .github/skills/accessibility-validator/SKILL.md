---
name: accessibility-validator
description: Validates and fixes WCAG 2.1 AA / EN 301 549 accessibility issues in React components. Use when writing, reviewing, or refactoring UI components — forms, interactive elements, images, dynamic content. Especially relevant for 3Cat as a public broadcaster subject to the European Accessibility Act (EAA). Use this skill BEFORE finalising any UI work.
---

# Accessibility Validator

This skill helps you write and review React components that comply with WCAG 2.1 AA, the technical baseline referenced by the European Accessibility Act (EAA) for 3Cat as a public service broadcaster.

## When to use

Trigger this skill when:
- Adding a new form, input, button, or interactive element
- Modifying existing UI components
- Reviewing a PR that touches `src/components/` or `src/App.tsx`
- The user asks for "accessibility", "a11y", "WCAG", "EAA", or "screen reader" help

## Workflow

When invoked, you will:

1. **Check the live A11y overlay** in the bottom-right of the dev app (`npm run dev`) and note the violation count BEFORE any change. This is your baseline.
2. **Read the target component** to identify accessibility issues.
3. **Consult the WCAG checklist** at `references/wcag-essentials.md` for the rules to check.
4. **Consult the EAA context** at `references/eaa-context.md` to understand which rules are MUST vs SHOULD for 3Cat.
5. **(Optional) Run the static check script** at `scripts/check-aria.js` for a quick automated scan.
6. **Apply fixes** following the patterns below. Prefer semantic HTML over ARIA.
7. **Verify the A11y overlay drops to 0 violations** and that keyboard-only navigation reaches every interactive element with a visible focus ring.
8. **Explain each fix** with the WCAG criterion violated (e.g. "WCAG 1.1.1 Non-text Content").

## Common patterns to enforce

### Form controls
- Every `<input>`, `<select>`, `<textarea>` MUST have an associated `<label>` with `htmlFor` matching the element's `id`, OR be wrapped inside a `<label>` element, OR have `aria-label` / `aria-labelledby` if the visual label is intentionally absent.
- For required fields, add the `required` attribute AND a visible `*` next to the label. Wrap the asterisk in `<span aria-hidden="true">` and add the word "required" to the accessible name (e.g. via visually-hidden text or `aria-required="true"` + the visible `*`). This makes "required" visible to sighted users AND announced by screen readers. (WCAG 3.3.2)

### Images
- `<img>` MUST have an `alt` attribute.
- For decorative images, use `alt=""` (empty string), NEVER omit. Consider also `role="presentation"` for older AT.
- For informative images, write a meaningful description.

### Buttons
- Use `<button type="button">` (or `type="submit"` for form submits) for actions, NOT `<div>` or `<span>` with `onClick`.
- A native `<button>` inherits the design-system styles automatically — the visible result is a properly-styled button with hover, active, and focus states out of the box. That's the visible payoff of using semantics.
- If you must use a non-button element, add `role="button"` AND `tabIndex={0}` AND a keyboard handler (`onKeyDown` for Enter/Space). Prefer the native element.

### Focus management
- NEVER remove focus indicators with `outline: none` unless replaced by a visible alternative.
- Always REPLACE the default outline with a **visible custom focus ring** with at least 3:1 contrast against the background. Recommended pattern using CSS custom properties:

  ```css
  :root {
    --focus-ring: 0 0 0 3px #ffbf47; /* 3Cat amber, >3:1 on white */
  }
  *:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: 4px;
  }
  ```

  This is visibly different from "no outline" AND from the default browser outline, so the fix is obvious during demos and reviews.

### Live regions and status messages
- Status messages, error confirmations, dynamic feedback MUST use `role="status"` (implicit `aria-live="polite"`) or `aria-live="polite"`.
- Use `aria-live="assertive"` only for critical errors.
- A plain green `<p>` is technically a status but is visually weak. Prefer a **toast/banner** with a background colour, an icon (e.g. ✓ or ⚠), proper padding, and `role="status"`. The screen-reader announcement is identical; sighted users get a much clearer signal. (WCAG 4.1.3 + good UX.)

### Color contrast
- Text below 18pt: minimum 4.5:1 contrast against background.
- Large text (18pt+ or 14pt+ bold): minimum 3:1.
- UI components (form borders, focus rings): minimum 3:1.
- Placeholder text is NOT a label and is NOT exempt from contrast — fix it to at least 4.5:1.

### Hints and helper text
- Hint text associated with an input MUST use `aria-describedby` linking the input's `id` to the hint's `id`. Otherwise screen readers won't read the hint when the input is focused.
- Hints often have low contrast as a stylistic choice — push back. WCAG requires 4.5:1 for hint text below 18pt.

### Error states
- When validation fails, set `aria-invalid="true"` on the input AND visually mark it (red border + icon + inline message). Link the error message via `aria-describedby`.
- Don't rely on colour alone (WCAG 1.4.1).

## How to format your output

For each issue found:

```
[CRITERION] WCAG X.X.X — Brief description
File: src/components/X.tsx:LINE
Problem: short description
Fix: concrete code change (show before / after if helpful)
Visible effect: what the user will see differently after the fix
```

After listing all issues, apply the fixes if the user requests it, or wait for confirmation. Then verify with the A11y overlay (should read "0 violations") and a manual keyboard pass (Tab through every control, confirm focus is visible, confirm Enter/Space activates buttons).

## What NOT to do

- Do NOT suggest ARIA where native HTML works — first rule of ARIA is "don't use ARIA when you can use HTML".
- Do NOT generate `aria-label` for elements that already have a visible label — that's duplicate and confusing for screen readers.
- Do NOT add `role="button"` to actual `<button>` elements — buttons are already buttons.
- Do NOT consider the work done just because the A11y overlay shows 0. Automated tools catch ~30% of issues; always do a keyboard pass too.
