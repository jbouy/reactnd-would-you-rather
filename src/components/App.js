/** @jsx jsx */

import {jsx, css} from '@emotion/core';
import {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Home from './Home';
import Details from './Details';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import NavBar from './NavBar';
import {Container} from 'semantic-ui-react';
import {hasLoaded} from '../selectors/loadingBar';

const LoginContainer = () => (
  <Container
    css={css`
      margin-top: 100px;
    `}
    text
  >
    <Route path="/login" component={Login} />
  </Container>
);

const DefaultContainer = () => (
  <Fragment>
    <NavBar />
    <Container
      text
      css={css`
        margin-top: 60px;
      `}
    >
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/questions/:id" component={Details} />
        <PrivateRoute path="/add" component={AddQuestion} />
        <PrivateRoute path="/leaderboard" component={LeaderBoard} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </Fragment>
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {this.props.hasLoaded && (
            <Fragment>
              <Switch>
                <Route path="/login" component={LoginContainer} />
                <Route component={DefaultContainer} />
              </Switch>
            </Fragment>
          )}
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasLoaded: hasLoaded(state),
  };
}

export default connect(mapStateToProps)(App);
