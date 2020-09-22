
### `element-extension`  

> `element-extension` 是基于`element-mini-ui` 扩展的常用组件库

[文档地址](https://ylsoftworkgroup.github.io/element-extension/#/base)

[仓库地址](https://github.com/YLSoftWorkGroup/element-extension)

```bash

### 开发模式下启动包编译
npm run dev

### 开发模式下启动文档编译
npm run dev:docs

#### 打包库
npm run build

#### 打包文档
npm run build:docs
```


#### 使用方式

安装：

```bash

 npm  i  element-extension --save

```


vue全部引入：

```js

 import element-extension from 'element-extension'//引入打包文件
 import  'element-extension/lib/element-extension/element-extension.css'//引入css
 
 Vue.use(element-extension)

```

浏览器头部引入：

```js
<link rel="stylesheet" href="../lib/element-extension/element-extension.css">
<script type="text/javascript" src="../lib/element-extension/element-extension.js"></script>
```



