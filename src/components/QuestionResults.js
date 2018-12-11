import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import AvatarContainer from './AvatarContainer';
import AnswerStatistics from './AnswerStatistics';

class QuestionResults extends Component {
  render() {
    const {question} = this.props;
    const {authorName, avatar, optionOne, optionTwo, totalVotes} = question;

    return (
      <AvatarContainer header={`Asked by ${authorName}`} avatar={avatar}>
        <Header>Results</Header>

        <AnswerStatistics answer={optionOne} totalVotes={totalVotes} />
        <AnswerStatistics answer={optionTwo} totalVotes={totalVotes} />
      </AvatarContainer>
    );
  }
}

export default QuestionResults;
