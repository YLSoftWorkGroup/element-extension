#### dataDictionaryForSel

> 标签： `<yl-datadictionaryforsel></yl-datadictionaryforsel>`


  **功能：**  提供平行结构字典

  **示例：**

```html

<template>
    <dataDictionaryForSel 
      v-model="value"
      code="Payment"
      placeholder="选择字典"
      clearable
      @clear="_clear"
      @getCurrentValue = "_getCurrentvalue"
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
      _getCurrentValue(node) {
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
  | size| 输入框大小  | String|'small' |参考el-input的size属性|
  | disabled| 禁用状态  | Boolean|false |true/false|
  | placeholder| 提示输入文本  | String|'' |--|
  | clearable| 是否显示清楚按钮 | Boolean|false |true/false|
 

  **事件**

  | 事件        | 说明           |参数   |
  | ------------- |:-------------:| -----:|
  | getCurrentValue| 点击节点时触发 | 当前节点名称|
  | clear|  | 当前选中节点对象 |
  
---