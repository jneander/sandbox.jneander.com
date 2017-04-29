import history from 'history';

let createHistory;

if (process.env.NODE_ENV === 'test') {
  createHistory = require('history/createMemoryHistory');
} else {
  createHistory = require('history/createBrowserHistory');
}

const history = createHistory();
let unlisten = null;

const History = {
  ...history,

  listen (callback) {
    History.unlisten();
    unlisten = history.listen(callback);
  },

  unlisten () {
    if (unlisten) {
      unlisten();
      unlisten = null;
    }
  }
};
