
#### commontree

> 标签：  `<yl-commontree></yl-commontree>`

**功能：**  通用选中树组件

**代码示例：**


  ```html

   <template>

   <yl-commontree ref="selectTree"
      v-model="formModel.parentId"
      rootName="根节点"
      width="220px"
      defaultText="默认文本值"
      placeholder="请选择父节点"
      :queryParams="treeParams"
      @clear="_clear"
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
       _clear(selectNode){
         console.log(selectNode)
       },
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
  | defaultText| 默认文本值 | String|"" |--|
  | width| 宽度 | String| 240px |--|
  | size| 输入框大小  | String|'small' |参考el-input的size属性|
  | disabled| 根节点  | Boolean|false |true/false|
  | placeholder| 提示输入文本  | String|'' |--|
  | rootName| 根节点名称 | String|根节点 |--|
  | displaytoolBar| 启用树控件工具栏（包含清楚和刷新功能）| Boolean|false |true/false|
  | queryParams| 查询参数 | Object|{ path: '', serviceId: '', parentId: -1,orgId: ''} |--|
  | renderContent| 文本渲染 | Function | --|--|

  **事件**

  | 事件        | 说明           |参数   |
  | ------------- |:-------------:| -----:|
  | getCurrentNode| 点击节点时触发 | 当前节点对象|
  | clear| 清除事件 | -- |
  
---
