
module.exports = {
  cwd: __dirname,
  global: {
    browser:{
      outPath:'docs/'
    },
    library:{
      outPath:'lib/'
    }
  },
  server:{
    port: 8080,
    staticPath:'docs/'
  },
  entries: {
    elementExtension: {
      type: 'library',
      input: 'src/index.js',
      output:{
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'elementExtension'
      },
      packerConfig: {
        externals : {
          vue:{
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
          }
        }
      },
      clear: ['lib']
    },
    document: {
      type: 'browser',
      input: 'example/index.js',
      copy: {
        'node_modules/vue/dist': 'docs/lib/vue',
        'node_modules/vue-router/dist': 'docs/lib/vue-router',
        'node_modules/element-mini-ui/lib': 'docs/lib/element-mini-ui',
        'lib/element-extension': 'docs/lib/element-extension',
      },
      clear: ['docs']
    },
    // test: {
    //   type: 'browser',
    //   input: 'test/index.js'
    // }
  }
}
