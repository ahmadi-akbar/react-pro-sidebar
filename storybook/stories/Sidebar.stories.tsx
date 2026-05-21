import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Menu, MenuItem, Sidebar } from '../../src';

const StoryParams: Meta<typeof Sidebar> = {
  title: 'Sidebar',
  component: Sidebar,
  subcomponents: {},
  argTypes: {},
};

export default StoryParams;

export const Basic: StoryFn<typeof Sidebar> = ({ ...props }) => (
  <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
    <Sidebar {...props}>
      <Menu>
        <MenuItem> Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
    <main style={{ padding: 10 }}> Main content</main>
  </div>
);
Basic.parameters = {
  docs: {
    source: {
      code: `
      import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

      () => (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
          <Sidebar>
            <Menu>
              <MenuItem> Documentation</MenuItem>
              <MenuItem> Calendar</MenuItem>
              <MenuItem> E-commerce</MenuItem>
              <MenuItem> Examples</MenuItem>
            </Menu>
          </Sidebar>
          <main style={{ padding: 10 }}> Main content</main>
        </div>
    );`,
    },
  },
};

export const Width: StoryFn<typeof Sidebar> = () => (
  <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
    <Sidebar width="300px">
      <Menu>
        <MenuItem> Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);

Width.storyName = 'width';

export const Collapsed: StoryFn<typeof Sidebar> = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar collapsed={collapsed}>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
            Collapse
          </button>
        </div>
      </main>
    </div>
  );
};
Collapsed.storyName = 'collapsed';

export const CollapsedWidth: StoryFn<typeof Sidebar> = () => (
  <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
    <Sidebar collapsed collapsedWidth="60px">
      <Menu>
        <MenuItem> Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
CollapsedWidth.storyName = 'collapsedWidth';

export const Toggled: StoryFn<typeof Sidebar> = () => {
  const [toggled, setToggled] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ display: 'flex', padding: 10 }}>
        <div>
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            Toggle
          </button>
        </div>
      </main>
    </div>
  );
};
Toggled.storyName = 'toggled';

export const BackgroundColor: StoryFn<typeof Sidebar> = () => (
  <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
    <Sidebar backgroundColor="#bcf3ff">
      <Menu>
        <MenuItem> Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
BackgroundColor.storyName = 'backgroundColor';

export const Image: StoryFn<typeof Sidebar> = () => (
  <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
    <Sidebar image="https://i.pinimg.com/736x/8e/6c/06/8e6c064f57f94838263d7ba9ad80f353.jpg">
      <Menu>
        <MenuItem> Documentation</MenuItem>
        <MenuItem> Calendar</MenuItem>
        <MenuItem> E-commerce</MenuItem>
        <MenuItem> Examples</MenuItem>
      </Menu>
    </Sidebar>
  </div>
);
Image.storyName = 'image';

export const BreakPoint: StoryFn<typeof Sidebar> = () => {
  const [toggled, setToggled] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ display: 'flex', padding: 10 }}>
        <div>
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            Toggle
          </button>
        </div>
      </main>
    </div>
  );
};
BreakPoint.storyName = 'breakPoint';

BreakPoint.parameters = {
  docs: {
    inlineStories: false,
    iframeHeight: 500,
  },
};

export const CustomBreakPoint: StoryFn<typeof Sidebar> = () => {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 800px)').matches);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar toggled={toggled} customBreakPoint="800px" onBreakPoint={setBroken}>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              Toggle
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
CustomBreakPoint.storyName = 'customBreakPoint';

BreakPoint.parameters = {
  docs: {
    inlineStories: false,
    iframeHeight: 500,
  },
};

export const TransitionDuration: StoryFn<typeof Sidebar> = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar collapsed={collapsed} transitionDuration={1000}>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
            Collapse
          </button>
        </div>
      </main>
    </div>
  );
};
TransitionDuration.storyName = 'transitionDuration';

export const RTL: StoryFn<typeof Sidebar> = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        minHeight: '400px',
        direction: 'rtl',
      }}
    >
      <Sidebar rtl>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
RTL.storyName = 'rtl';

export const RootStyles: StoryFn<typeof Sidebar> = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        minHeight: '400px',
      }}
    >
      <Sidebar
        rootStyles={{
          background:
            'linear-gradient(180deg, rgba(166,240,255,1) 0%, rgba(220,250,255,1) 49%, rgba(230,252,255,1) 100%)',
        }}
      >
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
RootStyles.storyName = 'rootStyles';
