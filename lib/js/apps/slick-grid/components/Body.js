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

    const bufferHeightAbove = this.props.rowHeight * (this.props.bufferRowsAbove || 0);
    const bufferHeightBelow = this.props.rowHeight * (this.props.bufferRowsBelow || 0);

    const visibleRows = this.props.visibleRowRange.map(index => (
      this.props.rows[index]
    ));

    return (
      <div className={classes.join(' ')}>
        <div className="Grid__BufferAbove" style={{ height: `${bufferHeightAbove}px` }} />

        {
          visibleRows.map((row, index) => (
            <Row
              cellFactory={this.props.cellFactory}
              className={getRowClassname(index, this.props.rowClassNames)}
              columns={this.props.columns}
              key={index}
              height={this.props.rowHeight}
              row={row}
              rowIndex={index} />
          ))
        }

        <div className="Grid__BufferBelow" style={{ height: `${bufferHeightBelow}px` }} />
      </div>
    );
  }
}

export default Grid;
