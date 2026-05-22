import React from 'react';
import classnames from 'classnames';
import { StyledUl } from '../styles/StyledUl';
import styled, { CSSObject } from '@emotion/styled';
import { menuClasses } from '../utils/utilityClasses';

export interface MenuItemStylesParams {
  level: number;
  disabled: boolean;
  active: boolean;
  isSubmenu: boolean;
  open?: boolean;
}

export type ElementStyles = CSSObject | ((params: MenuItemStylesParams) => CSSObject | undefined);

export interface MenuItemStyles {
  root?: ElementStyles;
  button?: ElementStyles;
  label?: ElementStyles;
  prefix?: ElementStyles;
  suffix?: ElementStyles;
  icon?: ElementStyles;
  subMenuContent?: ElementStyles;
  SubMenuExpandIcon?: ElementStyles;
}

/**
 * Resolve the styles for a single element of `menuItemStyles`. The value is
 * either a style object or a function of the item's state.
 */
export const resolveElementStyles = (
  styles: MenuItemStyles | undefined,
  element: keyof MenuItemStyles,
  params: MenuItemStylesParams,
): CSSObject | undefined => {
  const style = styles?.[element];
  return typeof style === 'function' ? style(params) : style;
};

export interface RenderExpandIconParams {
  level: number;
  disabled: boolean;
  active: boolean;
  open: boolean;
}

export interface MenuContextProps {
  /**
   * Transition duration in milliseconds
   * @default ```300```
   */
  transitionDuration?: number;

  /**
   * If set to true, the popper menu will close when a menu item is clicked
   * This works on collapsed mode only
   * @default ```false```
   */
  closeOnClick?: boolean;

  /**
   * Apply styles to MenuItem and SubMenu components and their children
   */
  menuItemStyles?: MenuItemStyles;

  /**
   * Render a custom expand icon for SubMenu components
   */
  renderExpandIcon?: (params: RenderExpandIconParams) => React.ReactNode;
}

export interface MenuProps extends MenuContextProps, React.MenuHTMLAttributes<HTMLMenuElement> {
  rootStyles?: CSSObject;
  children?: React.ReactNode;
}

const StyledMenu = styled.nav<Pick<MenuProps, 'rootStyles'>>`
  &.${menuClasses.root} {
    ${({ rootStyles }) => rootStyles}
  }
`;

export const MenuContext = React.createContext<MenuContextProps | undefined>(undefined);

export const LevelContext = React.createContext<number>(0);

const MenuFR: React.ForwardRefRenderFunction<HTMLMenuElement, MenuProps> = (
  {
    children,
    className,
    transitionDuration = 300,
    closeOnClick = false,
    rootStyles,
    menuItemStyles,
    renderExpandIcon,
    ...rest
  },
  ref,
) => {
  const providerValue = React.useMemo(
    () => ({ transitionDuration, closeOnClick, menuItemStyles, renderExpandIcon }),
    [transitionDuration, closeOnClick, menuItemStyles, renderExpandIcon],
  );

  return (
    <MenuContext.Provider value={providerValue}>
      <LevelContext.Provider value={0}>
        <StyledMenu
          ref={ref}
          className={classnames(menuClasses.root, className)}
          rootStyles={rootStyles}
          {...rest}
        >
          <StyledUl>{children}</StyledUl>
        </StyledMenu>
      </LevelContext.Provider>
    </MenuContext.Provider>
  );
};

export const Menu = React.forwardRef<HTMLMenuElement, MenuProps>(MenuFR);
