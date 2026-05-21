import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Sidebar', 'Menu', 'MenuItem', 'SubMenu', 'Playground'],
      },
    },
  },
};

export default preview;
