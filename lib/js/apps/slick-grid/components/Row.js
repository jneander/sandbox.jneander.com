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
      display: 'inline-block',
      height: `${this.props.height}px`
    };

    return (
      <div className="Grid__Row">
        <div className={this.props.className} style={style}>
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
ku}

export default Row;
