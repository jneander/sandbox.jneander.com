import React from 'react';

import ExampleHarness from 'js/shared/components/ExampleHarness';

import Example01 from './Example01';

const examples = [
  { label: 'Example 1', component: Example01 }
];

export default function SlickGridExamples (props) {
  return (
    <ExampleHarness
      examples={examples}
      heading="SlickGrid"
    />
  );
}
