class Controls {
  constructor($container, app) {
    this._$container = $container
    this._app = app

    this.handleSearchPreviousClick = this.handleSearchPreviousClick.bind(this)
    this.handleSearchTermKeyDown = this.handleSearchTermKeyDown.bind(this)
    this.handleSearchSubmitClick = this.handleSearchSubmitClick.bind(this)
    this.handleAddWordClick = this.handleAddWordClick.bind(this)
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this)
  }

  handleSearchPreviousClick(event) {
    this._app.searchPrevious()
  }

  handleSearchTermKeyDown(event) {
    const {keyCode, target} = event
    if (keyCode === 13 && target.value.trim()) { // Enter
      this._app.searchTerm(target.value.trim())
    }
  }

  handleSearchSubmitClick(event) {
    const term = this._$searchTerm.value.trim()
    if (term) {
      this._app.searchTerm(term)
    }
  }

  handleAddWordClick(event) {
    const term = this._$searchTerm.value.trim()
    if (term) {
      this._app.addArbitraryTerm(term)
    }
  }

  handleSearchResultClick(event) {
    const {id} = event.target
    if (!id) {
      return
    }

    if (id.startsWith('accept-term-')) {
      const termId = id.replace('accept-term-', '')
      this._app.acceptTerm(termId)
      return
    }

    if (id.startsWith('reject-term-')) {
      const termId = id.replace('reject-term-', '')
      this._app.rejectTerm(termId)
      return
    }

    if (id.startsWith('result-term-')) {
      const termId = id.replace('result-term-', '')
      const term = this._app.searchState.getTerm(termId)
      if (term != null) {
        this._$searchTerm.value = term.term
      }
    }
  }

  setPreviousSearchTerm(term) {
    this._$searchPrevious.innerText = term || 'N/A'
  }

  setSearchTerm(term) {
    this._$searchTerm.value = term
  }

  setSearchResults(terms) {
    if (terms.length === 0) {
      this._$searchResults.innerHTML = 'No New Results'
    }

    let listContent = ''
    terms.forEach(term => {
      listContent = listContent + `
        <li id="result-container-${term.id}">
          <span id="result-term-${term.id}">${term.term}</span>
          <button id="reject-term-${term.id}">–</button>
          <button id="accept-term-${term.id}">+</button>
        </li>
      `
    })

    this._$searchResults.innerHTML = `<ul>${listContent}</ul>`
  }

  removeSearchResult(termId) {
    const $li = this._$searchResults.querySelector(`#result-container-${termId}`)
    if ($li) {
      $li.remove()
    }
  }

  setup() {
    const previousSearchTerm = this._app.searchState.getPreviousHistoryTerm() || 'N/A'
    const currentSearchTerm = this._app.searchState.getCurrentHistoryTerm() || ''

    this._$container.innerHTML = `
      <button id="search-previous">${previousSearchTerm}</button>

      <label>
        Search: 
        <input id="search-word" type="text" />
      </label>

      <button id="search-submit" type="submit">Submit</button>
      <button id="add-word" type="submit">Add This</button>

      <div id="search-results"></div>
    `

    this._$searchPrevious = this._$container.querySelector('#search-previous')
    this._$searchPrevious.addEventListener('click', this.handleSearchPreviousClick)

    this._$searchTerm = this._$container.querySelector('#search-word')
    this._$searchTerm.addEventListener('keydown', this.handleSearchTermKeyDown)
    this._$searchTerm.value = currentSearchTerm

    const $searchSubmit = this._$container.querySelector('#search-submit')
    $searchSubmit.addEventListener('click', this.handleSearchSubmitClick)

    const $addWord = this._$container.querySelector('#add-word')
    $addWord.addEventListener('click', this.handleAddWordClick)

    this._$searchResults = this._$container.querySelector('#search-results')
    this._$searchResults.addEventListener('click', this.handleSearchResultClick)
  }

  teardown() {
    this._$searchTerm.removeEventListener('keydown', this.handleSearchTermKeyDown)
    this._$searchTerm = null
  }
}
