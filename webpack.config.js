var path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./static/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }       
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"校宝在线",
            template:"./static/index.html",
            inject:'head',
        }),
    ],
    devServer: {
        publicPath: '',
        hot: true,
        historyApiFallback: true,
        port:9000,
        host:'127.0.0.1',
        stats: "errors-only",
        proxy: {
            '/api': {
              target: 'http://127.0.0.1:1234'
            }
          }
      }
};