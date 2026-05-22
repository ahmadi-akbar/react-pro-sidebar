import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Menu, menuClasses, MenuItem, Sidebar, SubMenu } from '../../src';
import { Icon } from '../icons/Icon';

const StoryParams: Meta<typeof SubMenu> = {
  title: 'SubMenu',
  component: SubMenu,
  argTypes: {},
};

export default StoryParams;

export const Basic: StoryFn<typeof SubMenu> = ({ ...props }) => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <SubMenu {...props} label="Charts">
          <MenuItem> Pie charts</MenuItem>
          <MenuItem> Line charts</MenuItem>
          <MenuItem> Bar charts</MenuItem>
        </SubMenu>
        <SubMenu label="Maps">
          <MenuItem> Google maps</MenuItem>
          <MenuItem> Open street maps</MenuItem>
        </SubMenu>
        <SubMenu label="Theme">
          <MenuItem> Dark</MenuItem>
          <MenuItem> Light</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>
);

Basic.parameters = {
  docs: {
    source: {
      code: `
      import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

      () => (
        <div style={{ display: 'flex', height: '100%' }}>
          <Sidebar>
            <Menu>
              <SubMenu {...props} label="Charts">
                <MenuItem> Pie charts</MenuItem>
                <MenuItem> Line charts</MenuItem>
                <MenuItem> Bar charts</MenuItem>
              </SubMenu>
              <SubMenu label="Maps">
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
              </SubMenu>
              <SubMenu label="Theme">
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
            </Menu>
          </Sidebar>
        </div>
      )`,
    },
  },
};

export const WithIcon: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu icon={<Icon name="bar-chart" />} label="Charts">
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu icon={<Icon name="global" />} label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu icon={<Icon name="ink-bottle" />} label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);

WithIcon.storyName = 'icon';

export const Prefix: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu prefix="🔥" label="Charts">
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);
Prefix.storyName = 'prefix';

export const Suffix: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu suffix="🔥" label="Charts">
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);
Suffix.storyName = 'suffix';

export const Active: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu active label="Charts (active)">
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);
Active.storyName = 'active';

export const Disabled: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu disabled label="Charts (disabled)">
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);
Disabled.storyName = 'disabled';

export const Component: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <SubMenu defaultOpen label="Charts" component="div">
          <MenuItem> Pie charts</MenuItem>
          <MenuItem> Line charts</MenuItem>
          <MenuItem> Bar charts</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>
);
Component.storyName = 'component';

export const DefaultOpen: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu defaultOpen label="Charts">
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);
DefaultOpen.storyName = 'defaultOpen';

export const Open: StoryFn<typeof SubMenu> = () => {
  const [open, setOpen] = React.useState<'charts' | 'maps' | 'theme' | undefined>();

  const handleOpenSubMenu = (key: 'charts' | 'maps' | 'theme') => {
    if (open === key) {
      setOpen(undefined);
    } else {
      setOpen(key);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <Menu>
            <SubMenu
              onClick={() => handleOpenSubMenu('charts')}
              open={open === 'charts'}
              label="Charts"
            >
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>
            <SubMenu onClick={() => handleOpenSubMenu('maps')} open={open === 'maps'} label="Maps">
              <MenuItem> Google maps</MenuItem>
              <MenuItem> Open street maps</MenuItem>
            </SubMenu>
            <SubMenu
              onClick={() => handleOpenSubMenu('theme')}
              open={open === 'theme'}
              label="Theme"
            >
              <MenuItem> Dark</MenuItem>
              <MenuItem> Light</MenuItem>
            </SubMenu>
          </Menu>
        </Menu>
      </Sidebar>
    </div>
  );
};
Open.storyName = 'open';

export const RootStyles: StoryFn<typeof MenuItem> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <Menu>
          <SubMenu
            defaultOpen
            label="Charts"
            rootStyles={{
              ['& > .' + menuClasses.button]: {
                backgroundColor: '#eaabff',
                color: '#9f0099',
                '&:hover': {
                  backgroundColor: '#eecef9',
                },
              },
              ['.' + menuClasses.subMenuContent]: {
                backgroundColor: '#fbedff',
              },
            }}
          >
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Menu>
    </Sidebar>
  </div>
);
RootStyles.storyName = 'rootStyles';

export const Accordion: StoryFn<typeof SubMenu> = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar>
      <Menu>
        <SubMenu label="Settings" accordion defaultOpen>
          <SubMenu label="Account">
            <MenuItem> Profile</MenuItem>
            <MenuItem> Password</MenuItem>
          </SubMenu>
          <SubMenu label="Notifications">
            <MenuItem> Email</MenuItem>
            <MenuItem> Push</MenuItem>
          </SubMenu>
          <SubMenu label="Privacy">
            <MenuItem> Data</MenuItem>
            <MenuItem> Sharing</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu label="Tools" defaultOpen>
          <SubMenu label="Editor">
            <MenuItem> Theme</MenuItem>
          </SubMenu>
          <SubMenu label="Terminal">
            <MenuItem> Shell</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>
);

Accordion.storyName = 'accordion';

Accordion.parameters = {
  docs: {
    description: {
      story:
        '`accordion` on a `SubMenu` coordinates only its direct children — opening one nested submenu inside `Settings` closes its siblings. The neighboring `Tools` submenu is unaffected: its own nested submenus open independently of each other.',
    },
    source: {
      code: `
      import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

      () => (
        <Sidebar>
          <Menu>
            <SubMenu label="Settings" accordion defaultOpen>
              <SubMenu label="Account">…</SubMenu>
              <SubMenu label="Notifications">…</SubMenu>
              <SubMenu label="Privacy">…</SubMenu>
            </SubMenu>
            <SubMenu label="Tools" defaultOpen>
              <SubMenu label="Editor">…</SubMenu>
              <SubMenu label="Terminal">…</SubMenu>
            </SubMenu>
          </Menu>
        </Sidebar>
      )`,
    },
  },
};
