module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "@d3banking/eslint-config",
        "jquery",
        "plugin:rc-leaflet/es-dev",
        "plugin:rc-leaflet/es-prod"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "semi": [2,"always"],
        "indent": ["error", 2],
        "quotes": ["error", "double"]
    },

    "plugins": [
          "rc-leaflet"
        ]
      
};
