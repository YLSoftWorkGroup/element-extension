
  #### tabler

  > 标签： `<yl-tabler></yl-tabler>` 


  **功能：**  提供获取全部数据后分页的数据展示控件

  **示例：**
:::demo
  ```html

   <template>

 <yl-tabler
    :tableloading="tableRloading"
    :tableData=tableDataR
    :configs="tableRConfig"
    :pagination="pagination"
>
    <template
        slot="createdAt"
        slot-scope="scope"
    >{{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
    </template>
</yl-tabler>
   </template>
   
   <script>
   import DataR from '../data/dataR.json'
   import dayjs from 'dayjs'
   export default {
     data(){
       return {
            tableRloading:false,
            tableDataR:[],
            pagination:{
                 small: false,
                 background: true,
                 pageSize: 10,
                 pageSizes: [10, 20, 50],
                 layout: "sizes,prev, pager, next,  total" 
            }
       }
     },
     computed:{
         tableRConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            highlightCurrent: true,
                        }
                    },
                    columns: [
                        { attr: { prop: "code", label: "编码", width: 120 } },
                        { attr: { prop: "name", label: "名称", width: 160 } },
                        { attr: { prop: "model", label: "规格" } },
                        { attr: { prop: "unit", label: "单位", width: 70 } },
                        { attr: { prop: "quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", width: 120,scopedSlot: "createdAt" }}
                    ]
                }
            }
        }
     },
     methods:{
       formatDate(value,format){
           return dayjs(value).format(format);
        },
        gettableDataR(){
            this.tableDataR=DataR;
        },
     },
     mounted(){
       this.gettableDataR();
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
