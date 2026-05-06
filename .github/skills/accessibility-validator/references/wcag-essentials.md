# WCAG 2.1 AA — Essential criteria for 3Cat web UIs

This is a focused subset of WCAG 2.1 Level AA criteria most relevant to React form/UI work. For the full normative spec, see https://www.w3.org/TR/WCAG21/

## Perceivable

### 1.1.1 Non-text Content (Level A)
All non-text content (images, icons, charts) must have a text alternative.
- Decorative: `alt=""`
- Informative: meaningful `alt` text
- Functional (links/buttons with icons): describes the action, not the icon

### 1.3.1 Info and Relationships (Level A)
Programmatic structure must match visual structure.
- Form labels associated via `htmlFor`/`id` or wrapping
- Lists use `<ul>`/`<ol>`/`<li>`, not styled divs
- Headings (`<h1>`–`<h6>`) reflect actual hierarchy

### 1.4.3 Contrast (Minimum) (Level AA)
- Normal text: 4.5:1 minimum
- Large text (18pt+ or 14pt+ bold): 3:1 minimum
- This applies to placeholders and hint text too

### 1.4.11 Non-text Contrast (Level AA)
- UI components (input borders, focus indicators, icons that convey meaning): 3:1 minimum

## Operable

### 2.1.1 Keyboard (Level A)
All functionality must be operable via keyboard.
- Custom widgets need keyboard handlers (Enter/Space for buttons, arrow keys for lists)
- No keyboard traps

### 2.4.7 Focus Visible (Level AA)
The keyboard focus indicator must always be visible.
- NEVER `outline: none` without a visible replacement
- Custom focus styles must be perceivable (3:1 contrast)

### 2.5.3 Label in Name (Level A)
The accessible name (what screen readers announce) must include or match the visible label text.
- Don't have a button labelled "Save" with `aria-label="Submit form"` — they conflict

## Understandable

### 3.3.1 Error Identification (Level A)
Errors must be identified in text, not just by colour.
- Validation errors: text message, not just red border

### 3.3.2 Labels or Instructions (Level A)
Form controls need clear labels and instructions.
- Required fields marked (visually AND programmatically with `aria-required="true"`)
- Format expectations described before the input ("dd/mm/yyyy")

## Robust

### 4.1.2 Name, Role, Value (Level A)
For all UI components, name/role/value must be programmatically determinable.
- `<button>` has role "button" by default
- `<div onClick>` does NOT — needs `role="button"` plus keyboard handlers

### 4.1.3 Status Messages (Level AA)
Status messages must be programmatically announceable without focus change.
- Use `role="status"` or `aria-live="polite"` for confirmations
- Use `role="alert"` or `aria-live="assertive"` for errors
