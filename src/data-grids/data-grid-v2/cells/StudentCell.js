import React, {PureComponent} from 'react'

import styles from '../DataGrid/styles.css'

export default class StudentCell extends PureComponent {
  render() {
    const {column, row} = this.props

    return (
      <div
        aria-labelledby={`column-${column.id}-label`}
        className={styles.Cell}
        id={`row-${row.id}-label`}
        ref={this.props.focusableRef}
        role="rowheader"
        tabIndex={this.props.tabIndex}
      >
        {row[column.id]}
      </div>
    )
  }
}
