class State {
  constructor(app) {
    this._app = app
    this._loadData()
  }

  get links() {
    return this._state.links
  }

  get nodes() {
    return this._state.nodes
  }

  get rootNodeId() {
    return '1'
  }

  get selectedWordId() {
    return this._state.selectedWordId
  }

  set selectedWordId(id) {
    this._state.selectedWordId = id
  }

  addWord(word, parentIds = []) {
    const ids = this.nodes.map(node => parseInt(node.id, 10))
    const maxId = Math.max(...ids) || 0
    const node = {id: `${maxId + 1}`, word, x: 0, y: 0}

    this._state.nodes.push(node)
    parentIds.forEach(parentId => {
      this.addLink(parentId, node.id)
    })
    this._saveData()
    return node
  }

  _addLink(parentId, childId) {
    const link = {source: parentId, target: childId}
    this._state.links.push(link)
    return link
  }

  addLink(parentId, childId) {
    const link = this._addLink(parentId, childId)
    this._saveData()
    return link
  }

  _saveData() {
    const graphData = JSON.stringify(this._state)
    window.localStorage.setItem('graphData', graphData)
  }

  _loadData() {
    const data = window.localStorage.getItem('graphData')
    try {
      this._state = JSON.parse(data)
    } catch(e) {}

    if (!this._state) {
      this._state = {
        links: [],
        nodes: [{id: '1', word: 'root node'}]
      }
    }

    this._state.nodes = this._state.nodes.map(node => {
      return {
        id: node.id,
        word: node.word,
        x: 0,
        y: 0
      }
    })

    this._state.links = this._state.links.map(link => {
      return {
        source: link.source.id || link.source,
        target: link.target.id || link.target
      }
    })
  }
}
