import React from 'react';

import Row from './Row';
import styles from '../styles/styles.css';

export default class Viewport extends React.Component {
  rowMap = {};

  constructor (props) {
    super(props);

    this.state = {
      style: {
        height: 0
      },
      totalRowHeight: props.rowHeight * props.data.length,
      visibleHeight: '473px',
      width: '508px'
    };
  }

  bindContainer = (ref) => { this.container = ref };
  bindRow = (ref) => { this.rowMap[ref.props.rowIndex] = ref };

  getCellFromNode = (el) => {
    if (this.container.contains(el)) {
      const childIndex = [].findIndex.call(this.container.children, child => child.contains(el));
      const rowIndex = childIndex + this.props.renderedRangeTop;
      const row = this.rowMap[rowIndex];
      const cell = row.getCellFromNode(el);
      return { cell, row: row.props.rowIndex };
    }
  };

  get measurements () {
    const totalRowPixels = this.props.data.length * this.props.rowHeight;
    const visibleRowPixels = this.container.clientHeight;

    const visibleHeight = this.container.clientHeight;
    const hiddenPixelsAbove = this.container.scrollTop;
    const hiddenPixelsBelow = totalRowPixels - hiddenPixelsAbove - visibleRowPixels;

    const bufferRowsAbove = Math.floor(hiddenPixelsAbove / this.props.rowHeight);
    const bufferRowsBelow = Math.floor(hiddenPixelsBelow / this.props.rowHeight);
    const visibleRowCount = this.props.data.length - bufferRowsAbove - bufferRowsBelow;

    return {
      hiddenPixelsAbove,
      hiddenPixelsBelow,
      bufferRowsAbove,
      bufferRowsBelow,
      totalRowPixels,
      visibleHeight,
      visibleRowCount,
      visibleRowPixels
    }
  }

  render () {
    const rowRange = [];
    const { renderedRangeBottom, renderedRangeTop } = this.props;
    for (var i = renderedRangeTop; i < renderedRangeBottom; i++) {
      rowRange.push({ rowIndex: i, datum: this.props.data[i] });
    }

    return (
      <div className={styles.Viewport} style={{ height: this.state.visibleHeight }}>
        <div
          ref={this.bindContainer}
          className={styles.GridCanvas}
          style={{ height: this.state.totalRowHeight, width: this.props.totalColumnWidth }}
        >
          {
            rowRange.map(({ rowIndex, datum }) => (
              <Row
                key={rowIndex}
                ref={this.bindRow}
                activeCell={this.props.activeCell}
                columns={this.props.columns}
                datum={datum}
                rowHeight={this.props.rowHeight}
                rowIndex={rowIndex}
              />
            ))
          }
        </div>
      </div>
    );
  }
}
