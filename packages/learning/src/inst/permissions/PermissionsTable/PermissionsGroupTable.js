import React, {Component} from 'react'

import HeaderRow from './HeaderRow'
import PermissionRow from './PermissionRow'
import styles from './styles.css'

export default class PermissionsGroupTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <table className={styles.PermissionsTable}>
        <thead>
          <HeaderRow roles={this.props.roles} />
        </thead>

        <tbody>
          {this.props.group.groupPermissions.map(permission => (
            <PermissionRow
              key={permission.permissionName}
              permission={permission}
              roles={this.props.roles}
            />
          ))}
        </tbody>
      </table>
    )
  }
}
