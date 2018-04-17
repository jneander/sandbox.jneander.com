import React, {Component} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'
import {ScrollSyncPane} from 'react-scroll-sync'

import styles from './styles.css'

export default class PermissionsTableHeader extends Component {
  render() {
    return (
      <div role="presentation">
        <div className={styles.PermissionColumnContainer}>
          Permissions
        </div>

        <ScrollSyncPane>
          <div className={styles.PermissionsTableHeader__ScrollContainer}>
            {this.props.roles.map(role => (
              <div className={styles.PermissionsTableHeader__Cell} key={role.id}>
                <a href="#">{role.name}</a>
              </div>
            ))}
          </div>
        </ScrollSyncPane>
      </div>
    )
  }
}
