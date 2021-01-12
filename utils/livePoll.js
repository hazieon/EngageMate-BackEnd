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

function updateResultsData(data) {
  /* const obj = resultsData.find((option) => option[0] === data.option);
  if (obj[3] === undefined) {
    obj[3] = 1;
  } else {
    obj += 1;
  } */
}

function resetResultsData() {
  resultsData = {};
}

module.exports = {
  setResultsData,
  getResultsData,
  updateResultsData,
  resetResultsData,
};
