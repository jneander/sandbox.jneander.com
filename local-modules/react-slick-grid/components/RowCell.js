import React from 'react';

import styles from '../styles/styles.css';

export default class RowCell extends React.Component {
  render () {
    const { column, columnIndex, datum } = this.props;

    return (
      <div
        className={`slick-cell ${styles.RowCell} l${columnIndex} r${columnIndex}`}
      >
        { String(datum[column.field]) }
      </div>
    );
  }
}
