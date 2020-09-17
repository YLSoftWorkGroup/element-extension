
module.exports = {
  cwd: __dirname,
  global: {
    copy: {
      'node_modules/vue/dist': 'browser/lib/vue',
      'node_modules/vue-router/dist': 'browser/lib/vue-router',
      'node_modules/element-mini-ui/lib': 'browser/lib/element-mini-ui',
      'lib/element-extension': 'browser/lib/element-extension',
    },
    browser:{
      outPath:'browser/'
    },
    library:{
      outPath:'lib/'
    }
  },
  server:{
    port: 8080,
    staticPath:'browser/'
  },
  entries: {
    elementExtension: {
      type: 'library',
      input: 'src/index.js',
      output:{
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'element-extension'
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
      clear: ['browser']
    },
    docs: {
      type: 'browser',
      input: 'example/index.js',
      clear: ['lib']
    }
  }
}
