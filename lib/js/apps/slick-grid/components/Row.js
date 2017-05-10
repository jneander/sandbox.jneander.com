import React from 'react';

import RowCell from 'js/apps/slick-grid/components/RowCell';

class Row extends React.PureComponent {
  render () {
    const { cellFactory } = this.props;

    const classes = [`Grid__Row`];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    const style = {
      height: `${this.props.height}px`,
      left: 0,
      position: 'absolute',
      right: 0,
      top: `${this.props.height * this.props.rowIndex}px`
    };

    return (
      <div className={classes.join(' ')} style={style}>
        {
          this.props.columns.map((column, index) => (
            <RowCell
              as={cellFactory.getComponent(column, this.props.row)}
              column={column}
              row={this.props.row}
              columnId={column.id}
              key={index} />
          ))
        }
      </div>
    );
  }
}

export default Row;
