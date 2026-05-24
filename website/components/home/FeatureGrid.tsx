import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}

/* ---------- icons (stroke-style, inherit color via currentColor) ---------- */

const stroke: React.SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const SlidersIcon = () => (
  <svg {...stroke}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const SmartphoneIcon = () => (
  <svg {...stroke}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const AccessibilityIcon = () => (
  <svg {...stroke}>
    <circle cx="12" cy="4" r="2" />
    <path d="M20 7l-6 1.5v3l4 6" />
    <path d="M4 7l6 1.5v3l-4 6" />
    <path d="M10 11.5v3l-1 7" />
    <path d="M14 11.5v3l1 7" />
  </svg>
);

const CodeIcon = () => (
  <svg {...stroke}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/* ---------- feature data ---------- */

const features: Feature[] = [
  {
    icon: <SlidersIcon />,
    title: 'Highly Customizable',
    body: (
      <>
        Tailor every aspect of the sidebar — from custom themes and icons to nested menu structures
        and transition speeds. Full control over styling via <code>rootStyles</code> and{' '}
        <code>menuItemStyles</code>.
      </>
    ),
  },
  {
    icon: <SmartphoneIcon />,
    title: 'Responsive by Default',
    body: (
      <>
        Native support for mobile breakpoints, drawer modes, and collapsible states that adapt to
        any screen size. Built-in responsive behavior with the <code>breakPoint</code> prop.
      </>
    ),
  },
  {
    icon: <AccessibilityIcon />,
    title: 'Accessible',
    body: (
      <>
        Keyboard navigation, <code>aria-expanded</code> / <code>aria-current</code> wired up, focus
        management for overlay sidebars, and Escape-to-close out of the box.
      </>
    ),
  },
  {
    icon: <CodeIcon />,
    title: 'Developer Experience',
    body: (
      <>
        Excellent TypeScript support, comprehensive documentation, and intuitive API design.
        Tree-shakeable, with proper ESM + CJS + types.
      </>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <div className="rps-features">
      {features.map((f) => (
        <div key={f.title} className="rps-feature">
          <div className="rps-feature-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </div>
      ))}
    </div>
  );
}
