import React from 'react';

import styles from '../styles/styles.css';

export default class RowCell extends React.Component {
  bindContainer = (ref) => { this.container = ref };

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.isActive != this.props.isActive;
  }

  render () {
    const { column, columnIndex, datum } = this.props;
    const classNames = ['slick-cell', styles.RowCell, `l${columnIndex}`, `r${columnIndex}`];
    if (this.props.isActive) {
      classNames.push(styles.RowCellActive);
    }

    return (
      <div
        ref={this.bindContainer}
        className={classNames.join(' ')}
      >
        { String(datum[column.field]) }
      </div>
    );
  }
}
