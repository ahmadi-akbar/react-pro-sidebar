import React from 'react';
import styled, { CSSObject } from '@emotion/styled';
import classnames from 'classnames';
import { SubMenuContent } from './SubMenuContent';
import { StyledMenuLabel } from '../styles/StyledMenuLabel';
import { StyledMenuIcon } from '../styles/StyledMenuIcon';
import { StyledMenuPrefix } from '../styles/StyledMenuPrefix';
import { useMenu } from '../hooks/useMenu';
import { StyledMenuSuffix } from '../styles/StyledMenuSuffix';
import { menuClasses } from '../utils/utilityClasses';
import {
  StyledExpandIcon,
  StyledExpandIconCollapsed,
  StyledExpandIconWrapper,
} from '../styles/StyledExpandIcon';
import { usePopper } from '../hooks/usePopper';
import { MenuButton, menuButtonStyles } from './MenuButton';
import { SidebarContext } from './Sidebar';
import {
  AccordionContext,
  AccordionContextValue,
  LevelContext,
  resolveElementStyles,
} from './Menu';

export interface SubMenuProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix'> {
  /**
   * The label to be displayed in the menu item
   */
  label?: string | React.ReactNode;

  /**
   * The icon to be displayed in the menu item
   */
  icon?: React.ReactNode;

  /**
   * The prefix to be displayed in the menu item
   */
  prefix?: React.ReactNode;

  /**
   * The suffix to be displayed in the menu item
   */
  suffix?: React.ReactNode;

  /**
   * set open value to control the open state of the sub menu
   */
  open?: boolean;

  /**
   * set defaultOpen value to set the initial open state of the sub menu
   */
  defaultOpen?: boolean;

  /**
   * If set to true, the menu item will have an active state
   */
  active?: boolean;

  /**
   * If set to true, the menu item will be disabled
   */
  disabled?: boolean;

  /**
   * The component to be rendered as the menu item button
   */
  component?: string | React.ReactElement;

  /**
   * Apply styles from the root element
   */
  rootStyles?: CSSObject;

  /**
   * If `true`, only one direct-child `SubMenu` can be open at a time (accordion
   * behavior). Opening another closes the previously open one. Scoped to this
   * submenu's immediate children.
   * @default ```false```
   */
  accordion?: boolean;

  /**
   * callback function to be called when the open state of the sub menu changes
   * @param open
   */
  onOpenChange?: (open: boolean) => void;

  children?: React.ReactNode;
}

interface StyledSubMenuProps extends Pick<SubMenuProps, 'rootStyles' | 'active' | 'disabled'> {
  level: number;
  menuItemStyles?: CSSObject;
  collapsed?: boolean;
  rtl?: boolean;
  buttonStyles?: CSSObject;
}

type MenuItemElement =
  | 'root'
  | 'button'
  | 'label'
  | 'prefix'
  | 'suffix'
  | 'icon'
  | 'subMenuContent'
  | 'SubMenuExpandIcon';

const StyledSubMenu = styled.li<StyledSubMenuProps>`
  position: relative;
  width: 100%;

  ${({ menuItemStyles }) => menuItemStyles};

  ${({ rootStyles }) => rootStyles};

  > .${menuClasses.button} {
    ${({ level, disabled, active, collapsed, rtl }) =>
      menuButtonStyles({
        level,
        disabled,
        active,
        collapsed,
        rtl,
      })};

    ${({ buttonStyles }) => buttonStyles};
  }
`;

export const SubMenuFR: React.ForwardRefRenderFunction<HTMLLIElement, SubMenuProps> = (
  {
    children,
    className,
    label,
    icon,
    title,
    prefix,
    suffix,
    open: openControlled,
    defaultOpen,
    active = false,
    disabled = false,
    accordion = false,
    rootStyles,
    component,
    onOpenChange,
    onClick,
    onKeyUp,
    ...rest
  },
  ref,
) => {
  const level = React.useContext(LevelContext);
  const parentAccordion = React.useContext(AccordionContext);
  const id = React.useId();

  const {
    collapsed,
    rtl,
    transitionDuration: sidebarTransitionDuration,
  } = React.useContext(SidebarContext);
  const { renderExpandIcon, closeOnClick, menuItemStyles } = useMenu();

  const [internalOpen, setInternalOpen] = React.useState(!!defaultOpen);
  const [openWhenCollapsed, setOpenWhenCollapsed] = React.useState(false);

  const buttonRef = React.useRef<HTMLAnchorElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { popperInstance } = usePopper({
    level,
    buttonRef,
    contentRef,
  });

  // When a parent accordion is active, the open state is owned by it; otherwise
  // it's our internal state. `openControlled` (when defined) always wins.
  const accordionActiveId = parentAccordion ? parentAccordion.activeId : null;
  const accordionOpen = parentAccordion ? accordionActiveId === id : false;
  const open = openControlled ?? (parentAccordion ? accordionOpen : internalOpen);

  // Mirror the accordion's open state into the internal state so that, if the
  // `accordion` prop is later flipped off, the current open/closed state is
  // preserved instead of reverting to `defaultOpen`.
  React.useEffect(() => {
    if (parentAccordion) {
      setInternalOpen(accordionOpen);
    }
  }, [parentAccordion, accordionOpen]);

  // Register `defaultOpen` with a parent accordion on mount. If multiple
  // siblings register, the last one wins; warn so it's not silent. We track
  // via a ref on the context because sibling effects in the same commit
  // can't see each other's state updates.
  React.useEffect(() => {
    if (parentAccordion && defaultOpen) {
      if (parentAccordion.defaultOpenRegisteredRef.current !== null) {
        console.warn(
          '[react-pro-sidebar] Multiple SubMenus have `defaultOpen` inside an accordion group; only the last-rendered one will be open.',
        );
      }
      parentAccordion.defaultOpenRegisteredRef.current = id;
      parentAccordion.setActive(id, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The content slides open/closed via CSS (grid-template-rows); we just flip
  // the open state here (or hand it off to the accordion).
  const handleSlideToggle = (): void => {
    if (!(level === 0 && collapsed)) {
      if (typeof openControlled === 'undefined') {
        const next = !open;
        if (parentAccordion) {
          parentAccordion.setActive(id, next);
        } else {
          setInternalOpen(next);
        }
        onOpenChange?.(next);
      } else {
        onOpenChange?.(!openControlled);
      }
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick?.(event);
    handleSlideToggle();
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    onKeyUp?.(event);
    if (event.key === 'Enter') {
      handleSlideToggle();
    }
  };

  const styleParams = { level, disabled, active, isSubmenu: true, open };

  // State for accordion-coordinating this submenu's direct children (next level).
  const [childActiveId, setChildActiveId] = React.useState<string | null>(null);
  const setChildActive = React.useCallback((cid: string, isOpen: boolean) => {
    setChildActiveId((prev) => (isOpen ? cid : prev === cid ? null : prev));
  }, []);
  const childDefaultOpenRegisteredRef = React.useRef<string | null>(null);
  const childAccordionContext = React.useMemo<AccordionContextValue>(
    () =>
      accordion
        ? {
            activeId: childActiveId,
            setActive: setChildActive,
            defaultOpenRegisteredRef: childDefaultOpenRegisteredRef,
          }
        : null,
    [accordion, childActiveId, setChildActive],
  );

  const getSubMenuItemStyles = (element: MenuItemElement): CSSObject | undefined =>
    resolveElementStyles(menuItemStyles, element, styleParams);

  // Reposition the popper after the sidebar's collapse/rtl transition.
  React.useEffect(() => {
    const timer = setTimeout(() => popperInstance?.update(), sidebarTransitionDuration);
    return () => clearTimeout(timer);
  }, [collapsed, level, rtl, sidebarTransitionDuration, popperInstance]);

  // Reset the collapsed popup to closed only when the collapse state actually
  // changes (not when the popper instance first becomes available).
  React.useEffect(() => {
    if (collapsed && level === 0) {
      setOpenWhenCollapsed(false);
      // ? if its useful to close first level submenus on collapse sidebar uncomment the code below
      // setOpen(false);
    }
  }, [collapsed, level]);

  React.useEffect(() => {
    const handleTogglePopper = (target: Node) => {
      if (!openWhenCollapsed && buttonRef.current?.contains(target)) setOpenWhenCollapsed(true);
      else if (
        (closeOnClick &&
          !(target as HTMLElement)
            .closest(`.${menuClasses.menuItemRoot}`)
            ?.classList.contains(menuClasses.subMenuRoot)) ||
        (!contentRef.current?.contains(target) && openWhenCollapsed)
      ) {
        setOpenWhenCollapsed(false);
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      handleTogglePopper(event.target as Node);
    };

    const handleDocumentKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleTogglePopper(event.target as Node);
      } else if (event.key === 'Escape') {
        setOpenWhenCollapsed(false);
      }
    };

    const removeEventListeners = () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keyup', handleDocumentKeyUp);
    };

    removeEventListeners();

    if (collapsed && level === 0) {
      document.addEventListener('click', handleDocumentClick, false);
      document.addEventListener('keyup', handleDocumentKeyUp, false);
    }

    return () => {
      removeEventListeners();
    };
  }, [collapsed, level, closeOnClick, openWhenCollapsed]);

  const sharedClasses = {
    [menuClasses.active]: active,
    [menuClasses.disabled]: disabled,
    [menuClasses.open]: open,
  };

  return (
    <StyledSubMenu
      ref={ref}
      className={classnames(
        menuClasses.menuItemRoot,
        menuClasses.subMenuRoot,
        sharedClasses,
        className,
      )}
      menuItemStyles={getSubMenuItemStyles('root')}
      level={level}
      collapsed={collapsed}
      rtl={rtl}
      disabled={disabled}
      active={active}
      buttonStyles={getSubMenuItemStyles('button')}
      rootStyles={rootStyles}
    >
      <MenuButton
        data-testid={`${menuClasses.button}-test-id`}
        ref={buttonRef}
        title={title}
        className={classnames(menuClasses.button, sharedClasses)}
        onClick={handleOnClick}
        onKeyUp={handleOnKeyUp}
        component={component}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-haspopup={collapsed && level === 0 ? 'menu' : undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {icon && (
          <StyledMenuIcon
            rtl={rtl}
            className={classnames(menuClasses.icon, sharedClasses)}
            rootStyles={getSubMenuItemStyles('icon')}
          >
            {icon}
          </StyledMenuIcon>
        )}

        {prefix && (
          <StyledMenuPrefix
            collapsed={collapsed}
            transitionDuration={sidebarTransitionDuration}
            firstLevel={level === 0}
            className={classnames(menuClasses.prefix, sharedClasses)}
            rtl={rtl}
            rootStyles={getSubMenuItemStyles('prefix')}
          >
            {prefix}
          </StyledMenuPrefix>
        )}

        <StyledMenuLabel
          className={classnames(menuClasses.label, sharedClasses)}
          rootStyles={getSubMenuItemStyles('label')}
        >
          {label}
        </StyledMenuLabel>

        {suffix && (
          <StyledMenuSuffix
            collapsed={collapsed}
            transitionDuration={sidebarTransitionDuration}
            firstLevel={level === 0}
            className={classnames(menuClasses.suffix, sharedClasses)}
            rootStyles={getSubMenuItemStyles('suffix')}
          >
            {suffix}
          </StyledMenuSuffix>
        )}

        <StyledExpandIconWrapper
          rtl={rtl}
          className={classnames(menuClasses.SubMenuExpandIcon, sharedClasses)}
          collapsed={collapsed}
          level={level}
          rootStyles={getSubMenuItemStyles('SubMenuExpandIcon')}
        >
          {renderExpandIcon ? (
            renderExpandIcon({
              level,
              disabled,
              active,
              open: open,
            })
          ) : collapsed && level === 0 ? (
            <StyledExpandIconCollapsed />
          ) : (
            <StyledExpandIcon rtl={rtl} open={open} />
          )}
        </StyledExpandIconWrapper>
      </MenuButton>

      <SubMenuContent
        ref={contentRef}
        openWhenCollapsed={openWhenCollapsed}
        open={open}
        firstLevel={level === 0}
        collapsed={collapsed}
        className={classnames(menuClasses.subMenuContent, sharedClasses)}
        rootStyles={getSubMenuItemStyles('subMenuContent')}
      >
        <LevelContext.Provider value={level + 1}>
          <AccordionContext.Provider value={childAccordionContext}>
            {children}
          </AccordionContext.Provider>
        </LevelContext.Provider>
      </SubMenuContent>
    </StyledSubMenu>
  );
};
export const SubMenu = React.forwardRef<HTMLLIElement, SubMenuProps>(SubMenuFR);
