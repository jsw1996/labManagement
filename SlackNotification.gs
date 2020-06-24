//const app = new App({
  //token: "xoxb-76088948624-1157537601095-1X077xAJHEGnAZmjerLDQI4U",
  //signingSecret: "4fbd3f9b6c524989370502770ef1cb06"
//});


// For test purpose
function test(){
  getUserID('jsw1996@uw.edu');
}

// Extract Data from spreadsheet. 
function getData(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MISSION Projects Table");
  var startRow = 5;  
  var numRows = sheet.getLastRow(); 
  var startCol = 2;  
  var numColu = sheet.getLastColumn();
  var dataRange = sheet.getRange(startRow, startCol, numRows, numColu-startCol);
  var data = dataRange.getValues(); 
  return data;
}

// Return a list of students with missing columns
function getStudents() {
  var studentList = [];
  var data = getData();
  var width = data[0].length;
  for (var i = 0; i < data.length; i++) {
    if (data[i][1] != "" && data[i][0]!='') {
      for (var j = 2; j < width; j++) {
        if (data[i][j] === "") {
          let name = data[i][0];
          let email = data[i][1];
          Logger.log(name);
          studentList.push([name, email]);
          break;
        }
      }
    }
  }
  Logger.log(studentList);
  return studentList;
}

// Retrieve a user's slack userID by email
function getUserID(email){
  var token = 'xoxp-76088948624-1108000745383-1172510813235-235c33868e063967199e8a89ff7a035f';
  var aurl = 'https://slack.com/api/users.lookupByEmail?token=' + token +'&email=' + email;
  var response = UrlFetchApp.fetch(aurl);
  var userInfo = JSON.parse(response.getContentText());
  var userId = userInfo.user.id;
  Logger.log(userId);
}

//Send Slack Notify to students
function slackNotify(){}




