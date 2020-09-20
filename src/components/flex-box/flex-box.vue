<template>
  <div class="yl-flex-box" :style="boxStyle">
    <div v-if="!isReverse" v-show="!o_isFlod" class="fixed-wrapper" :style="fixedStyleComp">
      <slot name="fixed" />
    </div>
    <div
      v-if="!isReverse&&needFlod"
      class="flod"
      :style="flodStyle"
      :class="vertical?'flodx':'flody'"
      @click="hiddenFixed"
    />
    <div class="flex-wrapper">
      <slot name="flex" />
    </div>
    <div
      v-if="isReverse&&needFlod"
      class="flod"
      :style="flodStyle"
      :class="vertical?'flodx':'flody'"
      @click="hiddenFixed"
    />
    <div v-if="isReverse" v-show="!o_isFlod" class="fixed-wrapper" :style="fixedStyleComp">
      <slot name="fixed" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'YlFlexBox',
    props: {
      fixedWidth: {
        // 固定容器宽度
        required: false,
        type: String,
        default: 'auto'
      },
      vertical: {
        // 是否垂直方向
        type: Boolean,
        default: false
      },
      needFlod: {
        // 需要折叠
        type: Boolean,
        default: false
      },
      isFlod: {
        // 折叠状态
        type: Boolean,
        default: false
      },
      isReverse: {
        // 置换方向
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        boxStyle: {
          'flex-direction': this.vertical ? 'column' : 'row',
          border: this.needFlod ? '1px solid #E4E7ED' : 'none'
        },
        o_isFlod: this.isFlod
      }
    },
    computed: {
      fixedStyleComp () {
        if (this.vertical) {
          return 'height:' + this.fixedWidth
        } else {
          return 'width:' + this.fixedWidth
        }
      },
      flodStyle () {
        if (this.vertical) {
          return `height:6px;
                border-top: 1px solid #E4E7ED;
                border-bottom: 1px solid #E4E7ED;`
        } else {
          return `width:6px;
                border-left: 1px solid #E4E7ED;
                border-right: 1px solid #E4E7ED;`
        }
      }
    },
    mounted () {},
    methods: {
      hiddenFixed () {
        this.o_isFlod = !this.o_isFlod
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
@import  '../../styl/var.pcss';
.yl-flex-box {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  /* background: $background-color-l; */
  display: flex;
  & > .fixed-wrapper {
    display: block;
    & > div {
      width: 100%;
      height: 100%;
    }
  }
  & > .flex-wrapper {
    flex: 1;
    overflow:auto;
    & > div {
      width: 100%;
      height: 100%;
    }
  }
  & > .flod {
    display: block;
    background: $background-color-b;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    /* .flodx:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 0;
      border-top: 0.4rem solid transparent;
      border-bottom: 0.4rem solid transparent;
      border-left: 0.4rem solid #ccc;
    }
    .flody:before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 0.4rem solid transparent;
      border-right: 0.4rem solid transparent;
      border-top: 0.4rem solid #ccc;
    } */
  }
}
</style>
