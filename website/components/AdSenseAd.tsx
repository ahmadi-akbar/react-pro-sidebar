import React from 'react';

/**
 * Manual AdSense ad slot. The `adsbygoogle.js` loader is registered site-wide
 * in `theme.config.tsx` so this component only needs to render the `<ins>`
 * placeholder and push it into `window.adsbygoogle` on mount.
 *
 * Usage:
 *   <AdSenseAd slot="1234567890" />
 *
 * Get the slot ID by creating a manual ad unit in your AdSense dashboard
 * (Ads → Ad units by ad type → Display ad). The publisher client ID is
 * already set as a default below.
 */

declare global {
  interface Window {
    // AdSense pushes onto this global queue.
    adsbygoogle?: unknown[];
  }
}

export const ADSENSE_CLIENT = 'ca-pub-5391363924015725';

export interface AdSenseAdProps {
  /** Ad slot ID from your AdSense ad unit. */
  slot: string;
  /** Publisher ID; defaults to the configured react-pro-sidebar account. */
  client?: string;
  /** AdSense layout hint. `auto` works for most placements. */
  format?: string;
  /** When `format` is `auto`, allow the ad to fill the container width. */
  responsive?: boolean;
  /** Any extra inline style on the `<ins>` wrapper. */
  style?: React.CSSProperties;
  /** Marker className for custom CSS hooks. */
  className?: string;
}

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  slot,
  client = ADSENSE_CLIENT,
  format = 'auto',
  responsive = true,
  style,
  className,
}) => {
  React.useEffect(() => {
    // Wrap in try/catch — adsbygoogle.push throws if the loader hasn't booted
    // yet (e.g. behind an ad blocker, or before approval) and we don't want
    // that to take the whole React tree down.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn('[AdSense] push failed', err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className ?? ''}`.trim()}
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

export default AdSenseAd;
