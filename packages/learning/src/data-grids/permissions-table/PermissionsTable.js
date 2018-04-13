import React, {Component} from 'react'
import Text from '@instructure/ui-elements/lib/components/Text'

import HeaderRow from './HeaderRow'
import styles from './styles.css'

export default class PermissionsTable extends Component {
  state = {
    leftOffset: 0,
    topOffset: 0,
    expanded: {}
  }

  // we should debounce this onScroll event because it's very trigger happy
  // and is going to kill our performance otherwise by causing soooo many re-renders a second
  onScroll = e => {
    this.setState({
      leftOffset: e.target.scrollLeft,
      topOffset: e.target.scrollTop
    })
  }

  fixScroll = e => {
    const sidebarWidth = 300
    const leftOffset = e.target.offsetParent.offsetLeft
    const leftScroll = this.contentWrapper.scrollLeft

    if (leftOffset - sidebarWidth < leftScroll) {
      const newScroll = Math.max(0, this.contentWrapper.scrollLeft - sidebarWidth)
      this.contentWrapper.scrollLeft = newScroll
    }
  }

  toggleExpanded(id) {
    return () => {
      const expanded = {...this.state.expanded}
      expanded[id] = !expanded[id]
      this.setState({expanded})
    }
  }

  renderTopHeader() {
    return (
      <tr className="ic-permissions__top-header">
        <td />
        {this.props.roles.map(role => (
          <th key={role.id} scope="col">
            <div className="ic-permissions__top-header__col-wrapper">
              <div
                style={{top: `${this.state.topOffset}px`}}
                className="ic-permissions__header-content"
              >
                <a href="#">{role.name}</a>
              </div>
            </div>
          </th>
        ))}
      </tr>
    )
  }

  renderLeftHeader(perm) {
    return (
      <th scope="row">
        <div className={`${styles.RowHeader} ic-permissions__left-header__col-wrapper`}>
          <div
            style={{left: `${this.state.leftOffset}px`}}
            className="ic-permissions__header-content"
          >
            <button onClick={this.toggleExpanded(perm.id)}>
              {this.state.expanded[perm.id] ? 'v' : '>'}
            </button>
            <a href="#">{perm.name}</a>
          </div>
        </div>
      </th>
    )
  }

  renderExpandedRows(perm) {
    const rowTypes = {
      create: 'Create',
      delete: 'Delete',
      read: 'Read',
      update: 'Update'
    }

    return Object.keys(rowTypes).map(rowType => (
      <tr key={rowType}>
        <th scope="row" className="ic-permissions__left-header__expanded">
          <div className="ic-permissions__left-header__col-wrapper">
            <div
              style={{left: `${this.state.leftOffset}px`}}
              className="ic-permissions__header-content"
            >
              <Text>{rowTypes[rowType]}</Text>
            </div>
          </div>
        </th>

        {this.props.roles.map(role => (
          <td key={role.id}>
            <div className="ic-permissions__cell-content">
              <input
                onFocus={this.fixScroll}
                type="checkbox"
                aria-label="toggle some mini permission"
              />
            </div>
          </td>
        ))}
      </tr>
    ))
  }

  renderTable() {
    return (
      <table className={styles.PermissionsTable}>
        <col className={styles.LabelColumnWidth} />

        {this.props.roles.map(role => <col className={styles.RoleColumnWidth} key={role.id} />)}

        <thead>
          <HeaderRow
            roles={this.props.roles}
            topOffset={this.state.topOffset}
            />
        </thead>

        {this.props.permissions.map(perm => (
          <tbody key={perm.id}>
            <tr className={styles.TableRow}>
              {this.renderLeftHeader(perm)}

              {this.props.roles.map(role => (
                <td className={styles.PermissionControlCell} key={role.id}>
                  <div className="ic-permissions__cell-content">
                    <button onFocus={this.fixScroll} aria-label="toggle some permission">
                      √
                    </button>
                  </div>
                </td>
              ))}
            </tr>
            {this.state.expanded[perm.id] && this.renderExpandedRows(perm)}
          </tbody>
        ))}
      </table>
    )
  }

  render() {
    return (
      <div
        className="ic-permissions__table-container"
        onScroll={this.onScroll}
        ref={c => {this.contentWrapper = c}}
      >
        {this.renderTable()}
      </div>
    )
  }
}
