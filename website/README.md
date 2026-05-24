# react-pro-sidebar — documentation website

The documentation site for [`react-pro-sidebar`](https://www.npmjs.com/package/react-pro-sidebar), built with [Nextra v3](https://nextra.site/) (docs theme) on Next.js.

## Stack

- **Framework:** Next.js 14 (Pages Router)
- **Docs:** Nextra v3 + `nextra-theme-docs`
- **Library under test:** linked locally via `file:..` so the docs render the real package from `../dist`.
- **Deploy:** Netlify static export — see [`netlify.toml`](../netlify.toml) at the repo root.

## Develop

```bash
# 1. Build the library so file:.. resolves to a populated dist/
cd ..
yarn install
yarn build

# 2. Run the docs dev server
cd website
yarn install
yarn dev
```

Open <http://localhost:3000>.

## Build

```bash
yarn build      # outputs the static site to ./out
```

## Structure

```
website/
├── pages/
│   ├── _app.tsx                  Global CSS shim
│   ├── _meta.json                Top-nav order (Home / Docs / API / Playground / Storybook)
│   ├── index.mdx                 Home page
│   ├── api.mdx                   API reference (mirrors source + new v2 props)
│   ├── playground.tsx            Interactive playground (dynamic-imported, ssr:false)
│   └── docs/
│       ├── _meta.json
│       ├── installation.mdx
│       ├── migration.mdx
│       ├── accessibility.mdx
│       ├── changelog.mdx
│       ├── components/
│       │   ├── _meta.json
│       │   ├── sidebar.mdx
│       │   ├── menu.mdx
│       │   ├── menu-item.mdx
│       │   └── sub-menu.mdx
│       └── examples/
│           ├── _meta.json
│           ├── dashboard-layout.mdx
│           ├── react-router.mdx
│           ├── theme-customization.mdx
│           └── nextjs-integration.mdx
├── components/
│   ├── PlaygroundClient.tsx      Reproduces the storybook playground
│   ├── playground/
│   │   ├── icons.tsx
│   │   └── ui.tsx                Switch, Badge, Typography, SidebarHeader, SidebarFooter
│   └── demos/
│       ├── index.tsx             Lazy-import barrel (ssr:false)
│       ├── SidebarDemos.tsx      Live demos used by the component prop pages
│       └── ExampleDemos.tsx      Live demos used by the example pages
├── styles/globals.css
├── theme.config.tsx              Nextra docs theme config
├── next.config.js
├── tsconfig.json
└── package.json
```

## Deploy

`netlify.toml` at the repo root configures the build. From a fresh Netlify connect-to-Git
setup, no further configuration is needed.

```toml
[build]
  base    = "website"
  command = "cd .. && yarn install --frozen-lockfile && yarn build && cd website && yarn install --frozen-lockfile && yarn build"
  publish = "website/out"
```

The library is built first so the `file:..` dependency in `website/package.json` resolves
to a populated `dist/`, then the static site is exported to `website/out`.
