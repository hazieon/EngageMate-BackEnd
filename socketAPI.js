let socket_io = require("socket.io");
const moment = require("moment");
const { server } = require("./app");
let io = socket_io(server);
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
  getSessionData,
} = require("./utils/sessionData");

const {
  thumbSubmissions,
  addSubmission,
  getThumbSubmissions,
  calculateSubmissions,
  checkSubmissions,
  resetSubmissions,
} = require("./utils/submissions");

const {
  getHandRaiseInfo,
  addHandRaiseInfo,
  resetHandRaiseInfo,
  handRaiseSubmissons
} = require("./utils/handRaiseData");

socketAPI.io = io;

// Global Variables
let intervalId;

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
  socket.on("start", ({ question, timer, name, throwaway }) => {
    // set the question in the session
    // set the timer value in the session
    // emit question and timer to everyone
    // start timer on server
    resetSessionData();
    resetSubmissions();
    updateSession("participants", users.length); //sets ppt number
    updateSession("question", question); //sets question
    updateSession("coach", name); //sets coach name
    updateSession("throwaway", throwaway); // sets throwaway to true or false
    io.to("thumbometer").emit("startThumb", {
      sessionData: getSessionData(),
      timer,
    });
    // start timer;
    let counter = Number(timer);
    intervalId = setInterval(() => {
      io.to("thumbometer").emit("counter", counter);
      console.log({ counter });
      counter--;

      if (counter === 0) {
        console.log("timer finished");
        io.to("thumbometer").emit("finished", {
          sessionData: getSessionData(),
        });

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
  socket.on("submission", ({ value }) => {
    // receive a value and some identifier - add, update, read, check duplicates, save, reset, getter
    addSubmission({
      id: socket.id,
      value: value,
    });
    let thumbSubmissionsFetch = getThumbSubmissions();
    updateSession("responses", thumbSubmissionsFetch.length); //updates session data obj with number of submissions
    let thumbometerValue = calculateSubmissions(); //calculates the total submissions value for thumbometer
    updateSession("outcome", thumbometerValue); //updates session data obj with the calculated total value

    // emit updated session data to everyone -> emit to speakers real time
    io.to("thumbometer").emit("thumbUpdate", {
      sessionData: getSessionData(),
    });
    console.log(
      `Submission received from: \n socket_id: ${socket.id} \n value: ${value}`
    );
  });
  // stopTimer
  socket.on("stopTimer", () => {
    // end of session
    clearInterval(intervalId);
    console.log(`timer stopped! Session ended`, getSessionData());
    // stop timer on server
    // send message to participants to disable the slider
    io.to("thumbometer").emit("finished", {
      sessionData: getSessionData(),
    });
    // send the final state of the session data.
  });

  socket.on("disconnect", () => {
    console.log(`A user has left!`);
    const result = userLeave(socket.id);
    console.log(`disconnect success result:`, {
      result,
    });
  });

  /* Client side PTView
  click button to raise hand
  function raiseHand(name, topic, picture) {
    socket.emit("handRaised", { name: name(from Auth Data) topic: topic(from input field on ptview), picture: picture(from auth data)});
  }*/

  socket.on("handRaised", ({ name, topic, picture }) => {
    addHandRaiseInfo({
      id: socket.id,
      name: name,
      topic: topic,
      picture: picture,
      time: moment().format("h:mm:ss a"),
    });

    console.log(
      `Someone has raised their hand: \n socket_id: ${socket.id} \n name ${name} \n topic ${topic} \n `
    );
    io.to("speakerViewHandRaise").emit("handRaiseInfo", {
      handRaiseData: getHandRaiseInfo(),
      handRaiseSubmissions: handRaiseSubmissons.length
    });

    /*ClentSide SpeakerView 
    socket.on("handRaiseInfo", ({ handRaiseData, handRaiseSubmissions }) => {
      setData(handRaiseData);
      setHandsRaised(handRaiseSubmissions)
    });*/
      /* Client side speaker
  
  Button to lower hands 
  socket.emit('lowerHand' )(*/

    socket.on('lowerhand', () => {
      resetHandRaiseInfo()
    }
    )
  });


module.exports = socketAPI;

//total value of submissions -> result
//store this result in sessionData object
