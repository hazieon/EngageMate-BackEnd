let socket_io = require("socket.io");
let io = socket_io();
let socketAPI = {};
const {
  userJoin,
  users,
  getNumberOfUsersByRoom,
  userLeave,
} = require("./utils/users");

const {
  sessionData,
  updateSession,
  resetSessionData,
} = require("./utils/sessionData");

socketAPI.io = io;

// Global Variables
let timeoutId;

// Socket Logic
io.on("connection", (socket) => {
  console.log(`A user has connected!`);
  //console.log({ socket });

  // joinRoom
  socket.on("joinroom", ({ name, role, room }) => {
    // add user to the user list
    const user = userJoin(socket.id, name, role, room);

    // socket.join(user.room)
    socket.join(user.room);

    // console.log(user has joined room, updated amount of participants)
    console.log(`${user.name} has joined room ${user.room}`);
    console.log(`${users.length} users connected`);
    console.log(
      `${getNumberOfUsersByRoom(user.room).length} user(s) in room ${user.room}`
    );

    // emit session data to everyone.
    // io.to(user.room).emit("", () => {});
  });

  // start
  socket.on("start", ({ question, timer }) => {
    // set the question in the session
    // set the timer value in the session
    // emit question and timer to everyone
    // start timer on server
    updateSession("question", question);
    io.to("thumbometer").emit("startThumb", { sessionData, timer });
    // start timer;
    let counter = timer;
    let intervalId = setInterval(() => {
      io.to("thumbometer").emit("counter", counter);
      counter--;
      console.log({ counter });
      if (counter === 0) {
        console.log("timer finished");
        io.to("thumbometer").emit("finished", { sessionData });
        clearInterval(intervalId);
      }
    }, 1000);

    // Client side code
    /* 
    socket.on('counter', function(count){
      render the count accordingly
      disable slider
    }); 
      */
  });

  // submission
  socket.on("submission", () => {
    // receive a value and some identifying
    // add to submission array, if it does not already exist
    // update the session
    // emit updated session data to everyone
  });

  // stopTimer
  socket.on("stopTimer", () => {
    // end of session
    // stop timer on server
    // send message to participants to disable the slider
    // send the final state of the session data.
  });

  socket.on("disconnect", () => {
    console.log(`A user has left!`);
    const result = userLeave(socket.id);
    console.log(`disconnect success result:`, { result });
  });
});

module.exports = socketAPI;
