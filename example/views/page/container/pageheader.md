
#### pageheader

> 标签： `<yl-pageheader></yl-pageheader>` 

**功能：** 包裹 提供工具栏、标题,主要用于页面信息展示

:::demo

```html

  <template>
    <yl-pageheader :title="title">
      <div slot="tool">
        <i class="el-icon-i-back" @click="_back">返回</i>
    </div>
  </yl-pageheader>

  </template>
  <script>
  export default {
    data(){
      return {
      title:'这是一个标题'
      }
    },
    methods:{
      _back(){
        console.log('返回')
      }
    }
  }
  </script>
  <style lang="css" >
  </style>

```
:::

**属性**

| 参数        | 说明           |类型   |默认值|可选值|
| ------------- |:-------------:| -----:|---:|---:|
| icon| panel图标 | String| "" |--|
| title| 标题 | String|"" |--|

**slot**
  
| 名称        | 说明             |
| ------------- |:-------------:|
| tool| 头部区域插槽 | 


