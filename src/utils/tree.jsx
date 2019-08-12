function nodeStyle (node) {
  if (node.isLeaf) {
    return 'el-icon-file-fill'
  } else {
    if (node.expanded) {
      return 'el-icon-folder-open-fill'
    } else {
      return 'el-icon-folder-fill'
    }
  }
}
export default {
  methods: {
    renderContents (h, { node, data, store }) {
      return (
        <span class="yl-tree-style">
          <span class="yl-node-style">
            <i class={nodeStyle(node)} />
          </span>
          <span style="padding-left:3px">{node.label}</span>
        </span>
      )
    }
  }
}
