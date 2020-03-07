export default {
  name: 'YlTableReport',
  data () {
    return {
      defaultAttr: {
        table: {
          // table的默认属性
          height: '100%',
          border: true,
          stripe: true,
          size: 'small',
          highlightCurrent: true, // 默认配置为单选
          style: { width: '100%', height: '100%' }
        },
        column: {
          // column的默认属性
          showOverflowTooltip: true,
          headerAlign: 'center',
          resizable: true,
          sortable: false
        }
      },
      currentPage: 1,
      pageData: []
    }
  },
  props: {
    // table的配置,具体见README.md
    configs: {
      type: Object,
      required: true
    },
    tableloading: {
      type: Boolean,
      default: false
    },
    tableData: {
      required: false,
      type: Array,
      default: function () {
        return []
      }
    },
    pagination: {
      type: Object,
      default: function () {
        return {
          small: false,
          background: true,
          pageSize: 10,
          pageSizes: [10, 20, 50],
          // prevText:'上一页',
          // nextText:'下一页',
          layout: 'sizes,prev, pager, next,  total' // prev, pager, next, jumper, ->, total, slot
        }
      }
    }
  },
  computed: {
    paginationAttr: {
      get () {
        return this.pagination
      }
    }
  },
  methods: {
    clearSelection (selection) {
      this.$refs.tableR.clearSelection(selection)
    },
    toggleRowSelection (row, selected) {
      this.$refs.tableR.toggleRowSelection(row, selected)
    },
    handleEvent (action) {
      const _self = this
      return function () {
        _self.$emit(action, ...arguments)
      }
    },
    handleSizeChange (val) {
      this.paginationAttr.pageSize = val
      this.getpagination()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getpagination()
    },
    loading () {
      this.$emit('loading', this.tableloading)
    },
    getpagination () {
      let array = this.tableData
      let pageSize = this.paginationAttr.pageSize
      let offset = this.paginationAttr.pageSize * (this.currentPage - 1)
      this.pageData =
        offset + pageSize >= array.length
          ? array.slice(offset, array.length)
          : array.slice(offset, offset + pageSize)
    },
    renderItem (h, columns, columnDefaultAttr) {
      return columns.map(column => {
        const columnAttr = Object.assign({}, columnDefaultAttr, column.attr)
        if (column.isParent) {
          return (
            <el-table-column
              label={columnAttr.label}
              render-header={columnAttr.renderHeader}
              resizable={columnAttr.resizable}
              formatter={columnAttr.formatter}
              header-align={columnAttr.headerAlign}
              class-name={columnAttr.className}
              label-class-name={columnAttr.labelClassName}
            >
              {this.renderItem(h, column.items, columnDefaultAttr)}
            </el-table-column>
          )
        } else {
          return (
            <el-table-column
              type={columnAttr.type}
              index={columnAttr.index}
              column-key={columnAttr.columnKey}
              label={columnAttr.label}
              prop={columnAttr.prop}
              width={columnAttr.width}
              min-width={columnAttr.minWidth}
              fixed={columnAttr.fixed}
              render-header={columnAttr.renderHeader}
              sortable={columnAttr.sortable}
              sort-method={columnAttr.sortMethod}
              sort-by={columnAttr.sortBy}
              sort-orders={columnAttr.sortOrders}
              resizable={columnAttr.resizable}
              formatter={columnAttr.formatter}
              show-overflow-tooltip={columnAttr.showOverflowTooltip}
              align={columnAttr.align}
              header-align={columnAttr.headerAlign}
              class-name={columnAttr.className}
              label-class-name={columnAttr.labelClassName}
              selectable={columnAttr.selectable}
              reserve-selection={columnAttr.reserveSelection}
              filters={columnAttr.filters}
              filter-placement={columnAttr.filterPlacement}
              filter-multiple={columnAttr.filterMultiple}
              filter-method={columnAttr.filterMethod}
              filtered-value={columnAttr.filterValue}
            >
              {columnAttr.scopedSlot ? this.$scopedSlots[columnAttr.scopedSlot] : ''}
            </el-table-column>
          )
        }
      })
    }
  },
  watch: {
    tableData: function (n, o) {
      if (n.length > 0) {
        this.currentPage = 1
        this.getpagination()
      } else {
        this.pageData = []
      }
    }
  },
  render (h) {
    const tableAttr = Object.assign({}, this.defaultAttr.table, this.configs.table.attr || {}) // 表格属性
    const columns = this.configs.columns // 列配置
    const columnDefaultAttr = Object.assign({}, this.defaultAttr.column, this.configs.columnDefault || {})// 列默认配置
    return (
      <yl-flex-box vertical isReverse>
        <div slot='flex' style="box-sizing: border-box;">
          <el-table
            ref="tableR"
            v-loading={this.tableloading}
            element-loading-text="加载中..."
            style={tableAttr.style}
            data={this.pageData}
            height={tableAttr.height}
            max-height={tableAttr.maxHeight}
            stripe={tableAttr.stripe}
            border={tableAttr.border}
            size={tableAttr.size}
            fit={tableAttr.fit}
            show-header={tableAttr.showHeader}
            highlight-current-row={tableAttr.highlightCurrent}
            current-row-key={tableAttr.currentRowKey}
            row-class-name={tableAttr.rowClassName}
            row-style={tableAttr.rowStyle}
            row-key={tableAttr.rowKey}
            empty-text={tableAttr.emptyText}
            cell-class-name={tableAttr.cellClassName}
            cell-style={tableAttr.cellStyle}
            header-row-class-name={tableAttr.headerRowClassName}
            header-row-style={tableAttr.headerrowStyle}
            header-cell-class-name={tableAttr.headerCellClassName}
            header-cell-style={tableAttr.headerCellStyle}
            default-expand-all={tableAttr.defaultExpandAll}
            expand-row-keys={tableAttr.expandRowKeys}
            default-sort={tableAttr.defaultSort}
            tooltip-effect={tableAttr.tooltipEffect}
            show-summary={tableAttr.showSummary}
            sum-text={tableAttr.sumText}
            summary-method={tableAttr.summaryMethod}
            span-method={tableAttr.spanMethod}
            indent={tableAttr.indent}
            lazy={tableAttr.lazy}
            load={tableAttr.load}
            select-on-indeterminate={tableAttr.selectOnIndeterminate}
            on-select={this.handleEvent('select')}
            on-select-all={this.handleEvent('select-all')}
            on-selection-change={this.handleEvent('selection-change')}
            on-cell-mouse-enter={this.handleEvent('cell-mouse-enter')}
            on-cell-mouse-leave={this.handleEvent('cell-mouse-leave')}
            on-cell-click={this.handleEvent('cell-click')}
            on-cell-dblclick={this.handleEvent('cell-dblclick')}
            on-row-click={this.handleEvent('row-click')}
            on-row-contextmenu={this.handleEvent('row-contextmenu')}
            on-row-dblclick={this.handleEvent('row-dblclick')}
            on-header-click={this.handleEvent('header-click')}
            on-header-contextmenu={this.handleEvent('header-contextmenu')}
            on-sort-change={this.handleEvent('sort-change')}
            on-filter-change={this.handleEvent('filter-change')}
            on-current-change={this.handleEvent('current-change')}
            on-header-dragend={this.handleEvent('header-dragend')}
            on-expand-change={this.handleEvent('expand-change')}
          >
            {this.renderItem(h, columns, columnDefaultAttr)}
          </el-table>
        </div>
        <div slot="fixed">
          <div style="text-align:right; background:#fff;padding:2px;">
            <el-pagination
              on-size-change={this.handleSizeChange}
              on-current-change={this.handleCurrentChange}
              current-page={this.currentPage}
              page-sizes={this.paginationAttr.pageSizes}
              page-size={this.paginationAttr.pageSize}
              prev-text={this.paginationAttr.prevText}
              next-text={this.paginationAttr.nextText}
              disabled={this.paginationAttr.disabled}
              total={this.tableData.length}
              background={this.paginationAttr.background}
              layout={this.paginationAttr.layout}
              small={this.paginationAttr.small}
            >
            </el-pagination>
          </div>
        </div>
      </yl-flex-box>
    )
  }
}
