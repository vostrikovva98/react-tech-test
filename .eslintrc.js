module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:import/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "quote-props": ["error", "as-needed"],
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "linebreak-style": 0,
        "no-console": ["error", {
            allow: ["warn", "error"]
        }],
        "no-bitwise": 1,
        "no-param-reassign": ["error", {
            props: true
        }],
        "react/react-in-jsx-scope": 0,
        "react/jsx-props-no-spreading": 0,
        "import/order": ["error", {
            "newlines-between": "always",
            groups: ["external", "internal", "builtin", "parent", "sibling", "index"]
        }]
    },
    settings: {
        "import/resolver": {
            typescript: {}
        }
    },
    ignorePatterns: ["config/**/*", "scripts/**.js", "build/**/*"],
};