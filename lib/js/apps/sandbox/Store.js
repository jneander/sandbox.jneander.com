import StoreHelper from 'js/shared/helpers/StoreHelper';
import reducer from 'js/apps/sandbox/reducer';

const Store = {
  create () {
    return StoreHelper.createStore(reducer, {});
  }
};

export default Store;
