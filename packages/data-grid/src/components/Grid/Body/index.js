import React, {Component} from 'react'
import themeable from '@instructure/ui-themeable'

import Cell from '../Cell'
import Row from '../Row'
import styles from './styles.css'

function getLocationFromEvent(event, self) {
  const rows = self.rowGroup.children
  let rowIndex = [].findIndex.call(rows, row => row.contains(event.target))
  if (rowIndex !== -1) {
    let columnIndex = [].findIndex.call(rows[rowIndex].children, cell =>
      cell.contains(event.target)
    )
    if (columnIndex !== -1) {
      return {
        columnId: self.props.columns[columnIndex].id,
        region: 'body',
        rowId: self.props.rows[rowIndex].id
      }
    }
  }
  return {}
}

class Body extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.bindRowGroup = ref => {
      this.rowGroup = ref
    }

    // this._cellCache = {}
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.activeLocation !== this.props.activeLocation
  }

  handleClick(event) {
    const location = getLocationFromEvent(event, this)
    this.props.onClick(event, location)
  }

  render() {
    const style = {
      top: `${this.props.headerHeight}px`
    }

    const {activeLocation, bindActiveElement, columns, rows} = this.props

    const isActiveLocation = (row, column) => {
      return row.id === activeLocation.rowId && column.id === activeLocation.columnId
    }

    const columnStart = columnIndex =>
      columns.slice(0, columnIndex).reduce((sum, column) => sum + column.width, 0)

    const refFor = (row, column) => (isActiveLocation(row, column) ? bindActiveElement : undefined)
    const tabIndexFor = (row, column) => (isActiveLocation(row, column) ? '0' : '-1')

    const cells = []

    let rowOffset = 0
    let columnOffset

    for (let r = 0; r < rows.length; r++) {
      const row = rows[r]
      const rowElementId = `row-${row.id}-label`

      columnOffset = 0

      for (let c = 0; c < columns.length; c++) {
        const column = columns[c]

        cells.push(
          <Cell
            column={column}
            columnOffset={columnOffset}
            isActiveLocation={isActiveLocation(row, column)}
            key={`${row.id}_${column.id}`}
            rowHeight={this.props.rowHeight}
            rowOffset={r * this.props.rowHeight}
          >
            {this.props.renderCell({
              'aria-labelledby': `column-${column.id}-label,${rowElementId}`,
              column,
              focusableRef: refFor(column.id),
              isActiveLocation: isActiveLocation(row, column),
              row,
              tabIndex: tabIndexFor(column.id)
            })}
          </Cell>
        )

        columnOffset += column.width
      }
    }

    return (
      <div
        className={styles.Body}
        onClick={this.handleClick}
        ref={this.bindRowGroup}
        role="rowgroup"
        style={style}
      >
        {cells}
      </div>
    )
  }

  // _deriveCellsFromProps(props) {
  //   this._cells = []
  // }
}

export default themeable(() => ({}), styles)(Body)
