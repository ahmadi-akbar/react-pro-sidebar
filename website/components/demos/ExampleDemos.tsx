import React from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  type MenuItemStyles,
} from 'react-pro-sidebar';
import { Diamond, BarChart, Global, InkBottle, Calendar, Book } from '../playground/icons';
import { useDemoColors } from './useDemoColors';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rps-demo">
    <div className="rps-demo-frame" style={{ height: 420 }}>
      {children}
    </div>
  </div>
);

/* ---------- Dashboard layout example ---------- */

export const DashboardExample = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Card>
      <Sidebar
        collapsed={collapsed}
        backgroundColor="#1f2937"
        rootStyles={{ color: '#cbd5e1', border: 'none' }}
      >
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: active ? '#fff' : '#cbd5e1',
              backgroundColor: active ? '#0098e5' : undefined,
              '&:hover': { backgroundColor: '#374151', color: '#fff' },
            }),
            icon: { color: '#9ca3af' },
          }}
        >
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #374151' }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{collapsed ? 'D' : 'Dashboard'}</div>
          </div>
          <MenuItem icon={<Diamond />} active>
            Overview
          </MenuItem>
          <MenuItem icon={<BarChart />}>Analytics</MenuItem>
          <SubMenu label="E-commerce" icon={<Global />}>
            <MenuItem>Products</MenuItem>
            <MenuItem>Orders</MenuItem>
            <MenuItem>Customers</MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}>Calendar</MenuItem>
          <MenuItem icon={<Book />}>Documentation</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid rgba(127,127,127,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          <strong>Overview</strong>
          <span style={{ opacity: 0.6, fontSize: 13 }}>user@example.com</span>
        </header>
        <div
          style={{
            flex: 1,
            padding: 20,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
          }}
        >
          {['Revenue', 'Users', 'Orders', 'Sessions'].map((k) => (
            <div
              key={k}
              style={{
                padding: 12,
                border: '1px solid rgba(127,127,127,0.2)',
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              <div style={{ opacity: 0.7 }}>{k}</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>1,234</div>
            </div>
          ))}
        </div>
      </main>
    </Card>
  );
};

/* ---------- React Router example ---------- */

export const ReactRouterExample = () => {
  const [pathname, setPathname] = React.useState('/dashboard');
  const c = useDemoColors();

  // Pretend NavLink: behaves the same way react-router-dom's does (sets `active`)
  const PretendNavLink: React.FC<{ to: string; children?: React.ReactNode }> = ({
    to,
    children,
    ...rest
  }) => (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        setPathname(to);
      }}
      className={pathname === to ? 'active' : undefined}
      {...rest}
    >
      {children}
    </a>
  );

  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu
          menuItemStyles={{
            button: {
              color: c.sidebarColor,
              [`&.active`]: { backgroundColor: c.activeBg, color: c.activeText },
              '&:hover': { backgroundColor: c.hoverBg, color: c.hoverText },
            },
            icon: { color: c.iconColor },
            label: { fontWeight: 500 },
          }}
        >
          <MenuItem
            icon={<Diamond />}
            component={<PretendNavLink to="/dashboard" />}
            active={pathname === '/dashboard'}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<BarChart />}
            component={<PretendNavLink to="/reports" />}
            active={pathname === '/reports'}
          >
            Reports
          </MenuItem>
          <MenuItem
            icon={<Calendar />}
            component={<PretendNavLink to="/calendar" />}
            active={pathname === '/calendar'}
          >
            Calendar
          </MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ flex: 1, padding: 20 }}>
        <div style={{ fontSize: 13, opacity: 0.7 }}>Current route</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, marginTop: 4 }}>{pathname}</div>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 16 }}>
          The active styling uses NavLink&apos;s <code>.active</code> class via{' '}
          <code>menuItemStyles.button[&apos;&amp;.active&apos;]</code>.
        </p>
      </main>
    </Card>
  );
};

/* ---------- Theme example ---------- */

const themes = {
  light: {
    bg: '#ffffff',
    text: '#0d3b66',
    icon: '#0098e5',
    hoverBg: '#cfe7ff',
    hoverText: '#0d3b66',
    /** Slightly tinted panel behind expanded submenu children. */
    subMenuBg: '#f1f7fb',
    /** Color for the submenu expand chevron. */
    expandIcon: '#6f8aa8',
  },
  dark: {
    bg: '#0b2948',
    text: '#cbd5e1',
    icon: '#59d0ff',
    hoverBg: '#00458b',
    hoverText: '#fff',
    subMenuBg: '#082240',
    expandIcon: '#8ba1b7',
  },
  brand: {
    bg: '#1b1035',
    text: '#e9e1ff',
    icon: '#c084fc',
    hoverBg: '#4c1d95',
    hoverText: '#fff',
    subMenuBg: '#140929',
    expandIcon: '#b8a4d6',
  },
} as const;

type ThemeName = keyof typeof themes;

export const ThemeExample = () => {
  const [theme, setTheme] = React.useState<ThemeName>('light');
  const t = themes[theme];
  const styles: MenuItemStyles = {
    button: {
      color: t.text,
      [`&.${menuClasses.active}`]: { color: t.hoverText, backgroundColor: t.hoverBg },
      '&:hover': { backgroundColor: t.hoverBg, color: t.hoverText },
    },
    icon: { color: t.icon },
    label: { fontWeight: 500 },
    // Top-level submenu panels get a slightly distinct bg so the expanded
    // children visually nest. Deeper levels stay transparent so they pick up
    // the parent panel's color.
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? t.subMenuBg : 'transparent',
    }),
    SubMenuExpandIcon: { color: t.expandIcon },
  };
  return (
    <Card>
      <Sidebar backgroundColor={t.bg} rootStyles={{ color: t.text, border: 'none' }}>
        <Menu menuItemStyles={styles}>
          <MenuItem icon={<Diamond />} active>
            Dashboard
          </MenuItem>
          <SubMenu label="Charts" icon={<BarChart />} defaultOpen>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
          <MenuItem icon={<InkBottle />}>Theme</MenuItem>
          <MenuItem icon={<Calendar />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ flex: 1, padding: 20 }}>
        <div style={{ marginBottom: 12, fontWeight: 600 }}>Theme</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(Object.keys(themes) as ThemeName[]).map((name) => (
            <button
              key={name}
              onClick={() => setTheme(name)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid rgba(127,127,127,0.3)',
                background: theme === name ? '#0098e5' : 'transparent',
                color: theme === name ? '#fff' : 'inherit',
                cursor: 'pointer',
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </main>
    </Card>
  );
};

/* ---------- Next.js integration (faked Link) ---------- */

export const NextJsExample = () => {
  const [pathname, setPathname] = React.useState('/');
  const c = useDemoColors();

  const FakeNextLink: React.FC<{ href: string; children?: React.ReactNode }> = ({
    href,
    children,
    ...rest
  }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        setPathname(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );

  const items = [
    { href: '/', label: 'Home', icon: <Diamond /> },
    { href: '/blog', label: 'Blog', icon: <Book /> },
    { href: '/products', label: 'Products', icon: <Global /> },
    { href: '/contact', label: 'Contact', icon: <Calendar /> },
  ];

  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          {items.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              active={pathname === item.href}
              component={<FakeNextLink href={item.href} />}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      <main style={{ flex: 1, padding: 20 }}>
        <div style={{ fontSize: 13, opacity: 0.7 }}>Current route</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, marginTop: 4 }}>{pathname}</div>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 16 }}>
          In a real Next.js app, pass <code>&lt;Link href=&quot;…&quot; /&gt;</code> to{' '}
          <code>component</code> and read <code>usePathname()</code> to set <code>active</code>.
        </p>
      </main>
    </Card>
  );
};
