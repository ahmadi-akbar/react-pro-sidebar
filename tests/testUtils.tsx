import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

type CustomRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => RenderResult;

const customRender: CustomRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, options);

export * from '@testing-library/react';

export { customRender };
