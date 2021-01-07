const { updateSession } = require("./sessionData");

const users = [];

// add user to list, update session
function userJoin(id, name, role, room) {
  const user = {
    id,
    name,
    role,
    room,
  };
  const index = users.findIndex((user) => user.id === id);
  // check to see if participant is already in the room so that duplicates don't occur
  index >= 0 ? console.log("participant already in room") : users.push(user);

  updateSession("participants", users.length);
  console.log({ user });
  return user;
}

// get number of users in a room
function getNumberOfUsersByRoom(room) {
  const usersArray = users.filter((user) => user.room === room);
  return usersArray;
}

//remove user from users array and session data
function userLeave(id) {
  //takes in socket.id
  const index = users.findIndex((user) => user.id === id); //find id of user that left
  console.log({ id });
  console.log({ index });
  if (index >= 0) {
    //if not -1 (not found)
    users.splice(index, 1); //remove user from users array
    updateSession("participants", users.length); //updates sessionData(using func)
    console.log(`True from userLeave:`, { users });
    return true;
  } else {
    console.log(`False from userLeave:`, { users });
    return false;
  }
}

module.exports = { userJoin, users, getNumberOfUsersByRoom, userLeave };
