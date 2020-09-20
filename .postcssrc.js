/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:03
 * @LastEditTime: 2020-02-17 16:06:37
 */
module.exports={
    plugins: [
        require('postcss-import'),
        require('postcss-mix-color'),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('autoprefixer')
      ]
}