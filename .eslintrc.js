module.exports = {
  root: true,
  ignorePatterns: [
    ".eslintrc.js",
  ],
  extends: [
    "@funboxteam",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-use-before-define": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
      }
    ],
  },
  settings: {
    "import/extensions": [".ts"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".ts"],
      },
      "webpack": {
        "config": "webpack.main.js"
      }
    }
  },
};
