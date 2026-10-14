import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    // Classic runtime compiles JSX to React.createElement, so `react` stays the
    // only external. The automatic runtime inlined react/jsx-runtime (dev and
    // prod builds, ~28 kB) into the bundle.
    react({ jsxRuntime: 'classic' }),
    dts({
      insertTypesEntry: true,
      // Single declaration file: no extensionless relative imports, which
      // break under moduleResolution node16/nodenext.
      rollupTypes: true,
      exclude: ['src/**/__tests__/**', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
      // API Extractor writes CRLF; normalize to LF so builds are byte-identical
      // across platforms, then emit a CJS-flavoured twin for the "require"
      // export condition.
      afterBuild: () => {
        const types = resolve(__dirname, 'dist/index.d.ts');
        writeFileSync(types, readFileSync(types, 'utf8').replace(/\r\n/g, '\n'));
        copyFileSync(types, resolve(__dirname, 'dist/index.d.cts'));
      },
    }),
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Virtualization',
      fileName: (format) => `virtualization.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd'],
    },
    commonjsOptions: {
      esmExternals: ['react', 'react-dom'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}));
