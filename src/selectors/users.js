export function getAuthedUser({authedUser, users}) {
  return users[authedUser];
}

export function getUser({users}, id) {
  return users[id];
}

export function getUsers({users}) {
  return users;
}
