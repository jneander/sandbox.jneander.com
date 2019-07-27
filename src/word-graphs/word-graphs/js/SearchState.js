class SearchState {
  constructor(app) {
    this._app = app
    this._loadState()
  }

  addSearchResult(termId, relatedTermIds) {
    this._state.searchResults[termId] = [...relatedTermIds]
    this._saveState()
  }

  getSearchResults(termId) {
    if (this._state.searchResults[termId] == null) {
      return null
    }
    const results = []
    this._state.searchResults[termId].forEach(id => {
      const result = this._state.termMap[id]
      if (result != null) {
        results.push(result)
      }
    })
    return results
  }

  addTerms(terms) {
    terms.forEach(term => {
      this._state.termMap[term.id] = this._state.termMap[term.id] || term
    })
    this._saveState()
  }

  getTerm(termId) {
    return this._state.termMap[termId]
  }

  getPreviousHistoryTerm() {
    return this._state.history[this._state.history.length - 2] || null
  }

  getCurrentHistoryTerm() {
    return this._state.history[this._state.history.length - 1] || null
  }

  pushHistoryTerm(term) {
    const history = [...this._state.history]
    const index = history.indexOf(term)
    if (index !== -1) {
      history.splice(index, 1)
    }
    history.push(term)
    this._state.history = history
    this._saveState()
  }

  popHistoryTerm() {
    const history = [...this._state.history]
    if (history.length > 0) {
      const item = history.pop()
      this._state.history = history
      this._saveState()
      return item
    }
    return null
  }

  relatedTermIdsFor(termId) {
    let ancestral = this._state.searchResults[termId] || []
    let sibling = []

    const allSearchedIds = Object.keys(this._state.searchResults)
    allSearchedIds.forEach(searchId => {
      const results = this._state.searchResults[searchId]
      if (results.includes(termId)) {
        ancestral.push(searchId)
        sibling = sibling.concat(results)
      }
    })

    const ancestralMap = {}
    const siblingMap = {}

    ancestral.forEach(id => ancestralMap[id] = id)
    sibling.forEach(id => {
      if (!ancestralMap[id]) {
        siblingMap[id] = id
      }
    })

    return {
      ancestral: Object.keys(ancestralMap),
      sibling: Object.keys(siblingMap)
    }
  }

  termsAreRelated(termIdA, termIdB) {
    if (this._state.searchResults[termIdA].includes(termIdB)) {
      return true
    }

    if (this._state.searchResults[termIdB].includes(termIdA)) {
      return true
    }

    const allSearchResultLists = Object.values(this._state.searchResults)
    return allSearchResultLists.some(list => (
      list.includes(termIdA) && list.includes(termIdB)
    ))
  }

  _loadState() {
    const data = window.localStorage.getItem('searchState')
    try {
      this._state = JSON.parse(data)
    } catch(e) {}

    this._state = {
      history: [],
      searchResults: {},
      termMap: {},
      ...(this._state || {})
    }
  }

  _saveState() {
    const {history, searchResults, termMap} = this._state
    const saveData = {
      history,
      searchResults,
      termMap
    }

    const searchState = JSON.stringify(saveData)
    window.localStorage.setItem('searchState', searchState)
  }
}
