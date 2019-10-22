<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2019-10-23 00:43:07
 -->

#### commonselect

> 标签：  `<yl-commonselect></yl-commonselect>`

**功能：**  提供可模糊查询并分页加载的下拉选择组件

**示例：**

#### 标准用法

:::demo

  ```html

   <template>
   <yl-commonselect
      v-model ="modelValue"
      width="550px"
      :defaultProps="defaultProps"
      :pageData="pageData"
      placeholder="选择材料信息"
      filterPlaceholder="按照材料名称检索"
      @getCurrentNode = "_getCurrentNode"
      @clear = "_clear"
      @reload = "_reload"
      @load = "_loadData"
   >
    <div slot="extendComs"  style="display:inline;padding-left:8px;">
        <el-button  size="mini" icon="el-icon-edit-outline" circle @click="_set"></el-button>
    </div>

   </yl-commonselect>
   </template>
   <script>
   import testData from '../data/data.json'
   export default {
     data(){
       return {
         modelValue:'',
         defaultProps:{
           label:'name',
           subLabel:'model',
           nextLabel:'unit',
           id:'id'
         },
         listParams:{
           offset:0,
           limit:10,
           draw:0
         },
         pageData:[]
       }
     },
     computed:{
       offset:{
         get(){
           return this.listParams.limit*(this.listParams.draw-1)
         }
       }
     },
     methods:{
       _set(){
         
       },
       _reload(filterKey){
          // 重刷
          this.listParams.draw = 0
          this._loadData(filterKey)
       },
       _clear(){
          // 重刷
       },
       _getCurrentNode(node){
          // 重刷
          console.log(node)
       },
       _loadData(filterKey){
         let _this = this 
         _this.listParams.draw += 1
         let DataSource = {}
         if(filterKey){
           DataSource.rows = testData.rows.filter(data => {
             if(data[_this.defaultProps.label].indexOf(filterKey)>-1){
               return data
             }
           })
         }else {
           DataSource = testData
         }
         console.log(DataSource)
         console.log(_this.offset)
          setTimeout(()=>{
            let offset=_this.offset;
            let limit=_this.listParams.limit;
            let data = [];
            data = offset >= DataSource.rows.length
            ? DataSource.rows.slice(offset, DataSource.rows.length)
            : DataSource.rows.slice(offset, offset + limit)
            this.pageData = data
          }, 1000)
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
  | width| 宽度 | String| 240px |--|
  | pageData| 每页数据 | Array|[] |--|
  | defaultProps| 配置选项  | object |具体看props配置表 |--|
  | size| 输入框大小  | String|'small' |参考el-input的size属性|
  | disabled| 是否禁用  | Boolean|false |true/false|
  | placeholder| 提示输入文本  | String|'' |--|
  | filterVisibe| 过滤器 （在全部加载模式下启用）| Boolean|true |true/false|
  | filterPlaceholder| 输入关键字过滤提示  | String|'输入关键字过滤' |--||
  | displaytoolBar| 启用树控件工具栏（包含清楚和刷新功能）| Boolean|true |true/false|
   | infiniteScroll| infiniteScroll控件配置参考示例配置| Object|{ disabled:false,  delay:200, distance:5,immediate:false} |{}|


  **props**

   | 参数        | 说明           |类型   |默认值|可选值|
   | ------------- |:-------------:| -----:|---:|---:|
   | label| 主文本属性 | string| -- |--|
   | subLabel| 副文本属性 | string| -- |--|
   | nextLabel| 副文本属性 | string| -- |--|
   | id| value值 |string,number| -- |--|


  **事件**

  | 事件        | 说明           |参数   |
  | ------------- |:-------------:| -----:|
  | load| 单次获取数据方法 | 过滤关键值|
  | getCurrentNode| 点击节点时触发 | 当前节点对象|
  | clear| 清除事件 | 当前选中节点对象 |
  | reload| 重载事件 | 事件对象，过滤关键值|
  
   **插槽**

   | 名称        | 说明             |
  | ------------- |:-------------:|
  | extendComs| 工具栏扩展 | 
---
