# Migrating from v1 to v2

react-pro-sidebar v2 removes the legacy hook-based control API and other
long-deprecated options, and modernizes the build/tooling. This guide lists
every breaking change and how to update your code.

> **TL;DR** — If you already control the sidebar through `Sidebar` props
> (`collapsed`, `toggled`, …) and don't use `useProSidebar` /
> `ProSidebarProvider`, the only change you need is bumping React to `>=18`.

---

## Breaking changes

### 1. `useProSidebar` and `ProSidebarProvider` removed

The hook-based control API (deprecated since v1.1) is gone. v2 is fully
**controlled** — you own the `collapsed` / `toggled` state and pass it to
`Sidebar` as props.

**Before (v1):**

```jsx
import { ProSidebarProvider, useProSidebar, Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

// 1. wrap the app
function Root() {
  return (
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  );
}

// 2. control via the hook
function App() {
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    <>
      <Sidebar>
        <Menu>
          <MenuItem>Documentation</MenuItem>
        </Menu>
      </Sidebar>
      <button onClick={() => collapseSidebar()}>Collapse</button>
      <button onClick={() => toggleSidebar()}>Toggle</button>
    </>
  );
}
```

**After (v2):**

```jsx
import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

// no provider needed
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
      >
        <Menu>
          <MenuItem>Documentation</MenuItem>
        </Menu>
      </Sidebar>
      <button onClick={() => setCollapsed((c) => !c)}>Collapse</button>
      <button onClick={() => setToggled((t) => !t)}>Toggle</button>
    </>
  );
}
```

Mapping from the old hook to the new model:

| v1 (`useProSidebar`)      | v2 (controlled props)                   |
| ------------------------- | --------------------------------------- |
| `collapseSidebar(value?)` | `collapsed` prop + your own setter      |
| `toggleSidebar(value?)`   | `toggled` prop + your own setter        |
| `collapsed`               | your own state                          |
| `toggled`                 | your own state                          |
| `broken`                  | `onBreakPoint={(broken) => …}` callback |
| `rtl`                     | `rtl` prop (already controlled)         |

### 2. `defaultCollapsed` prop removed

Use the controlled `collapsed` prop instead.

```jsx
// before
<Sidebar defaultCollapsed />;

// after — initialize your own state
const [collapsed, setCollapsed] = useState(true);
<Sidebar collapsed={collapsed} />;
```

### 3. `breakPoint="always"` removed

Use `"all"` (the two were aliases; `"always"` had been deprecated).

```jsx
// before
<Sidebar breakPoint="always" />

// after
<Sidebar breakPoint="all" />
```

### 4. React 16 / 17 no longer supported

The peer dependency is now `react >=18` / `react-dom >=18`. React 19 is
supported. If you're on 16/17, upgrade React before upgrading this package.

---

## Non-breaking improvements in v2

These require no code changes but are worth knowing:

- **Smaller bundle** — runtime dependencies (`@emotion`, `@popperjs`,
  `classnames`) are now externalized instead of bundled, so they dedupe with
  your app's copies.
- **Proper ESM + CJS + types** — the package now ships a correct `exports`
  map, a `types` field, and both `dist/index.js` (CJS) and `dist/index.mjs`
  (ESM).
- **Modern toolchain** — built with tsup, tested with Vitest, documented with
  Storybook 10.

---

## Migration checklist

- [ ] Remove `<ProSidebarProvider>` from your tree.
- [ ] Replace `useProSidebar()` with local state passed to `Sidebar` props.
- [ ] Replace `onBreakPoint` for the old `broken` value.
- [ ] Replace `defaultCollapsed` with `collapsed`.
- [ ] Replace `breakPoint="always"` with `breakPoint="all"`.
- [ ] Ensure React `>=18` is installed.
- [ ] Run your type-checker — removed exports surface as clear errors.
