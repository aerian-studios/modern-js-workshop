const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./webpack-entry.js",
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                  }
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    devtool: "source-map",
    serve: {
        contentBase: __dirname,
        compress: true,
        hot: {
            port: 1338,
        },
        port: 1337,
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
