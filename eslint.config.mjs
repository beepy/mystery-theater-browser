import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
  });
export default defineConfig([
  globalIgnores(["node_modules","*.log*",".nuxt",".nitro",".cache",".output",".env","dist",".pnp.*",".yarn/*","!.yarn/patches","!.yarn/plugins","!.yarn/releases","!.yarn/sdks","!.yarn/versions"]),
  {
    extends: fixupConfigRules(compat.extends(
      "@nuxtjs/eslint-config-typescript",
      "plugin:prettier/recommended"
    )),
    rules: {
      "@typescript-eslint/no-unused-vars": 'warn',
      "no-unused-vars": ["off", {"caughtErrors":"none"}]
    },
  }
]);
