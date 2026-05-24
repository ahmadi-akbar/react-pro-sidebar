import React from 'react';

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
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ opacity: 0, position: 'absolute', inset: 0 }}
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

export const SidebarHeader = ({ rtl, style }: { rtl?: boolean; style?: React.CSSProperties }) => (
  <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, ...style }}>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        background: 'linear-gradient(135deg, #0098e5 0%, #59d0ff 100%)',
        flexShrink: 0,
      }}
    />
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
