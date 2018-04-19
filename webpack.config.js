const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./webpack-entry.js",
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "inline-source-map",
    serve: {
        contentBase: __dirname,
        compress: true,
        port: 5000,
        hot: true,
        inline: true,
        dev: {
            publicPath: "/dist/",
        },
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
