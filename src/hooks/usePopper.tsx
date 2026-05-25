import React from 'react';
import { createPopper } from '@popperjs/core';
import { SidebarContext } from '../components/Sidebar';

interface PopperOptions {
  /** Whether this submenu should render as a floating popper. */
  popper: boolean;
  buttonRef: React.RefObject<HTMLAnchorElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

interface PopperResult {
  popperInstance?: ReturnType<typeof createPopper>;
}

export const usePopper = (options: PopperOptions): PopperResult => {
  const { popper, buttonRef, contentRef } = options;

  const { toggled, transitionDuration } = React.useContext(SidebarContext);
  const popperInstanceRef = React.useRef<ReturnType<typeof createPopper> | undefined>();

  /**
   * Create the popper instance only when the submenu renders as a popper
   * (collapsed top-level submenu, or `popover` mode while expanded).
   */
  React.useEffect(() => {
    if (popper && contentRef.current && buttonRef.current) {
      popperInstanceRef.current = createPopper(buttonRef.current, contentRef.current, {
        placement: 'right',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
        ],
      });
    }

    return () => popperInstanceRef.current?.destroy();
  }, [popper, contentRef, buttonRef]);

  /**
   * update popper instance (position) when buttonRef or contentRef changes
   */
  React.useEffect(() => {
    let resizeObserver: ResizeObserver | undefined;

    if (contentRef.current && buttonRef.current) {
      resizeObserver = new ResizeObserver(() => {
        popperInstanceRef.current?.update();
      });

      resizeObserver.observe(contentRef.current);
      resizeObserver.observe(buttonRef.current);
    }

    const timer = setTimeout(() => {
      popperInstanceRef.current?.update();
    }, transitionDuration);

    return () => {
      resizeObserver?.disconnect();
      clearTimeout(timer);
    };
  }, [transitionDuration, toggled, contentRef, buttonRef]);

  return { popperInstance: popperInstanceRef.current };
};
