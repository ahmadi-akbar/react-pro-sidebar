import React from 'react';
import { highlightJsx } from './highlight';

/**
 * A code-editor styled panel that displays a syntax-highlighted JSX snippet
 * with a copy button. Forces LTR direction so the code stays correctly
 * oriented even when the surrounding playground is in RTL mode.
 */
export const CodePanel = ({
  code,
  title = 'App.jsx',
  copyLabel = 'Copy',
  copiedLabel = 'Copied!',
}: {
  code: string;
  title?: string;
  copyLabel?: string;
  copiedLabel?: string;
}) => {
  const [copied, setCopied] = React.useState(false);
  const highlighted = React.useMemo(() => highlightJsx(code), [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers / restricted contexts
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } catch {
        /* give up silently */
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  return (
    <div
      // Force LTR — code stays readable even when the playground is in RTL.
      dir="ltr"
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        background: '#0b1220',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 10px 32px -16px rgba(0,0,0,0.45)',
        textAlign: 'left',
      }}
    >
      <style>{`
        .rps-code-pane .t-kw { color: #c084fc; }
        .rps-code-pane .t-str { color: #86efac; }
        .rps-code-pane .t-tag { color: #59d0ff; }
        .rps-code-pane .t-attr { color: #fbbf24; }
        .rps-code-pane .t-com { color: #64748b; font-style: italic; }
        .rps-code-pane .t-num { color: #fb923c; }
        .rps-code-pane .t-bool { color: #fb923c; }
      `}</style>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 12px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        <span
          style={{
            marginLeft: 8,
            color: 'rgba(255,255,255,0.55)',
            fontSize: 12,
            fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace",
          }}
        >
          {title}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copyLabel}
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            background: copied ? '#0098e5' : 'rgba(255,255,255,0.06)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            font: 'inherit',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
        >
          {copied ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {copiedLabel}
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copyLabel}
            </>
          )}
        </button>
      </header>
      <pre
        className="rps-code-pane"
        style={{
          margin: 0,
          padding: '16px 18px',
          color: '#e2e8f0',
          fontSize: 13,
          lineHeight: 1.55,
          fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace",
          overflowX: 'auto',
          whiteSpace: 'pre',
          textAlign: 'left',
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
};

export default CodePanel;
