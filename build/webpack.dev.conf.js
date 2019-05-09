/* eslint-disable no-undef */
/**
 * 样例的开发预览
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const root = path.join(__dirname, '../');
const markdownConf = require('./markdown.conf.js');
module.exports = {
    mode: 'development',
    entry: path.join(root, 'example/main.js'),
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        progress: true,
        quiet: true,
        overlay: {
            errors: true
        },
        host: 'localhost',
        port: 8090,
        inline: true,
        open: true
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                'async-vendors': {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    name: 'async-vendors',
                    chunks: 'async'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias:  {
            example: path.resolve(__dirname, '../example')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                // eslint-disable-next-line no-undef
                include: process.cwd(),
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(pcss|postcss|css)$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.md$/,
                use: [
                {
                    loader: 'vue-loader'
                },
                {
                    loader: 'vue-markdown-loader/lib/markdown-compiler',
                    options: markdownConf()
                }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../example/index.html'),
            inject: true
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};
