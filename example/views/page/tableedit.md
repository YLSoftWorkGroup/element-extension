
  #### tableedit

  > 标签： `<yl-tableedit></yl-tableedit>` 


  **功能：**  

  **示例：**
:::demo

  ```html
   <template>
     <yl-tableedit  
      ref="tableEdit"
      :config="tableConfig"
      :mapConfig="mapConfig"
      :sumRowConf="sumRowConf"
      :addRows="addRows"
      style="height:300px">
       <div slq>

       </div>
        <template
            slot="createdAt"
            slot-scope="scope"
        > {{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
        </template>
     </yl-tableedit>
     <div style="padding:10px">
       <el-button size="small" type="primary" @click="_addRows">添加</el-button>
       <el-button size="small" @click="_clear">重置</el-button>
      </div>
   </template>
   <script>
   import dayjs from 'dayjs'
   export default { 
     data(){
       return {
         addRows:{}
       }
     },
     computed:{
       tableConfig:{
         get(){
           return {
              table: {
                      attr: {
                          highlightCurrent: true
                      }
                    },
                    columns: [
                        { attr: {type: "index",label: "序号", width: 55,align: "center", headerAlign: "center"}},
                        { isParent:true, 
                          attr: { label: "基本信息", headerAlign: "center" },
                          items:[
                            { attr: { prop: "t_code", label: "编码", width: 120 } },
                            { attr: { prop: "t_name", label: "名称", width: 160 } },
                            { attr: { prop: "t_model", label: "规格", width: 160  } },
                            { attr: { prop: "t_unit", label: "单位", width: 70 } },
                          ]
                        },
                        { attr: { prop: "t_quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", scopedSlot: "createdAt"  }  },
                        { attr: { prop: "creator", label: "添加人",  }  },
                    ]
           }
         }
       },
       mapConfig:{
         get(){
           return {
             dataSource1:[
                {
                  prop: 'id',
                  isReplace: false,
                  defaultval: '0',
                  selprop: ''
                },
                {
                  prop: 't_code',
                  isReplace: true,
                  defaultVal: '',
                  selprop: 'code',
                },
                {
                  prop: 't_name',
                  isReplace: true,
                  defaultVal: '',
                  selprop: 'name',
                },
                {
                  prop: 't_model',
                  isReplace: true,
                  defaultVal: '',
                  selprop: 'model',
                },
                 {
                  prop: 't_unit',
                  isReplace: true,
                  defaultVal: '',
                  selprop: 'unit',
                },
                 {
                  prop: 't_quantity',
                  isReplace: true,
                  defaultVal: '',
                  selprop: 'quantity',
                },
                {
                  prop: 'created',
                  isReplace: false,
                  defaultVal: (new Date()).toString(),
                  selprop: '',
                  // eventConf: {
                  //         isOn: true,
                  //         calculate: function(model){
                  //           return new Date()
                  //         }
                  // }
                },
                 {
                  prop: 'creator',
                  isReplace: false,
                  defaultVal: 'mlc',
                  selprop: '',
                },
             ]
           }
         }
       },
       sumRowConf:{
         get(){
           return {
              disable: true,
              sumText: "合计",
              items: {
                planQuantity: {
                  text: "数量合计",
                  sumval: 0,
                  capitalCol: false,
                  },
                lossQuantity: {
                  text: "损耗量合计",
                  sumval: 0,
                  capitalCol: false
                },
                responseSum: {
                  text: "金额合计",
                  sumval: 0,
                  capitalCol: true
                }
              },
              eventConf: {
                  isOn: true,
                  sum: function(_this,option){
                    option.items.lossQuantity=9999.999
                  }
              }
           }
         }
       }
     },
     methods:{
       _clear(){
         this.$refs.tableEdit.resetTableEdit()
       },
       _addRows(){
         this.addRows = {
              dataType :'dataSource1',
              rows:[
                {
                  id: "451006549381120",
                  code: "00000100300051",
                  name: "混凝土",
                  model: "C30",
                  unit: "m3",
                  rate: 0.8,
                  quantity: 23055,
                  created: "2019-03-11 11:36:20",
                  creator: "张三"
                },
                {
                  id: "451008115757056",
                  code: "00000300100007",
                  name: "机制砂",
                  model: "C30",
                  unit: "吨",
                  rate: 0.4,
                  quantity: 233055,
                  created: "2019-03-11 11:36:20",
                  creator: "李四"
                },
                {
                  id: "451151386513408",
                  code: "00000100300051",
                  name: "普通硅酸盐水泥",
                  model: "C30",
                  unit: "吨",
                  rate: 0.5,
                  quantity: 25,
                  created: "2019-03-11 11:36:20",
                  creator: "王五"
                },
            ]
         }
       }
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::

映射数据配置
  ```js

  ```
合计行配置
  ```js

  ```

  **属性**

  | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | tableConfig| 表格配置 | Object| 参照table表格配置 |--|
  | mapConfig| 映射数据配置 | Object| 参照本组件映射配置|--|
  | sumRowConf| 合计行配置 | Object|参照本组件合计行配置 |--|
  | addRowCount| 编辑条目总数 | Number|20 |--|
  | notRepeatFiled| 去重属性名 | String|'' |--|

 **slot**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | default| 表格列渲染 | 

 **方法**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | getEditData| 获取表格数据 | 

---
