import React from 'react';

import canvas from 'instructure-ui/lib/themes/canvas';
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';

import Header from 'js/apps/sandbox/components/Header';
import Main from 'js/apps/sandbox/components/Main';

class Sandbox extends React.Component {
  constructor (props) {
    super(props);
  }

  onAppChange (app) {

  }

  render () {
    return (
      <ApplyTheme theme={canvas}>
        <div>
          <Header
            bundles={[]}
            onAppChange={this.onAppChange}
          />
          <Main />
        </div>
      </ApplyTheme>
    );
  }
}

export default Sandbox;
