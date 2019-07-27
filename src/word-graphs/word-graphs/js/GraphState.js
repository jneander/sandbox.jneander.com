class GraphState {
  constructor(app) {
    this._app = app
    this._loadState()
  }

  get links() {
    return this._state.links
  }

  get nodes() {
    return this._state.nodes
  }

  get rootNodeId() {
    return 'memento'//this._state.rootNodeId
  }

  set rootNodeId(id) {
    this._state.rootNodeId = id
    // this._saveState()
  }

  addTerm(term, relatedTermIds = []) {
    if (this._state.nodes.some(node => node.id === term.id)) {
      return false
    }

    const node = {id: term.id, term: term.term, x: 0, y: 0}

    this._state.nodes.push(node)
    relatedTermIds.forEach(id => {
      this.addLink(id, node.id)
    })
    // this._saveState()
    return node
  }

  _addLink(sourceId, childId) {
    const alreadyLinked = this._state.links.some(link => {
      return (
        (link.source === childId && link.target === sourceId) ||
        (link.source === sourceId && link.target === childId)
      )
    })

    if (alreadyLinked) {
      return false
    }

    const link = {source: sourceId, target: childId}
    this._state.links.push(link)
    return link
  }

  addLink(sourceId, childId) {
    const link = this._addLink(sourceId, childId)
    if (link) {
      // this._saveState()
    }
    return link
  }

  _loadState() {
    // const data = window.localStorage.getItem('graphState')
    // try {
    //   this._state = JSON.parse(data)
    // } catch(e) {}

    if (!this._state) {
      this._state = {
        links: [],
        nodes: [],
        rootNodeId: null
      }
    }
  }

  _saveState() {
    const {links, nodes, rootNodeId} = this._state
    const saveData = {
      links: links.map(link => (
        {
          source: link.source.id || link.source,
          target: link.target.id || link.target
        }
      )),

      nodes: nodes.map(node => (
        {
          id: node.id,
          term: node.term,
          x: 0,
          y: 0
        }
      )),

      rootNodeId
    }

    const graphState = JSON.stringify(saveData)
    window.localStorage.setItem('graphState', graphState)
  }
}
