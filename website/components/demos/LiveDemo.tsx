import React from 'react';
import dynamic from 'next/dynamic';

interface LiveDemoProps {
  title?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}

const Inner = ({ children, controls, title }: LiveDemoProps) => (
  <div className="rps-demo">
    {(title || controls) && (
      <div className="rps-demo-controls">
        {title && <strong style={{ marginRight: 8 }}>{title}</strong>}
        {controls}
      </div>
    )}
    <div className="rps-demo-frame">{children}</div>
  </div>
);

const ClientOnly = dynamic(async () => Inner, {
  ssr: false,
  loading: () => (
    <div className="rps-demo">
      <div
        className="rps-demo-frame"
        style={{ alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}
      >
        Loading demo…
      </div>
    </div>
  ),
});

export const LiveDemo = (props: LiveDemoProps) => <ClientOnly {...props} />;

export default LiveDemo;
