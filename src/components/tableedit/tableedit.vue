<template>
  <div class="table-edit">
    <yl-onlytable class="table-zone"
      :configs="config"
      :tableData="tableData"
      :tableloading="tableloading"
      @current-change="_currentChange">
      <!-- <template v-for="(item,index) in tableConfig.solSlotConf" :slot="item.name" scope="scope">
        <yl-rendertablerowcoms
          :key="index"
          :name="item.name"
          :option="item"
          :model="scope.row"
          @sumCount="_sumCount">
        </yl-rendertablerowcoms>
      </template> -->
      <!-- <template slot="id" scope="scope">
        <div class="yl-table-icon">
          <i class="icon-cancel3"
            @click="_delItem(scope.row)" />
        </div>
      </template> -->
      <slot>
      </slot>
    </yl-onlytable>
    <div v-if="!sumRowConf.disable" class="sum-text">
      <span class="heji-title">
        <i class="el-icon-edit" /> {{ sumRowConf.sumText }}
      </span>
      <template v-for="(item,index) in sumRowConf.items">
        <span v-if="item.capitalCol" :key="index" class="heji-title" style="padding-left:10px;">
          大写金额：
          <span
            class="heji-text"
            v-text="getdataDX(item.sumval)"
          />
        </span>
      </template>
      <span v-for="(item,index) in sumRowConf.items" :key="index" class="heji-title" style="padding-left:10px;">
        {{ item.text }}：
        <span
          class="heji-text"> {{ item.sumval }}
        </span>
      </span>
    </div>
  </div>
</template>
<script type="text/babel">
  // import util from '../../utils/util'
  export default {
    name: 'ylTableedit',
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
        tableData: []
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
    methods: {
      _sumCount () {
        this.$emit('sumCount')
      },
      _currentChange (val) {
        // 单选时的方法
      },
      _delItem (row) {
        this.$emit('delItem', row)
      },
      _getTableData (addObj) {
        let row = {}
        let { rows, dataType } = addObj
        if (rows.length) {
          rows.map((item, index) => {
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
        return '' // util.turnDX(data)
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
        color: #324057;
        font-weight: 600;
        font-size: 14px;
        &>.heji-text {
          color: #324057;
          font-weight: 600;
        }
      }
    }
}
</style>
