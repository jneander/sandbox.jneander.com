import React, {Component} from 'react'

import Column from '../shared/DataTable/Column'
import DataTable from '../shared/DataTable'
import SortableColumn from './SortableColumn'
import rows from './data'
import styles from './css/styles.css'

export default class SortableDataGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        new SortableColumn({
          id: 'date',
          name: 'Date',
          onSort: direction => {
            this.setSort('date', direction)
          }
        }),
        new Column({id: 'type', name: 'Type'}),
        new Column({id: 'description', name: 'Description'}),
        new Column({id: 'category', name: 'Category'}),
        new Column({id: 'amount', name: 'Amount'}),
        new Column({id: 'balance', name: 'Balance'})
      ],
      rows: [...rows],
      sortColumn: 'date',
      sortDirection: 'ascending'
    }
  }

  setSort(sortColumn, sortDirection) {
    console.log(sortColumn, sortDirection)
    this.setState({sortColumn, sortDirection})
  }

  render() {
    return (
      <div className={styles.ExampleContainer}>
        <h4 className={styles.Heading} id="grid2Label">
          Transactions January 1 through January 7
        </h4>

        <DataTable
          aria-labelledby="grid1Label"
          columns={this.state.columns}
          navigableHeaders
          perPage={this.state.rows.length}
          rows={this.state.rows}
        />
      </div>
    )
  }
}
