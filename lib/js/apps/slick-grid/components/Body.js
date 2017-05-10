import React from 'react';

import Row from 'js/apps/slick-grid/components/Row';

function getRowClassname (index, rowClassNames = []) {
  if (rowClassNames.length) {
    return rowClassNames[index % rowClassNames.length];
  }
}

class Grid extends React.PureComponent {
  render () {
    const classes = ['Grid__Body'];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    const visibleRows = this.props.visibleRowRange.map(index => (
      this.props.rows[index]
    ));

    const style = {
      height: `${this.props.rows.length * this.props.rowHeight}px`
    };

    const renderedRows = visibleRows.map((row, index) => {
      const rowIndex = this.props.bufferRowsAbove + index;
      return (
        <Row
          cellFactory={this.props.cellFactory}
          className={getRowClassname(rowIndex, this.props.rowClassNames)}
          columns={this.props.columns}
          key={rowIndex}
          height={this.props.rowHeight}
          row={row}
          rowIndex={rowIndex} />
      );
    });

    return (
      <div className={classes.join(' ')} style={style}>
        { renderedRows }
      </div>
    );
  }
}

export default Grid;
