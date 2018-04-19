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
          <div className={styles.Heading}>
            <Heading level="h2" margin="0 0 medium 0">
              Permissions
            </Heading>
          </div>

          <div className={styles.Content}>
            <TabList>
              <TabPanel title="Course Roles">
                <div className={styles.PermissionsTable}>
                  <PermissionsTable
                    permissionGroups={coursePermissionGroups}
                    roles={courseRoles}
                  />
                </div>
              </TabPanel>

              <TabPanel title="Account Roles">
                <div className={styles.PermissionsTable}>
                  <PermissionsTable
                    permissionGroups={accountPermissionGroups}
                    roles={accountRoles}
                  />
                </div>
              </TabPanel>
            </TabList>
          </div>
        </div>
      </Layout>
    )
  }
}
