module.exports = {
    extends: ["plugin:react/recommended", "airbnb-base", "prettier"],
    plugins: ["jest"],
    env: {
        "jest/globals": true,
        browser: true,
    },
    rules: {
        "import/extensions": false,
    },
};
