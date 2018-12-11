import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {getQuestion} from '../selectors/questions';
import {getAuthedUser} from '../selectors/users';
import {handleAnswerQuestion} from '../actions/users';
import AnswerChooser from './AnswerChooser';
import QuestionResults from './QuestionResults';

class Details extends Component {
  onAnswerQuestion = (qid, answer) => {
    const {dispatch, authedUser} = this.props;

    dispatch(handleAnswerQuestion({qid, authedUser: authedUser.id, answer}));
  };

  render() {
    const {question} = this.props;

    if (!question) return <Redirect to="/not-found" />;

    return question.hasAnswered ? (
      <QuestionResults question={question} />
    ) : (
      <AnswerChooser question={question} onAnswerQuestion={this.onAnswerQuestion} />
    );
  }
}

function mapStateToProps(state, props) {
  const {id} = props.match.params;

  return {
    question: getQuestion(state, id),
    authedUser: getAuthedUser(state),
  };
}

export default withRouter(connect(mapStateToProps)(Details));
