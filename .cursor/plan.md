# Technical Specification for Upgrading React Elastic Carousel

This plan details the steps required to upgrade the React Elastic Carousel codebase to support the latest React packages and Node.js 22. The plan is organized into sequential phases to ensure a systematic approach to the upgrade process.

## Phase 1: Update Package Dependencies

### Update package.json Dependencies

1. Modify the Node.js and npm engine requirements:
   - File: `package.json`
   - Change `"engines"` from `"node": ">=8", "npm": ">=5"` to `"node": ">=16", "npm": ">=8"`

2. Update React peer dependencies:
   - File: `package.json`
   - Change `"react": "16.8.3 - 18"` to `"react": "16.8.3 - 19"`
   - Change `"react-dom": "16.8.3 - 18"` to `"react-dom": "16.8.3 - 19"`

3. Update styled-components:
   - File: `package.json`
   - Change peer dependency `"styled-components": "^5.0.0"` to `"styled-components": "^5.0.0 || ^6.0.0"`
   - Update devDependency from `"styled-components": "^5.1.0"` to `"styled-components": "^6.1.15"`

4. Update other dependencies:
   - File: `package.json`
   - Change `"react-swipeable": "^7.0.0"` to `"react-swipeable": "^7.0.2"`
   - Change `"resize-observer-polyfill": "~1.5.0"` to `"resize-observer-polyfill": "^1.5.1"`
   - Change `"@uiw/react-only-when": "^1.0.6"` to `"@uiw/react-only-when": "^1.0.6"` (check for updates)
   - Change `"classnames": "^2.2.6"` to `"classnames": "^2.3.2"`
   - Change `"prop-types": "^15.5.4"` to `"prop-types": "^15.8.1"`

5. Update development dependencies:
   - File: `package.json`
   - Update Babel related packages to latest versions:
     - `"@babel/core": "^7.3.4"` → `"@babel/core": "^7.23.7"`
     - `"@babel/preset-env": "^7.3.4"` → `"@babel/preset-env": "^7.23.7"`
     - `"@babel/preset-react": "^7.0.0"` → `"@babel/preset-react": "^7.23.3"`
     - `"@babel/runtime": "^7.18.6"` → `"@babel/runtime": "^7.23.7"`
   - Update Rollup and plugins:
     - `"rollup": "^0.64.1"` → `"rollup": "^4.9.1"`
     - Also update rollup plugins with compatible versions

## Phase 2: Address Breaking Changes

### Handle styled-components v6 Breaking Changes

1. Update component props in styled components:
   - File: `src/@itseasy21/react-elastic-carousel/components/styled/ItemWrapper.js`
   - Add `$` prefix to any custom props that should not be passed to the DOM

2. Update StyleSheetManager implementation if used:
   - Look for any instances of `StyleSheetManager` with `disableVendorPrefixes` prop
   - Replace with `enableVendorPrefixes` prop with inverted boolean value

3. Update any usages of `$as` or `$forwardedAs` props:
   - Replace with `as` or `forwardedAs` props throughout the codebase

## Phase 3: Update Build Configuration

1. Update Babel configuration:
   - File: `.babelrc`
   - Update presets configuration if needed

2. Update Rollup configuration:
   - File: `rollup.config.js`
   - Update plugin usage to match latest Rollup API:
     - Replace deprecated plugins with their modern equivalents
     - Update configuration options for compatibility

3. Ensure TypeScript definitions are compatible:
   - File: `src/@itseasy21/react-elastic-carousel/index.d.ts`
   - Verify React 19 compatibility in type definitions

## Phase 4: Test and Verify

1. Set up test environment:
   - Create a simple test app using the latest React version
   - Import and use the carousel component to verify functionality

2. Test with various React versions:
   - Test with React 16.8.3
   - Test with React 18
   - Test with React 19

3. Verify Node.js 22 compatibility:
   - Run build process on Node.js 22
   - Run tests on Node.js 22
   - Verify no deprecation warnings related to Node.js

## Phase 5: Documentation Updates

1. Update README:
   - File: `README.md`
   - Update supported React version information
   - Update Node.js version requirements
   - Document any breaking changes or migration steps for users

2. Update changelog:
   - File: `CHANGELOG.md`
   - Document all changes made in this update

## Phase 6: Version and Publish

1. Update package version:
   - File: `package.json`
   - Increment version according to semver (likely a major version bump)

2. Build package for distribution:
   - Run build script to generate distribution files

IMPLEMENTATION CHECKLIST:
1. Update Node.js and npm engine requirements in package.json
2. Update React peer dependencies in package.json
3. Update styled-components peer dependency and devDependency in package.json
4. Update other dependencies (react-swipeable, resize-observer-polyfill, etc.) in package.json
5. Update development dependencies (Babel, Rollup, etc.) in package.json
6. Add $ prefix to custom props in styled components
7. Update any StyleSheetManager usages replacing disableVendorPrefixes with enableVendorPrefixes
8. Replace any $as or $forwardedAs props with as or forwardedAs
9. Update Babel configuration in .babelrc
10. Update Rollup configuration in rollup.config.js for compatibility with latest versions
11. Verify TypeScript definitions in index.d.ts are compatible with React 19
12. Create test app with latest React version to verify functionality
13. Test component with React 16.8.3, 18, and 19
14. Test build and run processes on Node.js 22
15. Update README.md with new version information and requirements
16. Update CHANGELOG.md with details of changes
17. Update package version in package.json according to semver
18. Build package for distribution
19. Verify final package works correctly 