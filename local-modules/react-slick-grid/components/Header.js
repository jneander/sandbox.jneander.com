import React from 'react';

import styles from '../styles/styles.css';

export default class Header extends React.Component {
  render () {
    return (
      <div className={styles.Header}>
        <div className={styles.Header__Columns} style={{ width: '1600px' }} unselectable="on">
          {
            this.props.columns.map((column) => (
              <div
                key={column.id}
                className={styles.Header__Column}
                id={`${this.props.uid}${column.id}`}
                title=""
                style={{ width: column.width }}
              >
                <span className="slick-column-name">{ column.name }</span>
                <div className={styles.HeaderCell__ResizeHandle}></div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
