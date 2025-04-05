import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import fs from 'fs';

// Read package.json directly to get peerDependencies
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
// Use require for libName since it's a CommonJS module
const libName = require("./libName.cjs");

export default defineConfig({
  plugins: [
    // Explicitly configure react plugin to use babel with styled-components
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
    react(), // Uses babel.config.cjs automatically
    dts({
      insertTypesEntry: true,
      // Specify the entry point for DTS generation explicitly
      entryRoot: `src/${libName}`,
      // Specify the output directory for DTS files
      outputDir: 'dist',
      // Specify the main DTS file name to match package.json
      fileName: 'index.d.ts'
    }),
  ],
  build: {
    // Target environments that support modern JS but ensure compatibility
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, `src/${libName}/index.js`),
      name: 'ReactElasticCarousel', // Optional: UMD build name
      formats: ['es', 'cjs'],
      // Custom function to match existing package.json file names
      fileName: (format) => {
        if (format === 'es') return 'index.es.js'; // Match pkg.module
        if (format === 'cjs') return 'index.js'; // Match pkg.main
        return `index.${format}.js`; // Fallback for other formats
      },
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: [...Object.keys(pkg.peerDependencies || {})],
      output: {
        // Provide global variables for UMD build (optional)
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          'prop-types': 'PropTypes',
        },
        // Ensure "exports: named" for CJS/ES compatibility
        exports: 'named',
      },
    },
    sourcemap: true, // Generate source maps
    // Clean the output directory before building
    emptyOutDir: true,
  },
});