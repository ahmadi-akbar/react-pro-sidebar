---
'react-pro-sidebar': major
---

v2 SSR/Next.js fixes: breakpoint no longer flashes the sidebar open before hydration (applied via a CSS media query); popper flyouts are portaled out of the scroll container so `overflow`/`backdrop-filter` can't clip or mis-position them, while keeping color/font/direction; RTL and the React 19 `inert` warning fixed; `onBreakPoint` fires only on change.
