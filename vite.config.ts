import { defineConfig } from 'vite-plus';

// export default defineConfig({
//   staged: {
//     '*.{js,jsx,vue,ts,tsx}': 'vp lint --ignore-path .gitignore --fix',
//   },
//   fmt: {
//     singleQuote: true,
//     printWidth: 80,
//     sortPackageJson: false,
//     ignorePatterns: [],
//   },
// });

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    printWidth: 80,
    ignorePatterns: [],
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
});
