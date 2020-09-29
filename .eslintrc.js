module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  // extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }]
    // "prettier/prettier": [
    //   "error",
    //   {
    //     "singleQuote": true,
    //     "bracketSpacing": true,
    //     "jsxBracketSameLine": true
    //   }
    // ]
  }
};
