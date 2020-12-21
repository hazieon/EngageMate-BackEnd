const { v4: uuidv4 } = require("uuid");

const sessionData = {
  id: uuidv4(),
  participants: 0,
  submissions: 0,
  overallOutcome: 0,
  question: "",
};

module.exports = { sessionData };
