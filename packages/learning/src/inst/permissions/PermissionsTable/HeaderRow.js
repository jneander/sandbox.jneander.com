import React, {PureComponent} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'

import styles from './styles.css'

export default class HeaderRow extends PureComponent {
  render() {
    return (
      <tr className={styles.HeaderRow}>
        <td className={`${styles.GroupTableColumnHeader} ${styles.RowHeader}`}>
          <Text weight="bold">Permissions</Text>
        </td>

        {this.props.roles.map(role => (
          <th className={styles.ColumnHeader} key={role.id} scope="col">
            <div className="ic-permissions__top-header__col-wrapper">
              <div className="ic-permissions__header-content">
                <Text color="brand" weight="normal">{role.name}</Text>
              </div>
            </div>
          </th>
        ))}
      </tr>
    )
  }
}
