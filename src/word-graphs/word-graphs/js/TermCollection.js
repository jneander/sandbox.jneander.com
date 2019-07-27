class TermCollection {
  constructor($container, app) {
    this._$container = $container
    this._app = app
  }

  setTerms(terms) {
    let items = ''
    terms.forEach(term => {
      items = items + `
        <li>${term.term}</li>
      `
    })
    this._$container.innerHTML = `<ul>${items}</ul>`
  }
}
