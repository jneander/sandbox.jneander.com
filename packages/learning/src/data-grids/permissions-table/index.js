import React, {PureComponent} from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import Heading from '@instructure/ui-elements/lib/components/Heading'

import Layout from '../../shared/components/Layout'
import data from './data'
import PermissionsTable from './PermissionsTable'

export default class PermissionsTableExample extends PureComponent {
  render() {
    return (
      <Layout>
        <Container margin="medium" display="block">
          <Container as="header" margin="0 0 medium 0">
            <Heading level="h2">Permissions Table</Heading>
          </Container>

          <Container as="div" margin="medium 0 0 0">
            <PermissionsTable {...data} />
          </Container>
        </Container>
      </Layout>
    )
  }
}
