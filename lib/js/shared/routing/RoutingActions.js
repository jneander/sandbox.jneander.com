import History from 'js/wrappers/History';

const Constants = ActionHelper.createConstants([
  'ROUTE_CHANGED'
]);

const RoutingActions = {
  initialize () {
    return function (dispatch, getState) {
      History.listen((location, action) => {
        dispatch({ type: Constants.ROUTE_CHANGED, payload: { location, action } });
      });
    }
  }
};

export default RoutingActions;
