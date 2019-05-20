
  #### onlytable

  > 标签： `<yl-onlytable></yl-onlytable>` 


  **功能：**  只提供一个单据显示的表格组建

  **示例：**

:::demo

  ```html
 <template>
 <yl-onlytable 
    style="height:300px"
    :tableloading="tableloading"
    :tableData=tableData
    :configs="tableNConfig"
  >
    <template
        slot="createdAt"
        slot-scope="scope"
    > {{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
    </template>
  </yl-onlytable>

   </template>
   <script>
   import DataR from '../data/dataR.json'
   import dayjs from 'dayjs'
   export default {
     data(){
       return {
            tableloading:false,
            tableData:[]
       }
     },
     computed:{
       tableNConfig: {
            get() {
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
                            { attr: { prop: "code", label: "编码", width: 120 } },
                            { attr: { prop: "name", label: "名称", width: 160 } },
                            { attr: { prop: "model", label: "规格", width: 160  } },
                            { attr: { prop: "unit", label: "单位", width: 70 } },
                        ]},
                        { attr: { prop: "quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", scopedSlot: "createdAt" }  }
                    ]
                }
            }
        },
     },
     methods:{
       formatDate(value,format){
           return dayjs(value).format(format);
        },
        gettableData(){
            this.tableloading=true
            setTimeout(()=>{
               this.tableData = DataR
               this.tableloading = false
            },1000)
        }
     },
     mounted(){
       this.gettableData();
    }
   }
   </script>
   <style lang="css" >
   </style>
  ```
:::

**属性**

```js
 tableloading:true/false  // 数据加载遮罩层
 tableData:[  // 数据
     {}  // data项结构
 ]  
 configs：{ //table结构配置 参照例子

 } 


```



 **slot**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | 自定义| 表格列显然的插槽块 | 


---
