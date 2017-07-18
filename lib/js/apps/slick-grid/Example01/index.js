import React from 'react';

import SlickGrid from 'react-slick-grid';

const columns = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'duration', name: 'Duration', field: 'duration' },
  { id: '%', name: '% Complete', field: 'percentComplete' },
  { id: 'start', name: 'Start', field: 'start' },
  { id: 'finish', name: 'Finish', field: 'finish' },
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven' }
];

const data = [];
for (let i = 0; i < 500; i++) {
  data[i] = {
    duration: '5 days',
    effortDriven: (i % 5 == 0),
    finish: '01/05/2009',
    percentComplete: Math.round(Math.random() * 100),
    start: '01/01/2009',
    title: `Task ${i}`
  };
}

export default class Example01 extends React.PureComponent {
  render () {
    return (
      <SlickGrid
        columns={columns}
        data={data}
        enableCellNavigation={true}
        enableColumnReorder={false}
        style={{ height: '500px', width: '600px' }}
      />
    );
  }
}
