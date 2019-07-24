#### dataDictionaryForSel

> 标签： `<yl-DataDictionaryForSel></yl-DataDictionaryForSel>`


  **功能：**  提供字典平行结构

  **示例：**
:::demo
  ```html
<template>
    <yl-DataDictionaryForSel 
                style="width:220px"
                :code="'Unit'" 
                v-model="value"  
                :placeholder="'请选择'" 
    >
    </yl-DataDictionaryForSel>
</template>
 <script>
   import DataDiction from '../data/dataDiction.json'
   export default {
     data(){
       return {
          value:'千克'
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
 

  **方法**
  暂无