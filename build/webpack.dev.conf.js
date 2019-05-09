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
const striptags = require('./strip-tags')
const md = require('markdown-it')()
const wrap = function(render) {
    return function() {
      return render.apply(this, arguments)
        .replace('<code v-pre class="', '<code class="hljs ')
        .replace('<code>', '<code class="hljs">')
    }
  }
function convert(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
    })
    return str
}
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
                    options: {
                        raw: true,
                        preventExtract: true,
                        use: [
                            [ require('markdown-it-container'), 'demo', {
                              validate: function(params) {
                                return params.trim().match(/^demo\s*(.*)$/)
                              },
                              render: function(tokens, index) {
                                let { nesting, info } = tokens[index]
                                if (nesting === 1) {
                                // 1.获取代码块的描述内容
                                let content = info.trim().match(/^demo\s+(.*)$/) || []
                                let description = content.length > 1 ? content[1] : ""
                                var md = require("markdown-it")()
                                if (description) {
                                    description = md.render(description)
                                }
                                // 2.获取代码块内的html和js代码
                                let code = tokens[index + 1].content
                                // 3.代码块包裹
                                return `
                                    <k-example-code>
                                        <div class="source" slot="source">${code}</div>
                                        ${description}
                                        <div class="highlight" slot="code">`
                                } else {
                                return `
                                    </div>
                                    </k-example-code>\n`
                                }
                              }
                            }],
                            [require('markdown-it-container'), 'tip'],
                            [require('markdown-it-container'), 'warning']
                          ],
                          preprocess: function(MarkdownIt, source) {
                            MarkdownIt.renderer.rules.table_open = function() {
                              return '<table class="table">';
                            };
                            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
                            return source;
                          }
                    }
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
