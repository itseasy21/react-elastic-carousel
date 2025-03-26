import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import external from "rollup-plugin-auto-external";
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
import { defineConfig } from "rollup";
import fs from "fs";

// Read package.json directly
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// Use require for libName since it's a CommonJS module
const libName = require("./libName");

export default defineConfig({
  input: `src/${libName}/index.js`,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: false,
      extract: false,
      minimize: true,
      inject: false
    }),
    url({
      limit: 10 * 1024 // inline files < 10k
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/plugin-transform-runtime"]
    }),
    nodeResolve({
      browser: true
    }),
    commonjs({
      include: "node_modules/**",
      requireReturnsDefault: "auto"
    }),
    copy({
      targets: [{ src: `src/${libName}/index.d.ts`, dest: "dist" }]
    })
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    "react/jsx-runtime"
  ]
});
