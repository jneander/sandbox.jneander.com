import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

import Header from './Header';
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
    headerRowHeight: 25,
    rowHeight: 25
  };

  constructor (props) {
    super(props);

    this.state = {
      dimensions: {
        height: 0,
        width: 0
      },
      uid: `slickgrid_${Math.round(1000000 * Math.random())}`
    };
  }

  handleMeasure = (dimensions) => { this.setState({ dimensions }) };

  render () {
    return (
      <Measure onMeasure={this.handleMeasure} whitelist={['width', 'height']}>
        <div className={styles.Grid} style={this.props.style}>
          <div className={styles.Grid__BeforeSink} tabIndex="0" />

          <Header
            uid={this.state.uid}
            columns={this.props.columns}
            rowHeight={this.props.headerRowHeight}
          />

          <Viewport
            uid={this.state.uid}
            columns={this.props.columns}
            data={this.props.data}
            rowHeight={this.props.rowHeight}
          />
        </div>
      </Measure>
    );
  }
}
