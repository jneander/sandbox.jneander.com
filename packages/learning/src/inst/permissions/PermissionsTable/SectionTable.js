import React, {Component} from 'react'

import HeaderRow from './HeaderRow'
import BodyRow from './PermissionTableRow'
import styles from './styles.css'

export default class SectionTable extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <table className={styles.PermissionsTable}>
        <thead>
          <HeaderRow roles={this.props.roles} topOffset={this.state.topOffset} />
        </thead>

        <tbody>
          {this.props.section.permissions.map(permission => (
            <tr key={this.props.permission.id} className={styles.TableRow}>
              <th scope="row">
                <div className={`${styles.RowHeader} ic-permissions__left-header__col-wrapper`}>
                  <div
                    style={{left: `${this.state.leftOffset}px`}}
                    className="ic-permissions__header-content"
                  >
                    <button onClick={this.toggleExpanded(permission.id)}>
                      {this.state.expanded[permission.id] ? 'v' : '>'}
                    </button>

                    <a href="#">{permission.name}</a>
                  </div>
                </div>
              </th>

              {this.props.roles.map(role => (
                <td className={styles.PermissionControlCell} key={role.id}>
                  <div className={styles.ContentCell}>
                    <button onFocus={this.fixScroll} aria-label="toggle some permission">
                      √
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
