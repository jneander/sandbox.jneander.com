import React from 'react';

import HeaderCell from 'js/apps/slick-grid/components/HeaderCell';

class Header extends React.Component {
  render () {
    const { cellFactory } = this.props;

    const classes = ['Grid__Header'];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')} style={{ height: `${this.props.height}px` }}>
        {
          this.props.columns.map(column => (
            <HeaderCell
              as={cellFactory.getComponent(column)}
              column={column}
              key={column.id} />
          ))
        }
      </div>
    );
  }
}

export default Header;
