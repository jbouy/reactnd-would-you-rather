import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import {Header, Segment, Grid, Image, Button} from 'semantic-ui-react';
import {getQuestion} from '../selectors/questions';

class Question extends Component {
  onViewPoll = e => {
    const {history, id} = this.props;

    history.push(`/questions/${id}`);
  };

  render() {
    const {question} = this.props;
    const {authorName, avatar, optionOne} = question;

    return (
      <Fragment>
        <Header attached="top">{authorName} asks:</Header>
        <Segment attached>
          <Grid>
            <Grid.Row divided>
              <Grid.Column width="3" verticalAlign="middle" textAlign="center">
                <Image src={avatar} size="tiny" inline />
              </Grid.Column>
              <Grid.Column width="13">
                <Header as="h4">Would you rather</Header>
                <p>...{_.truncate(optionOne.text, {length: 20})}</p>
                <Button primary basic size="small" fluid onClick={this.onViewPoll}>
                  View Poll
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Fragment>
    );
  }
}

function mapStateToProps(state, {id}) {
  return {
    question: getQuestion(state, id),
  };
}

export default withRouter(connect(mapStateToProps)(Question));
