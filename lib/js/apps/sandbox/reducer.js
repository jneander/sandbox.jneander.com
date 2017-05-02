import ReducerHelper from 'js/shared/helpers/ReducerHelper';

const handlers = {};

handlers['LOAD_APP'] = (state, { payload }) => (
  {
    ...state,
    sandboxApp: payload
  }
);

export default ReducerHelper.buildReducer(handlers);
