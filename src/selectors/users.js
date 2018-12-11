import _ from 'lodash';

export function getAuthedUser({authedUser, users}) {
  return users[authedUser];
}

export function getUser({users}, id) {
  return users[id];
}

export function getUsers({users}) {
  return users;
}

export function getUserLeaderBoard({users}) {
  return _.chain(users)
    .map(u => {
      return {
        id: u.id,
        name: u.name,
        avatarURL: u.avatarURL,
        answered: _.keys(u.answers).length,
        created: u.questions.length,
        score: _.keys(u.answers).length + u.questions.length,
      };
    })
    .sortBy(u => -u.score)
    .value();
}
