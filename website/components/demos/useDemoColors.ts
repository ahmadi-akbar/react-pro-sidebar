import { useTheme } from 'next-themes';
import type { MenuItemStyles } from 'react-pro-sidebar';

/**
 * Theme-aware colors used by every live demo on the docs site. Reads the
 * current Nextra theme (light / dark) via next-themes and returns a single
 * palette plus a ready-to-use `menuItemStyles` block.
 *
 * Demos are dynamic-imported with `ssr: false`, so `resolvedTheme` is always
 * defined by the time these render — no flash of wrong colors.
 */
export const useDemoColors = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const palette = {
    isDark,
    /** Sidebar surface — slightly elevated from the demo-frame background so
     *  it reads as a distinct panel in both light and dark modes. */
    sidebarBg: isDark ? '#1e293b' : '#ffffff',
    /** Default text color inside the sidebar. */
    sidebarColor: isDark ? '#cbd5e1' : '#44596e',
    /** Border between sidebar and main content. */
    sidebarBorder: isDark ? 'rgba(255,255,255,0.08)' : '#efefef',
    /** Icon accent — uses the brand blue, brighter in dark mode. */
    iconColor: isDark ? '#59d0ff' : '#0098e5',
    /** Hover background for menu items. */
    hoverBg: isDark ? 'rgba(89,208,255,0.12)' : '#e8f3ff',
    /** Hover text color. */
    hoverText: isDark ? '#e2e8f0' : '#0d3b66',
    /** Active item background. */
    activeBg: isDark ? 'rgba(89,208,255,0.18)' : '#cfe7ff',
    /** Active item text. */
    activeText: isDark ? '#7dd3fc' : '#0d3b66',
    /** Disabled text. */
    disabledColor: isDark ? '#475569' : '#9fb6cf',
    /** Submenu panel background (for nested children). */
    subMenuBg: isDark ? '#172033' : '#fbfcfd',
  };

  /** Drop-in styles for the demos' Menu components. */
  const menuItemStyles: MenuItemStyles = {
    button: {
      color: palette.sidebarColor,
      '&:hover': {
        backgroundColor: palette.hoverBg,
        color: palette.hoverText,
      },
      '&.ps-active': {
        backgroundColor: palette.activeBg,
        color: palette.activeText,
      },
      '&.ps-disabled': {
        color: palette.disabledColor,
      },
    },
    icon: {
      color: palette.iconColor,
      '&.ps-disabled': {
        color: palette.disabledColor,
      },
    },
    label: {
      fontWeight: 500,
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? palette.subMenuBg : 'transparent',
    }),
  };

  /** Standard root styles for a demo sidebar. */
  const sidebarRootStyles = {
    color: palette.sidebarColor,
    borderColor: palette.sidebarBorder,
  };

  return { ...palette, menuItemStyles, sidebarRootStyles };
};
