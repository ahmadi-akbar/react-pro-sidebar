/*
 * This is an SSR/hydration test: it drives `renderToString` + `hydrateRoot`
 * and inspects the DOM directly, which the Testing Library lint rules don't
 * model. Disable the two that misfire here.
 */
/* eslint-disable testing-library/render-result-naming-convention, testing-library/no-node-access */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Menu, MenuItem, Sidebar } from '../src';
import { sidebarClasses } from '../src/utils/utilityClasses';

const mockMatchMedia = (matches: boolean) => {
  const listeners = new Set<() => void>();
  const mql = {
    matches,
    media: '',
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
  };
  window.matchMedia = vi.fn().mockImplementation(() => mql) as unknown as typeof window.matchMedia;
  return mql;
};

describe('SSR / hydration', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('applies the broken state after hydration when the viewport already matches', () => {
    // Viewport is already below the breakpoint at first paint.
    mockMatchMedia(true);

    const app = (
      <Sidebar breakPoint="400px">
        <Menu>
          <MenuItem>Item</MenuItem>
        </Menu>
      </Sidebar>
    );

    // Server render is deterministic: no `broken` class (matchMedia is not
    // consulted until the client effect runs).
    const html = renderToString(app);
    expect(html).not.toContain(sidebarClasses.broken);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    // Hydrate. The first client render must agree with the server (no broken
    // class), then the effect flips it on — the regression was that the flip
    // never committed, leaving the sidebar visible.
    act(() => {
      hydrateRoot(container, app);
    });

    const aside = container.querySelector('aside');
    expect(aside?.className).toContain(sidebarClasses.broken);
  });
});
