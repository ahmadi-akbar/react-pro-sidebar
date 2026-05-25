import React from 'react';
import { describe, it, expect } from 'vitest';
import { customRender, fireEvent, screen, waitFor } from './testUtils';
import { Sidebar } from '../src/components/Sidebar';
import { Menu } from '../src/components/Menu';
import { MenuItem } from '../src/components/MenuItem';
import { SubMenu } from '../src/components/SubMenu';
import { menuClasses, sidebarClasses } from '../src/utils/utilityClasses';

describe('Menu', () => {
  it('should display popper on submenu click when collapsed', async () => {
    customRender(
      <Sidebar collapsed>
        <Menu>
          <SubMenu label="Charts"></SubMenu>
        </Menu>
      </Sidebar>,
    );

    const submenuButton = screen.getByTestId(`${menuClasses.button}-test-id`);
    const submenuContent = screen.queryByTestId(`${menuClasses.subMenuContent}-test-id`);

    expect(submenuButton).toBeInTheDocument();
    expect(submenuContent).toBeInTheDocument();

    fireEvent.click(submenuButton);

    const sidebarElem = screen.getByTestId(`${sidebarClasses.root}-test-id`);
    expect(sidebarElem).toHaveClass(sidebarClasses.root);
    expect(sidebarElem).toHaveStyle({
      width: '80px',
      'min-width': '80px',
    });
    await waitFor(() =>
      expect(submenuContent).toHaveStyle({
        visibility: 'visible',
      }),
    );
  });

  describe('accessibility', () => {
    it('sets aria-current="page" on an active MenuItem', () => {
      customRender(
        <Sidebar>
          <Menu>
            <MenuItem active>Dashboard</MenuItem>
          </Menu>
        </Sidebar>,
      );
      expect(screen.getByTestId(`${menuClasses.button}-test-id`)).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    it('does not set aria-current on an inactive MenuItem', () => {
      customRender(
        <Sidebar>
          <Menu>
            <MenuItem>Dashboard</MenuItem>
          </Menu>
        </Sidebar>,
      );
      expect(screen.getByTestId(`${menuClasses.button}-test-id`)).not.toHaveAttribute(
        'aria-current',
      );
    });

    it('sets aria-disabled on a disabled MenuItem', () => {
      customRender(
        <Sidebar>
          <Menu>
            <MenuItem disabled>Dashboard</MenuItem>
          </Menu>
        </Sidebar>,
      );
      expect(screen.getByTestId(`${menuClasses.button}-test-id`)).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('reflects SubMenu open state via aria-expanded', () => {
      customRender(
        <Sidebar>
          <Menu>
            <SubMenu label="Charts" defaultOpen>
              <MenuItem>Pie</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );
      const [trigger] = screen.getAllByTestId(`${menuClasses.button}-test-id`);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-haspopup on a collapsed top-level SubMenu trigger', () => {
      customRender(
        <Sidebar collapsed>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem>Pie</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );
      const [trigger] = screen.getAllByTestId(`${menuClasses.button}-test-id`);
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('does not set aria-haspopup when the sidebar is not collapsed', () => {
      customRender(
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem>Pie</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );
      const [trigger] = screen.getAllByTestId(`${menuClasses.button}-test-id`);
      expect(trigger).not.toHaveAttribute('aria-haspopup');
    });

    it('marks a closed SubMenu content inert so hidden items are not tabbable', () => {
      customRender(
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem>Pie</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );
      const content = screen.getByTestId(`${menuClasses.subMenuContent}-test-id`);
      expect(content).toHaveAttribute('inert');
    });

    it('removes inert from SubMenu content when open', () => {
      customRender(
        <Sidebar>
          <Menu>
            <SubMenu label="Charts" defaultOpen>
              <MenuItem>Pie</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );
      const content = screen.getByTestId(`${menuClasses.subMenuContent}-test-id`);
      expect(content).not.toHaveAttribute('inert');
    });

    it('toggles inert on the SubMenu content when the trigger is clicked', () => {
      customRender(
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem>Pie</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );
      const content = screen.getByTestId(`${menuClasses.subMenuContent}-test-id`);
      const [trigger] = screen.getAllByTestId(`${menuClasses.button}-test-id`);

      expect(content).toHaveAttribute('inert');
      fireEvent.click(trigger);
      expect(content).not.toHaveAttribute('inert');
    });
  });
});
