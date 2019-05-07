/* eslint-disable no-undef */
'use strict';
var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');

var externals = {};

externals = [Object.assign({
    vue: 'vue'
}, externals), nodeExternals()];


exports.externals = externals;

exports.alias = {
    components: path.resolve(__dirname, '../src/components'),
    'yl-component': path.resolve(__dirname, '../')
};

exports.vue = {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
};

