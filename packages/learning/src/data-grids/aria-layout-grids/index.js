import React, {PureComponent} from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import Link from '@instructure/ui-elements/lib/components/Link'
import TabList, {TabPanel} from '@instructure/ui-tabs/lib/components/TabList'
import Text from '@instructure/ui-elements/lib/components/Text'

import Layout from '../../shared/components/Layout'
import ScrollableList from './ScrollableList'

export default class AriaLayoutGrids extends PureComponent {
  render() {
    return (
      <Layout>
        <Container margin="medium" display="block">
          <Container as="header" margin="0 0 medium 0">
            <Heading level="h2">ARIA Layout Grids</Heading>
          </Container>

          <table role="grid" aria-rowcount="463" aria-label="Student roster for history 101">
            <thead>
              <tr aria-rowindex="1">
                <th>Last Name</th>
                <th>First Name</th>
                <th>E-mail</th>
                <th>Major</th>
                <th>Minor</th>
                <th>Standing</th>
              </tr>
            </thead>
            <tbody>
              <tr aria-rowindex="51">
                <td>Henderson</td>
                <td>Alan</td>
                <td>ahederson56@myuniveristy.edu</td>
                <td>Business</td>
                <td>Spanish</td>
                <td>Junior</td>
              </tr>
              <tr aria-rowindex="52">
                <td>Henderson</td>
                <td>Alice</td>
                <td>ahederson345@myuniveristy.edu</td>
                <td>Engineering</td>
                <td>none</td>
                <td>Sophomore</td>
              </tr>
              <tr aria-rowindex="53">
                <td>Henderson</td>
                <td>Andrew</td>
                <td>ahederson75@myuniveristy.edu</td>
                <td>General Studies</td>
                <td>none</td>
                <td>Freshman</td>
              </tr>
            </tbody>
          </table>
        </Container>
      </Layout>
    )
  }
}
