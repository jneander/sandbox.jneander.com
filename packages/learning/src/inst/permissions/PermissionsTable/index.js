import React, {Component} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'
import DataGrid from '@jneander/data-grid'

import PermissionColumnHeader from './PermissionColumnHeader'
import PermissionGroupCell from './PermissionGroupCell'
import PermissionGroupRowHeader from './PermissionGroupRowHeader'
import PermissionsTableHeader from './PermissionsTableHeader'
import PermissionsGroupTable from './PermissionsGroupTable'
import RoleColumnHeader from './RoleColumnHeader'
import styles from './styles.css'

function columnsFromProps(props) {
  const columns = [
    {frozen: true, id: 'permissions', name: 'Permission', width: 300}
  ]

  props.roles.forEach(role => {
    columns.push({frozen: false, id: role.id, role, width: 125})
  })

  return columns
}

function rowsFromProps(props) {
  const rows = []

  props.permissionGroups.forEach(permissionGroup => {
    permissionGroup.groupPermissions.forEach(permission => {
      rows.push({
        id: permission.permissionName,
        permissionGroup,
        permission
      })
    })
  })

  return rows
}

export default class PermissionsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: columnsFromProps(this.props),
      rows: rowsFromProps(this.props)
    }
  }

  render() {
    return (
        <DataGrid
          columns={this.state.columns}
          headerHeight={45}
          navigableHeaders
          renderCell={props => {
            if (props.column.id === 'permissions') {
              return <PermissionGroupRowHeader {...props} />
            }
            return <PermissionGroupCell {...props} />
          }}
          renderColumnHeader={props => {
            if (props.column.id === 'permissions') {
              return <PermissionColumnHeader {...props} />
            }
            return <RoleColumnHeader {...props} />
          }}
          rowHeight={55}
          rows={this.state.rows}
        />
    )
  }
}
