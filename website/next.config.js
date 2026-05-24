const path = require('path');
const nextra = require('nextra');

const withNextra = (nextra.default || nextra)({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
  // The library is symlinked via `file:..` and ships types built against a slightly
  // older @types/react. Next.js's build-time tsc strictness flags forwardRef ReactNode
  // mismatches that don't affect runtime. Editor / dev-server checks still apply.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // Make Next compile the symlinked package with the website's toolchain so it
  // doesn't bring its own copy of React / Emotion along through the parent's
  // node_modules.
  transpilePackages: ['react-pro-sidebar'],
  webpack: (config) => {
    // Force a single instance of React, React-DOM, and Emotion regardless of
    // which node_modules tree a dep happens to resolve from. With `file:..`,
    // the symlinked library would otherwise pull React from `../node_modules`,
    // which results in two React copies and "Cannot read properties of null
    // (reading 'useRef')" at runtime.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
      '@popperjs/core': path.resolve(__dirname, 'node_modules/@popperjs/core'),
    };
    // Prefer the symlink target itself rather than walking up through it; this
    // makes sure peer deps inside `react-pro-sidebar/dist` resolve against the
    // website's node_modules.
    config.resolve.symlinks = false;
    return config;
  },
};

module.exports = withNextra(nextConfig);
