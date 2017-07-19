import React from 'react';

import styles from '../styles/styles.css';

export default class Row extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      style: {
        height: props.rowHeight,
        position: 'absolute',
        top: props.rowIndex * props.rowHeight
      }
    };
  }

  render () {
    return (
      <div className={this.props.rowIndex % 2 === 0 ? styles.Row__Even : styles.Row__Odd} style={this.state.style}>
        {
          this.props.columns.map((column, index) => (
            <div
              key={column.id}
              className={`slick-cell ${styles.RowCell} l${index} r${index}`}
            >
              { String(this.props.datum[column.field]) }
            </div>
          ))
        }
      </div>
    );
  }
}
