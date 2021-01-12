let resultsData = {};

function setResultsData({ question, correctAnswer, uuid, options }) {
  resultsData = {
    question,
    correctAnswer,
    uuid,
    options,
  };
}

function getResultsData() {
  return resultsData;
}

function updateResultsData(data) {}

function resetResultsData() {
  resultsData = {};
}

module.exports = {
  setResultsData,
  getResultsData,
  updateResultsData,
  resetResultsData,
};
