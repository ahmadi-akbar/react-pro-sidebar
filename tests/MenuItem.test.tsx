import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { customRender, fireEvent, screen } from './testUtils';
import { Sidebar } from '../src/components/Sidebar';
import { Menu } from '../src/components/Menu';
import { MenuItem } from '../src/components/MenuItem';
import { menuClasses } from '../src/utils/utilityClasses';

const renderMenuItem = (props = {}, children: React.ReactNode = 'Dashboard') =>
  customRender(
    <Sidebar>
      <Menu>
        <MenuItem {...props}>{children}</MenuItem>
      </Menu>
    </Sidebar>,
  );

const getButton = () => screen.getByTestId(`${menuClasses.button}-test-id`);

describe('MenuItem', () => {
  it('renders label, icon, prefix and suffix', () => {
    renderMenuItem({
      icon: <span data-testid="icon" />,
      prefix: <span data-testid="prefix" />,
      suffix: <span data-testid="suffix" />,
    });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('applies the active class and aria-current', () => {
    renderMenuItem({ active: true });
    const button = getButton();
    expect(button).toHaveClass(menuClasses.active);
    expect(button).toHaveAttribute('aria-current', 'page');
  });

  it('applies the disabled class and aria-disabled', () => {
    renderMenuItem({ disabled: true });
    const button = getButton();
    expect(button).toHaveClass(menuClasses.disabled);
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderMenuItem({ onClick });
    fireEvent.click(getButton());
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as an anchor by default', () => {
    renderMenuItem();
    expect(getButton().tagName).toBe('A');
  });

  it('renders a custom string component', () => {
    renderMenuItem({ component: 'div' });
    const button = getButton();
    expect(button.tagName).toBe('DIV');
    expect(button).toHaveClass(menuClasses.button);
  });

  it('renders a custom element component (e.g. a router Link) and merges props', () => {
    const Link = ({ to, children, ...props }: { to: string; children?: React.ReactNode }) => (
      <a href={to} {...props}>
        {children}
      </a>
    );

    renderMenuItem({ component: <Link to="/documentation" /> }, 'Documentation');

    const button = getButton();
    expect(button.tagName).toBe('A');
    expect(button).toHaveAttribute('href', '/documentation');
    expect(button).toHaveClass(menuClasses.button);
    expect(button).toHaveTextContent('Documentation');
  });

  it('applies rootStyles to the root element', () => {
    renderMenuItem({ rootStyles: { backgroundColor: 'rgb(255, 0, 0)' } });
    const root = getButton().closest(`.${menuClasses.menuItemRoot}`);
    expect(root).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
  });
});
