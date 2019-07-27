class App {
  constructor(config) {
    this._config = config

    this.appState = new AppState(this)
    this.searchState = new SearchState(this)
    this.graphState = new GraphState(this)

    const $controls = document.getElementById(config.controlsId)
    this.controls = new Controls($controls, this)

    const $graph = document.getElementById(config.graphId)
    this.graph = new Graph($graph, this)

    const $termCollection = document.getElementById(config.termCollection)
    this.termCollection = new TermCollection($termCollection, this)
  }

  async start() {
    this.controls.setup()
    this.graph.setup()
    this.addTermsToGraph(this.appState.acceptedTermIds)
    this.updateTermCollection()

    for (const termId of this.appState.acceptedTermIds) {
      const term = this.searchState.getTerm(termId)
      await this._getSearchResultsForTerm(term.term)
    }
  }

  updateTermCollection() {
    const acceptedTerms = this.appState.acceptedTermIds.map(termId => this.searchState.getTerm(termId))
    this.termCollection.setTerms(acceptedTerms)
  }

  searchPrevious() {
    this.searchState.popHistoryTerm()
    const currentSearchTerm = this.searchState.getCurrentHistoryTerm()
    const previousSearchTerm = this.searchState.getPreviousHistoryTerm()
    this.controls.setPreviousSearchTerm(previousSearchTerm)
    if (currentSearchTerm) {
      this.controls.setSearchTerm(currentSearchTerm)
      this._searchTerm(currentSearchTerm)
    }
  }

  setSearchTerm(term) {
    this.controls.setSearchTerm(term)
  }

  addArbitraryTerm(word) {
    const term = {id: TermApi.termId(word), term: word}
    this.searchState.addTerms([term])
    this.appState.addAcceptedTermId(term.id)
    this.addTermToGraph(term.id)
    this._getSearchResultsForTerm(word)
  }

  async searchTerm(term) {
    this.searchState.pushHistoryTerm(term)
    const previousSearchTerm = this.searchState.getPreviousHistoryTerm()
    this.controls.setPreviousSearchTerm(previousSearchTerm)
    return this._searchTerm(term)
  }

  async _searchTerm(term) {
    let results = await this._getSearchResultsForTerm(term)
    results = results.filter(result => {
      return !this.appState.isAccepted(result.id) && !this.appState.isRejected(result.id)
    })
    this.controls.setSearchResults(results)
  }

  async _getSearchResultsForTerm(term) {
    const termId = TermApi.termId(term)
    let results = this.searchState.getSearchResults(termId)

    if (results == null) {
      try {
        console.log(`searching for term ${term}`)
        results = await TermApi.findRelatedTerms(term)
        this.searchState.addTerms(results)
        this.searchState.addSearchResult(termId, results.map(result => result.id))
      } catch(e) {
        console.error(e)
      }
    }

    return results
  }

  acceptTerm(termId) {
    this.appState.addAcceptedTermId(termId)
    this.controls.removeSearchResult(termId)
    this.addTermToGraph(termId)
    const term = this.searchState.getTerm(termId)
    this._getSearchResultsForTerm(term.term)
  }

  rejectTerm(termId) {
    this.appState.addRejectedTermId(termId)
    this.controls.removeSearchResult(termId)
  }

  addTermsToGraph(termIds) {
    termIds.map(termId => this._addTermToGraph(termId))
    this.graph.restart()
  }

  addTermToGraph(termId) {
    this._addTermToGraph(termId)
    this.graph.restart()
  }

  _addTermToGraph(termId) {
    const relatedTerms = this.searchState.relatedTermIdsFor(termId)
    let relatedTermIds = relatedTerms.ancestral.filter(id => this.appState.isAccepted(id))
    if (relatedTermIds.length === 0) {
      relatedTermIds = relatedTerms.sibling.filter(id => this.appState.isAccepted(id)).slice(0, 1)
    }

    const term = this.searchState.getTerm(termId)

    if (relatedTermIds.length === 0 && this.graphState.rootNodeId != null) {
      relatedTermIds.push(this.graphState.rootNodeId)
    }

    const node = this.graphState.addTerm(term, relatedTermIds)
    if (node && this.graphState.rootNodeId == null) {
      this.graphState.rootNodeId = node.id
    }
  }

  getSelectedTerm() {
    return this.appState.selectedTermId
  }

  setSelectedTerm(id) {
    const {selectedTermId} = this.appState
    this.appState.selectedTermId = id
    if (selectedTermId != null) {
      const node = this.graphState.nodes.find(n => n.id === selectedTermId)
      this.graph.redrawNode(node)
    }
    if (id) {
      const node = this.graphState.nodes.find(n => n.id === id)
      this.graph.redrawNode(node)
    }
    // this.graph.restart()
  }
}

const app = new App({
  controlsId: 'controls',
  graphId: 'graph',
  termCollection: 'term-collection'
})

app.start()
