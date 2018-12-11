import {saveQuestionAnswer} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading';
import {addVote} from './questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function addUserQuestion({userId, qid}) {
  return {
    type: ADD_USER_QUESTION,
    userId,
    qid,
  };
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addAnswer({qid, answer, authedUser}) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(answer) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestionAnswer(answer)
      .then(() => {
        dispatch(addAnswer(answer));
        dispatch(addVote(answer));
      })
      .catch(e => {
        console.warn('Error in handleAnswerQuestion: ', e);
        alert('There was an error answering the question. Try again.');
      })
      .then(() => dispatch(hideLoading()));
  };
}
