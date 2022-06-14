module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "max-len": ["error", { code: 130, ignoreComments: true }],
  },
};
