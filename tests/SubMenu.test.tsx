import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { customRender, fireEvent, screen, waitFor } from './testUtils';
import { Sidebar } from '../src/components/Sidebar';
import { Menu } from '../src/components/Menu';
import { MenuItem } from '../src/components/MenuItem';
import { SubMenu } from '../src/components/SubMenu';
import { menuClasses } from '../src/utils/utilityClasses';

const renderSubMenu = (subMenuProps = {}, menuProps = {}, sidebarProps = {}) =>
  customRender(
    <Sidebar {...sidebarProps}>
      <Menu {...menuProps}>
        <SubMenu label="Charts" {...subMenuProps}>
          <MenuItem>Pie</MenuItem>
          <MenuItem>Line</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>,
  );

describe('SubMenu', () => {
  it('renders label, icon, prefix and suffix', () => {
    renderSubMenu({
      icon: <span data-testid="icon" />,
      prefix: <span data-testid="prefix" />,
      suffix: <span data-testid="suffix" />,
    });

    expect(screen.getByText('Charts')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('toggles open state on click when uncontrolled', () => {
    const onOpenChange = vi.fn();
    renderSubMenu({ onOpenChange });

    const trigger = screen.getByRole('button', { name: 'Charts' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('is open initially when defaultOpen is set', () => {
    renderSubMenu({ defaultOpen: true });
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles on Enter key', () => {
    const onOpenChange = vi.fn();
    renderSubMenu({ onOpenChange });

    const trigger = screen.getByRole('button', { name: 'Charts' });
    fireEvent.keyUp(trigger, { key: 'Enter' });

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects the controlled open prop', () => {
    const onOpenChange = vi.fn();
    const { rerender } = customRender(
      <Sidebar>
        <Menu>
          <SubMenu label="Charts" open={false} onOpenChange={onOpenChange}>
            <MenuItem>Pie</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>,
    );

    const trigger = screen.getByRole('button', { name: 'Charts' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // clicking notifies via callback but does not change state on its own
    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // state only changes when the controlling prop changes
    rerender(
      <Sidebar>
        <Menu>
          <SubMenu label="Charts" open onOpenChange={onOpenChange}>
            <MenuItem>Pie</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>,
    );
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('reflects disabled state', () => {
    renderSubMenu({ disabled: true });
    const trigger = screen.getByRole('button', { name: 'Charts' });
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    expect(trigger).toHaveClass(menuClasses.disabled);
  });

  describe('accordion', () => {
    it('opens only one top-level SubMenu at a time when Menu.accordion is set', () => {
      customRender(
        <Sidebar>
          <Menu accordion>
            <SubMenu label="A">
              <MenuItem>A1</MenuItem>
            </SubMenu>
            <SubMenu label="B">
              <MenuItem>B1</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );

      const a = screen.getByRole('button', { name: 'A' });
      const b = screen.getByRole('button', { name: 'B' });

      fireEvent.click(a);
      expect(a).toHaveAttribute('aria-expanded', 'true');
      expect(b).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(b);
      expect(a).toHaveAttribute('aria-expanded', 'false');
      expect(b).toHaveAttribute('aria-expanded', 'true');

      // toggling the open one closes it (no leftover open)
      fireEvent.click(b);
      expect(b).toHaveAttribute('aria-expanded', 'false');
    });

    it('does not affect submenus at deeper levels (per-level scope)', () => {
      customRender(
        <Sidebar>
          <Menu accordion>
            <SubMenu label="Top">
              <SubMenu label="X">
                <MenuItem>X1</MenuItem>
              </SubMenu>
              <SubMenu label="Y">
                <MenuItem>Y1</MenuItem>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );

      const x = screen.getByRole('button', { name: 'X' });
      const y = screen.getByRole('button', { name: 'Y' });

      fireEvent.click(x);
      fireEvent.click(y);

      // both nested submenus can be open — Menu's accordion only scopes level 0
      expect(x).toHaveAttribute('aria-expanded', 'true');
      expect(y).toHaveAttribute('aria-expanded', 'true');
    });

    it('coordinates direct children when SubMenu.accordion is set', () => {
      customRender(
        <Sidebar>
          <Menu>
            <SubMenu label="Group" accordion>
              <SubMenu label="X">
                <MenuItem>X1</MenuItem>
              </SubMenu>
              <SubMenu label="Y">
                <MenuItem>Y1</MenuItem>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );

      const x = screen.getByRole('button', { name: 'X' });
      const y = screen.getByRole('button', { name: 'Y' });

      fireEvent.click(x);
      expect(x).toHaveAttribute('aria-expanded', 'true');
      expect(y).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(y);
      expect(x).toHaveAttribute('aria-expanded', 'false');
      expect(y).toHaveAttribute('aria-expanded', 'true');
    });

    it('honors defaultOpen and warns when multiple siblings have it', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      customRender(
        <Sidebar>
          <Menu accordion>
            <SubMenu label="A" defaultOpen>
              <MenuItem>A1</MenuItem>
            </SubMenu>
            <SubMenu label="B" defaultOpen>
              <MenuItem>B1</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );

      // Last-rendered defaultOpen wins.
      expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('aria-expanded', 'true');
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Multiple SubMenus have `defaultOpen`'),
      );

      warn.mockRestore();
    });

    it('lets a controlled `open` prop override the accordion', () => {
      customRender(
        <Sidebar>
          <Menu accordion>
            <SubMenu label="A" open>
              <MenuItem>A1</MenuItem>
            </SubMenu>
            <SubMenu label="B">
              <MenuItem>B1</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );

      const a = screen.getByRole('button', { name: 'A' });
      const b = screen.getByRole('button', { name: 'B' });

      // Controlled A stays open; opening B (uncontrolled) does not change A.
      expect(a).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(b);
      expect(a).toHaveAttribute('aria-expanded', 'true');
      expect(b).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('collapsed (popper) behavior', () => {
    it('opens the popper on click and closes it on Escape', async () => {
      renderSubMenu({}, {}, { collapsed: true });

      const trigger = screen.getByRole('button', { name: 'Charts' });
      const content = screen.getByTestId(`${menuClasses.subMenuContent}-test-id`);

      fireEvent.click(trigger);
      await waitFor(() => expect(content).toHaveStyle({ visibility: 'visible' }));

      fireEvent.keyUp(document, { key: 'Escape' });
      await waitFor(() => expect(content).toHaveStyle({ visibility: 'hidden' }));
    });

    it('closes the popper on menu item click when closeOnClick is set', async () => {
      renderSubMenu({}, { closeOnClick: true }, { collapsed: true });

      const trigger = screen.getByRole('button', { name: 'Charts' });
      const content = screen.getByTestId(`${menuClasses.subMenuContent}-test-id`);

      fireEvent.click(trigger);
      await waitFor(() => expect(content).toHaveStyle({ visibility: 'visible' }));

      fireEvent.click(screen.getByText('Pie'));
      await waitFor(() => expect(content).toHaveStyle({ visibility: 'hidden' }));
    });
  });

  describe('popover (flyout) behavior', () => {
    it('opens a top-level submenu as a popper when Menu.popover is set, even while expanded', async () => {
      renderSubMenu({}, { popover: true }); // sidebar NOT collapsed

      const trigger = screen.getByRole('button', { name: 'Charts' });
      const content = screen.getByTestId(`${menuClasses.subMenuContent}-test-id`);

      // popover triggers expose aria-haspopup
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');

      fireEvent.click(trigger);
      await waitFor(() => expect(content).toHaveStyle({ visibility: 'visible' }));

      fireEvent.keyUp(document, { key: 'Escape' });
      await waitFor(() => expect(content).toHaveStyle({ visibility: 'hidden' }));
    });

    it('does not put nested (level > 0) submenus into popover mode', () => {
      customRender(
        <Sidebar>
          <Menu popover>
            <SubMenu label="Top">
              <SubMenu label="Nested">
                <MenuItem>Leaf</MenuItem>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sidebar>,
      );

      // top-level submenu is a popover trigger
      const top = screen.getByRole('button', { name: 'Top' });
      expect(top).toHaveAttribute('aria-haspopup', 'menu');

      // open the popover so the nested submenu leaves the inert subtree
      fireEvent.click(top);

      // the nested (level > 1) submenu is not a popover — it slides inline
      expect(screen.getByRole('button', { name: 'Nested' })).not.toHaveAttribute('aria-haspopup');
    });
  });
});
