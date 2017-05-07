import React from 'react';

class HeaderCell extends React.Component {
  render () {
    const Cell = this.props.as;
    const classes = [`Grid__Column--${this.props.column.id}`, 'Grid__HeaderCell'];

    return (
      <div className={ classes.join(' ') }>
        <Cell column={this.props.column} />
      </div>
    );
  }
}

export default HeaderCell;
