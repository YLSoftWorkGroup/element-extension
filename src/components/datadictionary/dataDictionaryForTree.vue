<template>
    <yl-treeselect 
    :value='value' 
    :treedata="treedata" 
    :textOnly="textOnly"
    :defaultProps="defaultProps" 
    :isexpand="isexpand"
    :size="size"
    :readonly="readonly"
    :disabled="propsData.disabled"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :nodeStateConf="nodeStateConf"
    :displaytoolBar="displaytoolBar"
    :filterTextVisibe="filterVisibe"
    @getCurrentNode="_getCurrentNode"
    @reload="_reload"
    @clear="_clear">
    </yl-treeselect>
</template>





<script type="text/babel">
import treeselect from '../treeselect/treeselect'
export default {
    name: 'ylComDataDictionary',
    components: {
      'yl-treeselect': treeselect
    },


<script type="text/babel">
import treeselect from '../treeselect/treeselect'
export default {
    name: 'YlDataDictionaryForTree',
    componentName: 'YlDataDictionaryForTree',
    data(){ 
        return{
            treedata:[
                {
                    "id": 536618993086976,
                    "name": "吨",
                    "code": "Ton"
                },
                {
                    "id": 536619111953408,
                    "name": "千克",
                    "code": "Kilogram"
                },
                {
                    "id": 536620111761408,
                    "name": "方",
                    "code": "001"
                }
            ],
            defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
            },
            propsData:{
                disabled:this.disabled,
            },
            currentValue:this.value
        }
    },
    props:{
        code:{
			required: true,
            type: String,
            default:''
			},
        placeholder:{
			required: false,
            type: String,        
            default:''
			},
       size:{
            type: String,
            default: "", 
            },
       disabled:{
            type: Boolean,
            default: false 
            }, 
        clearable:{
            type: Boolean,
            default: false 
            }, 
        value:[String,Number],
        validateEvent: {
                        type: Boolean,
                        default: true
                       },
    },
    methods:{
        _clear(){
             this.$emit('clear');
        },
        _getCurrentNode(val){
            debugger
          
            this.$emit('input',val);
            this.$emit('getCurrentvalue',val);
        },
        _getTreeList(){
           this.$http.get( '/cbaseinfo/g-data-dictionary-code' + this.code) .then(data => {
                    resolve(data);
                })
            },
         _setCurrentValue(value) {
                if (value === this.currentValue)return;
                    this.currentValue = value;
                if (this.validateEvent) {
                    this.dispatch('ElFormItem', 'el.form.change', [value]);
                }
            }
    },
    mounted(){
         this._getTreeList();
    },
    components:{

    },
    watch:{
        value:function(val, oldVal){
            this._setCurrentValue(val);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
