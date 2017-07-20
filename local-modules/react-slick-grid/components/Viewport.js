import React from 'react';

import Row from './Row';
import styles from '../styles/styles.css';

export default class Viewport extends React.Component {
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
    return (
      <div ref={this.bindContainer} className={styles.Viewport} style={{ height: this.state.visibleHeight }}>
        <div
          className={styles.GridCanvas}
          style={{ height: this.state.totalRowHeight, width: this.props.totalColumnWidth }}
        >
          {
            this.props.data.map((datum, index) => (
              <Row
                key={index}
                columns={this.props.columns}
                datum={datum}
                rowHeight={this.props.rowHeight}
                rowIndex={index}
              />
            ))
          }
        </div>
      </div>
    );
  }
}
