#### comDataDictionary

> 标签： `<yl-comDataDictionary></yl-comDataDictionary>`


  **功能：**  提供单位字典

  **示例：**
:::demo
  ```html
<template>
    <yl-comDataDictionary 
        :code="'RECMAN'" 
        v-model="value1"
        :placeholder="'请选择'"  
        style="width:200px">
    </yl-comDataDictionary>
</template>
 <script>
   import DataDiction from '../data/dataDiction.json'
   export default {
     data(){
       return {
         value1:'1-1-1',
       }
     },
     methods:{
     },
     mounted(){
    }
   }
   </script>
   <style lang="css" >
    .list_warpper{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .item_warpper{
      width:300px;
      height:180px;
      padding:10px;
      margin:15px;
      border: 1px solid #ddd;
    }
    </style>


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
