
  #### listn

  > 标签： `<yl-listn></yl-listn>` 


  **功能：**  提供上一页/下一页翻页方式的数据呈现组件

  **示例：**
:::demo
  ```html
   <template> 

    <yl-listn style="height:400px"
        :listloading="listNloading"
        :listData=listNData
        :input="listNParams"
        :pagination="listNpagination"
        wrapClass="list_warpper"
        itemWrapClass="item_warpper"
        @reload="getListDataN"
    >
    <template v-slot:default="slotProps">
            <p>{{ slotProps.item.code }}</p>
            <p>{{ slotProps.item.name }}</p>
            <p>{{ slotProps.item.model }}</p>
    </template>
    </yl-listn>

   </template>
   <script>
   import DataR from '../data/dataR.json'
   export default {
     data(){
       return {
            listNloading:false,
            listNData:[],
            listNParams:this.paramsModel(11,1),
            listNpagination:{
                small: false,
                background: true,
                pageSize: 11,
                prevText:'上一页',
                nextText:'下一页',
                layout: "prev, next" 
            }
       }
     },
     methods:{
        paramsModel (limit = 10, draw = 1, order = [], condtionItems = []) {
                return {
                    limit: limit,
                    draw: draw,
                    offset: limit * (draw - 1),
                    order: order,
                    condtionItems: condtionItems
                }
            },
        getListDataN(){
            this.listNloading=true
            setTimeout(()=>{
                this.listNloading=false
                let offset=this.listNParams.offset;
                let limit=this.listNParams.limit;
                const DataSource = DataR
                let data =[];
                data = offset >= DataSource.length
                ? DataSource.slice(offset, DataSource.length)
                : DataSource.slice(offset, offset + limit)
                this.listNData = data
            },1000)
        },
     },
     mounted(){
       this.getListDataN();
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

::: warning
*注意* `list`、`listn`、`table`、`tablen`等组件在过滤器控件或查询按钮查询时要注意重置分页参数,以防止重新查询后数据分页错乱问题。
:::


**属性**

```js
 wrapClass: "wrap-class" // 内容块外层类名称
 itemWrapClass: "item-wrap-class" // 内容块内层类名称
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
