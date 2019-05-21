<template>
  <div class="table-edit">
    <yl-onlytable class="table-zone"
      :configs="config"
      :tableData="tableData"
      :tableloading="tableloading"
      @current-change="_currentChange">
      <template v-for="(item,index) in config.soltConf" :slot="item.name" slot-scope="scope">
        <yl-renderComs
          :key="index"
          :name="item.name"
          :option="item"
          :model="scope.row"
          @sumCount="_sumCount" />
      </template>
      <template slot="id" slot-scope="scope">
        <div style="font-size:16px;text-align: center;color:#F56C6C;" @click="_delItem(scope.row)">
          <i class="el-icon-circle-close-outline" />
        </div>
      </template>
    </yl-onlytable>
    <div v-if="!sumRowConf.disable" class="sum-text">
      <span class="heji-title">
        <i class="el-icon-edit" /> {{ sumRowConf.sumText }}
      </span>
      <span v-if="capitalColItem.capitalCol" class="heji-title" style="padding-left:10px;">
        大写金额：
        <span
          class="heji-text"
          v-text="getdataDX(capitalColItem.sumval)"
        />
      </span> 
      <span v-for="(item,index) in sumItems" :key="index" class="heji-title" style="padding-left:10px;">
        {{ item.text }}：
        <span
          class="heji-text"> {{ item.sumval }}
        </span>
      </span>
    </div>
  </div>
</template>
<script type="text/babel">
  import renderComs from './renderComs'
  import util from '../../utils/util'
  export default {
    name: 'ylTableedit',
    components: {
      'yl-renderComs': renderComs
    },
    props: {
      config: {
        type: Object,
        require: true,
        default: function () {
          return {}
        }
      },
      mapConfig: {
        type: Object,
        require: true,
        default: function () {
          return {}
        }
      },
      sumRowConf: {
        type: Object,
        require: false,
        default: function () {
          return {}
        }
      },
      addRows: {
        type: Object,
        require: false,
        default: function () {
          return {}
        }
      },
      addRowCount: {
        // 条目数限制
        type: Number,
        require: false,
        default: 20
      },
      notRepeatFiled: {
        // 过滤重复字段
        type: String,
        require: false,
        default: ''
      }
    },
    data () {
      return {
        tableloading: false,
        tableData: [],
        sumItems: {},
        capitalColItem: {}
      }
    },
    computed: {
    },
    watch: {
      addRows: function (val, oldVal) {
        if (val.rows.length > 0) {
          // 处理
          this._getTableData(val)
        }
      }
    },
    mounted () {
      this._initComs()
    },
    methods: {
      _initComs () {
        this.sumItems = this.sumRowConf.items
        for (const key in this.sumItems) {
          if (this.sumItems[key].capitalCol) {
            this.capitalColItem = this.sumItems[key]
          }
        }
      },
      _sumCount () {
        // 执行计算逻辑
        this.$emit('sumCount', this.tableData)
      },
      _currentChange (val) {
        // 单选时的方法
      },
      _delItem (row) {
        this.$emit('delItem', row)
      },
      _getTableData (addObj) {
        let { rows, dataType } = addObj
        if (rows.length) {
          rows.map((item, index) => {
            let row = {}
            this.mapConfig[dataType].map((model, index) => {
              if (model.isReplace) {
                if (model.eventConf && model.eventConf.isOn) {
                  row[model.prop] = model.eventConf.calculate(item)
                } else {
                  row[model.prop] = item[model.selprop]
                }
              } else {
                row[model.prop] = model.defaultVal
              }
            })
            let isSkip = false
            if (this.notRepeatFiled) {
              // 判断重复
              this.tableData.map(iitem => {
                if (iitem[this.notRepeatFiled] === row[this.notRepeatFiled]) {
                  isSkip = true
                }
              })
            }
            if (!isSkip) {
              const maxRow = this.addRowCount
              if (maxRow > this.tableData.length) {
                this.tableData.push(row)
              } else {
                this.$message({ message: `选材数目不能大于${maxRow}条!`, type: 'warning' })
              }
            }
          })
          this._sumCount()
        }
      },
      resetTableEdit () {
        this.tableData = []
      },
      getEditData () {
        return this.tableData
      },
      getdataDX (data) {
        return util.turnDX(data)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.table-edit{
  display: flex;
  flex-direction: column;
  &> .table-zone {
    flex: 1;
  }
  &> .sum-text {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      border: 1px solid #eee;
      border-top: none;
      padding: 0px 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;
      &> .heji-title {
        color: #606266;
        font-weight: 600;
        font-size: 14px;
        &>.heji-text {
          color: #303133;
          font-weight: 600;
        }
      }
    }
}
</style>
