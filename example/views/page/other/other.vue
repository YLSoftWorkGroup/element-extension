<template>
    <div class="other">
            <yl-tabler style="height:300px"
                    :tableloading="tableRloading"
                    :tableData=tableDataR
                    :configs="tableRConfig"
                    :pagination="pagination"
                >
            </yl-tabler>                            
    </div>
</template>
<script>
export default {
    data(){
        return {
                pagination:{
                    small: false,
                    background: true,
                    pageSize: 3,
                    pageSizes: [3, 20, 50],
                    prevText:'上一页',
                    nextText:'下一页',
                    layout: "sizes,prev, pager, next,  total" 
                },
               tableRloading:false,
               tableDataR: []
        }
    },
    computed:{
        tableRConfig: {
                    get() {
                        return {
                            table: {
                                attr: {
                                    highlightCurrent: true,
                                    rowKey:"id",
                                    lazy:true,
                                    load:this.load
                                }
                            },
                            columns: [
                                { attr: { prop: "date", label: "日期", width: 120 } },
                                { attr: { prop: "name", label: "名称", width: 160 } },
                                { attr: { prop: "address", label: "地址" }  }
                            ]
                        }
                    }
                },
    },
    methods:{
        load(tree, treeNode, resolve) {
            resolve([
            {
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }
            ])
      }
    },
    mounted(){
        this.tableDataR=[{
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    hasChildren: true
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    hasChildren: true
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                id: 4,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }]
    }
}
</script>

<style lang="postcss" scoped>

</style>
