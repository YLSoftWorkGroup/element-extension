
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
      style="height:300px"
      @delItem="_delItem"
      @sumCount="_sumCount">
     </yl-tableedit>
     <div style="padding:10px">
       <el-button size="small" type="primary" @click="_addRows">添加</el-button>
       <el-button size="small" type="primary" @click="_getData">获取数据</el-button>
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
                { isParent:true, 
                  attr: { label: "金额", headerAlign: "center" },
                  items:[
                    { attr: { prop: "t_quantity", label: "数量", width: 150 ,scopedSlot:'t_quantity'} },
                    { attr: { prop: "t_price", label: "单价", width: 150 ,scopedSlot:'t_price'} },
                    { attr: { prop: "t_sumJE", label: "金额", width: 120 ,scopedSlot:'t_sumJE'} },
                  ]
                },
                { attr: { prop: "created", label: "添加时间", "width": 120, }  },
                { attr: { prop: "creator", label: "添加人",  "width": 120, }  },
                { "attr": { "prop": "id", fixed: "right" ,"label": "操作", "width": 65, align: "center", headerAlign: "center", "scopedSlot": "id" } },
            ],
            soltConf: [ 
                        {
                          type:'inputNum',
                          name: "t_quantity",
                          elmentConfig: {
                            type: "text",
                            size: "small",
                            disabled: false
                          },
                          eventConf: {
                            isOn: true,
                            isSum:true, 
                            init: function(option,row){
                            },
                            blur:function(node,option,row){
                              row.t_sumJE=row.t_price*row.t_quantity
                            }
                          }
                        },
                        {
                          type:'inputNum',
                          name: "t_price",
                          elmentConfig: {
                            type: "text",
                            size: "small",
                            disabled: false
                          },
                          eventConf: {
                            isOn: true,
                            isSum:true, 
                            init: function(option,row){
                            },
                            blur:function(node,option,row){
                              row.t_sumJE=row.t_price*row.t_quantity
                            }
                          }
                        },
                    ]
           }
         }
       },
       mapConfig:{
         get(){
           return {
             dataSource1: [
                {
                  prop: 'id',
                  isReplace: false,
                  defaultVal: '0',
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
                  prop: 't_price',
                  isReplace: true,
                  defaultVal: 0,
                  selprop: 'price',
                },
                 {
                  prop: 't_sumJE',
                  isReplace: true,
                  defaultVal: 0,
                  selprop: '',
                  eventConf: {
                      isOn: true,
                      calculate: function(model){
                        return model.price*model.quantity
                      }
                  }
                },
                {
                  prop: 'created',
                  isReplace: false,
                  defaultVal: (new Date()).toString(),
                  selprop: '',
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
              disable: false,
              sumText: "合计",
              items: {
                t_quantity: {
                  text: "数量合计",
                  sumval: 0,
                  },
                t_sumJE: {
                  text: "金额合计",
                  sumval: 0,
                  capitalCol: true,
                  },
              },
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
                  price: 102,
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
                  price: 12,
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
                  price: 132,
                  created: "2019-03-11 11:36:20",
                  creator: "王五"
                },
            ]
          }
         },
         _delItem (rows) {
           console.log(rows)
         },
         _getData(){
           console.log(this.$refs.tableEdit.getEditData())
         },
         _sumCount(data){
           // 合计事件
             let quantity = 0.00,
            sumJE = 0.00;
            data.map(function (item) {
              quantity = quantity + parseFloat(item.t_quantity);
              sumJE = sumJE + parseFloat(item.t_sumJE);
            });
            this.sumRowConf.items.t_quantity.sumval = quantity;
            this.sumRowConf.items.t_sumJE.sumval = sumJE;
         }
       
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::

config配置

:::tip
`config`配置项包含`table`配置、`column`配置、`slotConf`配置、 前两项配置参照表格配置，重点介绍`slotConf`配置
:::

```js
 tableConfig:{
         get(){
           return {
            table: {
                    // table全局配置 参照table配置 
                   },
            columns: [
                // table列配置 参照table配置
            ],
            soltConf: [  //列渲染配置
                        {
                          type:'inputNum', //选用控件类型  （支持控件参考支持列表）
                          name: "t_quantity", //对应属性名
                          elmentConfig: {  // 对应控件属性配置
                            type: "text",  
                            size: "small",
                            disabled: false
                          },   
                          eventConf: {
                            isOn: true, //是否开启事件
                            isSum:false,  
                            init: function(option,row){  //初始化事件
                              console.log(option)
                              console.log(row)
                            },
                            blur:function(node,option,row){ // 控件对应事件
                              row.t_sumJE=row.t_price*row.t_quantity
                            }
                          }
                        },
                    ]
           }
         }
       },
```
列渲染支持的控件及属性

```js
  // number类型输入控件
  {
    type:'inputNum', //选用控件类型  
    name: "t_quantity", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      type: "text",  
      size: "small",
      disabled: false
    },   
    eventConf: {
      isOn: true, //是否开启事件
      isSum:false,  //是否触发合计计算
      init: function(option,row){  //初始化事件
      },
      blur:function(node,option,row){ // 控件对应事件
      }
    }
  },
  // 文本类型输入控件
  {
    type:'inputText', //选用控件类型  
    name: "t_quantity", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      type: "text",  
      size: "small",
      disabled: false
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      blur:function(node,option,row){ // 控件对应事件
      }
    }
  },
  // 选择框控件
  {
    type:'checkbox', //选用控件类型 
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      label: "禁用",
      disabled: false
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      change:function(node,option,row){ // 控件对应事件
      }
    }
  },
  // 日期控件
  {
    type:'datePicker', //选用控件类型  
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      type: "",
      size: "",
      placeholder: "",
      format: "",
      align: "",
      default: "",
      disabled: false,
      editable: false,
      clearable: false,
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      change:function(node,option,row){ // 控件对应事件
      }
    }
  },
  // 选择控件
  {
    type:'select', //选用控件类型  
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      type: "",
      size: "",
      placeholder: "",
      disabled: false,
      clearable: false,
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      change:function(node,option,row){ // 控件对应事件
      }
    }
  },
  // span控件
  {
    type:'span', //选用控件类型 
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      format: "", //html内容块
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
    }
  },
  // 平行字典控件
  {
    type:'dataDictionaryForSel', //选用控件类型  
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      code: "",
      size: "",
      placeholder: "",
      disabled: false,
      clearable: false,
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      getCurrentValue:function(node,option,row){ // 控件对应事件
      }
    }
   },
   // 树结构字典树控件
  {
    type:'dataDictionaryForTree', //选用控件类型  
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      code: "",
      size: "",
      placeholder: "",
      disabled: false,
      clearable: false,
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      getCurrentValue:function(node,option,row){ // 控件对应事件
      }
    }
   },
   // 单位字典库控件
  {
    type:'comDataDictionary', //选用控件类型  
    name: "attrName", //对应属性名
    elmentConfig: {  // 对应控件属性配置
      code: "",
      size: "",
      placeholder: "",
      disabled: false,
      width: "",
      rootName: "",
      orgId: "",
    },   
    eventConf: {
      isOn: true, //是否开启事件
      init: function(option,row){  //初始化事件
      },
      getCurrentNode:function(node,option,row){ // 控件对应事件
      }
    }
   },
```

映射数据配置

:::tip
  映射数据有可能有好几个数据源，所以每个数据源具有一套映射配置，你应该为每一个数据源起一个名字,通常我们把`mapconf`配置在`computed`中
:::
  ```js

  mapConfig:{
         get(){
           return {
             dataSource1: [
                {
                  prop: 'id',
                  isReplace: false,
                  defaultVal: 0,  // 一般主键列的配置默认值为0
                  selprop: ''
                },
                 {
                  prop: 't_quantity',  //表格配置列名
                  isReplace: true,  // 是否从数据源替换
                  defaultVal: '',  //默认值
                  selprop: 'quantity', //数据源列
                },
                {
                  prop: 'created',
                  isReplace: false,
                  defaultVal: (new Date()).toString(),
                  selprop: '',
                  eventConf: {  // 配置列间计算
                          isOn: true,
                          calculate: function(model){ 
                            //此处写列之间计算 注意：如果是计算请使用decimal.js函数计算  计算列的isreplace必须为true
                            return model.created+'ssss'
                          }
                  }
                },
             ],
            dataSource2: [
                // 数据源2配置
            ]
           }
         }
       },

  ```

合计行配置

:::tip
 当编辑表格中有列合计计算需求时，你可以尝试配置合计行来辅助编辑框计算。通常我们把`sumRowConf`配置在`computed`中
:::

  ```js
sumRowConf:{
         get(){
           return {
              disable: false, //是否启用合计列
              sumText: "合计",
              items: {
                t_quantity: {
                  text: "数量合计", 
                  sumval: 0,
                  capitalCol: true, //改合计项是否大写  （只能有一个项大写）
                  },
                t_sumJE: {
                  text: "金额合计",
                  sumval: 0,
                  capitalCol: true,
                  },
              },
           }
         }
   
   注意：合计计算逻辑在`sumCount`事件中实现


  ```

  **属性**

  | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | config| 表格配置 | Object| 参照table表格配置 |--|
  | mapConfig| 映射数据配置 | Object| 参照本组件映射配置|--|
  | sumRowConf| 合计行配置 | Object|参照本组件合计行配置 |--|
  | addRowCount| 编辑条目总数 | Number|20 |--|
  | notRepeatFiled| 去重属性名 | String|'' |--|


 **方法**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | getEditData| 获取表格数据 | 
  | resetTableEdit| 清除表格数据 |

 **事件**
   
  | 名称        | 说明             | 参数 |
  | ------------- |:-------------:|--------:|
  | delItem| 点击删除明细时触发 | row  行对象|
  | sumCount| 触发合计 | table数据|

---
