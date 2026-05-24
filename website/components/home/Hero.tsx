import React from 'react';
import HeroCodePreview from './HeroCodePreview';

/**
 * Home-page hero. Lives in a .tsx file (not inline JSX in MDX) so that SWC
 * parses it once and produces deterministic output — eliminating the MDX
 * whitespace/JSX edge cases that can cause hydration mismatches.
 */
export default function Hero() {
  return (
    <div className="rps-hero">
      <div className="rps-hero-inner">
        <div className="rps-hero-content">
          <span className="rps-pill">
            <span className="rps-pill-dot" />
            react-pro-sidebar v2
          </span>
          <h1 className="rps-hero-title">Modern Sidebars for React</h1>
          <p className="rps-hero-subtitle">
            The ultimate sidebar component for React applications. Highly customizable, fully
            responsive, and effortless to integrate into any dashboard.
          </p>
          <div className="rps-cta">
            <a className="rps-btn rps-btn-primary" href="/docs/installation">
              Get Started →
            </a>
            <a className="rps-btn rps-btn-ghost" href="/playground">
              Try the Playground
            </a>
          </div>
          <div className="rps-badges">
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
                alt="GitHub stars"
              />
            </a>
            <a
              href="https://www.npmjs.com/package/react-pro-sidebar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/npm/dt/react-pro-sidebar?style=flat-square&color=0098e5&label=downloads"
                alt="Downloads"
              />
            </a>
            <a
              href="https://www.npmjs.com/package/react-pro-sidebar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/npm/v/react-pro-sidebar?style=flat-square&color=0098e5"
                alt="npm version"
              />
            </a>
          </div>
        </div>
        <HeroCodePreview />
      </div>
    </div>
  );
}
