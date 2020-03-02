<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-03-02 23:42:27
 -->
<template>
  <el-input-number
    v-if="option.type==='inputNum'"
    v-model.number="model[option.name]"
    style="width:100%"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :min="option.elmentConfig.min"
    :max="option.elmentConfig.max"
    :step="option.elmentConfig.step"
    :precision="option.elmentConfig.precision"
    :controls="false"
    @blur="_blur(model[option.name])" />
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
  <el-button
    v-else-if="option.type==='button'"
    :size="option.elmentConfig.size"
    :type="option.elmentConfig.type"
    :plain="option.elmentConfig.plain"
    :round="option.elmentConfig.round"
    :disabled="option.elmentConfig.disabled"
    :icon="option.elmentConfig.icon"
    @click="_change"
  />
  <span
    v-else-if="option.type==='span'"
    v-html="this.format"
  />
  <yl-dictionary-select
    v-else-if="option.type==='ylDictionarySelect'"
    v-model="model[option.name]"
    :code="option.elmentConfig.code"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    @getCurrentValue="_change" />
  <yl-dictionary-tree
    v-else-if="option.type==='ylDictionaryTree'"
    v-model="model[option.name]"
    :code="option.elmentConfig.code"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :width="option.elmentConfig.width"
    :default-text="option.elmentConfig.defaultText"
    @getCurrentValue="_change" />
  <yl-unit-dictionary-tree
    v-else-if="option.type==='ylUnitDictionaryTree'"
    v-model="model[option.name]"
    :code="option.elmentConfig.code"
    :size="option.elmentConfig.size"
    :disabled="option.elmentConfig.disabled"
    :placeholder="option.elmentConfig.placeholder"
    :width="option.elmentConfig.width"
    :root-name="option.elmentConfig.rootName"
    :org-id="option.elmentConfig.orgId"
    :default-text="option.elmentConfig.defaultText"
    @getCurrentNode="_change" />
  <yl-common-select-api
    v-else-if="option.type==='ylCommonSelectApi'"
    v-model="model[option.name]"
    :disabled="option.elmentConfig.disabled"
    :width="option.elmentConfig.width"
    :default-props="option.elmentConfig.defaultProps"
    :displaytool-bar="option.elmentConfig.displaytoolBar"
    :placeholder="option.elmentConfig.placeholder"
    :filter-visibe="option.elmentConfig.filterVisibe"
    :filter-placeholder="option.elmentConfig.filterPlaceholder"
    :parameter="option.elmentConfig.parameter"
    :default-text="option.elmentConfig.defaultText"
    @getCurrentNode="_change" />
</template>
<script>
  import YlDictionarySelect from '../dictionary/dictionary-select.vue'
  import YlDictionaryTree from '../dictionary/dictionary-tree.vue'
  import YlUnitDictionaryTree from '../dictionary/unit-dictionary-tree.vue'
  import YlCommonSelectApi from '../common-select/common-select-api.vue'
  export default {
    name: 'YlRenderComs',
    components: {
      YlDictionarySelect,
      YlDictionaryTree,
      YlUnitDictionaryTree,
      YlCommonSelectApi
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
    inject: ['usedVueComponent'],
    methods: {
      _preventmousewheel (event) {
        event.preventDefault()
      },
      _change (node) {
        const _this = this
        if (this.option.eventConf && this.option.eventConf.isOn) {
          if (this.option.eventConf.change) {
            this.option.eventConf.change(node, this.option, this.model, _this, this.usedVueComponent)
          }
        }
      },
      _blur (node) {
        const _this = this
        if (this.option.eventConf && this.option.eventConf.isOn) {
          if (this.option.eventConf.blur !== undefined) {
            this.option.eventConf.blur(node, this.option, this.model, _this, this.usedVueComponent)
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
            this.option.eventConf.init(this.option, this.model, _this, this.message)
          }
        }
      }
    }
  }
</script>
