import React from 'react';

import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import Link from 'instructure-ui/lib/components/Link';
import { MenuItem } from 'instructure-ui/lib/components/Menu';
import PopoverMenu from 'instructure-ui/lib/components/PopoverMenu';

import styles from 'styles/sandbox.css';

class Header extends React.Component {
  render () {
    return (
      <Container as="header" className={styles.Header}>
        <Grid vAlign="middle" colSpacing="none">
          <GridRow>
            <GridCol>
              <Link href="/">
                <Heading level="h1">Sandbox</Heading>
              </Link>
            </GridCol>

            <GridCol width="auto">
              <PopoverMenu
                trigger={
                  <Button variant="primary">Apps</Button>
                }
              >
                <MenuItem value="example">Example</MenuItem>
                <MenuItem value="slickGrid">SlickGrid</MenuItem>
                <MenuItem value="spreadsheet">Spreadsheet</MenuItem>
              </PopoverMenu>
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    );
  }
}

export default Header;
