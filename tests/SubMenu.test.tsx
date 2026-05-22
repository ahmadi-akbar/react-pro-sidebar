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

  it('does not re-run the open animation when only onOpenChange identity changes', () => {
    const tree = (onOpenChange: () => void) => (
      <Sidebar>
        <Menu>
          <SubMenu label="Charts" open onOpenChange={onOpenChange}>
            <MenuItem>Pie</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    );
    const { rerender } = customRender(tree(() => {}));

    // The controlled-open effect calls clearTimeout when it runs; a re-render
    // that only swaps the onOpenChange closure must not re-trigger it.
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    rerender(tree(() => {}));

    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('clears the pending animation timer on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = renderSubMenu();

    // Open the submenu — this schedules the slide-animation timer.
    fireEvent.click(screen.getByRole('button', { name: 'Charts' }));

    clearTimeoutSpy.mockClear();
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
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
});
