import React from 'react';
import { connect } from 'react-redux';

import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import Link from 'instructure-ui/lib/components/Link';
import { MenuItem } from 'instructure-ui/lib/components/Menu';
import PopoverMenu from 'instructure-ui/lib/components/PopoverMenu';
import Typography from 'instructure-ui/lib/components/Typography';

import styles from 'styles/sandbox.css';
import Actions from 'js/apps/sandbox/Actions';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.onAppChange = this.onAppChange.bind(this);
  }

  onAppChange (event, value) {
    this.props.onAppChange(value);
  }

  render () {
    return (
      <Container as="header" className={styles.Header}>
        <Grid vAlign="middle" colSpacing="small">
          <GridRow>
            <GridCol>
              <Link href="/">
                <Heading level="h1">Sandbox</Heading>
              </Link>
            </GridCol>

            <GridCol width="auto">
              <Typography>{ this.props.app }</Typography>
            </GridCol>

            <GridCol width="auto">
              <PopoverMenu
                onSelect={this.onAppChange}
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

function mapStateToProps (state, ownProps) {
  return {
    app: state.sandboxApp
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onAppChange (appName) {
      dispatch(Actions.changeApp(appName));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
