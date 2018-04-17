import React, {Component} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'
import {ScrollSync} from 'react-scroll-sync'

import PermissionsTableHeader from './PermissionsTableHeader'
import PermissionsGroupTable from './PermissionsGroupTable'
import styles from './styles.css'

export default class PermissionsTable extends Component {
  render() {
    return (
      <ScrollSync vertical={false}>
        <div className={styles.PermissionsTableContainer}>
          <PermissionsTableHeader roles={this.props.roles} />

          <div className={styles.GroupTablesContainer}>
            {this.props.permissionGroups.map((group, index) => (
              <PermissionsGroupTable
                group={group}
                key={index}
                roles={this.props.roles}
              />
            ))}
          </div>
        </div>
      </ScrollSync>
    )
  }
}
