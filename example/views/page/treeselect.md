 <script>
   export default {
     data(){
       return {
         modelValue:'',
         modelValue1:'',
         defaultProps1:{
           label:'label',
           children:'children'
         },
         treeData1:[],
         treeData:[
           { 
             id: 1,
             label: '1',
             children: [
               {
                  id: 11,
                  label: '1-1'
               },
               {
                  id: 12,
                  label: '1-2',
               },
             ]
           },
           { 
             id: 2,
             label: '2',
             children: [
               {
                  id: 21,
                  label: '2-1'
               },
               {
                  id: 22,
                  label: '2-2'
               },
             ]
           }
         ],
         defaultProps:{
           label:'label',
           children:'children'
         }
       }
     },
     methods:{
       _getCurrentNode(selectNode){
         console.log(selectNode)
       },
       _clear(selectNode){
         console.log(selectNode)
       },
       _reload(selectNode){
         console.log(selectNode)
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
      _getCurrentNode1(selectNode){
         console.log(selectNode)
       },
       _clear1(selectNode){
         console.log(selectNode)
       },
       _reload1(selectNode){
         console.log(selectNode)
       },
       renderContent1(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>
              <el-button size="mini" type="text" >{node.label}</el-button>
              <el-button size="mini" type="text" >Delete</el-button>
            </span>
          </span>);
      },
      loadNode (node, resolve) {
        if (!node.level) {
          //根节点
           let rootNode = {
            id: 1,
            label: 'root',
            children: []
          }
          this.treeData1 = [rootNode]
        } else {
          let id =Math.floor(Math.random() * (100));
          resolve([
            {
              id:id,
              label: id+'-1',
              children: []
           }
          ])
        }
      },
     }
   }
</script>

#### treeselect

> 标签：  `<yl-treeselect></yl-treeselect>`

**功能：**  提供树选择的基础组件

**示例：**
#### 全部加载的树示例

:::demo

  ```html

   <template>

   <yl-treeselect
      v-model ="modelValue"
      width="350px"
      :treeData="treeData"
      :defaultProps="defaultProps"
      :renderContent="renderContent"
      filterTextVisibe
      displaytoolBar
      @getCurrentNode = "_getCurrentNode"
      @clear = "_clear"
      @reload = "_reload"
   ></yl-treeselect>

   </template>
   <script>
   export default {
     data(){
       return {
         modelValue:'',
         treeData:[
           { 
             id: 1,
             label: '1',
             children: [
               {
                  id: 11,
                  label: '1-1',
               },
               {
                  id: 12,
                  label: '1-2',
               },
             ]
           },
           { 
             id: 2,
             label: '2',
             children: [
               {
                  id: 21,
                  label: '2-1',
               },
               {
                  id: 22,
                  label: '2-2',
               },
             ]
           }
         ],
         defaultProps:{
           label:'label',
           children:'children'
         }
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



#### 逐步加载的树示例

:::demo

  ```html

   <template>

   <yl-treeselect
      v-model ="modelValue1"
      width="350px"
      :treeData="treeData1"
      :defaultProps="defaultProps1"
      :renderContent="renderContent1"
      stepByOne
      defaultText='默认文本'
      displaytoolBar
      @getCurrentNode = "_getCurrentNode1"
      @loadNodeEvent = "loadNode"
      @clear = "_clear1"
      @reload = "_reload1"
   ></yl-treeselect>

   </template>
   <script>
   export default {
     data(){
       return {
         modelValue1:'',
         treeData1:[
         ],
         defaultProps1:{
           label:'label',
           children:'children'
         }
       }
     },
     methods:{
        _getCurrentNode1(selectNode){
         console.log(selectNode)
       },
       _clear1(selectNode){
         console.log(selectNode)
       },
       _reload1(selectNode){
         console.log(selectNode)
       },
       renderContent1(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>
              <el-button size="mini" type="text" >{node.label}</el-button>
              <el-button size="mini" type="text" >Delete</el-button>
            </span>
          </span>);
      },
      loadNode (node, resolve) {
        if (!node.level) {
          //根节点
           let rootNode = {
            id: 1,
            label: 'root',
            children: []
          }
          this.treeData1 = [rootNode]
        } else {
          let id =Math.floor(Math.random() * (100));
          resolve([
            {
              id:id,
              label: id+'-1',
              children: []
           }
          ])
        }
      },
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
  | width| 宽度 | String| 240px |--|
  | treeData| 树数据源 | Array|[] |--|
  | defaultExpandedKeys| 默认展开的节点数组 | Array|[] |--|
  | renderContent| 树节点的内容区的渲染  | Function|Function(h, { node, data, store } |--|
  | defaultProps| 配置选项  | object |具体看props配置表 |--|
  | stepByOne| 是否开启逐步加载模式  | Boolean|false |true/false|
  | defaultText| 默认文本值 （只在逐步加载模式下使用） | String|"" ||
  | size| 输入框大小  | String|'small' |参考el-input的size属性|
  | disabled| 是否禁用  | Boolean|false |true/false|
  | placeholder| 提示输入文本  | String|'' |--|
  | filterTextVisibe| 树节点过滤器 （在全部加载模式下启用）| Boolean|false |true/false|
  | displaytoolBar| 启用树控件工具栏（包含清楚和刷新功能）| Boolean|false |true/false|


  **props**

   | 参数        | 说明           |类型   |默认值|可选值|
   | ------------- |:-------------:| -----:|---:|---:|
   | label| 指定节点标签为节点对象的某个属性值 | string, function(data, node)| -- |--|
   | children| 指定子树为节点对象的某个属性值 | string| -- |--|
   | disabled| 指定节点选择框是否禁用为节点对象的某个属性值 | boolean, function(data, node)| -- |--|
   | isLeaf| 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node)| -- |--|

   **方法**

   暂无

  **事件**

  | 事件        | 说明           |参数   |
  | ------------- |:-------------:| -----:|
  | getCurrentNode| 点击节点时触发 | 当前节点对象|
  | loadNodeEvent| 节点数据重载时触发（只在逐步加载模式下有效） |  node, resolve|
  | clear| 选择时间或选择时间段或者前进后退时触发 | 当前选中节点对象 |
  | reload| 选择时间或选择时间段或者前进后退时触发 | 当前选中节点对象|
  
---
