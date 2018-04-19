import React, {PureComponent} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'

import styles from './styles.css'

export default class PermissionColumnHeader extends PureComponent {
  render() {
    return (
      <div className={`${styles.GroupTableColumnHeader} ${styles.RowHeader}`}>
        <Text weight="bold">Permissions</Text>
      </div>
    )
  }
}
