import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div>{this.props.hasLoaded && <div>Loaded</div>}</div>
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
