import React from 'react';
import { Provider } from 'react-redux';

import canvas from 'instructure-ui/lib/themes/canvas';
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';

import Actions from 'js/apps/sandbox/Actions';
import Store from 'js/apps/sandbox/Store';
import Header from 'js/apps/sandbox/components/Header';
import Main from 'js/apps/sandbox/components/Main';

class Sandbox extends React.Component {
  constructor (props) {
    super(props);

    this.store = Store.create();
  }

  componentWillMount () {
    this.store.dispatch(Actions.initialize());
  }

  render () {
    return (
      <Provider store={this.store}>
        <ApplyTheme theme={canvas}>
          <div>
            <Header />
            <Main />
          </div>
        </ApplyTheme>
      </Provider>
    );
  }
}

export default Sandbox;
