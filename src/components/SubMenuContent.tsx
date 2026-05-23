import React from 'react';
import styled, { CSSObject } from '@emotion/styled';
import { StyledUl } from '../styles/StyledUl';
import { menuClasses } from '../utils/utilityClasses';
import { useMenu } from '../hooks/useMenu';

interface SubMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  transitionDuration?: number;
  open?: boolean;
  openWhenCollapsed?: boolean;
  /** Render as a floating popper (collapsed top-level submenu, or popover mode). */
  popper?: boolean;
  rootStyles?: CSSObject;
  children?: React.ReactNode;
}

/**
 * The submenu content slides open/closed purely with CSS by animating
 * `grid-template-rows` between `0fr` and `1fr` — no JS height measurement.
 * In popper mode (collapsed top-level submenu, or `popover` while expanded) it
 * instead becomes a fixed popup whose visibility is toggled.
 */
const StyledSubMenuContent = styled.div<SubMenuContentProps>`
  display: grid;
  grid-template-rows: ${({ open }) => (open ? '1fr' : '0fr')};
  transition: grid-template-rows ${({ transitionDuration }) => transitionDuration}ms ease;
  z-index: 999;
  box-sizing: border-box;
  background-color: white;

  > ul {
    min-height: 0;
    overflow: hidden;
  }

  ${({ popper }) =>
    popper &&
    `
     box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
     `}

  ${({ popper, openWhenCollapsed }) =>
    popper
      ? `
      display: block!important;
      position: fixed;
      padding-left: 0px;
      width: 200px;
      border-radius: 4px;
      height: auto!important;
      transition: none!important;
      visibility: ${openWhenCollapsed ? 'visible' : 'hidden'};

      > ul {
        overflow: auto;
      }
     `
      : `
      position: static!important;
      transform: none!important;
      `};

  ${({ rootStyles }) => rootStyles};
`;

const SubMenuContentFR: React.ForwardRefRenderFunction<HTMLDivElement, SubMenuContentProps> = (
  { children, open, openWhenCollapsed, popper, ...rest },
  ref,
) => {
  const { transitionDuration } = useMenu();

  // In popper mode visibility is driven by `openWhenCollapsed`; otherwise the
  // submenu slides open based on `open`. While hidden, mark the subtree `inert`
  // so its links stay out of the tab order and the accessibility tree.
  const isVisible = popper ? !!openWhenCollapsed : !!open;
  // `inert` is a real boolean prop in React 19 (an empty string is falsy and
  // gets dropped), but untyped in React 18 — pass boolean `true` and apply it
  // untyped so it renders a present attribute on both.
  const inertProps = (isVisible ? {} : { inert: 'true' }) as object;

  return (
    <StyledSubMenuContent
      data-testid={`${menuClasses.subMenuContent}-test-id`}
      ref={ref}
      popper={popper}
      open={open}
      openWhenCollapsed={openWhenCollapsed}
      transitionDuration={transitionDuration}
      {...inertProps}
      {...rest}
    >
      <StyledUl>{children}</StyledUl>
    </StyledSubMenuContent>
  );
};

export const SubMenuContent = React.forwardRef(SubMenuContentFR);
