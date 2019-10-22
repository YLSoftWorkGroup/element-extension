/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:08
 * @LastEditTime: 2019-10-16 22:28:26
 */
/* eslint-disable no-undef */

'use strict';
const path = require('path');
const baseConfig = require('./config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

 
module.exports =  {
    mode: 'production',
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'element-extension.js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2',
        libraryExport: 'default'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: baseConfig.alias,
        modules: ['node_modules']
    },
    externals: baseConfig.vue,
    performance: { 
        hints: false   //打包资源过大是否提示
    },
    stats: { 
        children: false  // 添加 children 信息
    },
    optimization: { // 是否压缩
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
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
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};

