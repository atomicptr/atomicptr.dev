/** @type { import("eslint").Linter.Config } */
module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports", "sort-keys-fix"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        extraFileExtensions: [".svelte"],
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    overrides: [
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/semi": ["error"],
        curly: "error",
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "linebreak-style": "warn",
        "no-console": "error",
        "no-new": "error",
        "no-restricted-imports": [
            "error",
            {
                patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"],
            },
        ],
        "prefer-const": "error",
        quotes: ["error", "double"],
        semi: "off",
        "simple-import-sort/imports": "error",
        "sort-keys": [
            "error",
            "asc",
            {
                caseSensitive: true,
                minKeys: 2,
                natural: true,
            },
        ],
        "sort-keys-fix/sort-keys-fix": "error",
        strict: ["error", "global"],
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "error",
            {
                args: "after-used",
                argsIgnorePattern: "^_",
                vars: "all",
                varsIgnorePattern: "^_",
            },
        ],
    },
};
