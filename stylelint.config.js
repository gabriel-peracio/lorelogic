module.exports = {
  plugins: ["stylelint-css-modules-no-global-scoped-selector", "stylelint-scss"],
  rules: {
    "css-modules/no-global-scoped-selector": [true, { fileExtensions: [".module.scss"] }],
    "scss/dollar-variable-pattern": [
      /^[a-z]+[a-zA-Z0-9]*$/,
      {
        message: "Dollar variables must be in camelCase",
      },
    ],
    "scss/at-mixin-pattern": [/^[a-z]+[a-zA-Z0-9]*$/, { message: "Mixins must be in camelCase" }],
    "custom-property-pattern": [
      /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/,
      {
        message: "Custom properties must be in kebab-case",
      },
    ],
    "selector-id-pattern": [
      /^[A-Z]+[a-zA-Z0-9]*$/,
      {
        message: "Selectors must be in PascalCase",
      },
    ],
    "scss/at-import-partial-extension": "never",
    "scss/at-rule-conditional-no-parentheses": true,
  },
  customSyntax: "postcss-scss",
  overrides: [
    {
      files: ["src/index.scss"],
      rules: {
        "css-modules/no-global-scoped-selector": null,
      },
    },
  ],
};
