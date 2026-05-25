import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Switch } from '../playground/ui';
import { BarChart, Diamond, Calendar, Book } from '../playground/icons';
import { useDemoColors } from './useDemoColors';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rps-demo">
    <div className="rps-demo-frame">{children}</div>
  </div>
);

/* ---------- Sidebar prop demos ---------- */

export const CollapsedDemo = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar collapsed={collapsed} backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
          <MenuItem icon={<Calendar />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="collapsed-demo"
          checked={collapsed}
          onChange={() => setCollapsed((v) => !v)}
          label="collapsed"
        />
      </div>
    </Card>
  );
};

export const ToggledDemo = () => {
  const [toggled, setToggled] = React.useState(false);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="all"
        backgroundColor={c.sidebarBg}
        rootStyles={c.sidebarRootStyles}
      >
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <button
          onClick={() => setToggled((t) => !t)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: `1px solid ${c.sidebarBorder}`,
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {toggled ? 'Close' : 'Open'} overlay
        </button>
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          The sidebar is in overlay mode (<code>breakPoint=&quot;all&quot;</code>); use the button
          to toggle.
        </p>
      </div>
    </Card>
  );
};

export const WidthDemo = () => {
  const [width, setWidth] = React.useState('250px');
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar width={width} backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <label htmlFor="width-select" style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>
          width
        </label>
        <select id="width-select" value={width} onChange={(e) => setWidth(e.target.value)}>
          <option value="180px">180px</option>
          <option value="250px">250px (default)</option>
          <option value="320px">320px</option>
          <option value="20rem">20rem</option>
        </select>
      </div>
    </Card>
  );
};

export const CollapsedWidthDemo = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsedWidth, setCollapsedWidth] = React.useState('80px');
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        backgroundColor={c.sidebarBg}
        rootStyles={c.sidebarRootStyles}
      >
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="collapsedwidth-toggle"
          checked={collapsed}
          onChange={() => setCollapsed((v) => !v)}
          label="collapsed"
        />
        <div style={{ marginTop: 12 }}>
          <label
            htmlFor="collapsedwidth-select"
            style={{ display: 'block', fontSize: 13, marginBottom: 6 }}
          >
            collapsedWidth
          </label>
          <select
            id="collapsedwidth-select"
            value={collapsedWidth}
            onChange={(e) => setCollapsedWidth(e.target.value)}
          >
            <option value="60px">60px</option>
            <option value="80px">80px (default)</option>
            <option value="100px">100px</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export const BackgroundColorDemo = () => {
  const c = useDemoColors();
  const [bg, setBg] = React.useState(c.sidebarBg);
  // Keep the bg picker in sync if the user flips the theme between renders.
  React.useEffect(() => {
    setBg(c.sidebarBg);
  }, [c.sidebarBg]);
  return (
    <Card>
      <Sidebar backgroundColor={bg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <label
          htmlFor="backgroundcolor-input"
          style={{ display: 'block', fontSize: 13, marginBottom: 6 }}
        >
          backgroundColor
        </label>
        <input
          id="backgroundcolor-input"
          type="color"
          value={bg}
          onChange={(e) => setBg(e.target.value)}
        />
        <code style={{ marginLeft: 8 }}>{bg}</code>
      </div>
    </Card>
  );
};

export const ImageDemo = () => {
  const [hasImage, setHasImage] = React.useState(true);
  const c = useDemoColors();
  // Alpha overlay tinted to match the active theme so the image stays visible.
  const overlay = c.isDark ? 'rgba(30,41,59,0.78)' : 'rgba(255,255,255,0.85)';
  return (
    <Card>
      <Sidebar
        image={
          hasImage
            ? 'https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg'
            : undefined
        }
        backgroundColor={hasImage ? overlay : c.sidebarBg}
        rootStyles={c.sidebarRootStyles}
      >
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
          <MenuItem icon={<Calendar />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="image-demo"
          checked={hasImage}
          onChange={() => setHasImage((v) => !v)}
          label="image"
        />
      </div>
    </Card>
  );
};

export const RtlDemo = () => {
  const [rtl, setRtl] = React.useState(false);
  const c = useDemoColors();
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          height: '100%',
          flex: 1,
          direction: rtl ? 'rtl' : 'ltr',
        }}
      >
        <Sidebar rtl={rtl} backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
          <Menu menuItemStyles={c.menuItemStyles}>
            <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
            <SubMenu label="Charts" icon={<BarChart />}>
              <MenuItem>Pie</MenuItem>
              <MenuItem>Line</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
        <div className="rps-demo-main">
          <Switch id="rtl-demo" checked={rtl} onChange={() => setRtl((v) => !v)} label="rtl" />
        </div>
      </div>
    </Card>
  );
};

export const BreakPointDemo = () => {
  const [toggled, setToggled] = React.useState(false);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar
        breakPoint="md"
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        backgroundColor={c.sidebarBg}
        rootStyles={c.sidebarRootStyles}
      >
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <button
          onClick={() => setToggled((t) => !t)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: `1px solid ${c.sidebarBorder}`,
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          Toggle sidebar
        </button>
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          Below the <code>md</code> breakpoint (~768px), the sidebar becomes an overlay.
        </p>
      </div>
    </Card>
  );
};

export const TransitionDurationDemo = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [duration, setDuration] = React.useState(300);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar
        collapsed={collapsed}
        transitionDuration={duration}
        backgroundColor={c.sidebarBg}
        rootStyles={c.sidebarRootStyles}
      >
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />}>Dashboard</MenuItem>
          <MenuItem icon={<BarChart />}>Reports</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="transition-collapse"
          checked={collapsed}
          onChange={() => setCollapsed((v) => !v)}
          label="collapsed"
        />
        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>
            transitionDuration: {duration}ms
          </label>
          <input
            type="range"
            min={50}
            max={1500}
            step={50}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
      </div>
    </Card>
  );
};

/* ---------- Menu prop demos ---------- */

export const PopoverDemo = () => {
  const [popover, setPopover] = React.useState(true);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu popover={popover} menuItemStyles={c.menuItemStyles}>
          <SubMenu label="Charts" icon={<BarChart />}>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
          <SubMenu label="Components" icon={<Diamond />}>
            <MenuItem>Grid</MenuItem>
            <MenuItem>Layout</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="popover-demo"
          checked={popover}
          onChange={() => setPopover((v) => !v)}
          label="popover"
        />
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          Top-level <code>SubMenu</code>s open as floating poppers instead of sliding inline.
        </p>
      </div>
    </Card>
  );
};

export const AccordionDemo = () => {
  const [accordion, setAccordion] = React.useState(true);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu accordion={accordion} menuItemStyles={c.menuItemStyles}>
          <SubMenu label="Charts" icon={<BarChart />} defaultOpen>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
          <SubMenu label="Components" icon={<Diamond />}>
            <MenuItem>Grid</MenuItem>
            <MenuItem>Layout</MenuItem>
          </SubMenu>
          <SubMenu label="Calendar" icon={<Calendar />}>
            <MenuItem>Events</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="accordion-demo"
          checked={accordion}
          onChange={() => setAccordion((v) => !v)}
          label="accordion"
        />
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          With accordion on, opening one top-level <code>SubMenu</code> closes the others.
        </p>
      </div>
    </Card>
  );
};

export const MenuItemStylesDemo = () => {
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => ({
              color: active ? c.activeText : c.sidebarColor,
              backgroundColor: active ? c.activeBg : undefined,
              fontWeight: level === 0 ? 500 : 400,
              '&:hover': { backgroundColor: c.hoverBg, color: c.hoverText },
            }),
            icon: { color: c.iconColor },
            label: { fontWeight: 500 },
            subMenuContent: ({ level }) => ({
              backgroundColor: level === 0 ? c.subMenuBg : 'transparent',
            }),
          }}
        >
          <MenuItem icon={<Diamond />} active>
            Dashboard
          </MenuItem>
          <SubMenu label="Charts" icon={<BarChart />}>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
          <MenuItem icon={<Book />}>Docs</MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          Custom styles via the <code>menuItemStyles</code> prop. The callback form gives you each
          item&apos;s <code>level</code>, <code>active</code>, and <code>disabled</code> state.
        </p>
      </div>
    </Card>
  );
};

export const CloseOnClickDemo = () => {
  const [closeOnClick, setCloseOnClick] = React.useState(true);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar collapsed backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu closeOnClick={closeOnClick} menuItemStyles={c.menuItemStyles}>
          <SubMenu label="Charts" icon={<BarChart />}>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="close-on-click"
          checked={closeOnClick}
          onChange={() => setCloseOnClick((v) => !v)}
          label="closeOnClick"
        />
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          The sidebar is collapsed. Hover the icon to open the popper, then click a MenuItem.
        </p>
      </div>
    </Card>
  );
};

/* ---------- MenuItem prop demos ---------- */

export const ActiveDisabledDemo = () => {
  const [active, setActive] = React.useState('dashboard');
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem
            icon={<Diamond />}
            active={active === 'dashboard'}
            onClick={() => setActive('dashboard')}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<BarChart />}
            active={active === 'reports'}
            onClick={() => setActive('reports')}
          >
            Reports
          </MenuItem>
          <MenuItem icon={<Calendar />} disabled>
            Calendar (disabled)
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          Click an item to switch <code>active</code>. The third item has <code>disabled</code> set.
        </p>
      </div>
    </Card>
  );
};

export const PrefixSuffixDemo = () => {
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <MenuItem icon={<Diamond />} prefix={<span>👋</span>}>
            With prefix
          </MenuItem>
          <MenuItem
            icon={<BarChart />}
            suffix={
              <span
                style={{
                  background: c.iconColor,
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                }}
              >
                New
              </span>
            }
          >
            With suffix badge
          </MenuItem>
          <MenuItem
            icon={<Calendar />}
            prefix={<span style={{ fontSize: 11, opacity: 0.6 }}>·</span>}
            suffix={<span style={{ fontSize: 11, opacity: 0.6 }}>⌘K</span>}
          >
            Both
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          <code>prefix</code> renders between the icon and the label; <code>suffix</code> after the
          label.
        </p>
      </div>
    </Card>
  );
};

/* ---------- SubMenu prop demos ---------- */

export const DefaultOpenDemo = () => {
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <SubMenu label="Charts" icon={<BarChart />} defaultOpen>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
          <SubMenu label="Components" icon={<Diamond />}>
            <MenuItem>Grid</MenuItem>
            <MenuItem>Layout</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          The Charts submenu is open by default thanks to <code>defaultOpen</code>.
        </p>
      </div>
    </Card>
  );
};

export const ControlledOpenDemo = () => {
  const [open, setOpen] = React.useState(false);
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <SubMenu label="Charts" icon={<BarChart />} open={open} onOpenChange={setOpen}>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <Switch
          id="controlled-open"
          checked={open}
          onChange={() => setOpen((v) => !v)}
          label="open"
        />
        <p style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          With <code>open</code> set, the submenu state is fully controlled.
        </p>
      </div>
    </Card>
  );
};

export const SubMenuAccordionDemo = () => {
  const c = useDemoColors();
  return (
    <Card>
      <Sidebar backgroundColor={c.sidebarBg} rootStyles={c.sidebarRootStyles}>
        <Menu menuItemStyles={c.menuItemStyles}>
          <SubMenu label="Components" icon={<Diamond />} accordion defaultOpen>
            <SubMenu label="Forms" defaultOpen>
              <MenuItem>Input</MenuItem>
              <MenuItem>Select</MenuItem>
            </SubMenu>
            <SubMenu label="Layout">
              <MenuItem>Grid</MenuItem>
              <MenuItem>Stack</MenuItem>
            </SubMenu>
            <SubMenu label="Display">
              <MenuItem>Card</MenuItem>
              <MenuItem>List</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="rps-demo-main">
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          The Components submenu has <code>accordion</code> set, so only one of its direct child
          submenus can be open at a time.
        </p>
      </div>
    </Card>
  );
};
