import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Menu, menuClasses, MenuItem, Sidebar } from '../../src';
import { Icon } from '../icons/Icon';

const StoryParams: Meta<typeof MenuItem> = {
  title: 'MenuItem',
  component: MenuItem,
  argTypes: {},
};

export default StoryParams;

export const Basic: StoryFn<typeof MenuItem> = ({ ...props }) => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem {...props}>Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);

Basic.parameters = {
  docs: {
    source: {
      code: `
      import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

      () => (
        <div style={{ display: 'flex', height: '100%' }}>
          <Sidebar>
            <Menu>
              <MenuItem> Documentation </MenuItem>
              <MenuItem> Calendar </MenuItem>
              <MenuItem> E-commerce </MenuItem>
              <MenuItem> Examples </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      )`,
    },
  },
};

export const WithIcon: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem icon={<Icon name="book-2" />}>Documentation</MenuItem>
        <MenuItem icon={<Icon name="calendar" />}> Calendar</MenuItem>
        <MenuItem icon={<Icon name="shopping-cart" />}> E-commerce</MenuItem>
        <MenuItem icon={<Icon name="service" />}> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
WithIcon.storyName = 'icon';

export const Prefix: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem prefix="🔥">Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
Prefix.storyName = 'prefix';

export const Suffix: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem suffix="🔥">Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
Suffix.storyName = 'suffix';

export const Active: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem active>Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
Active.storyName = 'active';

export const Disabled: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem disabled>Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
Disabled.storyName = 'disabled';

export const Component: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem component="div">Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
Component.storyName = 'component';

export const RootStyles: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <MenuItem
          rootStyles={{
            ['.' + menuClasses.button]: {
              backgroundColor: '#eaabff',
              color: '#9f0099',
              '&:hover': {
                backgroundColor: '#eecef9',
              },
            },
          }}
        >
          Documentation
        </MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
RootStyles.storyName = 'rootStyles';
