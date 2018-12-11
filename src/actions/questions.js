export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_VOTE = 'ADD_VOTE';

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
