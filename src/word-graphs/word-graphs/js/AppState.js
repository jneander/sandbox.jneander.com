class AppState {
  constructor(app) {
    this._app = app
    this._loadState()
  }

  get selectedTermId() {
    return this._state.selectedTermId
  }

  set selectedTermId(id) {
    this._state.selectedTermId = id
    this._saveState()
  }

  get acceptedTermIds() {
    return this._state.acceptedTermIds
  }

  addAcceptedTermId(termId) {
    if (!this._state.acceptedTermIds.includes(termId)) {
      this._state.acceptedTermIds.push(termId)
      this._saveState()
    }
  }

  addRejectedTermId(termId) {
    if (!this._state.rejectedTermIds.includes(termId)) {
      this._state.rejectedTermIds.push(termId)
      this._saveState()
    }
  }

  isAccepted(termId) {
    return this._state.acceptedTermIds.includes(termId)
  }

  isRejected(termId) {
    return this._state.rejectedTermIds.includes(termId)
  }

  _loadState() {
    const data = window.localStorage.getItem('appState')
    try {
      this._state = JSON.parse(data)
    } catch(e) {}

    this._state = {
      acceptedTermIds: [],
      rejectedTermIds: [],
      selectedTermId: null,
      ...(this._state || {})
    }
  }

  _saveState() {
    const {selectedTermId, ...saveData} = this._state
    const appState = JSON.stringify(saveData)
    window.localStorage.setItem('appState', appState)
  }
}
