export default {
  index: {
    title: 'Home',
    type: 'page',
    display: 'hidden',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
    },
  },
  docs: {
    title: 'Docs',
    type: 'page',
  },
  'api-reference': {
    title: 'API',
    type: 'page',
  },
  playground: {
    title: 'Playground',
    type: 'page',
    href: '/playground',
  },
  privacy: {
    title: 'Privacy Policy',
    type: 'page',
    display: 'hidden',
    theme: {
      // Same chrome trim as the home page — no docs sidebar / TOC / breadcrumb,
      // since the privacy page is a standalone document, not part of the docs tree.
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
    },
  },
};
