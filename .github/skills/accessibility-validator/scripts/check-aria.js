#!/usr/bin/env node
/**
 * check-aria.js — Static accessibility checks for React/JSX components
 *
 * Usage:
 *   node check-aria.js <path-to-tsx-file> [<path-to-tsx-file>...]
 *
 * This is a lightweight regex-based scanner. It deliberately uses no
 * dependencies so it works out of the box during the training session.
 * Production use would be better served by tools like axe-core or eslint-plugin-jsx-a11y.
 *
 * Outputs a report with severity levels and the WCAG criterion violated.
 */

import fs from 'node:fs';
import path from 'node:path';

const checks = [
  // -------- IMG --------
  {
    name: 'img-without-alt',
    severity: 'BLOCKER',
    wcag: '1.1.1',
    pattern: /<img\b(?![^>]*\balt\s*=)/g,
    message: 'Image without alt attribute',
    fix: 'Add alt="" for decorative images, or a meaningful alt text for informative ones',
  },

  // -------- BUTTON-LIKE DIVS --------
  {
    name: 'div-with-onclick',
    severity: 'BLOCKER',
    wcag: '4.1.2',
    pattern: /<div\b[^>]*\bonClick\s*=(?![^>]*\brole\s*=\s*["']button["'])/g,
    message: 'Clickable <div> without role="button"',
    fix: 'Use a real <button>, or add role="button" + tabIndex={0} + onKeyDown handler',
  },

  // -------- FOCUS REMOVED --------
  {
    name: 'outline-none',
    severity: 'MAJOR',
    wcag: '2.4.7',
    pattern: /outline\s*:\s*['"]?none/g,
    message: 'Focus outline removed without a visible replacement',
    fix: 'Provide an alternative visible focus style (custom :focus-visible with 3:1 contrast)',
  },

  // -------- INPUT WITHOUT LABEL ASSOCIATION --------
  {
    name: 'input-without-label',
    severity: 'MAJOR',
    wcag: '1.3.1, 3.3.2',
    pattern: /<(input|select|textarea)\b(?![^>]*\b(aria-label|aria-labelledby|id)\s*=)/g,
    message: 'Form control without an associated label or aria-label',
    fix: 'Add an id and pair with <label htmlFor={id}>, or wrap in a <label>, or add aria-label',
  },

  // -------- LABEL WITHOUT FOR --------
  {
    name: 'label-without-for',
    severity: 'MAJOR',
    wcag: '1.3.1',
    pattern: /<label\b(?![^>]*\bhtmlFor\s*=)[^>]*>/g,
    message: 'Label without htmlFor (and not wrapping a control)',
    fix: 'Add htmlFor matching the input id, or wrap the input inside the label',
  },

  // -------- PLACEHOLDER AS LABEL (heuristic) --------
  {
    name: 'placeholder-only',
    severity: 'MINOR',
    wcag: '3.3.2',
    pattern: /<input\b[^>]*\bplaceholder\s*=(?![^>]*\b(aria-label|id)\s*=)/g,
    message: 'Input with placeholder but no programmatic label',
    fix: 'Placeholders are not labels. Add a <label> or aria-label.',
  },
];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const findings = [];

  for (const check of checks) {
    const regex = new RegExp(check.pattern.source, check.pattern.flags);
    let match;
    while ((match = regex.exec(content)) !== null) {
      const before = content.substring(0, match.index);
      const lineNumber = before.split('\n').length;
      const lineText = lines[lineNumber - 1].trim();
      findings.push({
        check: check.name,
        severity: check.severity,
        wcag: check.wcag,
        line: lineNumber,
        text: lineText,
        message: check.message,
        fix: check.fix,
      });
    }
  }

  return findings;
}

function formatReport(filePath, findings) {
  if (findings.length === 0) {
    return `\n${filePath}: No accessibility issues found.`;
  }

  const grouped = { BLOCKER: [], MAJOR: [], MINOR: [] };
  for (const f of findings) grouped[f.severity].push(f);

  let out = `\n${filePath}: ${findings.length} accessibility issue(s) found\n`;
  out += '='.repeat(filePath.length + 40) + '\n';

  for (const sev of ['BLOCKER', 'MAJOR', 'MINOR']) {
    if (grouped[sev].length === 0) continue;
    for (const f of grouped[sev]) {
      out += `\n[${f.severity}] WCAG ${f.wcag} — ${f.message}\n`;
      out += `  File: ${filePath}:${f.line}\n`;
      out += `  > ${f.text}\n`;
      out += `  Fix: ${f.fix}\n`;
    }
  }

  out += `\nSummary: ${grouped.BLOCKER.length} blockers, ${grouped.MAJOR.length} major, ${grouped.MINOR.length} minor.\n`;
  return out;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node check-aria.js <file.tsx> [<file.tsx>...]');
    process.exit(1);
  }

  let totalIssues = 0;
  for (const arg of args) {
    const fullPath = path.resolve(arg);
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      continue;
    }
    const findings = checkFile(fullPath);
    totalIssues += findings.length;
    console.log(formatReport(arg, findings));
  }

  process.exit(totalIssues > 0 ? 1 : 0);
}

main();
