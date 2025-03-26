import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";
import livereload from "rollup-plugin-livereload";
import { defineConfig } from "rollup";

export default defineConfig({
  input: `demoApp/src/index.js`,
  output: [
    {
      file: "demoApp/dist/bundle.js",
      format: "cjs",
      sourcemap: true,
      exports: "named"
    }
  ],
  watch: {
    include: ["demoApp/src/**", "src/**"],
    exclude: ["node_modules/**", "dist/**"],
    clearScreen: false
  },
  plugins: [
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
      browser: true,
      mainFields: ["browser", "module", "main"],
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    commonjs({
      include: "node_modules/**",
      requireReturnsDefault: "auto"
    }),
    serve({
      open: true,
      contentBase: "demoApp/dist"
    }),
    livereload({
      watch: "demoApp/dist",
      verbose: false
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true
    })
  ]
});
