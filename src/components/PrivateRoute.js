import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAuthedUser} from '../selectors/users';

class PrivateRoute extends Component {
  render() {
    const {authedUser, component: Component, ...rest} = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !!authedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: getAuthedUser(state),
  };
}

export default connect(mapStateToProps)(PrivateRoute);
