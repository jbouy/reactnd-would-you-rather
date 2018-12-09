import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Menu, Container} from 'semantic-ui-react';
import Logout from './Logout';

class NavBar extends Component {
  render() {
    const {loggedIn} = this.props;

    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={NavLink} exact to="/" content="Home" />
          <Menu.Item as={NavLink} to="/add" content="New Question" />
          <Menu.Item as={NavLink} to="/leaderboard" content="Leader Board" />

          {loggedIn && (
            <Menu.Item position="right">
              <Logout />
            </Menu.Item>
          )}
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    loggedIn: !!authedUser && !!users[authedUser],
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
