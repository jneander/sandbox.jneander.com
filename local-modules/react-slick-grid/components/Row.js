import React from 'react';

import RowCell from './RowCell';
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

  bindContainer = (ref) => { this.container = ref };

  getCellFromNode = (el) => {
    if (this.container.contains(el)) {
      const childIndex = [].findIndex.call(this.container.children, child => child.contains(el));
      return childIndex;
    }
  };

  render () {
    const rowIsActive = this.props.activeCell && this.props.activeCell.row === this.props.rowIndex;

    return (
      <div
        ref={this.bindContainer}
        className={this.props.rowIndex % 2 === 0 ? styles.Row__Even : styles.Row__Odd}
        style={this.state.style}
      >
        {
          this.props.columns.map((column, index) => (
            <RowCell
              key={index}
              column={column}
              columnIndex={index}
              datum={this.props.datum}
              isActive={rowIsActive && this.props.activeCell.cell === index}
            />
          ))
        }
      </div>
    );
  }
}
