const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: "./src/popup",
        content: "./src/content",
        background: "./src/background"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "nosources-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    },
    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true,
        // }),
        // new CleanWebpackPlugin(["dist"], { root: path.resolve(__dirname, ".."), verbose: true })
        new CopyWebpackPlugin([
            { from: "manifest.json" },
            { from: "./src/popup/index.html", to: "popup.html" },
            { from: "images", to: "images" },
            { from: "styles", to: "styles" }
        ])
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss", ".json"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ["ts-loader"],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["url-loader"]
        }
        ]
    }
}