import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*.{js,jsx,vue,ts,tsx}": "vp lint --ignore-path .gitignore --fix"
  },
  fmt: {
    singleQuote: true,
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [],
  },
});
