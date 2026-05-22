import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  // Generate a Docs tab for every story (props table + description + source).
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Sidebar', 'Menu', 'MenuItem', 'SubMenu', 'Playground'],
      },
    },
  },
};

export default preview;
