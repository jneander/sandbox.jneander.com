import React from 'react';

export default class TextCell extends React.PureComponent {
  bindTableCell = (ref) => { this.tableCell = ref };

  focus = () => {
    this.tableCell.focus();
  };

  render () {
    return (
      <td ref={this.bindTableCell} tabIndex={this.props.isActive ? '0' : '-1'}>
        { this.props.content }
      </td>
    );
  }
}
