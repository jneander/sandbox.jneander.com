import React from 'react';

import KeyCodes from 'js/apps/grid/shared/KeyCodes';

const data = [
  { date: '01-Jan-16', type: 'Deposit', description: 'Cash Deposit', amount: '$1,000,000.00', balance: '$1,000,000.00' },
  { date: '02-Jan-16', type: 'Debit', description: 'Down Town Grocery', amount: '$250.00', balance: '$999,750.00' },
  { date: '03-Jan-16', type: 'Debit', description: 'Hot Coffee', amount: '$9.00', balance: '$999,741.00' },
  { date: '04-Jan-16', type: 'Debit', description: 'The Filling Station', amount: '$88.00', balance: '$999,653.00' },
  { date: '05-Jan-16', type: 'Debit', description: 'Tinker\s Hardware', amount: '$3,421.00', balance: '$996,232.00' },
  { date: '06-Jan-16', type: 'Debit', description: 'Cutey\s Salon', amount: '$700.00', balance: '$995,532.00' }
];

function renderRow (datum, rowIndex, grid) {
  const { row, column } = grid.state.focusPointer;
  const tabIndexFor = columnIndex => column === columnIndex && row === rowIndex ? '0' : '-1';
  const refFor = columnIndex => column === columnIndex && row === rowIndex ? grid.bindFocusedCell : undefined;

  return (
    <tr key={rowIndex}>
      <td ref={refFor(0)} tabIndex={ tabIndexFor(0) }>{ datum.date }</td>
      <td ref={refFor(1)} tabIndex={ tabIndexFor(1) }>{ datum.type }</td>
      <td>
        <a ref={refFor(2)} tabIndex={ tabIndexFor(2) } href="#">{ datum.description }</a>
      </td>
      <td ref={refFor(3)} tabIndex={ tabIndexFor(3) }>{ datum.amount }</td>
      <td ref={refFor(4)} tabIndex={ tabIndexFor(4) }>{ datum.balance }</td>
    </tr>
  );
}

function getCellFromEvent (event, grid) {
  const rows = grid.table.querySelectorAll('tbody tr');
  const row = [].findIndex.call(rows, row => row.contains(event.target));
  if (row > -1) {
    const column = [].findIndex.call(rows[row].children, cell => cell.contains(event.target));
    return { column, row: row - 1 };
  }
  return {};
}

export default class WaiDataGrid1 extends React.Component {
  state = {
    focusPointer: {
      column: 0,
      row: 0
    }
  };

  bindFocusedCell = (ref) => {
    this.activeCell = ref;
  };

  bindTableRef = (ref) => {
    this.table = ref;
  };

  focusCell = ({ column, row }) => {
    if (row >= 0 && row < data.length) {
      if (column >= 0 && column < 5) {
        this.setState({
          focusPointer: { column, row }
        }, () => {
          if (this.activeCell) {
            this.activeCell.focus();
          }
        });
      }
    }
  };

  handleClick = (event) => {
    const cell = getCellFromEvent(event, this);
    this.focusCell(cell);
  };

  handleKeyDown = (event) => {
    const key = event.which || event.keyCode;
    const { column, row } = this.state.focusPointer;

    switch (key) {
      case KeyCodes.LEFT:
        this.focusCell({ column: column - 1, row });
        break;
      case KeyCodes.RIGHT:
        this.focusCell({ column: column + 1, row });
        break;
      case KeyCodes.UP:
        this.focusCell({ column, row: row - 1 });
        break;
      case KeyCodes.DOWN:
        this.focusCell({ column, row: row + 1 });
        break;
      default:
        return;
    };

    event.preventDefault();
  };

  render () {
    return (
      <div>
        <h4 id="grid1Label">
          Transactions January 1 through January 6
        </h4>

        <table
          ref={this.bindTableRef}
          role="grid"
          aria-labelledby="grid1Label"
          className="data"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <tbody>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>

            {
              data.map((datum, index) => renderRow(datum, index, this))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
