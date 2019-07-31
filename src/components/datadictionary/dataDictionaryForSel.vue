<template>
    <el-select v-model="currentValue" 
               :placeholder="placeholder" 
               :size="size"
               :disabled="propsData.disabled"
               :clearable="clearable"
               @change='_getCurrentNode'  
               @clear="_clear"
               style="width:100%">
        <el-option
            v-for="(item,index) in data"
            :key="index"
            :label="item.name"
            :value="item.name">
        </el-option>
    </el-select>
</template>

<script type="text/babel">
export default {
    name: 'YlDataDictionaryForSel',
    data(){ 
        return{
            data:[],
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
            this.$emit('input',val);
            this.$emit('getCurrentvalue',val);
        },
        _getTreeList(){
           this.$http.get( '/cbaseinfo/g-data-dictionary-code/' + this.code) .then(data => {
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
