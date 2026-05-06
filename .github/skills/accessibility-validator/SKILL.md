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

1. **Read the target component** to identify accessibility issues
2. **Consult the WCAG checklist** at `references/wcag-essentials.md` for the rules to check
3. **Consult the EAA context** at `references/eaa-context.md` to understand which rules are MUST vs SHOULD for 3Cat
4. **(Optional) Run the static check script** at `scripts/check-aria.js` for a quick automated scan
5. **Apply fixes** following the patterns below
6. **Explain each fix** with the WCAG criterion violated (e.g. "WCAG 1.1.1 Non-text Content")

## Common patterns to enforce

### Form controls
- Every `<input>`, `<select>`, `<textarea>` MUST have an associated `<label>` with `htmlFor` matching the element's `id`
- OR be wrapped inside a `<label>` element
- OR have an `aria-label` / `aria-labelledby` if visual label is intentionally absent

### Images
- `<img>` MUST have an `alt` attribute
- For decorative images, use `alt=""` (empty string), NEVER omit
- For informative images, write a meaningful description

### Buttons
- Use `<button>` for actions, NOT `<div>` or `<span>` with `onClick`
- If you must use a non-button element, add `role="button"` AND `tabIndex={0}` AND a keyboard handler (`onKeyDown` for Enter/Space)

### Focus management
- NEVER remove focus indicators with `outline: none` unless replaced by a visible alternative (e.g. custom focus ring)
- Custom focus styles must have at least 3:1 contrast against the background

### Live regions
- Status messages, error confirmations, dynamic feedback MUST use `role="status"` or `aria-live="polite"`
- Use `aria-live="assertive"` only for critical errors

### Color contrast
- Text below 18pt: minimum 4.5:1 contrast against background
- Large text (18pt+ or 14pt+ bold): minimum 3:1
- UI components (form borders, focus rings): minimum 3:1

### Hints and helper text
- Hint text associated with an input MUST use `aria-describedby` linking the input's `id` to the hint's `id`

## How to format your output

For each issue found:

```
[CRITERION] WCAG X.X.X — Brief description
File: src/components/X.tsx:LINE
Problem: short description
Fix: concrete code change (show before / after if helpful)
```

After listing all issues, apply the fixes if the user requests it, or wait for confirmation.

## What NOT to do

- Do NOT suggest ARIA where native HTML works — first rule of ARIA is "don't use ARIA when you can use HTML"
- Do NOT generate `aria-label` for elements that already have a visible label — that's duplicate and confusing for screen readers
- Do NOT add `role="button"` to actual `<button>` elements — buttons are already buttons
