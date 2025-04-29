import * as eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import * as globals from "globals";
import stylisticPlugin from "@stylistic/eslint-plugin";

export default tseslint.config(
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/.devops/**",
        ],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    stylisticPlugin.configs.recommended,
    {
        files: [ "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx" ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
            },
        },
        rules: {
            // TypeScript rules
            "@typescript-eslint/consistent-type-definitions": [ "error", "interface" ],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-unused-vars": "warn",

            // Stylistic rules (these replace the TypeScript-specific styling rules)
            "@stylistic/semi": [ "error", "always" ],
            "@stylistic/space-before-function-paren": [ "error", "always" ],
            "@stylistic/space-in-parens": [ "error", "always" ],
            "@stylistic/template-curly-spacing": [ "error", "always" ],
            "@stylistic/array-bracket-spacing": [ "error", "always" ],
            "@stylistic/object-curly-spacing": [ "error", "always" ],
            "@stylistic/comma-dangle": [ "error", "always-multiline" ],
            "@stylistic/quotes": [ "error", "double" ],
            "@stylistic/computed-property-spacing": [ "error", "always" ],
            "@stylistic/indent": [ "error", 4 ],
            "@stylistic/brace-style": [ "error", "allman", { allowSingleLine: false } ],
            "@stylistic/jsx-quotes": [ "error", "prefer-double" ],
            "@stylistic/arrow-spacing": [ "error", { before: true, after: true } ],

            // TypeScript-specific style rule for member delimiters
            "@stylistic/member-delimiter-style": [
                "error",
                {
                    multiline: {
                        delimiter: "semi",
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: "semi",
                        requireLast: false,
                    },
                },
            ],

            // ESLint base rules that are not styling-related
            "constructor-super": "error",
        },
    },
);
