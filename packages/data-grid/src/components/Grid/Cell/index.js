import React, {PureComponent} from 'react'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'

class Cell extends PureComponent {
  render() {
    const classNames = [styles.Cell]
    if (this.props.isActiveLocation) {
      classNames.push(styles.CellActive)
    }

    const style = {
      height: `${this.props.rowHeight}px`,
      left: `${this.props.columnOffset}px`,
      position: 'absolute',
      top: `${this.props.rowOffset}px`,
      width: `${this.props.column.width}px`
    }

    return (
      <div className={classNames.join(' ')} role="gridcell" style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default themeable(() => ({}), styles)(Cell)
