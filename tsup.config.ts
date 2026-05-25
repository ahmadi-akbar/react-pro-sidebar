import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  // react / react-dom (peerDependencies) and runtime dependencies
  // (@emotion/*, @popperjs/core, classnames) are externalized automatically.
});
