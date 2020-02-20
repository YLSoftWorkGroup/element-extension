/* eslint-disable complexity */
<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2020-02-20 14:53:16
 -->

<template>
  <div class="yl-time-bar">
    <div class="btn">
      <el-radio-group v-model="selectiton" size="mini">
        <el-radio-button v-if="btnItems.day" label="day">
          本日
        </el-radio-button>
        <el-radio-button v-if="btnItems.week" label="week">
          本周
        </el-radio-button>
        <el-radio-button v-if="btnItems.month" label="month">
          本月
        </el-radio-button>
        <el-radio-button v-if="btnItems.quarter" label="quarter">
          本季
        </el-radio-button>
        <el-radio-button v-if="btnItems.year" label="year">
          本年
        </el-radio-button>
        <el-radio-button v-if="btnItems.all" label="all">
          开累
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="timepick">
      <i class="el-icon-caret-left" @click="_back" />
      <el-date-picker v-model="beginDate"
        style="width:190px"
        class="date"
        :type="dataPickOptions.type"
        :format="dataPickOptions.format"
        :readonly="dataPickOptions.readonly"
        :size="dataPickOptions.size"
        placeholder="开始日期"
        @change="_beginChange" /> -
      <el-date-picker v-model="endDate"
        style="width:190px"
        class="date"
        :type="dataPickOptions.type"
        :format="dataPickOptions.format"
        :readonly="dataPickOptions.readonly"
        :size="dataPickOptions.size"
        placeholder="结束日期"
        @change="_endChange" />
      <i class="el-icon-caret-right" @click="_forward" />
    </div>
  </div>
</template>

<script type="text/babel">
  import dayjs from 'dayjs'
  export default {
    name: 'YlTimeBar',
    props: {
      btnItems: {
        type: Object,
        default: function () {
          return {
            day: true,
            week: true,
            month: true,
            quarter: true,
            year: true,
            all: true
          }
        }
      },
      currentValue: {
        type: String,
        default: 'month'
      },
      dataPickOptions: {
        type: Object,
        default: function () {
          return {
            format: 'yyyy-MM-dd',
            size: 'small',
            readonly: false,
            clearable: false,
            type: 'date'
          }
        }
      },
      format: {
        type: String,
        default: 'YYYY-MM-DD HH:mm:ss'
      },
      needSetDate: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        beginDate: '',
        endDate: '',
        selectiton: ''
      }
    },
    computed: {
      isDate: {
        get () {
          return this.format.length > 7
        }
      }
    },
    watch: {
      selectiton: function (n, o) {
        this._getDate(n, o)
      }
    },
    mounted () {
      if (!this.needSetDate) {
        this.selectiton = this.currentValue
      }
    },
    methods: {
      _format () {
        this.beginDate = dayjs(this.beginDate).format(this.format)
        this.endDate = dayjs(this.endDate).format(this.format)
        this.$emit('change', { beginDate: this.beginDate, endDate: this.endDate })
      },
      _beginChange (node) {
        node = dayjs(node).format(this.format)
        if (node > this.endDate) {
          this.$message.warning('起始时间不能大于结束时间！')
          this.beginDate = this.endDate
        } else {
          this._format()
        }
      },
      _endChange (node) {
        node = dayjs(node).format(this.format)
        if (this.beginDate > node) {
          this.$message.warning('结束时间不能小于开始时间！')
          this.endDate = this.beginDate
        } else {
          this._format()
        }
      },
      _abs (type, num) {
        return type ? 0 + num : 0 - num
      },
      _dealDate (isForward) {
        if (this.isDate) {
          switch (this.selectiton) {
            case 'day':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 1), 'd')
              this.endDate = dayjs(this.beginDate).add(1, 'd')
              break
            case 'week':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 1), 'w')
              this.endDate = dayjs(this.beginDate).add(1, 'w')
              break
            case 'month':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 1), 'M')
              this.endDate = dayjs(this.beginDate).add(1, 'M')
              break
            case 'quarter':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 3), 'M')
              this.endDate = dayjs(this.beginDate).add(3, 'M')
              break
            case 'year':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 1), 'y')
              this.endDate = dayjs(this.beginDate).add(1, 'y')
              break
          }
        } else {
          switch (this.selectiton) {
            case 'month':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 1), 'M')
              this.endDate = dayjs(this.beginDate).add(0, 'M')
              break
            case 'quarter':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 3), 'M')
              this.endDate = dayjs(this.beginDate).add(2, 'M')
              break
            case 'year':
              this.beginDate = dayjs(this.beginDate).add(this._abs(isForward, 1), 'y')
              this.endDate = dayjs(this.beginDate).add(1, 'y').add(-1, 'M')
              break
          }
        }
      },
      _forward () {
        // 前进
        this._dealDate(true)
        this._format()
      },
      _back () {
        // 后退
        this._dealDate(false)
        this._format()
      },
      _getDate (type, oldVal) {
        this._initDate(type, oldVal)
        if (this.needSetDate) {
          this.$emit('change', { beginDate: this.beginDate, endDate: this.endDate })
        } else if (oldVal) {
          this.$emit('change', { beginDate: this.beginDate, endDate: this.endDate })
        }
      },
      _initDate (type) {
        switch (type) {
          case 'day':
            this.selectiton = 'day'
            this.beginDate = dayjs().format('YYYY-MM-DD')
            break
          case 'week':
            this.selectiton = 'week'
            const weekOfday = 1 - dayjs().day()
            this.beginDate = dayjs().add(weekOfday, 'd').format('YYYY-MM-DD')
            break
          case 'month':
            this.selectiton = 'month'
            this.beginDate = dayjs().format('YYYY-MM') + '-01'
            break
          case 'quarter':
            const quarter = (dayjs().month() + 1)
            this.selectiton = 'quarter'
            if (quarter < 4) {
              this.beginDate = dayjs().format('YYYY') + '-01-01'
            } else if (quarter < 7) {
              this.beginDate = dayjs().format('YYYY') + '-04-01'
            } else if (quarter < 10) {
              this.beginDate = dayjs().format('YYYY') + '-07-01'
            } else if (quarter < 13) {
              this.beginDate = dayjs().format('YYYY') + '-10-01'
            }
            break
          case 'year':
            this.selectiton = 'year'
            this.beginDate = dayjs().format('YYYY') + '-01-01'
            break
          case 'all':
            this.selectiton = 'all'
            this.beginDate = '1900-01-01'
            break
        }
        this.beginDate = dayjs(this.beginDate).format(this.format)
        this.endDate = dayjs().format(this.format)
      },
      // 对外方法
      getDate () {
        this.beginDate = dayjs(this.beginDate).format(this.format)
        this.endDate = dayjs(this.endDate).format(this.format)
        return { beginDate: this.beginDate, endDate: this.endDate }
      },
      setDate (beginDate, endDate) {
        this.beginDate = dayjs(beginDate).format(this.format)
        this.endDate = dayjs(endDate).format(this.format)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
  @import "../../styl/var.pcss";
  .yl-time-bar {
    box-sizing: border-box;
    display: flex;
    padding: $layout-gap-l $layout-gap-l;
    & > .btn {
      line-height: 2;
    }
    & > .timepick {
      padding-left: 150px;
      & > i {
        color: $text-regular;
        &:hover {
          cursor: pointer;
        }
      }
      & > .date {
        width: 150px;
      }
    }
  }
</style>
