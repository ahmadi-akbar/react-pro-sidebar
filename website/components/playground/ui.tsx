import React from 'react';

/* ---------- Form controls ---------- */

export const Switch = ({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) => (
  <label
    htmlFor={id}
    style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: 8 }}
  >
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width: 36,
        height: 20,
        background: checked ? '#0098e5' : '#cbd5e1',
        borderRadius: 999,
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }}
      />
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: checked ? 18 : 2,
          width: 16,
          height: 16,
          background: '#fff',
          borderRadius: '50%',
          transition: 'left 0.2s',
        }}
      />
    </span>
    <span style={{ fontSize: 14 }}>{label}</span>
  </label>
);

export const Select = ({
  id,
  value,
  onChange,
  label,
  options,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}) => (
  <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
    <span>{label}</span>
    <select
      id={id}
      value={value}
      onChange={onChange}
      style={{
        padding: '6px 10px',
        borderRadius: 6,
        border: '1px solid rgba(127,127,127,0.3)',
        background: 'transparent',
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ background: '#fff', color: '#000' }}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

export const Slider = ({
  id,
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit = '',
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label: string;
  unit?: string;
}) => (
  <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      {label}
      <span style={{ fontSize: 12, opacity: 0.65, fontFamily: 'monospace' }}>
        {value}
        {unit}
      </span>
    </span>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: '100%', accentColor: '#0098e5' }}
    />
  </label>
);

/* ---------- Badges and typography ---------- */

export const Badge = ({
  variant = 'primary',
  shape,
  children,
}: {
  variant?: 'primary' | 'danger' | 'success';
  shape?: 'circle';
  children: React.ReactNode;
}) => {
  const colors: Record<string, string> = {
    primary: '#0098e5',
    danger: '#e53935',
    success: '#34a853',
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors[variant],
        color: '#fff',
        fontSize: 11,
        padding: shape === 'circle' ? '0' : '2px 8px',
        height: shape === 'circle' ? 20 : 'auto',
        width: shape === 'circle' ? 20 : 'auto',
        borderRadius: shape === 'circle' ? '50%' : 4,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
};

export const Typography = ({
  variant = 'body2',
  fontWeight,
  style,
  children,
}: {
  variant?: 'h4' | 'body2';
  fontWeight?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  const tag = variant === 'h4' ? 'h4' : 'p';
  const sizes: Record<string, number> = { h4: 24, body2: 14 };
  return React.createElement(
    tag,
    { style: { margin: 0, fontSize: sizes[variant], fontWeight, ...style } },
    children,
  );
};

/* ---------- Sidebar header (with the package logo) ---------- */

export const SidebarHeader = ({ rtl, style }: { rtl?: boolean; style?: React.CSSProperties }) => (
  <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, ...style }}>
    {/* The actual react-pro-sidebar package logo — sidebar layout mark */}
    <svg
      width="38"
      height="38"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="rps-pg-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0098e5" />
          <stop offset="100%" stopColor="#59d0ff" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#rps-pg-logo-grad)" />
      <rect x="12" y="14" width="12" height="36" rx="3" fill="#ffffff" />
      <circle cx="18" cy="20" r="1.6" fill="#0098e5" />
      <rect x="14" y="26" width="8" height="2" rx="1" fill="#0098e5" opacity="0.85" />
      <rect x="14" y="32" width="8" height="2" rx="1" fill="#0098e5" opacity="0.55" />
      <rect x="14" y="38" width="8" height="2" rx="1" fill="#0098e5" opacity="0.55" />
      <rect x="28" y="14" width="24" height="36" rx="3" fill="#ffffff" opacity="0.45" />
    </svg>
    <div style={{ overflow: 'hidden', textAlign: rtl ? 'right' : 'left' }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 15,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Pro Sidebar
      </div>
      <div
        style={{
          fontSize: 11,
          opacity: 0.7,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Modern React sidebar
      </div>
    </div>
  </div>
);

export const SidebarFooter = ({ collapsed }: { collapsed?: boolean }) => (
  <div
    style={{
      padding: '12px 20px',
      borderTop: '1px solid rgba(127,127,127,0.15)',
      fontSize: 12,
      opacity: 0.7,
      textAlign: 'center',
    }}
  >
    {collapsed ? 'v2.0' : 'react-pro-sidebar v2'}
  </div>
);
