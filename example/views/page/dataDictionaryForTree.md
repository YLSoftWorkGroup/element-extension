#### datadictionaryfortree

> 标签： `<yl-datadictionaryfortree />`


  **功能：**  提供树形结构字典

  **示例：**

```html

<template>
    <datadictionaryfortree 
      v-model="value"
      width="320px"
      code="StoreRoom"
      placeholder="选择字段"
      @clear="_clear"
      @getCurrentNode = "_getCurrentNode"
    />
</template>
 <script>
   export default {
     data(){
       return {
          value:''
       }
     },
     methods:{
      _clear(){
        console.log (this.testvalue)
      },
      _getCurrentNode(node) {
        console.log(node)
      },
     },
     mounted(){
       
    }
   }
   </script>
   <style lang="css" >
   </style>

```

 **属性**

  | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | code| 字典编码 | String|"" |--|
  | width| 控件宽度 | String|"240px" |--|
  | size| 输入框大小  | String|'small' |参考el-input的size属性|
  | disabled| 禁用状态  | Boolean|false |true/false|
  | placeholder| 提示输入文本  | String|'' |--|
  | defaultText| 默认文本值 （只在逐步加载模式下使用） | String|"" ||
 

  **事件**

  | 事件        | 说明           |参数   |
  | ------------- |:-------------:| -----:|
  | getCurrentNode| 点击节点时触发 | 当前节点对象|
  
---