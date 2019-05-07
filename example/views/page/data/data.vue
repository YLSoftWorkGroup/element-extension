<template>
    <div class="data">
            <div>ylListR</div>
              <div>
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
            </div>

            <div>ylList</div>
             <div>
                <yl-list style="height:220px"
                    :listloading="listloading"
                    :listData=listData
                    :input="listParams"
                    @reload="getlistData"
                    :pagination="pagination"
                >
                   <template v-slot:default="slotProps">
                         <span>{{ slotProps.item.code }}</span>
                         <span>{{ slotProps.item.name }}</span>
                         <span>{{ slotProps.item.model }}</span>
                    </template>
                </yl-list>
            </div>
 
           

            <div>yltableR</div>
              <div>
                <yl-tabler style=""
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
            </div>

            <div>yltable</div>
              <div>
                <yl-table style="height:300px"
                    :tableloading="tableloading"
                    :configs="tableConfig"
                    :input="tableParams"
                    :pagination="pagination"
                    @reload="gettableData"
                >
                    <template
                        slot="createdAt"
                        slot-scope="scope"
                    >{{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
                    </template>
                </yl-table>
            </div>

            <div>yltableN</div>
            <div>
                <yl-tablen style="height:300px"
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
                    >{{formatDate(scope.row.created,'YYYY-MM-DD hh:mm:ss')}}
                    </template>
                </yl-tablen>
             </div>
            
    </div>
</template>
<script>
import DataR from '../../data/dataR.json'
import Data from '../../data/data.json'
import dayjs from 'dayjs'
export default {
    data(){
        return {
            listRloading:false,
            listloading:false,
           
            tableRloading:false,
            tableloading:false,
            tableNloading:false,
            listData:{},
            
            tableData:{},
            tableNData:[],
            listParams:this.paramsModel(),
            
            tableParams:this.paramsModel(),
            tableNParams:this.paramsModel(11,1),
            listDataR:[],
            tableDataR:[],
            pagination:{
                small: false,
                background: true,
                pageSize: 3,
                pageSizes: [3, 20, 50],
                // prevText:'上一页',
                // nextText:'下一页',
                layout: "sizes,prev, pager, next,  total" 
            },
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
     computed: {
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
                        { attr: { prop: "code", label: "编码", width: 120 } },
                        { attr: { prop: "name", label: "名称", width: 160 } },
                        { attr: { prop: "model", label: "规格" } },
                        { attr: { prop: "unit", label: "单位", width: 70 } },
                        { attr: { prop: "quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", width: 120,scopedSlot: "createdAt" }  }
                    ]
                }
            }
        },
        tableRConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            highlightCurrent: true,
                            lazy:true,
                            load:this.trLoad,
                            rowKey:"id"
                        }
                    },
                    columns: [
                        { attr: { prop: "code", label: "编码", width: 120 } },
                        { attr: { prop: "name", label: "名称", width: 160 } },
                        { attr: { prop: "model", label: "规格" } },
                        { attr: { prop: "unit", label: "单位", width: 70 } },
                        { attr: { prop: "quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", width: 120,scopedSlot: "createdAt" }  }
                    ]
                }
            }
        },
        tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                        data: this.tableData,
                        highlightCurrent: true
                        }
                    },
                    columns: [
                        {attr: {type: "index",label: "序号", width: 55,align: "center", headerAlign: "center"}},
                        { attr: { prop: "code", label: "编码", width: 120 } },
                        { attr: { prop: "name", label: "名称", width: 160 } },
                        { attr: { prop: "model", label: "规格" } },
                        { attr: { prop: "unit", label: "单位", width: 70 } },
                        { attr: { prop: "quantity", label: "数量", width: 100 } },
                        { attr: { prop: "created", label: "添加时间", width: 120,scopedSlot: "createdAt" }  }
                    ]
                }
            }
        }
    },
    methods:{
        trLoad(tree, treeNode, resolve){
            resolve([
               {
                "id": "4510065493811120",
                "code": "00000100300051",
                "name": "混凝土",
                "model": "C30",
                "unit": "m3",
                "rate": 0.8,
                "quantity": 23055,
                "created": "2019-03-11 11:36:20",
                "creator": "张三"
                },
                {
                "id": "451008115271257056",
                "code": "00000300100007",
                "name": "机制砂",
                "model": "C30",
                "unit": "吨",
                "rate": 0.4,
                "quantity": 233055,
                "created": "2019-03-11 11:36:20",
                "creator": "李四"
                },
                {
                "id": "45100841152757056",
                "code": "00000300100007",
                "name": "机制砂",
                "model": "C30",
                "unit": "吨",
                "rate": 0.4,
                "quantity": 233055,
                "created": "2019-03-11 11:36:20",
                "creator": "李四"
                },
                {
                "id": "451008167152757056",
                "code": "00000300100007",
                "name": "机制砂",
                "model": "C30",
                "unit": "吨",
                "rate": 0.4,
                "quantity": 233055,
                "created": "2019-03-11 11:36:20",
                "creator": "李四"
                },
                {
                "id": "45100811542757056",
                "code": "00000300100007",
                "name": "机制砂",
                "model": "C30",
                "unit": "吨",
                "rate": 0.4,
                "quantity": 233055,
                "created": "2019-03-11 11:36:20",
                "creator": "李四"
                },
             ])
        },
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
        
        getListDataR(){
             this.listDataR=DataR;
        },
        gettableDataR(){
             this.tableDataR=DataR.map((i,index)=>{
                 return i
             });
             this.tableDataR[0].hasChildren=true;
        },
        gettableData(){
            this.tableloading=true
            setTimeout(()=>{
                this.tableloading=false
                let offset=this.tableParams.offset;
                let limit=this.tableParams.limit;
                const DataSource = Data
                const data ={ rows:[],count:45};
                data.rows = offset  >= DataSource.rows.length
                ? DataSource.rows.slice(offset, DataSource.rows.length)
                : DataSource.rows.slice(offset, offset + limit)
                this.tableData = data
            },1000)
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
       this.getListDataR();
       this.getListDataN();
       this.getlistData();
       this.gettableDataR();
       this.gettableData();
       this.gettableNData();
    }
}
</script>

<style lang="postcss" scoped>

</style>
