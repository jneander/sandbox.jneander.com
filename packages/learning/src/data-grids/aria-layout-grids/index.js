import React, {PureComponent} from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import Link from '@instructure/ui-elements/lib/components/Link'
import TabList, {TabPanel} from '@instructure/ui-tabs/lib/components/TabList'
import Text from '@instructure/ui-elements/lib/components/Text'

import Layout from '../../shared/components/Layout'
import ScrollableList from './ScrollableList'

const UP = 38
const RIGHT = 39
const DOWN = 40
const LEFT = 37

function locateDescendant(id) {
  const region = id.startsWith('header') ? 'header' : 'body'
  const column = region === 'header' ? id[7] : id[0]
  const row = region === 'body' ? parseInt(id[1], 10) : null
  return {column, region, row}
}

function descendantForLocation(location) {
  if (location.region === 'header') {
    return `header-${location.column}`
  }
  return `${location.column}${location.row}`
}

export default class AriaLayoutGrids extends PureComponent {
  state = {
    activeDescendant: 'b2'
  }

  handleKeyDown = event => {
    const key = event.which || event.keyCode
    console.log(key)

    let activeDescendant = this.state.activeDescendant
    let {column, region, row} = locateDescendant(activeDescendant)
    console.log(region, column, row)

    switch (event.which || event.keyCode) {
      case UP:
        if (region === 'header') {
          return
        }
        if (row === 1) {
          activeDescendant = descendantForLocation({region: 'header', column})
        } else {
          activeDescendant = descendantForLocation({region: 'body', column, row: row - 1})
        }
        break
      case DOWN:
        if (region === 'body' && row === 3) {
          return
        }
        activeDescendant = descendantForLocation({region: 'body', column, row: row + 1})
        break
      case LEFT:
        if (column === 'a') {
          return
        }
        column = column === 'c' ? 'b' : 'a'
        activeDescendant = descendantForLocation({region, column, row})
        break
      case RIGHT:
        if (column === 'c') {
          return
        }
        column = column === 'a' ? 'b' : 'c'
        activeDescendant = descendantForLocation({region, column, row})
        break
      default:
        return
    }

    event.preventDefault()
    console.log(activeDescendant)
    this.setState({activeDescendant})
  }

  render() {
    return (
      <Layout>
        <Container margin="medium" display="block">
          <Container as="header" margin="0 0 medium 0">
            <Heading level="h2">ARIA Layout Grids</Heading>
          </Container>

          <ScrollableList perPage={5} />


          <div id="testTree" tabIndex="0" role="tree" aria-label="Test" aria-activedescendant="ti2">
            <div tabIndex="-1" role="treeitem" id="ti1">
              Item One
            </div>
            <div tabIndex="-1" role="treeitem" id="ti2">
              Item Two
            </div>
            <div tabIndex="-1" role="treeitem" id="ti3">
              Item Three
            </div>
          </div>

          <div role="grid" aria-activedescendant={this.state.activeDescendant} onKeyDown={this.handleKeyDown} tabIndex="0" style={{display: 'table'}}>
            <div role="row" style={{display: 'table-row'}}>
              <div tabIndex="-1" id="header-a" role="columnheader" style={{display: 'table-cell'}}>A</div>
              <div tabIndex="-1" id="header-b" role="columnheader" style={{display: 'table-cell'}}>B</div>
              <div tabIndex="-1" id="header-c" role="columnheader" style={{display: 'table-cell'}}>C</div>
            </div>

            <div role="row" style={{display: 'table-row'}}>
              <div tabIndex="-1" id="a1" role="rowheader" style={{display: 'table-cell'}}>A1</div>
              <div tabIndex="-1" id="b1" role="gridcell" style={{display: 'table-cell'}}>B1</div>
              <div tabIndex="-1" id="c1" role="gridcell" style={{display: 'table-cell'}}>C1</div>
            </div>

            <div role="row" style={{display: 'table-row'}}>
              <div tabIndex="-1" id="a2" role="rowheader" style={{display: 'table-cell'}}>A2</div>
              <div tabIndex="-1" id="b2" role="gridcell" style={{display: 'table-cell'}}>B2</div>
              <div tabIndex="-1" id="c2" role="gridcell" style={{display: 'table-cell'}}>C2</div>
            </div>

            <div role="row" style={{display: 'table-row'}}>
              <div tabIndex="-1" id="a3" role="rowheader" style={{display: 'table-cell'}}>A3</div>
              <div tabIndex="-1" id="b3" role="gridcell" style={{display: 'table-cell'}}>B3</div>
              <div tabIndex="-1" id="c3" role="gridcell" style={{display: 'table-cell'}}>C3</div>
            </div>
          </div>
        </Container>
      </Layout>
    )
  }
}
