const GraphItem = {}
GraphItem.styleItemText = (item, attr = {}) => {
}

class Graph {
  constructor($container, app) {
    this._$container = $container
    this._app = app

    this.$container = $container
    this.rect = this.$container.getBoundingClientRect()
    this.width = this.$container.scrollWidth
    this.height = this.$container.scrollHeight
    this.center = {x: this.width / 2, y: this.height / 2}

    this.svgId = 'testSvgId'
    this.updateRefCount = 0
  }

  setup() {
    this.graphData = {
      links: this._app.graphState.links,
      nodes: this._app.graphState.nodes
    }

    // graph area
    let svg = d3
      .select(this.$container)
      .append('svg')
      .attr('id', this.svgId)
      .attr('width', this.width)
      .attr('height', this.height)

    // Needs to be second, just after the svg itself.
    let background = this.initBackground(this, svg)
    // background

    // Holds child components (nodes, links), i.e. all but the background
    let svgGroup = svg.append('svg:g').attr('id', 'svgGroup')
    this.svgGroup = svgGroup

    let graphLinksGroup = svgGroup
      .append('g')
      .attr('id', `links_${this.svgId}`)
      .attr('class', 'links')
    this.graphLinksGroup = graphLinksGroup

    let graphNodesGroup = svgGroup
      .append('g')
      .attr('id', `nodes_${this.svgId}`)
      .attr('class', 'nodes')
    this.graphNodesGroup = graphNodesGroup

    let zoom = d3.zoom().on('zoom', () => this.handleZoom(svgGroup))
    background.call(zoom)

    let simulation = this.initSimulation()
    this.simulation = simulation

    // update();
    this.update(this, simulation, graphNodesGroup, graphLinksGroup)
  }

  initBackground(t, svg) {
    let result = svg
      .append('rect')
      .attr('id', 'backgroundId')
      .attr('fill', '#F2F7F0')
      .attr('class', 'view')
      .attr('x', 0.5)
      .attr('y', 0.5)
      .attr('width', t.width - 1)
      .attr('height', t.height - 1)
      .on('click', () => t.handleBackgroundClicked())

    return result
  }

  initSimulation() {
    let t = this

    let result = d3
      .forceSimulation()
      .velocityDecay(0.55)
      .force(
        'link',
        d3
          .forceLink()
          .distance(300)
          .id(d => d.id)
      )
      .force(
        'charge',
        d3
          .forceManyBody()
          .strength(-100)
          .distanceMin(10000)
      )
      .force('collide', d3.forceCollide(25))
      .force('center', d3.forceCenter(t.center.x, t.center.y))

    return result
  }

  getRadius(d) {
    return 20
  }

  getCircleFillColor(node) {
    const selectedTermId = this._app.getSelectedTerm()
    return selectedTermId === node.id ? 'blue' : 'lightblue'
  }

  getTextColor(node) {
    const selectedTermId = this._app.getSelectedTerm()
    return selectedTermId === node.id ? 'white' : 'black'
  }

  handleDragStarted(d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()

    d.fx = d.x
    d.fy = d.y
  }

  handleDragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  handleDragEnded(d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0)

    d.fx = undefined
    d.fy = undefined
  }

  handleBackgroundClicked() {
    console.log(`background clicked in numero 2`)
  }

  handleZoom(svgGroup) {
    svgGroup.attr(
      'transform',
      `translate(${d3.event.transform.x}, ${d3.event.transform.y})` +
        ' ' +
        `scale(${d3.event.transform.k})`
    )
  }

  restart() {
    this.update(this, this.simulation, this.graphNodesGroup, this.graphLinksGroup)
    this.simulation.restart()
    this.simulation.alpha(1)
  }

  redrawNode(node) {
    const selection = this.graphNodesGroup.select(`g[id="${node.id}"]`)

    selection
      .select('rect')
      .classed('node', true)
      .attr('cursor', 'pointer')
      .attr('r', d => this.getRadius(d))
      .attr('fill', d => this.getCircleFillColor(d))

    // selection
    //   .select('circle')
    //   .classed('node', true)
    //   .attr('cursor', 'pointer')
    //   .attr('r', d => this.getRadius(d))
    //   .attr('fill', d => this.getCircleFillColor(d))

    selection
      .select('text')
      .attr('cursor', 'pointer')
      .attr('id', datum => 'label_' + datum.id)
      .attr('font-size', `10px`)
      .attr('text-anchor', 'middle')
      .attr('fill', datum => this.getTextColor(datum))
      .text(datum => `${datum.term}`)
  }

  update(t, simulation, graphNodesGroup, graphLinksGroup) {
    let nodes = t.graphData.nodes
    let links = t.graphData.links

    let drag = d3
      .drag()
      .on('start', d => t.handleDragStarted(d, simulation))
      .on('drag', d => t.handleDragged(d))
      .on('end', d => t.handleDragEnded(d, simulation))

    // nodes
    let graphNodesData = graphNodesGroup.selectAll('g').data(nodes, d => d.id)

    let graphNodesEnter = graphNodesData
      .enter()
      .append('g')
      .attr('id', d => d.id || null)
      .on('contextmenu', (d, i) => {
        t.remove(d)
        d3.event.preventDefault()
      })
      .on('mouseover', d => console.log(`d.id: ${d.id}`))
      .on('click', d => t.handleNodeClicked(d))
      .call(drag)

    let graphNodesExit = graphNodesData
      .exit()
      // .call((s) => console.log(`selection exiting. s: ${JSON.stringify(s)}`))
      .remove()

    // graphNodesGroup.selectAll('rect')
    //   .attr("x", function(d) { return d.x - d.bb.width/2 - paddingLeftRight/2; })
    //   .attr("y", function(d) { return d.y - d.bb.height + paddingTopBottom/2;  })
    //   .attr("width", function(d) { return d.bb.width + paddingLeftRight; })
    //   .attr("height", function(d) { return d.bb.height + paddingTopBottom; });

    graphNodesEnter
      .append('rect')

    graphNodesEnter
      .append('text')
      .attr('cursor', 'pointer')
      .attr('id', d => 'label_' + d.id)
      .attr('font-size', `10px`)
      .attr('text-anchor', 'middle')
      .attr('fill', datum => this.getTextColor(datum))
      .text(d => `${d.term}`)

    graphNodesGroup.selectAll('text')
      .each(function(datum, index) {
        datum.bb = this.getBBox() // get bounding box of text field and store it in texts array
      })

    const paddingLeftRight = 18; // adjust the padding values depending on font and font size
    const paddingTopBottom = 5;

    graphNodesEnter
      .select('rect')
      .classed('node', true)
      .attr('cursor', 'pointer')
      .attr('x', d => d.x - d.bb.width/2 - paddingLeftRight/2)
      .attr('y', d => d.y - d.bb.height + paddingTopBottom/2)
      .attr('width', d => d.bb.width + paddingLeftRight)
      .attr('height', d => d.bb.height + paddingTopBottom)
      .attr('fill', d => t.getCircleFillColor(d))

    // merge
    graphNodesData = graphNodesEnter.merge(graphNodesData)

    // links
    let graphLinksData = graphLinksGroup.selectAll('line').data(links)
    let graphLinksEnter = graphLinksData.enter().append('line')
    let graphLinksExit = graphLinksData.exit().remove()
    // merge
    graphLinksData = graphLinksEnter.merge(graphLinksData)

    simulation
      .nodes(nodes)
      .on('tick', handleTicked)
      .on('end', () => t.handleEnd())

    simulation.force('link').links(links)

    function handleTicked() {
      graphLinksData
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      // Translate the groups
      graphNodesData.attr('transform', d => {
        return 'translate(' + [d.x, d.y] + ')'
      })
    }
  }

  add(nodesToAdd, linksToAdd) {
    let t = this

    if (nodesToAdd) {
      nodesToAdd.forEach(n => t.graphData.nodes.push(n))
    }
    if (linksToAdd) {
      linksToAdd.forEach(l => t.graphData.links.push(l))
    }

    this.restart()
  }

  remove(dToRemove) {
    console.log(`dToRemove: ${JSON.stringify(dToRemove)}`)

    let t = this

    let currentNodes = t.graphData.nodes
    let currentLinks = t.graphData.links
    let nIndex = currentNodes.indexOf(dToRemove)
    if (nIndex > -1) {
      currentNodes.splice(nIndex, 1)
    }

    let toRemoveLinks = currentLinks.filter(l => {
      return l.source.id === dToRemove.id || l.target.id === dToRemove.id
    })
    toRemoveLinks.forEach(l => {
      let lIndex = currentLinks.indexOf(l)
      currentLinks.splice(lIndex, 1)
    })

    this.restart()
  }

  handleNodeClicked(node) {
    this._app.setSearchTerm(node.id)
    console.log(`node clicked: ${JSON.stringify(node)}`)

    //     let t = this;

    //     let newId = Math.trunc(Math.random() * 1000);
    //     let newNode = {"id": newId, "name": "server 22", x: d.x, y: d.y};
    //     let newNodes = [newNode];
    //     let newLinks = [{source: d.id, target: newNode.id}]

    //     t.add(newNodes, newLinks);
  }

  handleEnd() {
    console.log('end yo')
  }
}
