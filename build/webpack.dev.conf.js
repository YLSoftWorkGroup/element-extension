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
                        use: [
                            [require('markdown-it-container'), 'demo', {
                              validate: function(params) {
                                return params.trim().match(/^demo\s*(.*)$/)
                              },
                
                              render: function(tokens, idx) {
                                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
                                if (tokens[idx].nesting === 1) {
                                  var description = (m && m.length > 1) ? m[1] : ''
                                  var content = tokens[idx + 1].content
                                  var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                                  var script = striptags.fetch(content, 'script')
                                  var style = striptags.fetch(content, 'style')
                                  var jsfiddle = { html: html, script: script, style: style }
                                  var descriptionHTML = description
                                    ? md.render(description)
                                    : ''
                                  jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))
                
                                  return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                                            <div class="source" slot="source">${html}</div>
                                            ${descriptionHTML}
                                            <div class="highlight" slot="highlight">`
                                }
                                return '</div></demo-block>\n'
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
