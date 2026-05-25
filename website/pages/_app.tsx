import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/** GA4 measurement ID (from Firebase config / GA4 Admin → Data streams). */
const GA_ID = 'G-DSFH2NT388';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  // --- Google Analytics 4 ----------------------------------------------
  //
  // The external `gtag.js` is loaded site-wide from theme.config.tsx (a plain
  // `<script async src=...>`). Here we (a) initialise the dataLayer + gtag
  // queue and (b) push a `page_view` event on every route change. All in pure
  // JS — no inline `<script>` content, no `dangerouslySetInnerHTML`.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }, []);

  // Pages Router routeChangeComplete → manual page_view event so GA sees
  // client-side navigations between MDX pages, not just the first load.
  useEffect(() => {
    const handler = (url: string) => {
      window.gtag?.('event', 'page_view', { page_path: url });
    };
    router.events.on('routeChangeComplete', handler);
    return () => router.events.off('routeChangeComplete', handler);
  }, [router.events]);

  // Nextra MDX pages attach `getLayout` to wrap themselves in the docs theme.
  // For non-MDX pages (like /playground), fall through to default rendering.
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
