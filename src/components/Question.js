import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import {Header, Button} from 'semantic-ui-react';
import {getQuestion} from '../selectors/questions';
import AvatarContainer from '../components/AvatarContainer';

class Question extends Component {
  onViewPoll = e => {
    const {history, id} = this.props;

    history.push(`/questions/${id}`);
  };

  render() {
    const {question} = this.props;
    const {authorName, avatar, optionOne} = question;

    return (
      <AvatarContainer header={`${authorName} asks:`} avatar={avatar}>
        <Header as="h4">Would you rather</Header>
        <p>...{_.truncate(optionOne.text, {length: 20})}</p>
        <Button primary basic size="small" fluid onClick={this.onViewPoll}>
          View Poll
        </Button>
      </AvatarContainer>
    );
  }
}

function mapStateToProps(state, {id}) {
  return {
    question: getQuestion(state, id),
  };
}

export default withRouter(connect(mapStateToProps)(Question));
