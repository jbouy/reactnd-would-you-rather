import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Menu, Container} from 'semantic-ui-react';

const Logout = ({currentUser, onLogout}) => <p>Hello, {currentUser.name}</p>;

class NavBar extends Component {
  render() {
    const {currentUser} = this.props;

    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={NavLink} exact to="/" content="Home" />
          <Menu.Item as={NavLink} to="/add" content="New Question" />
          <Menu.Item as={NavLink} to="/leaderboard" content="Leader Board" />

          {/* {currentUser && (
            <Menu.Item>
              <Logout currentUser={currentUser} />
            </Menu.Item>
          )} */}
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
