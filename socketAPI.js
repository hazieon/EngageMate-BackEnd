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
  handRaiser,
  handRaisers,
  handRaiserLeft,
  getNumberOfhandRaisersByRoom,
} = require("./utils/handRaisers");

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
  handRaiseSubmissons,
  updateHandRaiseInfo,
} = require("./utils/handRaiseData");

const {
  setResultsData,
  getResultsData,
  updateResultsData,
  resetResultsData,
} = require("./utils/livePoll.js");

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

  // socket.on("leftroom", () => {
  //   socket.leave("thumbometer");
  //   console.log("user left");
  // });

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
    updateSession("outcome", Math.round(thumbometerValue)); //updates session data obj with the calculated total value

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

  socket.on("leaveThumb", () => {
    socket.leave("thumbometer");
    const result = userLeave(socket.id);
    console.log(`User left room thumbometer`);
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected`);
  });

  /////////////////////////////// Hand Raised ///////////////////////////
  socket.on("mainmenuroom", ({ name, room }) => {
    // add user to the user list
    const user = handRaiser(socket.id, name, room);

    // socket.join(user.room)
    if (!io.sockets.adapter.rooms["mainmenu"]) {
      socket.join(user.room);
    } else {
      console.log('Join "mainmenu" room denied - socket already joined');
    }

    // console.log(user has joined room, updated amount of participants)
    console.log(`${user.name} has joined room ${user.room}`);
    console.log(`${handRaisers.length} users connected`);
    console.log(
      `${getNumberOfhandRaisersByRoom(user.room).length} user(s) in room ${
        user.room
      }`
    );

    io.to("mainmenu").emit("handRaiseInfo", {
      handRaiseData: getHandRaiseInfo(),
    });
  });
  socket.on("raisehandroom", ({ name, room }) => {
    // add user to the user list
    const user = handRaiser(socket.id, name, room);

    // socket.join(user.room)
    socket.join(user.room);

    // console.log(user has joined room, updated amount of participants)
    console.log(`${user.name} has joined room ${user.room}`);
    console.log(`${handRaisers.length} users connected`);
    console.log(
      `${getNumberOfhandRaisersByRoom(user.room).length} user(s) in room ${
        user.room
      }`
    );

    io.to("raisehand").emit("handRaiseInfo", {
      handRaiseData: getHandRaiseInfo(),
    });
  });

  socket.on("leaveRaiseHand", () => {
    try {
      socket.leave("raisehand");
      console.log("user left room");
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("handRaised", ({ name, topic, picture }) => {
    addHandRaiseInfo({
      id: socket.id,
      name: name || "",
      topic: topic,
      picture: picture,
      time: moment().format("h:mm:ss a"),
    });

    console.log(
      `Someone has raised their hand: \n socket_id: ${socket.id} \n name ${name} \n topic ${topic} \n `
    );

    socket.broadcast.emit("handRaiseInfo", {
      handRaiseData: getHandRaiseInfo(),
    });
    console.log("Message sent to all users");

    // io.to("raisehand").emit("handRaiseInfo", {
    //   handRaiseData: getHandRaiseInfo(),
    // });
    // io.to("mainmenu").emit("handRaiseInfo", {
    //   handRaiseData: getHandRaiseInfo(),
    // });
  });

  function participantLowerHand(id) {
    io.emit("participantLowerHand", {
      myUniqueNumber: id,
    });
  }

  socket.on("speakerLowerHand", ({ id }) => {
    console.log(`data received ${id}`);
    updateHandRaiseInfo(id);

    participantLowerHand(id);

    socket.broadcast.emit("lowerHandRaiseInfo", {
      handRaiseData: getHandRaiseInfo(),
    });

    // io.to("raisehand").emit("lowerHandRaiseInfo", {
    //   handRaiseData: getHandRaiseInfo(),
    // });
    // io.to("mainmenu").emit("lowerHandRaiseInfo", {
    //   handRaiseData: getHandRaiseInfo(),
    // });
  });

  socket.on("lowerhand", () => {
    updateHandRaiseInfo(socket.id);
    /* Remove person who has lowered their hand from the array via the socket.id
    emit new braodcast information using io.to('raishand') */

    socket.broadcast.emit("lowerHandRaiseInfo", {
      handRaiseData: getHandRaiseInfo(),
    });
    // io.to("mainmenu").emit("lowerHandRaiseInfo", {
    //   handRaiseData: getHandRaiseInfo(),
    // });
    // io.to("raisehand").emit("lowerHandRaiseInfo", {
    //   handRaiseData: getHandRaiseInfo(),
    // });
  });

  // Mass Message
  socket.on("massMessage", ({ message }) => {
    socket.broadcast.emit("messageToAll", { message });
    console.log("Message sent to all users");
  });

  // Live Poll
  let pollIntervalId;
  socket.on("pollStart", ({ data }) => {
    console.log("Poll Started");
    resetResultsData();

    // set resultData object up
    setResultsData(data);

    pollIntervalId = setInterval(() => {
      console.log(`Interval started: ${pollIntervalId}`);
      io.emit("pollStart", { data: getResultsData() }); // send lastest resultData
    }, 500);
  });

  socket.on("vote", ({ data }) => {
    console.log("vote received");
    console.log("updating results data ...");
    //update resultData
    updateResultsData(data);

    console.log("Broadcasting updated data");
    io.emit("resultsUpdate", { data: getResultsData() }); // send latest resultData
  });

  socket.on("sessionStop", () => {
    // save resultData to db?
    console.log("Session Stopped");
    clearInterval(pollIntervalId);
    console.log("poll interval stopped");
    io.emit("sessionStop");
  });
});

module.exports = socketAPI;
