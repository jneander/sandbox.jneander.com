import React, {PureComponent} from 'react'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import TabList, {TabPanel} from '@instructure/ui-tabs/lib/components/TabList'

import Layout from '../../shared/components/Layout'
import {
  accountPermissionGroups,
  accountRoles,
  coursePermissionGroups,
  courseRoles
} from './data'
import PermissionsTable from './PermissionsTable'
import styles from './styles.css'

export default class Permissions extends PureComponent {
  render() {
    return (
      <Layout>
        <div className={styles.Root}>
          <Heading level="h2" margin="0 0 medium 0">
            Permissions
          </Heading>

          <TabList>
            <TabPanel title="Course Roles" padding="none">
              <div className={styles.PermissionsTable}>
                <PermissionsTable
                  permissionGroups={coursePermissionGroups}
                  roles={courseRoles}
                />
              </div>
            </TabPanel>

            <TabPanel title="Account Roles" padding="none">
              <div className={styles.PermissionsTable}>
                <PermissionsTable
                  permissionGroups={accountPermissionGroups}
                  roles={accountRoles}
                />
              </div>
            </TabPanel>
          </TabList>
        </div>
      </Layout>
    )
  }
}
