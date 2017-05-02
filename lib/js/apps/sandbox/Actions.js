import History from 'js/wrappers/History';
import Router from 'js/apps/sandbox/Router';

const history = new History();

const Actions = {
  initialize () {
    return function (dispatch, getState) {
      history.listen(({ path, query }) => {
        const app = Router.match(path);
        dispatch(Actions.loadApp(app));
      });
      const location = history.getCurrentLocation();
      const app = Router.match(location.path);
      dispatch(Actions.loadApp(app));
    }
  },

  changeApp (appName) {
    return function () {
      history.setLocation(`/${appName}`);
    }
  },

  loadApp (appName) {
    return { type: 'LOAD_APP', payload: appName };
  }
};

export default Actions;
