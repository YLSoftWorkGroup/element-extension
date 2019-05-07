<template>
  <div class="form">
    <div>timebar</div>
    <div>
      <yl-timebar ref="timeBar" @change="_change">
      </yl-timebar>
    </div>
    <div>
      <el-button @click="setDate1">设置初始值</el-button>
    </div>
    <div>
      treeSelect
    </div>
    <div>
      <p>逐步加载数据方式</p>
      <yl-treeselect
        :treeData="treeData"
        placeholder="请选择"
        stepByOne
        displaytoolBar
        defaultText="4"
        :defaultProps="defaultProps"
        v-model="treeSelectvalue"
        @getCurrentNode="getCurrentNode"
        @loadNodeEvent="loadNode"
        @reload="reload"
        @clear="clear"></yl-treeselect>
      <div>value:{{treeSelectvalue}}</div>
    </div>

    <div>
      <p>一次性加载方式</p>
      <yl-treeselect
        :treeData="treeDataL"
        placeholder="请选择"
        displaytoolBar
        :defaultProps="defaultProps"
        v-model="treeSelectvalueL"
        @getCurrentNode="getCurrentNode"
        @reload="reloadL"
        @clear="clearL"></yl-treeselect>
      <div>value:{{treeSelectvalueL}}</div>
    </div>

  </div>
</template>
<script>
  import treeDataJosn from '../../data/treeData.json'
  import treeDataAll from '../../data/treeDataAll.json'
  export default {
    data () {
      return {
        treeData: [],
        treeDataL: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        treeSelectvalue: '',
        treeSelectvalueL: -1,
        Numberaa: 123123.22
      }
    },
    methods: {
      _change (data) {
        console.log(data)
      },
      getNumber () {
        setTimeout(() => {
          return 10000
        }, 1000)
      },
      setDate () {
        this.$refs.timeBar.setDate('1900-01-01', '2015-01-14')
      },
      setDate1 () {
        this.$refs.timeBar.setDate('1900-01-02', '2015-01-15')
      },
      getTreeData (val, resolve) {
        if (val === undefined) {
          this.treeData = [
            {
              id: -1,
              name: '虚拟根节点',
              children: []
            }
          ]
        } else {
          setTimeout(() => {
            let data = treeDataJosn.filter(data => {
              if (data.parentId === val) {
                return data
              }
            })
            resolve(data)
          }, 1000)
        }

      },
      getData () {
        setTimeout(() => {
          this.treeDataL = [
            {
              id: -1,
              name: '虚拟根节点',
              children: treeDataAll
            }
          ]
        }, 1000)
      },
      loadNode (node, resolve) {
        if (!node.level) {
          this.getTreeData()
        } else {
          this.getTreeData(node.data.id, resolve)
        }
      },
      getCurrentNode (node) {

      },
      reload (node) {
        this.getTreeData()
      },
      clear (node) {
        this.treeSelectvalue = null
      },
      reloadL (node) {
        this.getData()
      },
      clearL (node) {
        this.treeSelectvalueL = null
      }
    },
    mounted () {
      this.getData();

    }
  }
</script>

<style lang="postcss" scoped>
</style>
