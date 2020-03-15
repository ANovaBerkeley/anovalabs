module.exports = {
  printWidth: 90,
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  overrides: [
    {
      files: ".prettierrc.js",
      options: { parser: "json" }
    }
  ]
};