module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir : __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          [`^(${require("module").builtinModules.join("|")})(/|$)`, "^@nestjs/common", "^@nestjs/testing", "^@nestjs(/|$)", "^\\w"],
          ["^.+\\.mock(/.*|$)", "^.+\\.module(/.*|$)", "^.+\\.service(/.*|$)"],
          ["^\\u0000", "^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      }
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["*.spec.ts", "*.test.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              [`^(${require("module").builtinModules.join("|")})(/|$)`, "^@nestjs/common", "^@nestjs/testing", "^.+\\.mock(/.*|$)", "^@nestjs(/|$)", "^\\w"],
              ["^.+\\.module(/.*|$)", "^.+\\.service(/.*|$)"],
              ["^\\u0000", "^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ],
          }
        ],
      }
    }
  ]
};
