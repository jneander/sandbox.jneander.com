const TermApi = {}

TermApi.termId = term => {
  return term.trim().toLowerCase().replace(/[\s]+/, '_')
}

TermApi.findRelatedTerms = term => {
  return new Promise((resolve, reject) => {
    const query = term.trim().toLowerCase().replace(/[\s]+/, '+')
    const url = `https://api.datamuse.com/words?ml=${query}`
    const request = new XMLHttpRequest()

    request.open('GET', url, true)
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText)
        resolve(data.map(({word}) => ({id: TermApi.termId(word), term: word})))
      } else {
        reject(new Error(request.responseText))
      }
    };

    request.onerror = error => {
      // There was a connection error of some sort
      reject(error)
    }

    request.send()
  })
}
