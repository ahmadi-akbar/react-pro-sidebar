import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Playground as PlaygroundComponent } from '../Playground';

const StoryParams: Meta<typeof PlaygroundComponent> = {
  title: 'Playground',
  component: PlaygroundComponent,
  subcomponents: {},
  argTypes: {},
};

export default StoryParams;

export const Playground: StoryFn<typeof PlaygroundComponent> = () => <PlaygroundComponent />;
