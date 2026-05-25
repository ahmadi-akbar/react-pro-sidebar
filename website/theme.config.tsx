import React from 'react';
import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rps-nav-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0098e5" />
            <stop offset="100%" stopColor="#59d0ff" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#rps-nav-logo-grad)" />
        <rect x="12" y="14" width="12" height="36" rx="3" fill="#ffffff" />
        <circle cx="18" cy="20" r="1.6" fill="#0098e5" />
        <rect x="14" y="26" width="8" height="2" rx="1" fill="#0098e5" opacity="0.85" />
        <rect x="14" y="32" width="8" height="2" rx="1" fill="#0098e5" opacity="0.55" />
        <rect x="14" y="38" width="8" height="2" rx="1" fill="#0098e5" opacity="0.55" />
        <rect x="28" y="14" width="24" height="36" rx="3" fill="#ffffff" opacity="0.45" />
      </svg>
      React Pro Sidebar
    </span>
  ),
  project: {
    link: 'https://github.com/azouaoui-med/react-pro-sidebar',
  },
  navbar: {
    // Pink heart icon next to the GitHub / Storybook icons that links out to
    // GitHub Sponsors. `extraContent` is rendered inside the navbar's right
    // cluster (before the chat icon), so it sits naturally with the rest of
    // the action icons.
    extraContent: (
      <a
        href="https://github.com/sponsors/azouaoui-med"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sponsor on GitHub"
        title="Sponsor"
        className="rps-sponsor-link"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </a>
    ),
  },
  // Nextra's `chat` slot is where the Discord icon lives by default. Override
  // both the link and the icon to point at the published Storybook instead.
  chat: {
    link: 'https://azouaoui-med.github.io/react-pro-sidebar',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Storybook"
      >
        <path
          d="M107.346 2.012l-6.914.431.539 14.377c.028.795-.889 1.259-1.514.766l-4.63-3.65-5.485 4.162a.934.934 0 01-1.498-.784l.617-14.123L19.873 7.48a6.264 6.264 0 00-5.87 6.488l3.86 102.838a6.264 6.264 0 005.98 6.023l83.612 3.754a6.273 6.273 0 004.609-1.73 6.255 6.255 0 001.936-4.526V8.264a6.258 6.258 0 00-1.975-4.566 6.257 6.257 0 00-4.679-1.686zm-41.46 21.187c16.308 0 25.214 8.723 25.214 25.319-2.204 1.713-18.62 2.88-18.62.443.346-9.3-3.817-9.707-6.13-9.707-2.198 0-5.899.662-5.899 5.644 0 12.288 31.69 11.625 31.69 36.424 0 13.95-11.335 21.655-25.791 21.655-14.92 0-27.957-6.036-26.485-26.963.578-2.457 19.545-1.873 19.545 0-.23 8.635 1.735 11.175 6.707 11.175 3.817 0 5.553-2.103 5.553-5.646 0-12.621-31.227-13.063-31.227-36.201 0-13.285 9.138-22.143 25.444-22.143z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  docsRepositoryBase: 'https://github.com/azouaoui-med/react-pro-sidebar/tree/main/website',
  footer: {
    content: (
      <span>
        MIT 2026 ©{' '}
        <a href="https://azouaoui.netlify.app" target="_blank" rel="noopener noreferrer">
          Mohamed Azouaoui
        </a>
        .
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="React Pro Sidebar" />
      <meta property="og:description" content="Modern, customizable sidebars for React." />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="theme-color" content="#0098e5" />
      {/* Google Analytics 4 (gtag.js). Only the external loader lives in the
          document head; the initialization (`gtag('config', …)`) is fired
          from `pages/_app.tsx` inside a useEffect, so we never need
          `dangerouslySetInnerHTML` for an inline script body. */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DSFH2NT388" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'system',
  },
  primaryHue: 200,
  primarySaturation: 90,
};

export default config;
