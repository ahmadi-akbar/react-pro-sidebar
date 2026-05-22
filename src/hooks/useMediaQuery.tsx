import React from 'react';

export const useMediaQuery = (breakpoint?: string): boolean => {
  const [matches, setMatches] = React.useState(
    !!breakpoint && typeof window !== 'undefined' && window.matchMedia(breakpoint).matches,
  );

  React.useEffect(() => {
    if (!breakpoint || typeof window === 'undefined') return undefined;

    const media = window.matchMedia(breakpoint);

    // setMatches with the current value; React bails out if it's unchanged.
    const handleMatch = () => setMatches(media.matches);

    // Sync in case the match changed between render and effect.
    handleMatch();

    media.addEventListener('change', handleMatch);
    return () => media.removeEventListener('change', handleMatch);
  }, [breakpoint]);

  return matches;
};
