import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Container, Header, Segment, Form} from 'semantic-ui-react';
import styled from '@emotion/styled';
import {setAuthedUser} from '../actions/authedUser';
import {withRouter} from 'react-router-dom';

const LoginContainer = styled(Container)`
  margin-top: 100px;
`;

class Login extends Component {
  state = {
    selectedUser: this.props.authedUser,
  };

  handleChange = (e, {value}) => {
    const selectedUser = value;

    this.setState(() => ({
      selectedUser,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const {selectedUser} = this.state;
    const {dispatch, history} = this.props;

    if (!selectedUser) return;

    dispatch(setAuthedUser(selectedUser));
    history.push('/');
  };

  render() {
    const {users} = this.props;
    const {selectedUser} = this.state;

    const userOptions = _.map(users, user => ({
      text: user.name,
      value: user.id,
      image: {avatar: true, src: user.avatarURL},
    }));

    return (
      <LoginContainer text>
        <Header attached="top" textAlign="center">
          Welcome to the Would You Rather App
          <Header.Subheader>Please sign in to continue</Header.Subheader>
        </Header>

        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Dropdown
              placeholder="Select a user"
              fluid
              selection
              options={userOptions}
              value={selectedUser}
              onChange={this.handleChange}
            />

            <Form.Button fluid primary type="submit">
              Sign In
            </Form.Button>
          </Form>
        </Segment>
      </LoginContainer>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    authedUser,
    users: _.map(users, ({id, name, avatarURL}) => ({
      id,
      name,
      avatarURL,
    })),
  };
}

export default withRouter(connect(mapStateToProps)(Login));
