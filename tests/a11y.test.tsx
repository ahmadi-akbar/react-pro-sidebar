import React from 'react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { customRender } from './testUtils';
import { Sidebar } from '../src/components/Sidebar';
import { Menu } from '../src/components/Menu';
import { MenuItem } from '../src/components/MenuItem';
import { SubMenu } from '../src/components/SubMenu';

describe('accessibility (axe)', () => {
  it('Sidebar with a basic menu has no violations', async () => {
    const { container } = customRender(
      <Sidebar>
        <Menu>
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>Calendar</MenuItem>
        </Menu>
      </Sidebar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('MenuItem states (active / disabled / normal) have no violations', async () => {
    const { container } = customRender(
      <Sidebar>
        <Menu>
          <MenuItem active>Active</MenuItem>
          <MenuItem disabled>Disabled</MenuItem>
          <MenuItem>Normal</MenuItem>
        </Menu>
      </Sidebar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('SubMenu (closed) has no violations', async () => {
    const { container } = customRender(
      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('SubMenu (open) has no violations', async () => {
    const { container } = customRender(
      <Sidebar>
        <Menu>
          <SubMenu label="Charts" defaultOpen>
            <MenuItem>Pie</MenuItem>
            <MenuItem>Line</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('collapsed Sidebar with a SubMenu has no violations', async () => {
    const { container } = customRender(
      <Sidebar collapsed>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem>Pie</MenuItem>
          </SubMenu>
          <MenuItem>Documentation</MenuItem>
        </Menu>
      </Sidebar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
