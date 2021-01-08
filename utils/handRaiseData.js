let handRaiseSubmissions = [];

function checkExists(id) {
  let index = handRaiseSubmissions.findIndex(
    (submission) => submission.id === id
  );
  return index;
}

function getHandRaiseInfo() {
  return handRaiseSubmissions;
}

function addHandRaiseInfo(dataObj) {
  // id , name topic , picture, time
  let result = checkExists(dataObj.id);
  if (result >= 0) {
    console.log("hand already raised");
  } else {
    handRaiseSubmissions = [...handRaiseSubmissions, dataObj];
    console.log(`Added to submissions:`, dataObj);
  }
  return handRaiseSubmissions;
}
//reset submissions - clear the submissions array
function resetHandRaiseInfo() {
  handRaiseSubmissions = [];
  console.log("Hand reset...");
}

module.exports = {
  getHandRaiseInfo,
  addHandRaiseInfo,
  resetHandRaiseInfo,
  handRaiseSubmissions,
};
