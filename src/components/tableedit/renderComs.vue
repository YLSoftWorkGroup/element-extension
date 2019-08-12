<template>
  <el-input
    v-if="option.type==='inputNum'"
    v-model.number="model[option.name]"
    type="number"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :readonly="option.elmentConfig.readonly"
    @blur="_blur(model[option.name])"
    @mousewheel.native="_preventmousewheel" />
  <el-input
    v-else-if="option.type==='inputText'"
    v-model.trim="model[option.name]"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :readonly="option.elmentConfig.readonly"
    @blur="_blur(model[option.name])" />
  <el-checkbox
    v-else-if="option.type==='checkbox'"
    v-model="model[option.name]"
    :disabled="option.elmentConfig.disabled"
    @change="_change()">
    {{ option.elmentConfig.label }}
  </el-checkbox>
  <el-date-picker
    v-else-if="option.type==='datePicker'"
    v-model="model[option.name]"
    :type="option.elmentConfig.type"
    :size="option.elmentConfig.size"
    :placeholder="option.elmentConfig.placeholder"
    :format="option.elmentConfig.format"
    :align="option.elmentConfig.align"
    :default-value="option.elmentConfig.defaultValue"
    :disabled="option.elmentConfig.disabled"
    :editable="option.elmentConfig.editable"
    :clearable="option.elmentConfig.clearable"
    style="width:100%"
    @change="_change" />
  <el-select
    v-else-if="option.type==='select'"
    v-model="model[option.name]"
    :size="option.elmentConfig.size"
    :placeholder="option.elmentConfig.placeholder"
    :disabled="option.elmentConfig.disabled"
    :clearable="option.elmentConfig.clearable"
    @change="_change">
    <el-option
      v-for="item in option.elmentConfig.data"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
  <span
    v-else-if="option.type==='span'"
    v-html="this.format" />
  <dataDictionaryForSel
    v-else-if="option.type==='dataDictionaryForSel'"
    v-model="model[option.name]"
    :code="option.elmentConfig.code"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    style="width:100%"
    @getCurrentValue="_change" />
  <dataDictionaryForTree
    v-else-if="option.type==='dataDictionaryForTree'"
    v-model="model[option.name]"
    :code="option.elmentConfig.code"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :width="option.elmentConfig.width"
    @getCurrentValue="_change" />
  <comDataDictionary
    v-else-if="option.type==='comDataDictionary'"
    v-model="model[option.name]"
    :code="option.elmentConfig.code"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :width="option.elmentConfig.width"
    :root-name="option.elmentConfig.rootName"
    :org-id="option.elmentConfig.orgId"
    @getCurrentNode="_change" />
</template>
<script>
  import dataDictionaryForSel from '../datadictionary/dataDictionaryForSel.vue'
  import dataDictionaryForTree from '../datadictionary/dataDictionaryForTree.vue'
  import comDataDictionary from '../comdatadictionary/comDataDictionary.vue'
  export default {
    components: {
      dataDictionaryForSel,
      dataDictionaryForTree,
      comDataDictionary
    },
    props: {
      option: {
        type: Object,
        require: true,
        default: function () {
          return {}
        }
      },
      model: {
        type: Object,
        require: false,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      format: {
        get () {
          if (this.option.eventConf.isOn) {
            const _this = this
            return this.option.eventConf.format(this.option, this.model, _this)
          } else {
            return ''
          }
        }
      }
    },
    beforeMount () {
      this._initComs()
    },
    methods: {
      _preventmousewheel (event) {
        event.preventDefault()
      },
      _change (node) {
        const _this = this
        if (this.option.eventConf && this.option.eventConf.isOn) {
          if (this.option.eventConf.change) {
            this.option.eventConf.change(node, this.option, this.model, _this)
          }
        }
      },
      _blur (node) {
        const _this = this
        if (this.option.eventConf && this.option.eventConf.isOn) {
          if (this.option.eventConf.blur !== undefined) {
            this.option.eventConf.blur(node, this.option, this.model, _this)
            // 是否触发合计计算
            if (this.option.eventConf.isSum) {
              this.$emit('sumCount')
            }
          }
        }
      },
      _initComs () {
        const _this = this
        if (this.option.eventConf && this.option.eventConf.isOn) {
          if (this.option.eventConf.init !== undefined) {
            this.option.eventConf.init(this.option, this.model, _this)
          }
        }
      }
    }
  }
</script>
