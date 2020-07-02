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
    if (name !== "" && email!=="") {
      for (let j = start; j < width; j++) {
        if (data[i][j] === "") {
          studentList.push([name, email]);
          break;
        }
      }
    }
  }
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
  Logger.log(id);
  const URL = "https://slack.com/api/chat.postMessage";
  const AUTH_TOKEN = "xoxb-76088948624-1157537601095-4ZVEg2cXLFAIwMUahvHp36gw"; // Bot's auth token
  const TITLE = "*MISSION Project Table Update Request*\n\n";
  const LINE1 = "_This is an automated message from Team SUDOKU. Please do not reply to this message!_\n\n";
  const LINE2 = 'If you have received this message, it indicates that you have not completed your profile in the <https://docs.google.com/spreadsheets/d/1k19sS9NfwlVfG7GCCf18LO69pr4reSOTN6v1lY2nykQ/edit#gid=1165402680|MISSION Projects Table> for two weeks now. As a result, your status at SEAL has been switched to “Yellow”. However, do not fret! Your status can easily be switched back to "Green" if you complete the following steps below:\n\n';
  const LINE3 = "1. Complete your profile on the MISSION Projects Table within the week.\n";
  const LINE4 = "2. Find a new project in by performing the following steps:\n";
  const LINE5 = "\t* Go to the <https://docs.google.com/spreadsheets/d/1MdmQS6o5qsyiVXbCsQ_adcLtj-DNEVGI6P2XEUYp8mM/edit#gid=70116220|Command Center>, then browse through the projects that interest you. Specifically, go to the “Description” tab and read the “People” short term objective (Generally Row 18).\n";
  const LINE6 = "\t* Contact that project's team leader via Slack to see how you might fit inside this project.\n";
  const LINE7 = "\t* Once you have been accepted to join the project, you may remove yourself from the MISSION Projects table, unless you wish to continue looking for a new project.\n";
  const LINE8 = "You can review your status on the MISSION Project Table by looking at the status column by your name. Please see the training program for an explanation of what these warnings mean.\n\n";
  const LINE9 = "If you believe you have received this message in error, or if you have questions, please contact your team leader, or Christian Lancaster, or Aaron Zielinski via Slack.";
  const MESSAGE = TITLE.concat(LINE1, LINE2, LINE3, LINE4, LINE5, LINE6, LINE7, LINE8, LINE9);
  let block = [{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": MESSAGE
    }
  }];
  block = JSON.stringify(block);
  let formData = {
    'token': AUTH_TOKEN,
    'channel': id,
    'blocks': block
  }
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
 * clears the spreadsheet
 * @param {Object} sheet - the notified students Google sheet
 */
function clearSheet(sheet) {
  let last = sheet.getLastRow();
  if (last > 1) {
    let start = 2;
    let toClear = last-start+1;
    sheet.deleteRows(start, toClear);
  }
}

/**
 * logs the names of all the people with column missing into a Google sheet
 * @param {string} name - name of the student
 * @param {string} email - email of the student
 * @param {Object} sheet - the notified students Google sheet
 */
function notifiedStudents(name, email, sheet){
  // append to the google sheet
  let now = new Date();
  now = Utilities.formatDate(now, 'America/Los_Angeles', 'MMMM dd, yyyy HH:mm:ss');
  let row = [name, email, now];
  sheet.appendRow(row);
}

/**
 * sends messages to the all users on the mission table that have missing columns
 */
function execute(){
  const URL = 'https://docs.google.com/spreadsheets/d/1a-obhJFmPRRWWFplwGUDTF04doHVcncLp__KNrdbAug/edit#gid=1859985084';
  const TABLE_NAME = 'Notified Students on Mission Table';
  const alertMessage = 'Do you want to notify all students on the MISSION Projects Table that they need to update their row on the table?';
  let sheet = SpreadsheetApp.openByUrl(URL).getSheetByName(TABLE_NAME);
  // clears the spreadsheet first
  clearSheet(sheet);
  let ui = SpreadsheetApp.getUi();
  let result = ui.alert(alertMessage, ui.ButtonSet.YES_NO);
  if (result == ui.Button.YES) {
     ui.alert('Sending Slack messages to the users now...');
     let studentList = getStudents();
     for(let i = 0; i < studentList.length; i++){
       let name = studentList[i][0];
       let email = studentList[i][1];
       let id = getUserID(email);
       notifiedStudents(name, email, sheet);
       sendSlackMessage(id);
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




