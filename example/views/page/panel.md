
  #### Panel 面板

  > 标签： `<yl-panel></yl-panel>` 


  **功能：** 包裹单个或者多个内容块,提供标题、工具栏

  **示例：**

常见用法

:::demo
  ```html

   <template>
     <yl-panel 
      title="面板标题" 
      width="800px" 
      style="height:300px">
       <template v-slot:tool>
          <el-button size="mini" class="el-icon-delete" @click="_reload"> </el-button>
           <el-button size="mini" class="el-icon-add" @click="_reload"> </el-button>
          <el-button size="mini" class="el-icon-refresh" @click="_reload"> </el-button>
      </template>
        <div class="g-container-padding">
          <el-table
            :data="tableData"
            border
            size="small"
            style="width: 100%;">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
  </yl-panel>

   </template>
   <script>
   export default {
     data(){
       return {
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },{
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },  {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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



功能内容块混合使用

:::demo
  ```html

   <template>
     <yl-panel 
      width="800px" 
      style="height:300px">
      <template v-slot:tool>
        <el-button type="primary" size="small" class="el-icon-add" > 添加</ el-button>
        <el-button type="primary" size="small" plain class="el-icon-edit"> 编辑</el-button>
        <el-button type="danger" size="small" plain class="el-icon-delete g-button-margin-left" > 删除</el-button>
      </template>
      <div class="g-container-padding">
        <el-table
          :data="tableData"
          border
          size="small"
          height="250"
          style="width: 100%;">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
  </yl-panel>

   </template>
   <script>
   export default {
     data(){
       return {
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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

内容块为选项卡的使用


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

