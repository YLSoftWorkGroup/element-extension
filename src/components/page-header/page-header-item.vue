<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-17 18:36:30
 * @LastEditTime: 2020-02-18 00:45:29
 -->
<template>
  <div class="yl-page-header-item"
    :class="{ 'yl-page-header-title': isPrimary }"
    @click="_clickEvent">
    <slot />
    <span class="separator"> {{ separator }}</span>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'YlPageHeaderItem',
    props: {
      to: {
        type: String,
        default: ''
      },
      place: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        separator: '/'
      }
    },
    computed: {
      isPrimary: function () {
        if (this.link || this.to) {
          return true
        }
      }
    },
    methods: {
      _initComs () {
        if (this.$parent && this.$parent.separator) {
          this.separator = this.$parent.separator
        }
      },
      _clickEvent () {
        if (this.link) {
          location.href = this.link
        } else if (this.to) {
          const { to, $router } = this
          this.place ? $router.go(to) : $router.replace(to)
        }
      }
    },
    mounted () {
      this._initComs()
    }
  }
</script>

