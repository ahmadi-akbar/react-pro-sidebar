import dynamic from 'next/dynamic';

const loading = () => (
  <div className="rps-demo">
    <div
      className="rps-demo-frame"
      style={{ alignItems: 'center', justifyContent: 'center', opacity: 0.55 }}
    >
      Loading demo…
    </div>
  </div>
);

const lazy = <K extends string>(key: K) =>
  dynamic(() => import('./SidebarDemos').then((m) => m[key] as React.ComponentType), {
    ssr: false,
    loading,
  });

const lazyExample = <K extends string>(key: K) =>
  dynamic(() => import('./ExampleDemos').then((m) => m[key] as React.ComponentType), {
    ssr: false,
    loading,
  });

export const DashboardExample = lazyExample('DashboardExample');
export const ReactRouterExample = lazyExample('ReactRouterExample');
export const ThemeExample = lazyExample('ThemeExample');
export const NextJsExample = lazyExample('NextJsExample');

export const CollapsedDemo = lazy('CollapsedDemo');
export const ToggledDemo = lazy('ToggledDemo');
export const WidthDemo = lazy('WidthDemo');
export const CollapsedWidthDemo = lazy('CollapsedWidthDemo');
export const BackgroundColorDemo = lazy('BackgroundColorDemo');
export const ImageDemo = lazy('ImageDemo');
export const RtlDemo = lazy('RtlDemo');
export const BreakPointDemo = lazy('BreakPointDemo');
export const TransitionDurationDemo = lazy('TransitionDurationDemo');
export const PopoverDemo = lazy('PopoverDemo');
export const AccordionDemo = lazy('AccordionDemo');
export const MenuItemStylesDemo = lazy('MenuItemStylesDemo');
export const CloseOnClickDemo = lazy('CloseOnClickDemo');
export const ActiveDisabledDemo = lazy('ActiveDisabledDemo');
export const PrefixSuffixDemo = lazy('PrefixSuffixDemo');
export const DefaultOpenDemo = lazy('DefaultOpenDemo');
export const ControlledOpenDemo = lazy('ControlledOpenDemo');
export const SubMenuAccordionDemo = lazy('SubMenuAccordionDemo');
