import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;
const base: IconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor' };

export const BarChart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 13h4v8H3zM10 3h4v18h-4zM17 8h4v13h-4z" />
  </svg>
);
export const Global = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4c.86 0 2.13 1.96 2.78 4H9.22C9.87 5.96 11.14 4 12 4zM4.07 14a7.94 7.94 0 0 1 0-4h3.39c-.08.66-.13 1.32-.13 2 0 .68.05 1.34.13 2H4.07zM5.07 16h2.95c.32 1.27.78 2.47 1.38 3.56A8.03 8.03 0 0 1 5.07 16zM9.22 16h5.56C14.13 18.04 12.86 20 12 20s-2.13-1.96-2.78-4zm5.93-2H8.85c-.09-.66-.15-1.33-.15-2s.06-1.34.15-2h6.3c.09.66.15 1.33.15 2s-.06 1.34-.15 2zM14.95 16h2.95a8.03 8.03 0 0 1-4.33 3.56c.6-1.09 1.06-2.29 1.38-3.56zM16.54 14c.08-.66.13-1.32.13-2 0-.68-.05-1.34-.13-2h3.39a7.94 7.94 0 0 1 0 4h-3.39z" />
  </svg>
);
export const InkBottle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10 2h4v3h-4zM7 7h10v2H7zm0 4h10v10H7z" />
  </svg>
);
export const Diamond = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2 2 9l10 13L22 9z" />
  </svg>
);
export const ShoppingCart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 4h-2l-1 2v2h2l3 8h12v-2H10l-.6-2H20l2-6H6z" />
    <circle cx="9" cy="20" r="2" />
    <circle cx="18" cy="20" r="2" />
  </svg>
);
export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 2h2v3H7zM15 2h2v3h-2zM3 7h18v14H3z" />
  </svg>
);
export const Book = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 4l8 4 8-4" fill="none" stroke="white" strokeWidth="1" />
  </svg>
);
export const Service = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM4 22a8 8 0 0 1 16 0H4z" />
  </svg>
);
export const Github = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.78-.25.78-.55v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.44-2.27 1.18-3.07-.12-.3-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.93 10.93 0 0 1 5.74 0c2.19-1.48 3.14-1.17 3.14-1.17.63 1.58.23 2.74.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.37-5.26 5.66.41.36.78 1.07.78 2.15v3.18c0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);
