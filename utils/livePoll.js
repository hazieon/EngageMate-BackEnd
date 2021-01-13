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
  const obj = resultsData.options.find((option) => option[0] === data);
  if (obj) obj[3] = obj[3] += 1;

  console.log("Updated results object: ", getResultsData());
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
