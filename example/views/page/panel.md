
  #### panel

  > 标签： `<yl-panel></yl-panel>` 


  **功能：** 包裹内容块，提供工具栏、标题

  **示例：**
:::demo
  ```html

   <template>

     <yl-panel :title="title" width="200px" style="height:300px">
       <div slot="tool">
          <i class="el-icon-refresh" @click="_reload"></i>
      </div>
      <div >
          我是内容区域
      </div>
  </yl-panel>

   </template>
   <script>
   export default {
     data(){
       return {
        title:'这是一个面板'
       }
     },
     methods:{
       _reload(){
         console.log('刷新')
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
  | width| 宽度 | String|"100%" |--|
  | showHeader| 是否显示头部 | Boolean|true |false/true|

 **slot**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | tool| 头部区域插槽 | 
  | default| 内容区域插槽 | 


---

