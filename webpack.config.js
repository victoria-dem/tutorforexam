const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {main: './src/pages/index.js', emailverification: './src/pages/emailverification.js'},
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },


            {
                test: /.(png|svg|jpg|gif|webp)$/,
                loader: "file-loader?name=./images/[name].[ext]",
            },
            {
                test: /.(eot|ttf|woff|woff2)$/,
                loader: "file-loader?name=./vendor/[name].[ext]",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "src/images/favicon.ico",
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'emailverification.html',
            template: 'src/emailverification.html',
            chunks: ['emailverification']
        }),
        new MiniCssExtractPlugin()
    ]
};
