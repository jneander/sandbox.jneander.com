import React, {Component, createElement} from 'react'
import {func} from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

import ScrollSync from './ScrollSync'

export default class Measure extends Component {
  static propTypes = {
    children: func.isRequired
  }

  constructor(props) {
    super(props)

    this.bindMeasureNode = ref => {
      this.measureNode = ref

      if (this.resizeObserver) {
        if (ref) {
          this.resizeObserver.observe(ref)
        } else {
          this.resizeObserver.disconnect(this.measureNode)
        }
      }
    }

    this.measure = this.measure.bind(this)

    this.state = {
      height: null,
      left: null,
      top: null,
      width: null
    }
  }

  componentWillMount() {
    this.resizeObserver = new ResizeObserver(this.measure)
  }

  measure() {
    this.setState({
      height: this.measureNode.clientHeight,
      left: this.measureNode.clientLeft,
      top: this.measureNode.clientTop,
      width: this.measureNode.clientWidth
    })
  }

  render() {
    return (
      <ScrollSync>
        {this.props.children({
          dimensions: this.state,
          measureNodeRef: this.bindMeasureNode
        })}
      </ScrollSync>
    )
  }
}
