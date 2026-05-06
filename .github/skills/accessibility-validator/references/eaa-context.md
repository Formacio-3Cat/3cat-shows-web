# European Accessibility Act (EAA) — Context for 3Cat

## What it is

The European Accessibility Act (Directive (EU) 2019/882) is EU legislation that mandates accessibility requirements for a range of products and services. It was adopted in 2019 and member states had to transpose it by 2022. The accessibility requirements became mandatorily enforceable on **28 June 2025**.

## Why it matters for 3Cat

3Cat is a public service media organisation in Catalonia, owned by the Generalitat de Catalunya. As such, it falls under several scopes of the EAA:

- **Audiovisual media services** (Article 2.2.b) — broadcasting, on-demand
- **Websites and mobile applications** providing access to those services
- **E-commerce or transactional features** within those websites/apps

## What the law requires (technical level)

The EAA itself is high-level. The technical requirements are referenced through harmonised European standards. The key one is:

### EN 301 549 v3.2.1 (or later)
"Accessibility requirements for ICT products and services"

This standard incorporates **WCAG 2.1 Level AA** as the baseline for web content. So in practice, complying with WCAG 2.1 AA = complying with the EAA's web requirements.

Additional EN 301 549 requirements relevant to 3Cat as a broadcaster include:
- Audio description for video content
- Captions/subtitles for audio content
- Sign language interpretation availability
- User agent compatibility (assistive technologies)

## What this means for our React work

For the website / web app side:
- **Every UI component** must meet WCAG 2.1 AA (see `wcag-essentials.md`)
- **Forms** are a high-risk area — labels, error messages, focus management
- **Dynamic content** (loading states, confirmations) must be announced to screen readers
- **Media playback controls** must be keyboard-accessible AND screen-reader-accessible

## Enforcement

- Each EU member state has a market surveillance authority
- In Spain, this falls under the relevant accessibility bodies
- Public sector entities (which includes 3Cat) had earlier obligations under the **Web Accessibility Directive (EU) 2016/2102**, which already required WCAG 2.1 AA for public-sector websites since September 2020

## Bottom line for engineering

If our UI code passes WCAG 2.1 AA validation, we're meeting the EAA's web requirements. The `accessibility-validator` skill in this repo encodes these checks. **Use it before merging UI changes.**

## Further reading
- https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en
- https://www.etsi.org/deliver/etsi_en/301500_301599/301549/
- https://www.w3.org/WAI/standards-guidelines/wcag/
