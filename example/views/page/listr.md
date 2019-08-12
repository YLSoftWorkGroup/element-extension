
  #### listr

  > 标签： `<yl-listr></yl-listr>` 


  **功能：**  获取全部数据后再分页控件

  **示例：**
:::demo
  ```html
   <template> 

     <yl-listr style="height:220px"
          :listloading="listRloading"
          :listData=listDataR
          :pagination="pagination"
      >
          <template v-slot:default="slotProps">
                <span>{{ slotProps.item.code }}</span>
                <span>{{ slotProps.item.name }}</span>
                <span>{{ slotProps.item.model }}</span>
          </template>
      </yl-listr>

   </template>
   <script>
   import DataR from '../data/dataR.json'
   export default {
     data(){
       return {
            listRloading:false,
            listDataR:[],
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
        paramsModel (limit = 10, draw = 1, order = [], condtionItems = []) {
                return {
                    limit: limit,
                    draw: draw,
                    offset: limit * (draw - 1),
                    order: order,
                    condtionItems: condtionItems
                }
            },
        getListDataR(){
             this.listDataR=DataR;
        }
     },
     mounted(){
       this.getListDataR();
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
