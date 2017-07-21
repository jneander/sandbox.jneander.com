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
    onDebug () {},
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
      renderedRangeBottom: 0,
      renderedRangeTop: 0,
      totalGridHeight: props.data.length * props.rowHeight + props.headerRowHeight,
      totalRowHeight: props.data.length * props.rowHeight,
      totalColumnWidth: columns.reduce((sum, column) => sum + column.width, 0),
      uid: `slickgrid_${Math.round(1000000 * Math.random())}`
    };
  }

  bindViewport = (ref) => { this.viewport = ref };

  handleMeasure = (dimensions) => { this.setState({ dimensions }) };
  handleScroll = () => {
    const measurements = this.viewport.measurements;

    // this.props.onDebug(measurements);

    const newStates = [];

    if (measurements.bufferRowsAbove !== this.state.bufferRowsAbove) {
      newStates.push({ bufferRowsAbove: measurements.bufferRowsAbove });
    }

    if (measurements.bufferRowsBelow !== this.state.bufferRowsBelow) {
      newStates.push({ bufferRowsBelow: measurements.bufferRowsBelow });
    }

    const minBuffer = 3;

    let renderedRangeBottom = measurements.bufferRowsAbove + measurements.visibleRowCount;
    renderedRangeBottom = Math.min(this.props.data.length, renderedRangeBottom + minBuffer);
    if (renderedRangeBottom !== this.state.renderedRangeBottom) {
      newStates.push({ renderedRangeBottom });
    }

    const renderedRangeTop = Math.max(0, measurements.bufferRowsAbove - minBuffer);
    if (renderedRangeTop !== this.state.renderedRangeTop) {
      newStates.push({ renderedRangeTop });
    }

    this.props.onDebug(Object.assign({ ...measurements }, ...newStates));

//     console.log(newStates.length);

    if (newStates.length) {
      this.setState(Object.assign({}, ...newStates));
    }
  };

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
          <div className={`${this.state.uid} ${styles.Grid}`} onScroll={this.handleScroll}>
            <div className={styles.Grid__BeforeSink} tabIndex="0" />

            <Header
              uid={this.state.uid}
              columns={this.state.columns}
              rowHeight={this.props.headerRowHeight}
            />

            <Viewport
              ref={this.bindViewport}
              uid={this.state.uid}
              columns={this.state.columns}
              data={this.props.data}
              headerRowHeight={this.props.headerRowHeight}
              renderedRangeBottom={this.state.renderedRangeBottom}
              renderedRangeTop={this.state.renderedRangeTop}
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
