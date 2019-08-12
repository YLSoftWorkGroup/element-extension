
#### commontree

> 标签：  `<yl-commontreepanel></yl-commontreepanel>`

**功能：**  通用面板树组件

**代码示例：**


  ```html

   <template>

   <yl-commontreepanel ref="selectTree"
      v-model="formModel.parentId"
      rootName="根节点"
      width="220px"
      :queryParams="treeParams"
      :renderContent="renderContent"
      @getCurrentNode="_getCurrentNode"

    />
   </template>
   <script>
   export default {
     data(){
       return {
         formModel:{
           parentId:''
         },
         treeParams: {
          path: 'cbaseinfo/g-statistic-categorys', //apiurl
          serviceId: 'node-cbaseinfo-service', //serviceId
          parentId: -1  //根节点
        },
       }
     },
     methods:{
       _getCurrentNode(node){
         console.log(node)
       },
       renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>
              <el-button size="mini" type="text" >{node.label}</el-button>
              <el-button size="mini" type="text" >Delete</el-button>
            </span>
          </span>);
        },
      },
   }
   </script>
   <style lang="css" >
   </style>

  ```

  **属性**

  | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | title| 面板标题 | String|"逐步加载树" |--|
  | width| 宽度 | String| 240px |--|
  | rootName| 根节点名称 | String|根节点 |--|
  | queryParams| 查询参数 | Object|{ path: '', serviceId: '', parentId: -1,orgId: ''} |--|
  | renderContent| 文本渲染 | Function | --|--|
 

  **事件**

  | 事件        | 说明           |参数   |
  | ------------- |:-------------:| -----:|
  | getCurrentNode| 点击节点时触发 | 当前节点对象|
  
---
