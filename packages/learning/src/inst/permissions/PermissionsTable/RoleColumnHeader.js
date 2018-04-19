import React, {PureComponent} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'

import styles from './styles.css'

export default class RoleColumnHeader extends PureComponent {
  render() {
    return (
      <div className="ic-permissions__top-header__col-wrapper">
        <div className="ic-permissions__header-content">
          <Text color="brand" weight="normal">{this.props.column.role.name}</Text>
        </div>
      </div>
    )
  }
}
