<template>
    <yl-treeselect 
        stepByOne
        :value="value" 
        :treeData="treeData" 
        :defaultProps="defaultProps" 
        :defaultText="parentName"
        :size="size"
        :width="width"
        :disabled="disabled"
        :placeholder="placeholder"
        :defaultExpandedKeys="defaultExpandedKeys"
        :renderContent="renderContent"
        :displaytoolBar="displaytoolBar"
        @getCurrentNode="_getCurrentNode" 
        @loadNodeEvent="loadNode"
        @reload="_reload"
        @clear="_clear"
    >
    </yl-treeselect>
</template>

 <script type="text/babel">
 import treeMixn from '../../utils/tree.jsx';
export default {
    name:'ylCommontree',
    mixins: [treeMixn],
    data(){
        return{
            treeData:[],
            defaultProps: {
              children: 'children',
              label: 'name',
              id: 'id'
            },
            stepByOne:true,
            defaultExpandedKeys:[],
        }
    },
    props:{
        value:[String,Number],
        defaultText:{
            type:String,
            default:''
       },
       width: {
            type: [String, Number],
            default: "240px"
       },
       size:{
            type: String,
            default: "", 
       },
       disabled:{
            type: Boolean,
            default: false 
       },  
       placeholder:{
            type: String,
            default: "" ,
       }, 
       queryParams:{
            required: true,
            type: Object,
            default: function () {
                return {
                    path:'',
                    serviceId:'',
                    parentId:-1,
                    orgId:''
                }
            }
       },
       displaytoolBar:{
            type: Boolean,
            default: true
        },
        rootName:{
            required: true,
            type:String,
            default:'根节点'
        }  
    },
    computed:{
        parentName:function(){
            if(this.defaultText){
                let Arr = this.defaultText.split('|')
                if(Arr.length>1){
                     return Arr[Arr.length-2];
                } else {
                    return this.rootName
                }
            }else{
                 return this.rootName
            }
        }
    },
    methods:{
        _reload(node){
            //重新加载
            this._getTreeList();
        },
        _clear(){
            //清除值
            this.$emit('clear');
        },
        _getCurrentNode(selectNode){
            if(this.textOnly){ 
                this.$emit('input',selectNode.text);
                }
            else{ 
                this.$emit('input',selectNode.id);
                }
             this.$emit('getCurrentNode',selectNode);
        },
        loadNode(node, resolve) {
            if (!node.level) {
                //根节点
                this._getTreeList();
            } else {
                this._getTreeList(node.data.id, resolve);
            }
        },
        _getTreeList(val, resolve) {
            let _this = this;
            //加载根节点
            if(val===undefined){
                //首次加载...
                let rootNode={
                    id: this.queryParams.parentId,
                    name:this.rootName,
                    children:[]
                }
                this.defaultExpandedKeys=[this.queryParams.parentId];
                this.treeData=[rootNode]
            }else{
                this.$http
                .get(
                "/cbaseinfo/get-nodelist-parentid?parentId=" +
                    val +
                    "&orgId=" +
                    this.queryParams.orgId +
                    "&serviceId=" +
                    this.queryParams.serviceId +
                    "&path=" +
                    this.queryParams.path
                )
                .then(data => {
                    resolve(data);
                })
            }
        }
    },
    mounted(){  
    },
    components:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
</style>