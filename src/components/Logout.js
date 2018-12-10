import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {Button} from 'semantic-ui-react';
import {setAuthedUser} from '../actions/authedUser';
import {withRouter} from 'react-router-dom';
import {getAuthedUser} from '../selectors/users';

const StyledLoggedInMessage = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

class Logout extends Component {
  onLogout = e => {
    e.preventDefault();

    const {history, dispatch} = this.props;

    dispatch(setAuthedUser(null));

    history.push('/');
  };

  render() {
    const {currentUser} = this.props;
    const name = currentUser && currentUser.name ? currentUser.name : 'Unknown';

    return (
      <div>
        <StyledLoggedInMessage>Hello, {name}</StyledLoggedInMessage>

        <Button size="mini" negative onClick={this.onLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const currentUser = getAuthedUser(state);

  return {
    currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(Logout));
