/**
 * 修改、增加el-table-body组件部分方法
 */
// import Table from './el-table@2.9.2/table'; //2.9.2
import { Table } from 'element-ui'; //2.9.2
const { getStyle, hasClass, removeClass, addClass } = require('../../../../methods/utils/methods');
import { getCell, getColumnByCell, getRowIdentity } from './sourceCode/util';
import listenerPolicy from '../../../../methods/mixins/listenerPolicy';
const TableBody = Object.assign({}, Table.components.TableBody);
delete TableBody.render;
/**
 * 'store.states.currentRow'和'store.states.hoverRow'的监听中包含对行元素的修改，
 * 开启滚动加载时，这两个方法对元素的修改时有问题的
 */
delete TableBody.watch['store.states.currentRow'];
delete TableBody.watch['store.states.hoverRow'];
// 默认行高
const default_row_height = 48;
const default_reserve_num = 10;
export const reTableBody = {
  extends: TableBody,
  mixins: [listenerPolicy],
  data() {
    return {
      scrollTop: 0, //容器的scrollTop
      // reserveNum: 10, //可视窗口外上下各预留多少行
      // wrapPosition: 0,
      startIndex: 0, //滚动加载的第一行元素对应的data序号
      bodyWrapper: undefined, //容器元素
    };
  },
  computed: {
    contentHeight() {
      return this.store.states.contentHeight || undefined;
    },
    //可视窗口外上下各预留多少行
    reserveNum() {
      return this.store.states.reserveNum || default_reserve_num;
    },
    //表格Y轴偏移
    wrapPosition() {
      return this.store.states.wrapPosition || 0;
    },
    //滚动加载时，当前需要渲染的行元素对应的data序号
    indexList() {
      return this.store.states.indexList;
    },
    //滚动加载总共需要渲染的行数
    totalRowNum() {
      // 可视行数
      let visualTrNum = Math.ceil(this.visualHeight / this.rowHeight);
      // 滚动总行数
      let totalNum = visualTrNum + this.reserveNum * 2;
      return totalNum;
    },
    //行高
    rowHeight() {
      return this.store.states.rowHeight || default_row_height;
    },
    //判断是否需要滚动加载
    isScrollLoad() {
      return this.table.isScrollLoad;
    },
    //表格可视区域高度
    visualHeight() {
      return this.table.bodyHeight.height ? parseFloat(this.table.bodyHeight.height) : 0;
    }
  },
  activated() {
    this.handleScroll({target: this.bodyWrapper});
  },
  created() {
    this.startIndex = 0 - this.reserveNum;
  },
  mounted() {
    this.store.commit('setBody', this, this.fixed);
    this.$nextTick(()=>{
      this.changeRowHeight();
      this.updateIndexList();
    });
  },
  render() {
    const data = this.data || [];
    return (
      //todo 新增一个外部容器
      <div ref="wrap" class="base-table__wrap" style={this.isScrollLoad ? `height:${this.contentHeight}px` : ''}>
        <table
          class="el-table__body"
          ref="table"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style={`transform: translateY(${this.isScrollLoad ? this.wrapPosition : 0}px);`}
        >
          <colgroup>
            {
              this.columns.map(column => <col name={ column.id } key={column.id} />)
            }
          </colgroup>
          <tbody>
            {
              // todo 新增了滚动加载的行渲染方法
              this.isScrollLoad ? (this.indexList.map(index=> this.wrappedRowRender(data[index], index))) : (data.reduce((acc, row) => acc.concat(this.wrappedRowRender(row, acc.length)), []))
            }
            <el-tooltip effect={ this.table.tooltipEffect } placement="top" ref="tooltip" content={ this.tooltipContent }></el-tooltip>
          </tbody>
        </table>
      </div>
    );
  },
  //重写render，添加拖拽监听
  // render(h) {
  //   const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index));
  //   return (
  //     <div ref="wrap" class="base-table__wrap" style={this.isScrollLoad ? `height:${this.contentHeight}px` : ''}>
  //       <table
  //         class="el-table__body"
  //         ref="table"
  //         cellspacing="0"
  //         cellpadding="0"
  //         border="0"
  //         style={`transform: translateY(${this.isScrollLoad ? this.wrapPosition : 0}px);`}
  //       >
  //         <colgroup>
  //           {
  //             this.columns.map(column => <col name={ column.id } key={column.id} />)
  //           }
  //         </colgroup>
  //         <tbody>
  //         {
  //           (!this.isScrollLoad ? this._l(this.data, (row, $index) =>{
  //             return [<tr
  //               style={ this.rowStyle ? this.getRowStyle(row, $index) : null }
  //               key={ this.table.rowKey ? this.getKeyOfRow(row, $index) : $index }
  //               on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
  //               on-click={ ($event) => this.handleClick($event, row) }
  //               on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
  //               on-mouseenter={ () => this.handleMouseEnter($index) }
  //               on-mouseleave={ () => this.handleMouseLeave() }
  //               on-dragstart={ ($event) => this.handleDragStart($event, row, $index) }
  //               on-drag={ ($event) => this.handleDrag($event, row, $index) }
  //               on-dragend={ ($event) => this.handleDragEnd($event, row, $index) }
  //               on-dragenter={ ($event) => this.handleDragEnter($event, row, $index) }
  //               on-dragover={ ($event) => this.handleDragOver($event, row, $index) }
  //               on-dragleave={ ($event) => this.handleDragLeave($event, row, $index) }
  //               class={ [this.getRowClass(row, $index)] }
  //               draggable={ this.store.states.isDraggable }>
  //               {
  //                 this._l(this.columns, (column, cellIndex) => {
  //                   const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
  //                   if (!rowspan || !colspan) {
  //                     return '';
  //                   } else {
  //                     if (rowspan === 1 && colspan === 1) {
  //                       return (
  //                         <td
  //                           style={ this.getCellStyle($index, cellIndex, row, column) }
  //                           class={ this.getCellClass($index, cellIndex, row, column) }
  //                           on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
  //                           on-mouseleave={ this.handleCellMouseLeave }>
  //                           {
  //                             column.renderCell.call(
  //                               this._renderProxy,
  //                               h,
  //                               {
  //                                 row,
  //                                 column,
  //                                 $index,
  //                                 store: this.store,
  //                                 _self: this.context || this.table.$vnode.context
  //                               },
  //                               columnsHidden[cellIndex]
  //                             )
  //                           }
  //                         </td>
  //                       );
  //                     } else {
  //                       return (
  //                         <td
  //                           style={ this.getCellStyle($index, cellIndex, row, column) }
  //                           class={ this.getCellClass($index, cellIndex, row, column) }
  //                           rowspan={ rowspan }
  //                           colspan={ colspan }
  //                           on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
  //                           on-mouseleave={ this.handleCellMouseLeave }>
  //                           {
  //                             column.renderCell.call(
  //                               this._renderProxy,
  //                               h,
  //                               {
  //                                 row,
  //                                 column,
  //                                 $index,
  //                                 store: this.store,
  //                                 _self: this.context || this.table.$vnode.context
  //                               },
  //                               columnsHidden[cellIndex]
  //                             )
  //                           }
  //                         </td>
  //                       );
  //                     }
  //                   }
  //                 })
  //               }
  //             </tr>,
  //               this.store.isRowExpanded(row)
  //                 ? (<tr>
  //                   <td colspan={ this.columns.length } class="el-table__expanded-cell">
  //                     { this.table.renderExpanded ? this.table.renderExpanded(h, { row, $index, store: this.store }) : ''}
  //                   </td>
  //                 </tr>)
  //                 : ''
  //             ];
  //           }) : this.createTrList(h)).concat(
  //             <el-tooltip effect={ this.table.tooltipEffect } placement="top" ref="tooltip" content={ this.tooltipContent }></el-tooltip>
  //           )
  //         }
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // },
  methods: {
    // wrappedRowRender(row, $index) {
    //   const store = this.store;
    //   const { isRowExpanded, assertRowKey } = store;
    //   const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey } = store.states;
    //   if (this.hasExpandColumn && isRowExpanded(row)) {
    //     const renderExpanded = this.table.renderExpanded;
    //     const tr = this.rowRender(row, $index);
    //     if (!renderExpanded) {
    //       console.error('[Element Error]renderExpanded is required.');
    //       return tr;
    //     }
    //     // 使用二维数组，避免修改 $index
    //     return [[
    //       tr,
    //       <tr key={'expanded-row__' + tr.key}>
    //         <td colspan={ this.columnsCount } class="el-table__expanded-cell">
    //           { renderExpanded(this.$createElement, { row, $index, store: this.store }) }
    //         </td>
    //       </tr>]];
    //   } else if (Object.keys(treeData).length) {
    //     assertRowKey();
    //     // TreeTable 时，rowKey 必须由用户设定，不使用 getKeyOfRow 计算
    //     // 在调用 rowRender 函数时，仍然会计算 rowKey，不太好的操作
    //     const key = getRowIdentity(row, rowKey);
    //     let cur = treeData[key];
    //     let treeRowData = null;
    //     if (cur) {
    //       treeRowData = {
    //         expanded: cur.expanded,
    //         level: cur.level,
    //         display: true
    //       };
    //       if (typeof cur.loaded === 'boolean' && cur.loaded) {
    //         treeRowData.noLazyChildren = !(cur.children && cur.children.length);
    //       }
    //       if (typeof cur.loading === 'boolean') {
    //         treeRowData.loading = cur.loading;
    //       }
    //     }
    //     const tmp = [this.rowRender(row, $index, treeRowData)];
    //     // 渲染嵌套数据
    //     if (cur) {
    //       // currentRow 记录的是 index，所以还需主动增加 TreeTable 的 index
    //       let i = 0;
    //       const traverse = (children, parent) => {
    //         if (!(children && children.length && parent)) return;
    //         children.forEach(node => {
    //           // 父节点的 display 状态影响子节点的显示状态
    //           const innerTreeRowData = {
    //             display: parent.display && parent.expanded,
    //             level: parent.level + 1
    //           };
    //           const childKey = getRowIdentity(node, rowKey);
    //           if (childKey === undefined || childKey === null) {
    //             throw new Error('for nested data item, row-key is required.');
    //           }
    //           cur = { ...treeData[childKey] };
    //           // 对于当前节点，分成有无子节点两种情况。
    //           // 如果包含子节点的，设置 expanded 属性。
    //           // 对于它子节点的 display 属性由它本身的 expanded 与 display 共同决定。
    //           if (cur) {
    //             innerTreeRowData.expanded = cur.expanded;
    //             // 懒加载的某些节点，level 未知
    //             cur.level = cur.level || innerTreeRowData.level;
    //             cur.display = !!(cur.expanded && innerTreeRowData.display);
    //             if (typeof cur.loaded === 'boolean' && cur.loaded) {
    //               innerTreeRowData.noLazyChildren = !(cur.children && cur.children.length);
    //             }
    //             if (typeof cur.lazy === 'boolean') {
    //               innerTreeRowData.loading = cur.loading;
    //             }
    //           }
    //           i++;
    //           tmp.push(this.rowRender(node, $index + i, innerTreeRowData));
    //           if (cur) {
    //             const nodes = lazyTreeNodeMap[childKey] || node[childrenColumnName];
    //             traverse(nodes, cur);
    //           }
    //         });
    //       };
    //       // 对于 root 节点，display 一定为 true
    //       cur.display = true;
    //       const nodes = lazyTreeNodeMap[key] || row[childrenColumnName];
    //       traverse(nodes, cur);
    //     }
    //     return tmp;
    //   } else {
    //     return this.rowRender(row, $index);
    //   }
    // },
    // rewrite: 注入拖拽监听
    rowRender(row, $index, treeRowData) {
      const { treeIndent, columns, firstDefaultColumnIndex } = this;
      const columnsHidden = columns.map((column, index) => this.isColumnHidden(index));
      const rowClasses = this.getRowClass(row, $index);
      let display = true;
      if (treeRowData) {
        rowClasses.push('el-table__row--level-' + treeRowData.level);
        display = treeRowData.display;
      }
      return (<tr
        ref={'row' + $index}
        v-show={display}
        style={ this.getRowStyle(row, $index) }
        class={ rowClasses }
        key={ this.getKeyOfRow(row, $index) }
        on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
        on-click={ ($event) => this.handleClick($event, row) }
        on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
        on-mouseenter={ _ => this.handleMouseEnter($index) }
        on-mouseleave={ this.handleMouseLeave }
        on-dragstart={ ($event) => this.handleDragStart($event, row, $index) }
        on-drag={ ($event) => this.handleDrag($event, row, $index) }
        on-dragend={ ($event) => this.handleDragEnd($event, row, $index) }
        on-dragenter={ ($event) => this.handleDragEnter($event, row, $index) }
        on-dragover={ ($event) => this.handleDragOver($event, row, $index) }
        on-dragleave={ ($event) => this.handleDragLeave($event, row, $index) }
        class={ [this.getRowClass(row, $index)] }
        draggable={ this.store.states.isDraggable }>
        {
          columns.map((column, cellIndex) => {
            const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
            if (!rowspan || !colspan) {
              return null;
            }
            const columnData = { ...column };
            columnData.realWidth = this.getColspanRealWidth(columns, colspan, cellIndex);
            const data = {
              store: this.store,
              _self: this.context || this.table.$vnode.context,
              column: columnData,
              row,
              $index
            };
            if (cellIndex === firstDefaultColumnIndex && treeRowData) {
              data.treeNode = {
                indent: treeRowData.level * treeIndent,
                level: treeRowData.level
              };
              // TODO: 优化这里的逻辑
              if (typeof treeRowData.expanded === 'boolean') {
                data.treeNode.expanded = treeRowData.expanded;
                // 表明是懒加载
                if ('loading' in treeRowData) {
                  data.treeNode.loading = treeRowData.loading;
                }
                if ('noLazyChildren' in treeRowData) {
                  data.treeNode.noLazyChildren = treeRowData.noLazyChildren;
                }
              }
            }
            return (
              <td
                style={ this.getCellStyle($index, cellIndex, row, column) }
                class={ this.getCellClass($index, cellIndex, row, column) }
                rowspan={ rowspan }
                colspan={ colspan }
                on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
                on-mouseleave={ this.handleCellMouseLeave }>
                {
                  column.renderCell.call(
                    this._renderProxy,
                    this.$createElement,
                    data,
                    columnsHidden[cellIndex]
                  )
                }
              </td>
            );
          })
        }
      </tr>);
    },
    // 滚动加载：更新显示的tr元素
    updateIndexList() {
      if (!this.fixed) {
        let indexList = [];
        let startIndex = this.startIndex;
        for (let i = 0;i <= this.totalRowNum; i++) {
          if (this.data.length >= startIndex + i + 1 && startIndex + i >= 0) {
            indexList.push(startIndex + i);
          }
        }
        // if (indexList.length)
        this.store.commit('setIndexList', indexList);
      }
    },
    //滚动加载：更新内容高度
    updateContentHeight() {
      if (this.isScrollLoad) {
        this.$nextTick(()=>{
          // let wrap = this.$refs.wrap;
          if (this.data && this.data.length) {
            // wrap.style.height = this.data.length * this.rowHeight + 'px';
            this.store.commit('setContentHeight', this.data.length * this.rowHeight);
          } else {
            // wrap.style.height = 'auto';
            this.store.commit('setContentHeight');
          }
        });
      }
    },
    //滚动加载：更新行高
    changeRowHeight() {
      //这里要在包一层this.$nextTick，否则某些情况下无法拿到row1。
      this.$nextTick(()=>{
        let row1 = this.$refs['row0'];
        row1 && (this.store.commit('setRowHeight', parseFloat(getStyle(row1, 'height').replace(/px/g, ''))));
      });
    },
    //滚动加载：处理滚动
    handleScroll(e) {
      if (!e.target || this.fixed) return;
      // if (!this.fixed) {
        let leftBody = this.store.states.leftBody;
        let rightBody = this.store.states.rightBody;
        if (leftBody) {
          leftBody.handleScroll({target: leftBody.bodyWrapper});
        }
        if (rightBody) {
          rightBody.handleScroll({target: rightBody.bodyWrapper});
        }
      // }
      this.scrollTop = e.target.scrollTop;
      let startIndex = this.startIndex;
      // console.log(startIndex + 2);
      // console.log(this.indexList);
      if ((startIndex + this.totalRowNum) * this.rowHeight <= this.scrollTop + this.visualHeight || this.scrollTop <= (this.startIndex + 2) * this.rowHeight) {
      // if (this.indexList.length && (this.indexList[this.indexList.length - 1]) * this.rowHeight <= this.scrollTop + this.visualHeight || this.scrollTop <= this.indexList[2] * this.rowHeight || this.indexList[this.indexList.length - 1] > this.data.length - 1) {
        let topNum = Math.floor(this.scrollTop / this.rowHeight);
        // 开始的序列号（包含无用序列号）
        this.startIndex = (topNum - this.reserveNum);
        this.updateIndexList();
        // console.log('updateIndexList', this.indexList);
        // console.log('updateIndexList', this.startIndex);
        // this.wrapPosition = this.handlePosition();
        this.store.commit('setWrapPosition', this.handlePosition());
      }
    },
    addResizeListener() {
      if (!this.fixed && !this.table.noresize) {
        this.addListener(window, 'resize', this.changeRowHeight);
      }
    },
    removeResizeListener() {
      if (!this.fixed && !this.table.noresize) {
        this.removeListener(window, 'resize', this.changeRowHeight);
      }
    },
    addScrollLoadListener() {
      if (!this.fixed) {
        this.addListener(this.bodyWrapper, 'scroll', this.handleScroll);
      }
    },
    removeScrollLoadListener() {
      if (!this.fixed) {
        this.removeListener(this.bodyWrapper, 'scroll', this.handleScroll);
      }
    },
    // //滚动加载：tr元素生成
    // createTrList(h) {
    //   const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index));
    //   // console.log('create scroll tr!');
    //   let trList = [];
    //   // let startIndex = this.startIndex;
    //   // 序列号数组
    //   // let indexList = [];
    //   this.indexList.forEach($index=>{
    //     let row = this.data[$index];
    //     trList.push([<tr
    //       ref={ 'row' + $index }
    //       style={ this.rowStyle ? this.getRowStyle(row, $index) : null }
    //       key={ this.table.rowKey ? this.getKeyOfRow(row, $index) : $index }
    //       on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
    //       on-click={ ($event) => this.handleClick($event, row) }
    //       on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
    //       on-mouseenter={ () => this.handleMouseEnter($index) }
    //       on-mouseleave={ () => this.handleMouseLeave() }
    //       on-dragstart={ ($event) => this.handleDragStart($event, row, $index) }
    //       on-drag={ ($event) => this.handleDrag($event, row, $index) }
    //       on-dragend={ ($event) => this.handleDragEnd($event, row, $index) }
    //       on-dragenter={ ($event) => this.handleDragEnter($event, row, $index) }
    //       on-dragover={ ($event) => this.handleDragOver($event, row, $index) }
    //       on-dragleave={ ($event) => this.handleDragLeave($event, row, $index) }
    //       class={ [this.getRowClass(row, $index)] }
    //       draggable={ this.store.states.isDraggable }>
    //       {
    //         this._l(this.columns, (column, cellIndex) => {
    //           const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
    //           if (!rowspan || !colspan) {
    //             return '';
    //           } else {
    //             if (rowspan === 1 && colspan === 1) {
    //               return (
    //                 <td
    //                   style={ this.getCellStyle($index, cellIndex, row, column) }
    //                   class={ this.getCellClass($index, cellIndex, row, column) }
    //                   on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
    //                   on-mouseleave={ this.handleCellMouseLeave }>
    //                   {
    //                     column.renderCell.call(
    //                       this._renderProxy,
    //                       h,
    //                       {
    //                         row,
    //                         column,
    //                         $index,
    //                         store: this.store,
    //                         _self: this.context || this.table.$vnode.context
    //                       },
    //                       columnsHidden[cellIndex]
    //                     )
    //                   }
    //                 </td>
    //               );
    //             } else {
    //               return (
    //                 <td
    //                   style={ this.getCellStyle($index, cellIndex, row, column) }
    //                   class={ this.getCellClass($index, cellIndex, row, column) }
    //                   rowspan={ rowspan }
    //                   colspan={ colspan }
    //                   on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
    //                   on-mouseleave={ this.handleCellMouseLeave }>
    //                   {
    //                     column.renderCell.call(
    //                       this._renderProxy,
    //                       h,
    //                       {
    //                         row,
    //                         column,
    //                         $index,
    //                         store: this.store,
    //                         _self: this.context || this.table.$vnode.context
    //                       },
    //                       columnsHidden[cellIndex]
    //                     )
    //                   }
    //                 </td>
    //               );
    //             }
    //           }
    //         })
    //       }
    //     </tr>,
    //       this.store.isRowExpanded(row)
    //         ? (<tr>
    //           <td colspan={ this.columns.length } class="el-table__expanded-cell">
    //             { this.table.renderExpanded ? this.table.renderExpanded(h, { row, $index, store: this.store }) : ''}
    //           </td>
    //         </tr>)
    //         : ''
    //     ]);
    //   });
    //   return trList;
    // },
    //滚动加载：控制table的Y轴偏移
    handlePosition() {
      let n = Math.floor(this.scrollTop / this.rowHeight);
      if (n - this.reserveNum > 0) {
        return (n - this.reserveNum) * this.rowHeight;
      }
      return 0;
    },
    //解决拖拽时异常触发的问题
    handleMouseEnter(index) {
      if (!this.store.states.isDragging) {
        this.store.commit('setHoverRow', index);
      }
    },
    //解决拖拽时异常触发的问题
    handleMouseLeave() {
      if (!this.store.states.isDragging) {
        this.store.commit('setHoverRow', null);
      }
    },
    //拖拽开始方法
    handleDragStart(event, row, index) {
      try {
        event.dataTransfer.setData('effect', '解决火狐无法拖拽问题');
      } catch (e) {
        // event.effectAllowed = "all";
        // console.log('event', event);
      }
      if (this.store.states.isDraggable) {
        const table = this.table;
        this.store.states.isDragging = true;
        table.$emit('drag-start', event, row, index);
      }
    },
    //拖拽中的方法
    handleDrag(event, row, index) {
      try {
        event.dataTransfer.getData('effect');
      } catch (e) {
        // event.originalEvent.dataTransfer.effectAllowed = "move";
      }
      if (this.store.states.isDraggable) {
        const table = this.table;
        table.$emit('drag', event, row, index);
      }
    },
    //拖拽结束方法
    handleDragEnd(event, row, index) {
      if (this.store.states.isDraggable) {
        const table = this.table;
        this.store.states.isDragging = false;
        table.$emit('drag-end', event, row, index);
      }
    },
    //拖拽进入方法
    handleDragEnter(event, row, index) {
      if (this.store.states.isDraggable) {
        const table = this.table;
        table.$emit('drag-enter', event, row, index);
      }
    },
    //拖拽经过方法
    handleDragOver(event, row, index) {
      event.preventDefault();
      if (this.store.states.isDraggable) {
        const table = this.table;
        table.$emit('drag-over', event, row, index);
      }
    },
    //拖拽离开方法
    handleDragLeave(event, row, index) {
      if (this.store.states.isDraggable) {
        const table = this.table;
        table.$emit('drag-leave', event, row, index);
      }
    },
    //解决table的tooltip在ie下有时不出现的兼容问题
    handleCellMouseEnter(event, row) {
      const table = this.table;
      const cell = getCell(event);

      if (cell) {
        const column = getColumnByCell(table, cell);
        const hoverState = table.hoverState = {cell, column, row};
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      const cellChild = event.target.querySelector('.cell');
      if (!hasClass(cellChild, 'el-tooltip')) {
        return;
      }
      cellChild.style.textOverflow = 'clip';
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      let range;
      if (cellChild.childNodes.length === 1 && cellChild.childNodes[0].nodeType === 1) {
        range = cellChild.childNodes[0];
      } else {
        range = document.createRange();
        range.setStart(cellChild, 0);
        range.setEnd(cellChild, cellChild.childNodes.length);
      }
      const rangeWidth = range.getBoundingClientRect().width;
      const padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0);
      cellChild.style.textOverflow = 'ellipsis';
      // console.log('rangeWidth', rangeWidth);
      // console.log('padding', padding);
      // console.log('rangeWidth + padding', rangeWidth + padding);
      // console.log('cellChild.scrollWidth', cellChild.scrollWidth);
      // console.log('cellChild.offsetWidth', cellChild.offsetWidth);
      // console.log('rangeWidth + padding > cellChild.offsetWidth', rangeWidth + padding > cellChild.offsetWidth);
      // console.log('cellChild.scrollWidth > cellChild.offsetWidth', cellChild.scrollWidth > cellChild.offsetWidth);
      if (cellChild.textContent !== '') {
        if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && this.$refs.tooltip) {
          const tooltip = this.$refs.tooltip;
          // TODO 会引起整个 Table 的重新渲染，需要优化
          this.tooltipContent = cell.textContent || cell.innerText;
          tooltip.referenceElm = cell;
          tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
          tooltip.doDestroy();
          tooltip.setExpectedState(true);
          this.activateTooltip(tooltip);
        }
      }
    }
  },
  watch: {
    isScrollLoad: {
      handler(val) {
        this.$nextTick(()=>{
          if (val) {
            this.bodyWrapper = this.$el.parentNode;
            this.handleScroll({target: this.bodyWrapper});
            this.addScrollLoadListener();
            this.addResizeListener();
          } else {
            this.removeScrollLoadListener();
            this.removeResizeListener();
          }
        });
      },
      immediate: true
    },
    'store.states.hoverRow'(newVal, oldVal) {
      if (!this.store.states.isComplex) return;
      let oldRow;
      let newRow;
      if (this.isScrollLoad) {
        oldRow = this.$refs['row' + oldVal];
        newRow = this.$refs['row' + newVal];
      } else {
        const el = this.$el;
        if (!el) return;
        const tr = el.querySelector('tbody').children;
        const rows = [].filter.call(tr, row => hasClass(row, 'el-table__row'));
        oldRow = rows[oldVal];
        newRow = rows[newVal];
      }
      if (oldRow) {
        removeClass(oldRow, 'hover-row');
      }
      if (newRow) {
        addClass(newRow, 'hover-row');
      }
    },
    data: {
      handler() {
        if (!this.store.states.rowHeight) {
          this.changeRowHeight();
        }
        this.updateContentHeight();
        this.updateIndexList();
        // this.handleScroll({target: this.bodyWrapper});
      },
      immediate: true
    },
    totalRowNum() {
      this.updateIndexList();
    },
    rowHeight() {
      this.updateContentHeight();
    }
  }
};
