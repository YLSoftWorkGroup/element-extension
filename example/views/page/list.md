
  #### list

  > 标签： `<yl-list></yl-list>` 


  **功能：**  提供上一页/下一页翻页方式的数据呈现组件

  **示例：**
:::demo
  ```html
   <template> 

     <yl-list style="height:220px"
        :listloading="listloading"
        :input="listParams"
        :listData=listData
        @reload="getlistData"
        :pagination="pagination"
    >
        <template v-slot:default="slotProps">
              <span>{{ slotProps.item.code }}</span>
              <span>{{ slotProps.item.name }}</span>
              <span>{{ slotProps.item.model }}</span>
        </template>
    </yl-list>

   </template>
   <script>
   import Data from '../data/data.json'
   export default {
     data(){
       return {
            listloading:false,
            listData:{},
            listParams:this.paramsModel(),
            pagination:{
                 small: false,  
                 background: true,
                 pageSize: 10,
                 pageSizes: [10, 20, 50],
                 layout: "sizes,prev, pager, next,  total" 
            }
       }
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
        getlistData(){
            this.listloading=true
            setTimeout(()=>{
                this.listloading=false
                let offset=this.listParams.offset;
                let limit=this.listParams.limit;
                const DataSource = Data
                const data ={ rows:[],count:Data.count};
                data.rows = offset >= DataSource.rows.length
                ? DataSource.rows.slice(offset, DataSource.rows.length)
                : DataSource.rows.slice(offset, offset + limit)
                this.listData = data
            },1000)
            
        },
     },
     mounted(){
       this.getlistData();
    }
   }
   </script>
   <style lang="css" >
   .list_warpper{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .item_warpper{
      width:300px;
      height:180px;
      padding:10px;
      margin:15px;
      border: 1px solid #ddd;
    }
    </style>

  ```
:::

**属性**

```js
 listloading:true/false  // 数据加载遮罩层
 listData:[  // 数据
     {}  // data项结构
 ]    
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
  | default| 定制列表项的展现方式插槽 | 


---
