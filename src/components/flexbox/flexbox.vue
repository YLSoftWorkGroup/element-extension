<template>
  <div class="yl-flexbox" :style="boxStyle">
    <div v-if="!isReverse" class="fixed-wrapper" :style="fixedStyle" v-show="!o_isFlod">
      <slot name="fixed"></slot>
    </div>
    <div
      class="flod"
      :style="flodStyle"
      :class="vertical?'flodx':'flody'"
      v-if="!isReverse&&needFlod"
      @click="hiddenFixed"
    ></div>
    <div class="flex-wrapper">
      <slot name="flex"></slot>
    </div>
    <div
      class="flod"
      :style="flodStyle"
      :class="vertical?'flodx':'flody'"
      v-if="isReverse&&needFlod"
      @click="hiddenFixed"
    ></div>
    <div v-if="isReverse" class="fixed-wrapper" :style="fixedStyle" v-show="!o_isFlod">
      <slot name="fixed"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ylFlexbox",
  data() {
    return {
      boxStyle: {
        "flex-direction": this.vertical ? "column" : "row",
        border: this.needFlod ? "1px solid #dcdee2" : "none"
      },
      o_isFlod:this.isFlod
    };
  },
  computed: {
    fixedStyle() {
      if (this.vertical) {
        return "height:" + this.fixedWidth;
      } else {
        return "width:" + this.fixedWidth;
      }
    },
    flodStyle() {
      if (this.vertical) {
        return `height:6px;
                border-top: 1px solid #dcdee2;
                border-bottom: 1px solid #dcdee2;`;
      } else {
        return `width:6px;
                border-left: 1px solid #dcdee2;
                border-right: 1px solid #dcdee2;`;
      }
    }
  },
  props: {
    fixedWidth: {
      //固定容器宽度
      required: false,
      type: String,
      default: "auto"
    },
    vertical: {
      //是否垂直方向
      type: Boolean,
      default: false
    },
    needFlod: {
      //需要折叠
      type: Boolean,
      default: false
    },
    isFlod: {
      //折叠状态
      type: Boolean,
      default: false
    },
    isReverse: {
      //置换方向
      type: Boolean,
      default: false
    }
  },
  methods: {
    hiddenFixed() {
        this.o_isFlod = !this.o_isFlod;
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.yl-flexbox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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
    background: #f8f8f9;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .flodx:before {
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
    }
  }
}
</style>
