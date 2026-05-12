import React, { useEffect, useRef, useState } from 'react';
import type { AxeResults, Result } from 'axe-core';

type RunState = 'idle' | 'running' | 'done' | 'error';

const POLL_MS = 1500;

export const A11yOverlay: React.FC = () => {
  const [violations, setViolations] = useState<Result[]>([]);
  const [state, setState] = useState<RunState>('idle');
  const [expanded, setExpanded] = useState(false);
  const lastRunRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;
    let timeout: number | undefined;

    const run = async () => {
      if (cancelled) return;
      setState('running');
      try {
        const axe = (await import('axe-core')).default;
        const results: AxeResults = await axe.run(document, {
          resultTypes: ['violations'],
        });
        if (cancelled) return;
        setViolations(results.violations);
        setState('done');
        lastRunRef.current = Date.now();
      } catch {
        if (!cancelled) setState('error');
      } finally {
        if (!cancelled) timeout = window.setTimeout(run, POLL_MS);
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  const count = violations.length;
  const ok = state === 'done' && count === 0;

  return (
    <aside
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 13,
        maxWidth: expanded ? 380 : 220,
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        transition: 'max-width 200ms ease',
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          width: '100%',
          padding: '10px 14px',
          background: ok ? '#0a7d2c' : count > 0 ? '#b00020' : '#333',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          textAlign: 'left',
        }}
      >
        <span style={{ fontWeight: 600 }}>
          {state === 'running' && violations.length === 0
            ? 'Scanning…'
            : ok
              ? 'A11y: 0 violations'
              : `A11y: ${count} violation${count === 1 ? '' : 's'}`}
        </span>
        <span aria-hidden="true" style={{ opacity: 0.8 }}>
          {expanded ? '▾' : '▸'}
        </span>
      </button>

      {expanded && (
        <div style={{ padding: '10px 14px', maxHeight: 280, overflowY: 'auto' }}>
          {count === 0 ? (
            <p style={{ margin: 0, opacity: 0.8 }}>
              No accessibility violations detected by axe-core. Run keyboard
              tests too — automated checks catch only ~30% of issues.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {violations.map((v) => (
                <li key={v.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 600 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '1px 6px',
                        marginRight: 6,
                        borderRadius: 3,
                        background: impactColor(v.impact),
                        fontSize: 11,
                        textTransform: 'uppercase',
                      }}
                    >
                      {v.impact ?? 'minor'}
                    </span>
                    {v.id}
                  </div>
                  <div style={{ opacity: 0.85, fontSize: 12, marginTop: 2 }}>
                    {v.help} ({v.nodes.length})
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p style={{ margin: '8px 0 0', fontSize: 11, opacity: 0.6 }}>
            Re-scans every {POLL_MS / 1000}s. Dev-only.
          </p>
        </div>
      )}
    </aside>
  );
};

function impactColor(impact: Result['impact']): string {
  switch (impact) {
    case 'critical':
      return '#b00020';
    case 'serious':
      return '#c0392b';
    case 'moderate':
      return '#d68910';
    case 'minor':
    default:
      return '#555';
  }
}
