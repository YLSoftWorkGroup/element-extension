
  #### tablen

  > 标签： `<yl-tablen></yl-tablen>` 


  **功能：**  提供上一页/下一页翻页方式的数据表格呈现组件

  **示例：**
:::demo
  ```html

   <template>

 <yl-tablen style="height:200px"
      :tableloading="tableNloading"
      :tableData=tableNData
      :configs="tableNConfig"
      :input="tableNParams"
      :pagination="tableNpagination"
      @reload="gettableNData"
  >
      <template
          slot="createdAt"
          slot-scope="scope"
      > {{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
      </template>
  </yl-tablen>

   </template>
   <script>
   import DataR from '../data/dataR.json'
   import dayjs from 'dayjs'
   export default {
     data(){
       return {
            tableNloading:false,
            tableNData:[],
            tableNParams:this.paramsModel(11,1),
            tableNpagination:{
                small: false,
                background: true,
                pageSize: 11,
                prevText:'上一页',
                nextText:'下一页',
                layout: "prev, next" 
            }
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
                        { attr: { type: "index",label: "序号", width: 55, align: "center", headerAlign: "center"}},
                        { attr: { prop: "code", label: "编码", width: 120 } },
                        { attr: { prop: "name", label: "名称", width: 160 , className: "column-style"} },
                        { attr: { prop: "model", label: "规格" } },
                        { attr: { prop: "unit", label: "单位", width: 70 } },
                        { attr: { prop: "quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", width: 120,scopedSlot: "createdAt" }  }
                    ]
                }
            }
        },
     },
     methods:{
       formatDate(value,format){
           return dayjs(value).format(format);
        },
        paramsModel (limit = 10, draw = 1, order = [], condtionItems = []) {
                return {
                    limit: limit,
                    draw: draw,
                    offset: limit * (draw - 1),
                    order: order,
                    condtionItems: condtionItems
                }
            },
        gettableNData(){
            this.tableNloading=true
            setTimeout(()=>{
                this.tableNloading=false
                let offset=this.tableNParams.offset;
                let limit=this.tableNParams.limit;
                const DataSource = DataR
                let data =[];
                data = offset  >= DataSource.length
                ? DataSource.slice(offset, DataSource.length)
                : DataSource.slice(offset, offset + limit)
                this.tableNData = data
            },1000)
        }
     },
     mounted(){
       this.gettableNData();
    }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::

::: warning
*注意* `list`、`listn`、`table`、`tablen`等组件在过滤器控件或查询按钮查询时要注意重置分页参数,以防止重新查询后数据分页错乱问题。
:::


**属性**

```js
 tableloading:true/false  // 数据加载遮罩层
 tableData:[  // 数据
     {}  // data项结构
 ]  
 configs：{ //table结构配置 参照例子

 } 

pagination:{  // 数据分页对象
    small: false, 
    background: true,
    pageSize: 11,  //决定翻页条目数
    prevText:'上一页',
    nextText:'下一页',
    layout: "prev, next" 
 } 

input:{ //分页参数 
    limit: limit,
    draw: draw,
    offset: limit * (draw - 1),
    order: order,
    condtionItems: condtionItems
}

```



 **事件**

| 事件        | 说明           |参数   |
| ------------- |:-------------:| -----:|
| reload| 数据重载事件 | --|


 **slot**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | 自定义| 表格列显然的插槽块 | 


---

