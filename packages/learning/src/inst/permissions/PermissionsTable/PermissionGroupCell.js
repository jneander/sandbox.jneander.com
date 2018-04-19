import React, {Component} from 'react'
import Button from '@instructure/ui-buttons/lib/components/Button'
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish'
import Text from '@instructure/ui-elements/lib/components/Text'

import styles from './styles.css'

export default class PermissionGroupCell extends Component {
  render() {
    return (
      <div className={styles.ContentCell}>
        <Button variant="icon">
          <Text color="success">
            <IconPublish title="…" />
          </Text>
        </Button>
      </div>
    )
  }
}
