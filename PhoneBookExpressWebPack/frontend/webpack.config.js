const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./js/app.js",

    devtool: "source-map",

    target: ["web", "es5"],

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "..", "public"),
        assetModuleFilename: "[path][name][ext]?[contenthash]",
        publicPath: ""
    },

    resolve: {
        alias: {
            "vue$": "vue/dist/vue.runtime"
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                type: "asset/resource"
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ],

    devServer: {
        hot: true,
        open: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
};