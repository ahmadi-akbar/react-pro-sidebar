import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createPopper } from '@popperjs/core';
import { useMenu } from '../src/hooks/useMenu';
import { useMediaQuery } from '../src/hooks/useMediaQuery';
import { usePopper } from '../src/hooks/usePopper';
import { MenuContext } from '../src/components/Menu';

// vitest hoists vi.mock above the imports above.
vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({ update: vi.fn(), destroy: vi.fn() })),
}));

describe('useMenu', () => {
  it('throws when used outside a Menu', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderHook(() => useMenu())).toThrow('Menu Component is required!');
    spy.mockRestore();
  });

  it('returns the menu context value', () => {
    const value = { transitionDuration: 400, closeOnClick: true };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
    );
    const { result } = renderHook(() => useMenu(), { wrapper });
    expect(result.current).toEqual(value);
  });
});

describe('useMediaQuery', () => {
  const mockMatchMedia = (matches: boolean) => {
    const listeners = new Set<() => void>();
    const mql = {
      matches,
      media: '',
      addEventListener: (_: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
      dispatchChange(next: boolean) {
        mql.matches = next;
        listeners.forEach((cb) => cb());
      },
    };
    window.matchMedia = vi
      .fn()
      .mockImplementation(() => mql) as unknown as typeof window.matchMedia;
    return mql;
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when no breakpoint is provided', () => {
    const { result } = renderHook(() => useMediaQuery());
    expect(result.current).toBe(false);
  });

  it('does not query matchMedia when no breakpoint is set', () => {
    const spy = vi.fn();
    window.matchMedia = spy as unknown as typeof window.matchMedia;
    renderHook(() => useMediaQuery());
    expect(spy).not.toHaveBeenCalled();
  });

  it('returns true when the media query matches', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    const mql = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(false);

    act(() => mql.dispatchChange(true));
    expect(result.current).toBe(true);
  });

  it('does not re-subscribe the listener when the match state changes', () => {
    const addEventListener = vi.fn<(type: string, cb: () => void) => void>();
    const removeEventListener = vi.fn();
    const listeners = new Set<() => void>();
    const mql = {
      matches: false,
      media: '',
      addEventListener: (type: string, cb: () => void) => {
        addEventListener(type, cb);
        listeners.add(cb);
      },
      removeEventListener,
      dispatchChange(next: boolean) {
        mql.matches = next;
        listeners.forEach((cb) => cb());
      },
    };
    window.matchMedia = vi
      .fn()
      .mockImplementation(() => mql) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(addEventListener).toHaveBeenCalledTimes(1);

    act(() => mql.dispatchChange(true));

    expect(result.current).toBe(true);
    // the listener was not torn down and re-added on the match change
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).not.toHaveBeenCalled();
  });
});

describe('usePopper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const makeRefs = () => ({
    buttonRef: { current: document.createElement('a') } as React.RefObject<HTMLAnchorElement>,
    contentRef: { current: document.createElement('div') } as React.RefObject<HTMLDivElement>,
  });

  it('does not create a popper when popper is false', () => {
    const { buttonRef, contentRef } = makeRefs();
    renderHook(() => usePopper({ popper: false, buttonRef, contentRef }));
    expect(createPopper).not.toHaveBeenCalled();
  });

  it('creates a popper when popper is true', () => {
    const { buttonRef, contentRef } = makeRefs();
    renderHook(() => usePopper({ popper: true, buttonRef, contentRef }));
    expect(createPopper).toHaveBeenCalledWith(
      buttonRef.current,
      contentRef.current,
      expect.objectContaining({ placement: 'right', strategy: 'fixed' }),
    );
  });

  it('disconnects the ResizeObserver on unmount', () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    class ResizeObserverMock {
      observe = observe;

      unobserve = vi.fn();

      disconnect = disconnect;
    }
    const original = global.ResizeObserver;
    global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

    const { buttonRef, contentRef } = makeRefs();
    const { unmount } = renderHook(() => usePopper({ popper: true, buttonRef, contentRef }));

    expect(observe).toHaveBeenCalled();
    expect(disconnect).not.toHaveBeenCalled();

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);

    global.ResizeObserver = original;
  });
});
