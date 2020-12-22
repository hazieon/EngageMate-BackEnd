const { v4: uuidv4 } = require("uuid");

let sessionData = {
  id: uuidv4(),
  participants: 0,          //length of users list array
  submissions: 0,           //length of submissions array
  thumbometerResult: 0,        //total value of submissions values
  question: "",
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
    id: uuidv4(),
    participants: 0,
    submissions: 0,
    thumbometerResult: 0,
    question: "",
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
