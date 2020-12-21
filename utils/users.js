const users = [];

// add user to list
function userJoin(id, name, role, room) {
  const user = {
    id,
    name,
    role,
    room,
  };
  users.push(user);
  console.log({ user });
  return user;
}

// get number of users in a room
function getNumberOfUsersByRoom(room) {
  const usersArray = users.filter((user) => user.room === room);
  return usersArray;
}

module.exports = { userJoin, users, getNumberOfUsersByRoom };
