import React from 'react';

import ExampleHarness from 'js/shared/components/ExampleHarness';

import Example01 from './Example01';
import Example02 from './Example02';
import Example03 from './Example03';
import Example04 from './Example04';

const examples = [
  { label: 'No Row Headers', component: Example01 },
  { label: 'With Row Headers', component: Example02 },
  { label: 'Using Roles', component: Example03 },
  { label: 'Deeper Hierarchy', component: Example04 }
];

export default function SlickGridExamples (props) {
  return (
    <ExampleHarness
      examples={examples}
      heading="Static Grid"
    />
  );
}
