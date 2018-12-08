import React, {Component, Fragment} from 'react';
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
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/questions/:id" component={Details} />
              <PrivateRoute path="/add" component={AddQuestion} />
              <PrivateRoute path="/leaderboard" component={LeaderBoard} />
              <Redirect to="/" />
            </Switch>
          )}
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({authedUser, loadingBar}) {
  return {
    authedUser,
    hasLoaded: loadingBar && loadingBar.default === 0,
  };
}

export default connect(mapStateToProps)(App);
