import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Menu, Container} from 'semantic-ui-react';
import {setAuthedUser} from '../actions/authedUser';
import Logout from './Logout';

class NavBar extends Component {
  onLogout = () => {
    const {history, dispatch} = this.props;

    dispatch(setAuthedUser(null));

    history.push('/');
  };

  render() {
    const {currentUser} = this.props;

    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={NavLink} exact to="/" content="Home" />
          <Menu.Item as={NavLink} to="/add" content="New Question" />
          <Menu.Item as={NavLink} to="/leaderboard" content="Leader Board" />

          {currentUser && (
            <Menu.Item position="right">
              <Logout currentUser={currentUser} onLogout={this.onLogout} />
            </Menu.Item>
          )}
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  const currentUser = authedUser && users[authedUser];

  return {
    currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
