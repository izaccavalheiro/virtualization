import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
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
