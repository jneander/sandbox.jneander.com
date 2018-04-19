import React, {Component} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'

import styles from './styles.css'

export default class PermissionGroupRowHeader extends Component {
  render() {
    return (
      <div className={`${styles.RowHeader} ic-permissions__left-header__col-wrapper`}>
        <div className="ic-permissions__header-content" >
          <Text color="brand" size="small" weight="bold">{this.props.row.permission.label}</Text>
        </div>
      </div>
    )
  }
}
