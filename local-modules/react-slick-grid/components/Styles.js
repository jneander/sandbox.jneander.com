import React from 'react';
import PropTypes from 'prop-types';

export default class Grid extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor (props) {
    super(props);

    this.state = {
    };
  }

  render () {
    const rulePrefix = `.${this.props.uid}`;
    const rules = [
      `${rulePrefix} .slick-header-column { left: 1000px; }`,
      `${rulePrefix} .slick-top-panel { height: ${this.props.topPanelHeight}px; }`,
      `${rulePrefix} .slick-headerrow-columns { height: ${this.props.headerRowHeight}px; }`,
      `${rulePrefix} .slick-cell { height: ${this.props.rowHeight}px; }`,
      `${rulePrefix} .slick-row { height: ${this.props.rowHeight}px; }`
    ];

    let leftWidth = 0;
    let rightWidth = this.props.totalColumnWidth;
    this.props.columns.forEach((column, index) => {
      rules.push(`${rulePrefix} .l${index} { left: ${leftWidth}px; }`);
      rules.push(`${rulePrefix} .r${index} { right: ${rightWidth - column.width}px; }`);
      leftWidth = leftWidth + column.width;
      rightWidth = rightWidth - column.width;
    });

    return (
      <style type="text/css" ref="stylesheet">
        { rules.join('\n') }
      </style>
    );
  }
}
