
module.exports = {
  cwd: __dirname,
  global: {
    copy: {
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
