
  #### tabler

  > 标签： `<yl-tabler></yl-tabler>` 


  **功能：**  提供上一页/下一页翻页方式的数据表格呈现组件

  **示例：**
:::demo
  ```html

   <template>

 <yl-tabler style="height:400px"
      :tableloading="tableloading"
      :tableData=tableData
      :configs="tableConfig"
      @reload="gettableNData"
  >
      <template
          slot="createdAt"
          slot-scope="scope"
      > {{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
      </template>
  </yl-tabler>

   </template>
   <script>
   import DataR from '../data/dataR.json'
   import dayjs from 'dayjs'
   export default {
     data(){
       return {
            tableloading:false,
            tableData:[],
       }
     },
     computed:{
       tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            highlightCurrent: true
                        }
                    },
                    columns: [
                        { attr: { type: "index",label: "序号", width: 55, align: "center", headerAlign: "center"}},
                        { isParent:true, 
                          attr: { label: "基本信息", headerAlign: "center" },
                          items: [
                                    { attr: { prop: "code", label: "编码", width: 120 } },
                                    { attr: { prop: "name", label: "名称", width: 160 } },
                                    { attr: { prop: "model", label: "规格" } },
                                    { attr: { prop: "unit", label: "单位", width: 70 } }
                            ]
                        },
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
        gettableNData(){
            this.tableloading=true
            setTimeout(()=>{
                this.tableloading=false
                this.tableData = DataR
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

**属性**

```js
 tableloading:true/false  // 数据加载遮罩层
 tableData:[  // 数据
     {}  // data项结构
 ]  
 configs：{ //table结构配置 参照例子

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

