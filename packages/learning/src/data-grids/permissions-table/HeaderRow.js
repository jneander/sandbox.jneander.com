import React, {PureComponent} from 'react'

import styles from './styles.css'

export default class HeaderRow extends PureComponent {
  static defaultProps = {
    roles: [],
    topOffset: 0
  }

  render() {
    return (
      <tr className={styles.HeaderRow}>
        <td>Permissions</td>

        {this.props.roles.map(role => (
          <th key={role.id} scope="col">
            <div className="ic-permissions__top-header__col-wrapper">
              <div
                style={{top: `${this.props.topOffset}px`}}
                className="ic-permissions__header-content"
              >
                <a href="#">{role.name}</a>
              </div>
            </div>
          </th>
        ))}
      </tr>
    )
  }
}
