import React from 'react';

import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/sandbox.css';

class Main extends React.Component {
  render () {
    return (
      <Container as="main" className={styles.Main}>
        <Heading level="h2">WIP</Heading>
      </Container>
    );
  }
}

export default Main;
