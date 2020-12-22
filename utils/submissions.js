let thumbSubmissions = [];
//check function:
//check for duplicates/existing value
//if exists, update,
//if not, add
//add function:
//add to array
//update function:
//update value at matching socketid
//reset array 
//remove specific item from array


function checkExists(id){
let index = thumbSubmissions.findIndex((submission)=>submission.id===id);
return index;
}

function updateSubmission(submissionObj, index){
    console.log({submissionObj, index, thumbSubmissions})
 thumbSubmissions = [...thumbSubmissions.slice(0,index), submissionObj, ...thumbSubmissions.slice(index+1)];
 console.log(`updated submission:`, thumbSubmissions)
 return thumbSubmissions;
}

function addSubmission(submissionObj){
    let result = checkExists(submissionObj.id);
    if(result>=0){
        console.log('updating...')
     updateSubmission(submissionObj, result);
    }
    else{thumbSubmissions = [...thumbSubmissions, submissionObj]
    console.log(`Added to submissions:`, submissionObj)}
}

//reset submissions - clear the submissions array
function resetSubmissions(){
    thumbSubmissions = [];
    console.log("submissions reset...")
}

//getter
function getThumbSubmissions(){
    return thumbSubmissions;
}


function calculateSubmissions(){
//useReducer to calc result
console.log("calculating...")
let max = (thumbSubmissions.length * 100)
let actual = thumbSubmissions.reduce((acc, cur)=>{return acc+Number(cur.value)},0)
let result = ((actual/max)*100)
console.log({max})
console.log({actual})
console.log(`calculated submissions:`, result)
return result;
}

//calculate maximum possible result if all were 100
//calc the actual result from the submitted responses
//calc a percentage result from these values


module.exports ={thumbSubmissions, addSubmission, updateSubmission, getThumbSubmissions, resetSubmissions, calculateSubmissions}