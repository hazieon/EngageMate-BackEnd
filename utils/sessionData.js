const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

let sessionData = {
  uuid: uuidv4(),
  participants: 0, //length of users list array
  responses: 0, //length of responses array
  outcome: 0, //total value of responses values
  question: "",
  coach: "",
  date: moment().format("MMMM Do YYYY, h:mm:ss a"),
  throwaway: false,
};

//once timer ends, ^ these values become the submitted session data

//functions to manipulate session data

function updateSession(property, value) {
  console.log(`from updateSession:`, { property, value });
  //if property is valid,
  if (sessionData.hasOwnProperty(property)) {
    //updates sessionData object with the new value
    sessionData = { ...sessionData, [property]: value };
  } else {
    sessionData = sessionData;
  }
  console.log(`from updateSession:`, { sessionData });
}

function resetSessionData() {
  //call model function, pass in session id -> query db for that session's data
  //if present, continue
  //if not, alert
  sessionData = {
    uuid: uuidv4(),
    participants: 0,
    responses: 0,
    outcome: 0,
    question: "",
    coach: "",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    throwaway: false,
  };
  console.log(`reset session data!`);
}

// getter for session data - grabs the current state of the data obj
function getSessionData() {
  return sessionData;
}

module.exports = {
  sessionData,
  updateSession,
  resetSessionData,
  getSessionData,
};
