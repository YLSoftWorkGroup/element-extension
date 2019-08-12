<template>
  <el-select 
    :value="value"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
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
    name: 'ylDataDictionaryForSel',
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'text',
          id: 'id'
        }
      }
    },
    props: {
      code: {
        required: true,
        type: String,
        default: ''
      },
      placeholder: {
        required: false,
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      value: [String, Number],
    },
    methods: {
      _clear () {
        this.$emit('clear')
      },
      _getCurrentNode (val) {
        this.$emit('input', val)
        this.$emit('getCurrentValue', val)
      },
      _getList () {
        this.$http.get('/cbaseinfo/g-data-dictionary-code/' + this.code).then(data => {
          this.data = data
        })
      }
    },
    mounted () {
      this._getList()
    },
    components: {
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped></style>
