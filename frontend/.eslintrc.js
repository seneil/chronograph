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
        "tsx": "never",
      }
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
  },
  settings: {
    "import/extensions": [".ts", ".tsx", ".woff2", ".ttf"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".woff2", ".ttf"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx", ".woff2", ".ttf"],
      },
      "webpack": {
        "config": "webpack.application.js"
      }
    }
  },
};
