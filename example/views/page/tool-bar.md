
  #### ToolBar 工具面板

  > 标签： `<yl-tool-bar></yl-tool-bar>` 


  **功能：** 工具栏面板，主要用于包裹功能操作按钮、过滤器形成区块。

  **示例：**

单独包裹过滤器用法：

:::demo
  ```html

   <template>

    <yl-tool-bar>
      <template v-slot:filter>
        <el-form  label-position="right" label-width="80px" size="small" >
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" >
            <el-form-item label-width="15px">
              <el-button type="info" size="small"  class="el-icon-search" > 查 询</el-button>
            </el-form-item >
          </el-col>
        </el-form>
      </template>
    </yl-tool-bar>

   </template>
   <script>
   export default {
     data(){
       return {
         input:'',
       }
     },
     methods:{
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::

有过滤器扩展的用法：

:::demo
  ```html

   <template>

    <yl-tool-bar more>
      <template v-slot:more>
        <el-form  label-position="right" label-width="80px" size="small" >
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="扩展过滤器">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="扩展过滤器">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="扩展过滤器">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="扩展过滤器">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </template>
      <template v-slot:filter>
        <el-form  label-position="right" label-width="80px" size="small" >
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="15px">
              <el-button type="info" size="small" class="el-icon-search" > 查 询</el-button>
            </el-form-item >
          </el-col>
        </el-form>
      </template>
    </yl-tool-bar>

   </template>
   <script>
   export default {
     data(){
       return {
         input:'',
       }
     },
     methods:{
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::

单独包裹操作按钮：

:::demo
  ```html

   <template>
    <yl-tool-bar>
        <el-button type="primary" size="small" class="el-icon-add" > 添加</el-button>
        <el-button type="primary" size="small" plain class="el-icon-edit"> 编辑</el-button>
        <el-button type="primary" size="small" plain class="el-icon-fileprotect"> 提交</el-button>
        <el-button type="warning" size="small" plain class="el-icon-select"> 撤销提交</el-button>
        <el-button type="info" size="small" plain class="el-icon-setting"> 打印设置</el-button>
        <el-button type="success" size="small" plain class="el-icon-file-excel-fill"> 导出</el-button>
        <el-button type="danger" size="small" plain class="el-icon-delete g-button-margin-left" > 删除</el-button>
        <el-button type="text" size="small" style="margin-left:auto;"> 关闭</el-button>
    </yl-tool-bar>

   </template>
   <script>
   export default {
     data(){
       return {
       }
     },
     methods:{
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::


混合用法一：


:::demo
  ```html

   <template>

    <yl-tool-bar>

<template v-slot:filter>
        <el-form  label-position="right" label-width="80px" size="small" >
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="15px">
              <el-button type="info" size="small" plain class="el-icon-search" > 查 询</ el-button>
            </el-form-item >
          </el-col>
          <div class="g-button-float-right">
            <el-button type="primary" size="small"  class="el-icon-fileprotect"> 提交</el-button>
          <el-button type="success" size="small" plain class="el-icon-file-excel-fill"> 导出</el-button>
          </div>
        </el-form>
      </template>

    </yl-tool-bar>

   </template>
   <script>
   export default {
     data(){
       return {
       }
     },
     methods:{
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::


混合用法二：


:::demo
  ```html

   <template>

    <yl-tool-bar 
      divider >

      <template v-slot:filter>
        <el-form  label-position="right" label-width="80px" size="small" >
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4">
            <el-form-item label="过滤名称">
              <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="15px">
              <el-button type="info" size="small" plain class="el-icon-search" > 查 询</ el-button>
            </el-form-item >
          </el-col>
        </el-form>
      </template>

      
      <el-button type="primary" size="small" class="el-icon-add" > 添加</el-button>
        <el-button type="primary" size="small" plain class="el-icon-edit"> 编辑</el-button>
        <el-button type="primary" size="small" plain class="el-icon-fileprotect"> 提交</el-button>
        <el-button type="warning" size="small" plain class="el-icon-select"> 撤销提交</el-button>
        <el-button type="success" size="small" plain class="el-icon-file-excel-fill"> 导出</el-button>
        <el-button type="danger" size="small" plain class="el-icon-delete g-button-margin-left" > 删除</el-button>
        
    </yl-tool-bar>

   </template>
   <script>
   export default {
     data(){
       return {
       }
     },
     methods:{
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::

  **属性**

  **yl-tool-bar 属性**

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| divider| 分割线 | Boolean| false |

 **slot**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | default| 工具栏内容区域 | 
  | filter| 过滤器插槽 | 
  | more| 过滤器扩展插槽 | 

---
