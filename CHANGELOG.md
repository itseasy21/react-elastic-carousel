# Change Log

We use [Semantic Versioning](http://semver.org/).  
Each release can be found in the Github [Releases page](https://github.com/itseasy21/react-elastic-carousel/releases).

## 2.0.0

### Breaking Changes
- Updated minimum Node.js requirement to v22 (supported LTS lines only)

### Features
- CommonJS consumers load `dist/index.cjs`; native ESM loads `dist/index.es.js` via `exports`
- styled-components v5 and v6 both supported in Node, bundlers, and Yarn/PnP consumers
- React 16.8.3 through 19 verified, including direct Node ESM imports on React 16
- Packed-package smoke tests cover npm, Yarn, and pnpm consumers
- CI matrix covers Node 22, 24, and 26; release pipeline builds on Node 26
- Release pipeline is fully version-driven: tag, GitHub release, and npm publish run automatically on `master` when `package.json` changes

## 1.0.0 (Unreleased)

### Breaking Changes
- Updated minimum Node.js requirement to v16
- Updated styled-components to v6.1.15
  - Added $ prefix to all custom props in styled components
  - Added support for both styled-components v5 and v6
- Migrated from Enzyme to React Testing Library for tests
- Replaced component `defaultProps` with JavaScript default parameters for better React 18+ compatibility

### Features
- Added support for React 19
- Updated dependencies
  - react-swipeable to v7.0.2
  - classnames to v2.3.2
  - prop-types to v15.8.1
  - resize-observer-polyfill to v1.5.1
- Improved testing with React Testing Library
  - Added compatibility tests for React 16.8.3, 18, and 19
  - Made tests more focused on user interaction than implementation details

### Build System
- Updated Rollup to v4.9.1
- Updated Babel configuration
  - @babel/core to v7.23.7
  - @babel/preset-env to v7.23.7
  - @babel/preset-react to v7.23.3
  - @babel/runtime to v7.23.7
- Updated rollup configuration for compatibility with Rollup 4
- Added CI/CD improvements
  - Implemented GitHub Actions workflows for PRs and deployments
  - Added Yarn 3.2.1 packageManager specification
  - Ensured cross-version compatibility testing
