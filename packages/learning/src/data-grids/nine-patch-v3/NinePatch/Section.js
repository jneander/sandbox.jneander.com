import React, {PureComponent} from 'react'

import Subsection from './Subsection'
import styles from './styles.css'

export default class Section extends PureComponent {
  static defaultProps = {
    horizontalScroll: false
  }

  render() {
    const className = this.props.horizontalScroll ? styles.ScrollableSection : styles.FrozenSection
    const contentWidth = this.props.columns.reduce((sum, column) => sum + column.width, 0)
    const bottomContentHeight = this.props.bottomRows.length * this.props.rowHeight
    const scrollableContentHeight = this.props.scrollableRows.length * this.props.rowHeight
    const topContentHeight = this.props.topRows.length * this.props.rowHeight

    return (
      <div className={className}>
        {this.props.topRows.length > 0 && (
          <Subsection
            contentHeight={topContentHeight}
            contentWidth={contentWidth}
            horizontalScroll={this.props.horizontalScroll}
            rows={this.props.topRows}
          />
        )}

        <Subsection
          contentHeight={scrollableContentHeight}
          contentWidth={contentWidth}
          horizontalScroll={this.props.horizontalScroll}
          rows={this.props.scrollableRows}
          verticalScroll
        />

        {this.props.topRows.length > 0 && (
          <Subsection
            contentHeight={bottomContentHeight}
            contentWidth={contentWidth}
            horizontalScroll={this.props.horizontalScroll}
            rows={this.props.bottomRows}
          />
        )}
      </div>
    )
  }
}
