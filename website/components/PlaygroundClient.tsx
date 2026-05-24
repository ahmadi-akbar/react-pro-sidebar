import React from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  type MenuItemStyles,
} from 'react-pro-sidebar';
import { Switch, Badge, Typography, SidebarHeader, SidebarFooter } from './playground/ui';
import {
  Diamond,
  BarChart,
  Global,
  InkBottle,
  Book,
  Calendar,
  ShoppingCart,
  Service,
} from './playground/icons';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: { backgroundColor: '#ffffff', color: '#607489' },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: { backgroundColor: '#c5e4ff', color: '#44596e' },
      disabled: { color: '#9fb6cf' },
    },
  },
  dark: {
    sidebar: { backgroundColor: '#0b2948', color: '#8ba1b7' },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: { backgroundColor: '#00458b', color: '#b6c8d9' },
      disabled: { color: '#3e5e7e' },
    },
  },
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* ---------- i18n strings ---------- */

const strings = {
  en: {
    sectionGeneral: 'General',
    sectionExtra: 'Extra',
    charts: 'Charts',
    pieCharts: 'Pie charts',
    lineCharts: 'Line charts',
    barCharts: 'Bar charts',
    maps: 'Maps',
    googleMaps: 'Google maps',
    openStreetMaps: 'Open street maps',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    components: 'Components',
    grid: 'Grid',
    layout: 'Layout',
    forms: 'Forms',
    input: 'Input',
    select: 'Select',
    more: 'More',
    checkbox: 'CheckBox',
    radio: 'Radio',
    ecommerce: 'E-commerce',
    product: 'Product',
    orders: 'Orders',
    creditCard: 'Credit card',
    calendar: 'Calendar',
    documentation: 'Documentation',
    examples: 'Examples',
    badgeNew: 'New',
    toggle: 'Toggle',
    heroTitle: 'Interactive Playground',
    heroSubtitle:
      'Try React Pro Sidebar in real time. Flip the controls below to see each prop in action.',
    ctrlCollapse: 'Collapse',
    ctrlRtl: 'RTL',
    ctrlDarkTheme: 'Dark theme',
    ctrlBackgroundImage: 'Background image',
    ctrlPopover: 'Popover mode',
  },
  ar: {
    sectionGeneral: 'عام',
    sectionExtra: 'إضافي',
    charts: 'الرسوم البيانية',
    pieCharts: 'رسوم بيانية دائرية',
    lineCharts: 'رسوم بيانية خطية',
    barCharts: 'رسوم بيانية شريطية',
    maps: 'الخرائط',
    googleMaps: 'خرائط جوجل',
    openStreetMaps: 'خرائط الشوارع المفتوحة',
    theme: 'السمة',
    dark: 'داكن',
    light: 'فاتح',
    components: 'المكونات',
    grid: 'الشبكة',
    layout: 'التخطيط',
    forms: 'النماذج',
    input: 'إدخال',
    select: 'قائمة منسدلة',
    more: 'المزيد',
    checkbox: 'خانة اختيار',
    radio: 'زر اختيار',
    ecommerce: 'التجارة الإلكترونية',
    product: 'المنتجات',
    orders: 'الطلبات',
    creditCard: 'بطاقة الائتمان',
    calendar: 'التقويم',
    documentation: 'الوثائق',
    examples: 'أمثلة',
    badgeNew: 'جديد',
    toggle: 'تبديل',
    heroTitle: 'ساحة تفاعلية',
    heroSubtitle:
      'جرّب React Pro Sidebar مباشرة. غيّر الإعدادات أدناه لمشاهدة كل خاصية أثناء العمل.',
    ctrlCollapse: 'طيّ الشريط',
    ctrlRtl: 'اتجاه RTL',
    ctrlDarkTheme: 'السمة الداكنة',
    ctrlBackgroundImage: 'صورة الخلفية',
    ctrlPopover: 'وضع النافذة المنبثقة',
  },
};

export default function PlaygroundClient() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [popover, setPopover] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>('light');

  const t = rtl ? strings.ar : strings.en;

  const menuItemStyles: MenuItemStyles = {
    root: { fontSize: '13px', fontWeight: 400 },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
    },
    SubMenuExpandIcon: { color: '#b6b7b9' },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({ fontWeight: open ? 600 : undefined }),
  };

  return (
    <div
      lang={rtl ? 'ar' : 'en'}
      style={{
        display: 'flex',
        height: '100vh',
        direction: rtl ? 'rtl' : 'ltr',
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={rtl}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
        rootStyles={{ color: themes[theme].sidebar.color }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SidebarHeader rtl={rtl} style={{ marginBottom: 24, marginTop: 16 }} />
          <div style={{ flex: 1, marginBottom: 32 }}>
            <div style={{ padding: '0 24px', marginBottom: 8 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                {t.sectionGeneral}
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles} popover={popover}>
              <SubMenu
                label={t.charts}
                icon={<BarChart />}
                suffix={
                  <Badge variant="danger" shape="circle">
                    6
                  </Badge>
                }
              >
                <MenuItem>{t.pieCharts}</MenuItem>
                <MenuItem>{t.lineCharts}</MenuItem>
                <MenuItem>{t.barCharts}</MenuItem>
              </SubMenu>
              <SubMenu label={t.maps} icon={<Global />}>
                <MenuItem>{t.googleMaps}</MenuItem>
                <MenuItem>{t.openStreetMaps}</MenuItem>
              </SubMenu>
              <SubMenu label={t.theme} icon={<InkBottle />}>
                <MenuItem>{t.dark}</MenuItem>
                <MenuItem>{t.light}</MenuItem>
              </SubMenu>
              <SubMenu label={t.components} icon={<Diamond />}>
                <MenuItem>{t.grid}</MenuItem>
                <MenuItem>{t.layout}</MenuItem>
                <SubMenu label={t.forms}>
                  <MenuItem>{t.input}</MenuItem>
                  <MenuItem>{t.select}</MenuItem>
                  <SubMenu label={t.more}>
                    <MenuItem>{t.checkbox}</MenuItem>
                    <MenuItem>{t.radio}</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label={t.ecommerce} icon={<ShoppingCart />}>
                <MenuItem>{t.product}</MenuItem>
                <MenuItem>{t.orders}</MenuItem>
                <MenuItem>{t.creditCard}</MenuItem>
              </SubMenu>
            </Menu>

            <div style={{ padding: '0 24px', marginBottom: 8, marginTop: 32 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                {t.sectionExtra}
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles} popover={popover}>
              <MenuItem icon={<Calendar />} suffix={<Badge variant="success">{t.badgeNew}</Badge>}>
                {t.calendar}
              </MenuItem>
              <MenuItem icon={<Book />}>{t.documentation}</MenuItem>
              <MenuItem disabled icon={<Service />}>
                {t.examples}
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>

      <main style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '16px 24px' }}>
          <div style={{ marginBottom: 16 }}>
            {broken && (
              <button
                onClick={() => setToggled(!toggled)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                {t.toggle}
              </button>
            )}
          </div>
          <div style={{ marginBottom: 32 }}>
            <Typography variant="h4" fontWeight={700}>
              {t.heroTitle}
            </Typography>
            <Typography variant="body2" style={{ opacity: 0.75, marginTop: 8 }}>
              {t.heroSubtitle}
            </Typography>
          </div>

          <div style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
            <Switch
              id="collapse"
              checked={collapsed}
              onChange={() => setCollapsed(!collapsed)}
              label={t.ctrlCollapse}
            />
            <Switch
              id="rtl"
              checked={rtl}
              onChange={(e) => setRtl(e.target.checked)}
              label={t.ctrlRtl}
            />
            <Switch
              id="theme"
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              label={t.ctrlDarkTheme}
            />
            <Switch
              id="image"
              checked={hasImage}
              onChange={(e) => setHasImage(e.target.checked)}
              label={t.ctrlBackgroundImage}
            />
            <Switch
              id="popover"
              checked={popover}
              onChange={() => setPopover(!popover)}
              label={t.ctrlPopover}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
