import React from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  type MenuItemStyles,
} from 'react-pro-sidebar';
import {
  Switch,
  Select,
  Slider,
  Badge,
  Typography,
  SidebarHeader,
  SidebarFooter,
} from './playground/ui';
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
import { CodePanel } from './playground/CodePanel';
import { generateCode } from './playground/generateCode';
import { AdSenseAd } from './AdSenseAd';

/**
 * AdSense slot ID for the playground in-content ad unit.
 * Created in AdSense dashboard as `rps-playground` (Display ad, responsive).
 */
const PLAYGROUND_AD_SLOT = '5929595045';

type Theme = 'light' | 'dark';
type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'all' | 'none';

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
    state: 'State',
    behavior: 'Behavior',
    appearance: 'Appearance',
    sizing: 'Sizing & timing',
    ctrlCollapse: 'Collapsed',
    ctrlRtl: 'RTL',
    ctrlDarkTheme: 'Dark theme',
    ctrlBackgroundImage: 'Background image',
    ctrlPopover: 'Popover',
    ctrlAccordion: 'Accordion',
    ctrlCloseOnClick: 'Close on click',
    ctrlWidth: 'Width',
    ctrlCollapsedWidth: 'Collapsed width',
    ctrlBreakPoint: 'Breakpoint',
    ctrlTransitionDuration: 'Transition duration',
    breakPointNone: 'none',
    breakPointAll: 'all',
    statusBroken: 'Broken',
    statusExpanded: 'Expanded',
    statusCollapsed: 'Collapsed',
    generatedCode: 'Generated code',
    copy: 'Copy',
    copied: 'Copied!',
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
    state: 'الحالة',
    behavior: 'السلوك',
    appearance: 'المظهر',
    sizing: 'الأبعاد والمؤقتات',
    ctrlCollapse: 'مطوي',
    ctrlRtl: 'اتجاه RTL',
    ctrlDarkTheme: 'السمة الداكنة',
    ctrlBackgroundImage: 'صورة الخلفية',
    ctrlPopover: 'وضع منبثق',
    ctrlAccordion: 'أكورديون',
    ctrlCloseOnClick: 'إغلاق عند النقر',
    ctrlWidth: 'العرض',
    ctrlCollapsedWidth: 'عرض الحالة المطوية',
    ctrlBreakPoint: 'نقطة التوقف',
    ctrlTransitionDuration: 'مدة الانتقال',
    breakPointNone: 'بدون',
    breakPointAll: 'الكل',
    statusBroken: 'مكسور',
    statusExpanded: 'موسّع',
    statusCollapsed: 'مطوي',
    generatedCode: 'الكود المولّد',
    copy: 'نسخ',
    copied: 'تم النسخ!',
  },
};

/* ---------- Reusable layout primitives ---------- */

const ControlGroup: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section
    style={{
      background: 'rgba(127,127,127,0.05)',
      border: '1px solid rgba(127,127,127,0.15)',
      borderRadius: 10,
      padding: '14px 16px',
    }}
  >
    <h3
      style={{
        margin: '0 0 12px',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        opacity: 0.6,
      }}
    >
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
  </section>
);

const StatusPill: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 500,
      background: active ? 'rgba(0,152,229,0.12)' : 'rgba(127,127,127,0.1)',
      color: active ? '#0098e5' : 'inherit',
      border: `1px solid ${active ? 'rgba(0,152,229,0.3)' : 'rgba(127,127,127,0.2)'}`,
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: active ? '#0098e5' : 'currentColor',
        opacity: active ? 1 : 0.4,
      }}
    />
    {label}
  </span>
);

export default function PlaygroundClient() {
  /* ---------- State ---------- */
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [popover, setPopover] = React.useState(false);
  const [accordion, setAccordion] = React.useState(false);
  const [closeOnClick, setCloseOnClick] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>('light');
  const [width, setWidth] = React.useState(250);
  const [collapsedWidth, setCollapsedWidth] = React.useState(80);
  const [breakPoint, setBreakPoint] = React.useState<BreakPoint>('md');
  const [transitionDuration, setTransitionDuration] = React.useState(300);

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

  const generatedCode = generateCode({
    collapsed,
    toggled,
    rtl,
    hasImage,
    popover,
    accordion,
    closeOnClick,
    theme,
    width,
    collapsedWidth,
    breakPoint,
    transitionDuration,
  });

  const breakPointOptions = [
    { value: 'none', label: t.breakPointNone },
    { value: 'xs', label: 'xs (480px)' },
    { value: 'sm', label: 'sm (576px)' },
    { value: 'md', label: 'md (768px)' },
    { value: 'lg', label: 'lg (992px)' },
    { value: 'xl', label: 'xl (1200px)' },
    { value: 'xxl', label: 'xxl (1600px)' },
    { value: 'all', label: t.breakPointAll },
  ];

  return (
    <div
      lang={rtl ? 'ar' : 'en'}
      style={{
        display: 'flex',
        height: '100vh',
        direction: rtl ? 'rtl' : 'ltr',
        background: theme === 'dark' ? '#0a1d33' : '#f7fafc',
        color: theme === 'dark' ? '#cbd5e1' : '#1f2937',
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image={
          hasImage
            ? 'https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg'
            : undefined
        }
        rtl={rtl}
        breakPoint={breakPoint === 'none' ? undefined : breakPoint}
        width={`${width}px`}
        collapsedWidth={`${collapsedWidth}px`}
        transitionDuration={transitionDuration}
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
            <Menu
              menuItemStyles={menuItemStyles}
              popover={popover}
              accordion={accordion}
              closeOnClick={closeOnClick}
            >
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

            <Menu
              menuItemStyles={menuItemStyles}
              popover={popover}
              accordion={accordion}
              closeOnClick={closeOnClick}
            >
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
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 28px 48px' }}>
          {/* Hero */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <Typography variant="h4" fontWeight={700}>
                {t.heroTitle}
              </Typography>
              <Typography variant="body2" style={{ opacity: 0.7, marginTop: 8, maxWidth: 540 }}>
                {t.heroSubtitle}
              </Typography>
            </div>
            {broken && (
              <button
                onClick={() => setToggled(!toggled)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(135deg, #0098e5 0%, #59d0ff 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(0,152,229,0.3)',
                }}
              >
                {t.toggle}
              </button>
            )}
          </div>

          {/* Live status row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 28,
            }}
          >
            <StatusPill label={collapsed ? t.statusCollapsed : t.statusExpanded} active />
            {rtl && <StatusPill label="RTL" active />}
            {theme === 'dark' && <StatusPill label={t.dark} active />}
            {broken && <StatusPill label={t.statusBroken} active />}
            {popover && <StatusPill label={t.ctrlPopover} active />}
            {accordion && <StatusPill label={t.ctrlAccordion} active />}
            {hasImage && <StatusPill label={t.ctrlBackgroundImage} active />}
          </div>

          {/* Controls — grouped */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 14,
            }}
          >
            <ControlGroup title={t.state}>
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
            </ControlGroup>

            <ControlGroup title={t.behavior}>
              <Switch
                id="popover"
                checked={popover}
                onChange={() => setPopover(!popover)}
                label={t.ctrlPopover}
              />
              <Switch
                id="accordion"
                checked={accordion}
                onChange={() => setAccordion(!accordion)}
                label={t.ctrlAccordion}
              />
              <Switch
                id="close-on-click"
                checked={closeOnClick}
                onChange={() => setCloseOnClick(!closeOnClick)}
                label={t.ctrlCloseOnClick}
              />
            </ControlGroup>

            <ControlGroup title={t.appearance}>
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
            </ControlGroup>

            <ControlGroup title={t.sizing}>
              <Slider
                id="width"
                value={width}
                min={180}
                max={400}
                step={10}
                onChange={setWidth}
                label={t.ctrlWidth}
                unit="px"
              />
              <Slider
                id="collapsed-width"
                value={collapsedWidth}
                min={40}
                max={150}
                step={5}
                onChange={setCollapsedWidth}
                label={t.ctrlCollapsedWidth}
                unit="px"
              />
              <Slider
                id="transition-duration"
                value={transitionDuration}
                min={0}
                max={1500}
                step={50}
                onChange={setTransitionDuration}
                label={t.ctrlTransitionDuration}
                unit="ms"
              />
              <Select
                id="breakpoint"
                value={breakPoint}
                onChange={(e) => setBreakPoint(e.target.value as BreakPoint)}
                label={t.ctrlBreakPoint}
                options={breakPointOptions}
              />
            </ControlGroup>
          </div>

          {/* AdSense in-content slot — sits between the controls and the
              generated-code preview so it's visible without competing with
              the primary actions. */}
          <div style={{ marginTop: 24, minHeight: 90 }}>
            <AdSenseAd slot={PLAYGROUND_AD_SLOT} />
          </div>

          {/* Generated-code preview with copy-to-clipboard */}
          <div style={{ marginTop: 32 }}>
            <h3
              style={{
                margin: '0 0 10px',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                opacity: 0.6,
              }}
            >
              {t.generatedCode}
            </h3>
            <CodePanel
              code={generatedCode}
              title="App.jsx"
              copyLabel={t.copy}
              copiedLabel={t.copied}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
