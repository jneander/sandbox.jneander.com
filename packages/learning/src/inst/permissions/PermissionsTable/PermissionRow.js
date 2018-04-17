import React, {Component} from 'react'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Container from '@instructure/ui-container/lib/components/Container'
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish'
import Text from '@instructure/ui-elements/lib/components/Text'

import styles from './styles.css'

const permissionRows = [
  {id: 'create', label: 'Create'},
  {id: 'edit', label: 'Edit'},
  {id: 'delete', label: ''},
  {id: 'view', label: 'View'}
]

export default class PermissionRow extends Component {
  render() {
    return (
      <tr className={styles.PermissionGroupRow}>
        <Container as="th" padding="small" scope="row">
          <div className={`${styles.RowHeader} ic-permissions__left-header__col-wrapper`}>
            <div className="ic-permissions__header-content" >
              <Text color="brand" size="small" weight="bold">{this.props.permission.label}</Text>
            </div>
          </div>
        </Container>

        {this.props.roles.map(role => (
          <td className={styles.PermissionControlCell} key={role.id}>
            <div className={styles.ContentCell}>
              <Button variant="icon">
                <Text color="success">
                  <IconPublish title="…" />
                </Text>
              </Button>
            </div>
          </td>
        ))}
      </tr>
    )
  }
}
