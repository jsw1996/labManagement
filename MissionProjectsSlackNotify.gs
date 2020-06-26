/*
 * Authors: Shengwen Jin, Stella Lau
 * Last Edited: 06/25/20
 * Description: Sends slack notification to lab members.
 */

/**
 * extracts student data from the Mission Table
 * @returns {array} a 2D array that contains student information
 */
function getData(){
  const URL = "https://docs.google.com/spreadsheets/d/1k19sS9NfwlVfG7GCCf18LO69pr4reSOTN6v1lY2nykQ/edit#gid=107073196";
  const TABLE_NAME = "MISSION Projects Table";
  const startRow = 6;
  const startCol = 2;
  let sheet = SpreadsheetApp.openByUrl(URL).getSheetByName(TABLE_NAME);
  let numRows = sheet.getLastRow(); 
  let numCol = sheet.getLastColumn();
  let dataRange = sheet.getRange(startRow, startCol, numRows, numCol-startCol);
  return dataRange.getValues(); 
}

/**
 * returns a list of student names and emails
 * @returns {array} a 2D array that contains students' names and emails
 */
function getStudents() {
  // contains a list of student information
  let studentList = [];
  let data = getData();
  let width = data[0].length;
  let start = 5;
  for (let i = 0; i < data.length; i++) {
    let name = data[i][0];
    let email = data[i][1];
    if (name != "" && email!="") {
      for (let j = start; j < width; j++) {
        if (data[i][j] === "") {
          // for testing
          // Logger.log(name);
          studentList.push([name, email]);
          break;
        }
      }
    }
  }
  // for testing
  // Logger.log(studentList);
  return studentList;
}

/**
 * returns the userID in slack associated with the email
 * @param {string} email - the email address of the student
 * @returns {string} userID that maps to the email address given
 */
function getUserID(email){
  // token of the slack workspace
  const TOKEN = 'xoxp-76088948624-1108000745383-1210810471652-5f5df8b0c04069b0327201cfaf3e5f14';
  // url to fetch the student's ID
  const URL = 'https://slack.com/api/users.lookupByEmail';
  // prevent user code injection
  let formData = {
    'token': TOKEN,
    'email': email
  };
  let options = {
    'method': 'get',
    'payload': formData
  };
  try{
    let response = UrlFetchApp.fetch(URL, options);
    let userInfo = JSON.parse(response.getContentText());
    userInfo = checkStatus(userInfo);
    let userId = userInfo["user"].id;
    return userId;
  } catch(e){
    // prints out error message
    let ui = SpreadsheetApp.getUi();
    ui.alert("An email provided is incorrect or something is wrong with the server!\n Please try again later!");
    return;
  }
}

/**
 * sends message to the user with the id given
 * @param {string} id - the id of the user
 */
function sendSlackMessage(id){
  const URL = "https://slack.com/api/chat.postMessage";
  const AUTH_TOKEN = "xoxb-76088948624-1157537601095-4ZVEg2cXLFAIwMUahvHp36gw"; // Bot's auth token
  let title = "*MISSION Project Table Update*";
  let message = "You are receiving this message because you are listed on the MISSION Projects table. \n There has been an update to the columns of the MISSION Projects table. \n Please visit the MISSION Projects Table as soon as possible and make sure that all of your skills and information is updated. \n Your response is essential for us to align your interests with suitable project tasks. \n Thank you for your participation! \n Click here to visit the MISSION Projects Table: https://docs.google.com/spreadsheets/d/1k19sS9NfwlVfG7GCCf18LO69pr4reSOTN6v1lY2nykQ/edit#gid=1165402680";
  let attach = [{
    'pretext': '',
    'text': message
  }];
  attach = JSON.stringify(attach);
  let formData = {
    'token': AUTH_TOKEN,
    'channel': id,
    'text': title,
    'attachments': attach
  };
  let options = {
    'method': 'post',
    'payload': formData
  };
  try {
    let response = UrlFetchApp.fetch(URL, options);
    response = JSON.parse(response.getContentText());
    checkStatus(response);
  } catch (e) {
    let ui = SpreadsheetApp.getUi();
    ui.alert("Something is wrong with the Slack server!\n Please try again later!");
  }
}


/**
 * sends messages to the all user on the mission table
 */
function execute(){
  const alertMessage = 'Do you want to notify all students on the MISSION Projects Table that they need to update their row on the table?';
  let ui = SpreadsheetApp.getUi();
  let result = ui.alert(alertMessage, ui.ButtonSet.YES_NO);
  if (result == ui.Button.YES) {
     ui.alert('Sending Slack messages to the users now...');
     // testing
     /*
     let id = getUserID("jsw1996@uw.edu");
     sendSlackMessage(id);
     */
     let studentList = getStudents();
     for(let i = 0; i < studentList.length; i++){
     let id = getUserID(studentList[i][1]);
     // testing
     // Logger.log(studentList[i][0]+" "+ id);
     // uncomment when messaging
     // sendSlackMessage(id);
    }
   } else {
     ui.alert('Cancelling...');
   }
}

/**
 * this function is used to check response status
 * @param {promise} res - response that will be sent
 * @returns {promise} - response that will be sent
 */
function checkStatus(res) {
  if (!res.ok) {
    throw Error("Error in request!");
  } else {
    return res;
  }
}




