import React from 'react';

class RowCell extends React.Component {
  render () {
    const Cell = this.props.as;
    const classes = [`Grid__Column--${this.props.column.id}`, 'Grid__RowCell'];

    return (
      <div className={ classes.join(' ') }>
        <Cell column={this.props.column} row={this.props.row} />
      </div>
    );
  }
}

export default RowCell;
