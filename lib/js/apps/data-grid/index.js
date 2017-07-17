import React from 'react';

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';
import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';
import Select from 'instructure-ui/lib/components/Select';
import canvas from 'instructure-ui/lib/themes/canvas';

import { TableReport } from 'js/shared/debugging';
import ExampleX from './ExampleX';

const examples = [
  { label: 'My Example', component: ExampleX }
];

class DataGridExamples extends React.Component {
  state = {
    debugData: {},
    selectedExample: examples[0]
  };

  onDebug = (debugData) => {
    this.setState({ debugData });
  };

  onExampleChange = (event) => {
    this.setState({
      selectedExample: examples.find(example => example.label === event.target.value)
    });
  };

  render () {
    const Example = this.state.selectedExample;

    return (
      <ApplyTheme theme={canvas}>
        <Container as="div" padding="large">
          <main style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: '0 0 200px', margin: '0 20px 0 0' }}>
              <Container as="header" margin="0 0 medium 0">
                <Heading level="h2">DataGrid</Heading>
              </Container>

              <Container as="div" margin="0 0 medium 0">
                <Select
                  label="Examples"
                  onChange={this.onExampleChange}
                  value={Example.label}
                >
                  {
                    examples.map(example => (
                      <option key={example.label} value={example.label}>{ example.label }</option>
                    ))
                  }
                </Select>
              </Container>

              <TableReport data={this.state.debugData} />
            </div>

            <Example.component debug={this.onDebug}/>
          </main>
        </Container>
      </ApplyTheme>
    );
  }
}

export default DataGridExamples;
