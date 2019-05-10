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
    mode: 'production',
    entry: path.join(root, 'example/main.js'),
    output: {
      path: path.resolve(process.cwd(), './docs/'),
      publicPath: process.env.CI_ENV || '',
      filename: '[name].[hash:7].js',
      chunkFilename:'[name].[hash:7].js'
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
