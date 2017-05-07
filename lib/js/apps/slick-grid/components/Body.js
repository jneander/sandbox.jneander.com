import React from 'react';

import Row from 'js/apps/slick-grid/components/Row';

function getRowClassname (index, rowClassNames = []) {
  if (rowClassNames.length) {
    return rowClassNames[index % rowClassNames.length];
  }
}

class Grid extends React.Component {
  render () {
    const classes = ['Grid__Body'];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        <div className="Grid__TopBuffer" />

        {
          this.props.rows.map((row, index) => (
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

        <div className="Grid__BottomBuffer" />
      </div>
    );
  }
}

export default Grid;
