import _ from 'lodash';

export function getAnsweredQuestions({questions, authedUser, users}) {
  const currentUser = users[authedUser];

  if (!currentUser) return [];

  const answeredIds = _.keys(currentUser.answers);

  return _.chain(questions)
    .pick(answeredIds)
    .map(q => ({
      id: q.id,
      timestamp: q.timestamp,
    }))
    .value();
}

export function getUnansweredQuestions({questions, authedUser, users}) {
  const currentUser = users[authedUser];

  const answeredIds = !!currentUser ? _.keys(currentUser.answers) : [];

  return _.chain(questions)
    .omit(answeredIds)
    .map(q => ({
      id: q.id,
      timestamp: q.timestamp,
    }))
    .value();
}

export function getQuestion({questions, authedUser, users}, id) {
  const question = questions[id];
  if (!question) return null;

  const {timestamp, optionOne, optionTwo, author} = question;
  const {name, avatarURL} = users[author] || {};

  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  return {
    id,
    authorName: name,
    timestamp,
    avatar: avatarURL,
    totalVotes,
    optionOne: {
      text: optionOne.text,
      votes: optionOneVotes,
      hasVoted: optionOne.votes.includes(authedUser),
      percentage: _.round((optionOneVotes * 100) / totalVotes, 1),
    },
    optionTwo: {
      text: optionTwo.text,
      votes: optionTwoVotes,
      hasVoted: optionTwo.votes.includes(authedUser),
      percentage: _.round((optionOneVotes * 100) / totalVotes, 1),
    },
  };
}
