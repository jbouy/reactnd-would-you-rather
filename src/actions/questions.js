import {saveQuestion} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading';
import {addUserQuestion} from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_VOTE = 'ADD_VOTE';
export const ADD_QUESTION = 'ADD_QUESTION';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion({optionOneText, optionTwoText, author}) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestion({optionOneText, optionTwoText, author})
      .then(question => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion({userId: question.author, qid: question.id}));
      })
      .catch(e => {
        console.warn('Error in handleAddQuestion: ', e);
        alert('There was an error adding the question. Try again.');
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function addVote({authedUser, qid, answer}) {
  return {
    type: ADD_VOTE,
    authedUser,
    qid,
    answer,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
