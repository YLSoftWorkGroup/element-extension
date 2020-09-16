
module.exports = {
  cwd: __dirname,
  global: {
    copy: {
    }
  },
  server:{
    port: 8080,
    staticPath:'dist/browser/'
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
    },
    elementExtension: {
      type: 'browser',
      input: 'example/mian.js',
      packerConfig: {
      },
    }
  }
}
