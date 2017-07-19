import React from 'react';

import Row from './Row';
import styles from '../styles/styles.css';

export default class Viewport extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      totalRowHeight: props.rowHeight * props.data.length,
      visibleHeight: '473px',
      width: '508px'
    };
  }

  render () {
    return (
      <div className={styles.Viewport} style={{ height: this.state.visibleHeight }}>
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
