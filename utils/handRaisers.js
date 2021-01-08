const handRaisers = [];

// add user to list, update session
function handRaiser(id, name, room) {
  const user = {
    id,
    name,
    room,
  };
  const index = handRaisers.findIndex((user) => user.id === id);
  console.log(index);
  // check to see if participant is already in the room so that duplicates don't occur
  index >= 0
    ? console.log("participant already in room")
    : handRaisers.push(user);

  return user;
}

// // get number of users in a room
function getNumberOfhandRaisersByRoom(room) {
  const usersArray = handRaisers.filter((user) => user.room === room);
  return usersArray;
}

//remove user from users array and session data
function handRaiserLeft(id) {
  //takes in socket.id
  const index = handRaisers.findIndex((user) => user.id === id); //find id of user that left
  if (index >= 0) {
    //if not -1 (not found)
    handRaisers.splice(index, 1); //remove user from users array
    console.log(`Left Room True`, { handRaisers });
    return true;
  } else {
    console.log(`Left Room False`, { handRaisers });
    return false;
  }
}

module.exports = {
  handRaiser,
  handRaisers,
  handRaiserLeft,
  getNumberOfhandRaisersByRoom,
};
