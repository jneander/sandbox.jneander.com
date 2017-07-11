import React from 'react';
import Container from 'instructure-ui/lib/components/Container';
import TabList, { TabPanel } from 'instructure-ui/lib/components/TabList';

import StructureOnly from 'js/apps/grid/examples/StructureOnly';
import WaiDataGrid1 from 'js/apps/grid/examples/WaiDataGrid1';
import WaiDataGrid2 from 'js/apps/grid/examples/wai-data-grid-2';

const examples = [
  { label: 'Structure Only', component: StructureOnly },
  { label: 'WAI-ARIA Data Grid 1', component: WaiDataGrid1 },
  { label: 'WAI-ARIA Data Grid 2', component: WaiDataGrid2 }
];

export default class Grid extends React.PureComponent {
  state = {
    selectedTabIndex: 0
  };

  onExampleChange = (tabIndex) => {
    this.setState({ selectedTabIndex: tabIndex });
  }

  render () {
    const Example = examples[this.state.selectedExample];

    return (
      <Container margin="large" display="block">
        <TabList
          onChange={this.onExampleChange}
          selectedIndex={this.state.selectedTabIndex}
        >
          {
            examples.map(example => (
              <TabPanel key={example.label} title={example.label}>
                <example.component />
              </TabPanel>
            ))
          }
        </TabList>
      </Container>
    );
  }
}
