import history from 'history';
import qs from 'qs';

let createHistory;

if (process.env.NODE_ENV === 'test') {
  createHistory = require('history/createMemoryHistory').default;
} else {
  createHistory = require('history/createHashHistory').default;
}

function parseLocation (location) {
  return {
    path: location.pathname,
    query: qs.parse(location.query)
  }
}

class History {
  constructor () {
    this.internals = {
      history: createHistory()
    };
  }

  listen (callback) {
    this.unlisten();
    this.internals.unlisten = this.internals.history.listen((location, action) => {
      callback(parseLocation(location));
    });
  }

  unlisten () {
    if (this.internals.unlisten) {
      this.internals.unlisten();
      this.internals.unlisten = null;
    }
  }

  setLocation (location) {
    if (this.internals.history.location.pathname !== location) {
      this.internals.history.push(location);
    }
  }

  getCurrentLocation () {
    return parseLocation(this.internals.history.location);
  }
}

export default History;
