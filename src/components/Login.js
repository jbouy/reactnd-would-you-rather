import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Header, Segment, Form} from 'semantic-ui-react';
import {setAuthedUser} from '../actions/authedUser';
import {withRouter} from 'react-router-dom';

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
    const {
      dispatch,
      history,
      location: {
        state: {from},
      },
    } = this.props;

    const returnUrl = from && from.pathname ? from.pathname : '/';

    if (!selectedUser) return;

    dispatch(setAuthedUser(selectedUser));
    history.push(returnUrl);
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
      <Fragment>
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
      </Fragment>
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
