/**
 * Build a copy-paste-able JSX snippet that reproduces the current playground
 * configuration. Only emits props that diverge from the package defaults so
 * the snippet stays minimal.
 */

export interface PlaygroundState {
  collapsed: boolean;
  toggled: boolean;
  rtl: boolean;
  hasImage: boolean;
  popover: boolean;
  accordion: boolean;
  closeOnClick: boolean;
  theme: 'light' | 'dark';
  width: number;
  collapsedWidth: number;
  breakPoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'all' | 'none';
  transitionDuration: number;
}

/** Defaults used by react-pro-sidebar. */
const DEFAULTS = {
  width: 250,
  collapsedWidth: 80,
  transitionDuration: 300,
};

const IMAGE_URL =
  'https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg';

export function generateCode(state: PlaygroundState): string {
  // --- Sidebar props ---
  const sidebarProps: string[] = [];
  if (state.collapsed) sidebarProps.push('  collapsed');
  sidebarProps.push('  toggled={toggled}');
  sidebarProps.push('  onBackdropClick={() => setToggled(false)}');
  sidebarProps.push('  onBreakPoint={setBroken}');
  if (state.rtl) sidebarProps.push('  rtl');
  if (state.breakPoint !== 'none') {
    sidebarProps.push(`  breakPoint="${state.breakPoint}"`);
  }
  if (state.width !== DEFAULTS.width) {
    sidebarProps.push(`  width="${state.width}px"`);
  }
  if (state.collapsedWidth !== DEFAULTS.collapsedWidth) {
    sidebarProps.push(`  collapsedWidth="${state.collapsedWidth}px"`);
  }
  if (state.transitionDuration !== DEFAULTS.transitionDuration) {
    sidebarProps.push(`  transitionDuration={${state.transitionDuration}}`);
  }
  if (state.hasImage) {
    sidebarProps.push(`  image="${IMAGE_URL}"`);
    sidebarProps.push(
      `  backgroundColor="${
        state.theme === 'dark' ? 'rgba(11,41,72,0.9)' : 'rgba(255,255,255,0.9)'
      }"`,
    );
  } else if (state.theme === 'dark') {
    sidebarProps.push(`  backgroundColor="#0b2948"`);
  }
  if (state.theme === 'dark') {
    sidebarProps.push(`  rootStyles={{ color: '#8ba1b7' }}`);
  }

  // --- Menu props ---
  const menuProps: string[] = [];
  if (state.popover) menuProps.push('  popover');
  if (state.accordion) menuProps.push('  accordion');
  if (state.closeOnClick) menuProps.push('  closeOnClick');
  menuProps.push('  menuItemStyles={menuItemStyles}');

  const sidebarOpen =
    sidebarProps.length === 0 ? '<Sidebar>' : `<Sidebar\n${sidebarProps.join('\n')}\n>`;
  const menuOpen = menuProps.length === 0 ? '<Menu>' : `<Menu\n  ${menuProps.join('\n  ')}\n  >`;

  return `import { useState } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  type MenuItemStyles,
} from 'react-pro-sidebar';

export default function App() {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const menuItemStyles: MenuItemStyles = {
    button: {
      '&:hover': {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
    },
  };

  return (
    ${sidebarOpen.replace(/\n/g, '\n    ')}
      ${menuOpen.replace(/\n/g, '\n      ')}
        <SubMenu label="Charts">
          <MenuItem>Pie charts</MenuItem>
          <MenuItem>Line charts</MenuItem>
        </SubMenu>
        <MenuItem>Calendar</MenuItem>
        <MenuItem>Documentation</MenuItem>
      </Menu>
    </Sidebar>
  );
}
`;
}
