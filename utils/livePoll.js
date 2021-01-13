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
  if (obj[3] === undefined) {
    obj[3] = 1;
  } else {
    obj[3] += 1;
  }

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
