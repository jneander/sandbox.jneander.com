import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

import Header from './Header';
import Styles from './Styles';
import Viewport from './Viewport';
import styles from '../styles/styles.css';

export default class Grid extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
      })
    ).isRequired
  };

  static defaultProps = {
    defaultColumnWidth: 80,
    headerRowHeight: 25,
    rowHeight: 25,
    topPanelHeight: 25
  };

  constructor (props) {
    super(props);

    const columns = props.columns.map((column) => (
      {
        ...column,
        width: Math.max(column.width || 0, props.defaultColumnWidth)
      }
    ));

    this.state = {
      columns,
      dimensions: {
        height: 0,
        width: 0
      },
      totalColumnWidth: columns.reduce((sum, column) => sum + column.width, 0),
      uid: `slickgrid_${Math.round(1000000 * Math.random())}`
    };
  }

  handleMeasure = (dimensions) => { this.setState({ dimensions }) };

  render () {
    return (
      <div className={this.props.className} style={this.props.style}>
        <Styles
          {...this.props}
          uid={this.state.uid}
          columns={this.state.columns}
          totalColumnWidth={this.state.totalColumnWidth}
          width={this.state.dimensions.width}
        />

        <Measure onMeasure={this.handleMeasure} whitelist={['width', 'height']}>
          <div className={`${this.state.uid} ${styles.Grid}`}>
            <div className={styles.Grid__BeforeSink} tabIndex="0" />

            <Header
              uid={this.state.uid}
              columns={this.state.columns}
              rowHeight={this.props.headerRowHeight}
            />

            <Viewport
              uid={this.state.uid}
              columns={this.state.columns}
              data={this.props.data}
              rowHeight={this.props.rowHeight}
              totalColumnWidth={this.state.totalColumnWidth}
            />

            <div className={styles.Grid__AfterSink} tabIndex="0" />
          </div>
        </Measure>
      </div>
    );
  }
}
