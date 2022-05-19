module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:react/recommended",
    "google",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "semi": ["warn", "always"],
    "quotes": ["warn", "double"],
    "max-len": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "require-jsdoc": "off",
  },
};
