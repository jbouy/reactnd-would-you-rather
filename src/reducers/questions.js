import {RECEIVE_QUESTIONS, ADD_VOTE} from '../actions/questions';
import _ from 'lodash';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_VOTE:
      console.log(state[action.qid]);
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: _.union(state[action.qid][action.answer].votes, [action.authedUser]),
          },
        },
      };
    default:
      return state;
  }
}
