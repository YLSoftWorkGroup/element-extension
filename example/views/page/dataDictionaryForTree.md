#### dataDictionaryForTree

> 标签： `<yl-DataDictionaryForTree></yl-DataDictionaryForTree>`


  **功能：**  提供字典平行结构

  **示例：**
:::demo
  ```html
<template>
   <yl-DataDictionaryForTree 
        :code="'ceshi'" 
        v-model="dataDictionaryText"  
        :isexpand="true"
        @getCurrentNode="_getCurrentNode"  
        style="width:200px">
   </yl-DataDictionaryForTree>
</template>
 <script>
   import DataDiction from '../data/dataDiction.json'
   export default {
     data(){
       return {
            formModel:{
                 infoThrUnit:''
            }
       }
     },
     methods:{
     },
     mounted(){
    }
   }
   </script>

   ```
:::

  **属性**

  | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | code| 编码code | Stirng|"" |--|
  | placeholder| 提示文本 | String|"" |--|
  | disabled| 是否禁用 | Boolean|false |false/true|
  | size| 控件大小 | String|"" |--|
  | clearable| 清除 | Boolean|false |false/true|
  | isexpand| 是否默认展开 | Boolean|false |false/true|
  | filterVisibe| 是否显示过滤框 | Boolean|false |false/true|
  | autofocus| 是否聚焦 | Boolean|false |false/true|
  | readonly| 是否只读 | Boolean|false |false/true|
 

  **方法**
  暂无

 
 **事件**

| 事件        | 说明           |参数   |
| ------------- |:-------------:| -----:|
| getCurrentNode| 选中节点时触发 | 为当前选中节点的data的值|
| clear| 清除选中项时触发 | 为当前选中节点的data的值|
