import React from 'react';
import Container from 'instructure-ui/lib/components/Container';
import TabList, { TabPanel } from 'instructure-ui/lib/components/TabList';

import StructureOnly from 'js/apps/grid/examples/StructureOnly';

const examples = {
  StructureOnly,
  Nothing () {
    return <span>foo</span>
  }
};

const exampleList = [
  { label: 'Structure Only', component: StructureOnly },
  { label: 'Placeholder', component () { return <span>foo</span> } }
];

export default class Grid extends React.PureComponent {
  state = {
    selectedTabIndex: 0
  };

  onExampleChange = (tabIndex) => {
    this.setState({ selectedTabIndex: tabIndex });
  }

  render () {
    const Example = exampleList[this.state.selectedExample];

    return (
      <Container margin="large" variant="simple" display="block">
        <TabList
          onChange={this.onExampleChange}
          selectedIndex={this.state.selectedTabIndex}
        >
          {
            exampleList.map(example => (
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
