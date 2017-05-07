import React from 'react';

import Body from 'js/apps/slick-grid/components/Body';
import GridStyles from 'js/apps/slick-grid/components/GridStyles';
import Header from 'js/apps/slick-grid/components/Header';

import HeaderCell from 'js/apps/slick-grid/customization/HeaderCell';
import HeaderCellComponentFactory from 'js/apps/slick-grid/customization/HeaderCellComponentFactory';
import RowCell from 'js/apps/slick-grid/customization/RowCell';
import RowCellComponentFactory from 'js/apps/slick-grid/customization/RowCellComponentFactory';

const headerCellFactory = new HeaderCellComponentFactory();
const rowCellFactory = new RowCellComponentFactory();

class Grid extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      totalRowHeight: this.props.rows.length * this.props.rowHeight,
      totalGridHeight: this.props.rows.length * this.props.rowHeight + this.props.headerHeight
    };

    this.handleGridScroll = this.handleGridScroll.bind(this);
  }

  handleGridScroll (event) {
    const visibleRowsHeight = event.currentTarget.clientHeight - this.props.headerHeight;

    const visibleHeight = event.currentTarget.clientHeight;
    const hiddenAbove = event.currentTarget.scrollTop;
    const hiddenBelow = this.state.totalRowHeight - hiddenAbove - visibleRowsHeight;

    const hiddenRowsAbove = Math.floor(hiddenAbove / this.props.rowHeight);
    const hiddenRowsBelow = Math.floor(hiddenBelow / this.props.rowHeight);
    const visibleRowCount = this.props.rows.length - hiddenRowsAbove - hiddenRowsBelow;

    this.props.debug({
      scrollTop: event.currentTarget.scrollTop,
      totalGridHeight: this.state.totalGridHeight,
      totalRowHeight: this.state.totalRowHeight,
      visibleHeight,
      hiddenAbove,
      hiddenBelow,
      hiddenRowsAbove,
      hiddenRowsBelow,
      visibleRowCount
    });
  }

  render () {
    const classes = ['Grid'];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')} onScroll={this.handleGridScroll}>
        <GridStyles columns={this.props.columns} />

        <Header
          cellFactory={this.props.headerCellFactory}
          className={this.props.gridHeaderClassName}
          columns={this.props.columns}
          height={this.props.headerHeight} />

        <Body
          cellFactory={this.props.rowCellFactory}
          className={this.props.gridBodyClassName}
          columns={this.props.columns}
          rowClassNames={this.props.rowClassNames}
          rowHeight={this.props.rowHeight}
          rows={this.props.rows} />
      </div>
    );
  }
}

export default Grid;
