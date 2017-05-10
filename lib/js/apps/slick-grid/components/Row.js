import React from 'react';

import RowCell from 'js/apps/slick-grid/components/RowCell';

class Row extends React.PureComponent {
  render () {
    const { cellFactory } = this.props;

    const classes = [`Grid__Row`];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={ classes.join(' ') } style={{ height: `${this.props.height}px` }}>
        <div style={{ height: '100%', display: 'inline-block' }}>
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
      </div>
    );
  }
}

export default Row;
