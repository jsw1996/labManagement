/**
  This method is for the recording of data from the YBR Status spreadsheet,
  Every night between midnight and 1 am, this script will run
  It will iterate over the list of YBR pages on the spreadsheet,
  and collect their data
  Then, it takes that data and goes to the YBR Data sheet, and adds the newest
  project readiness to the end of the list.
  If a project is not listed, a new column will be added
  If a projects name is changed, the name of the column to which it belongs will change
  (This is decided by the url, which is considered the absolute reference.)
**/

/**
TODO:
  * Make it so that when you update the series, the graph shows this too!
  * Put a button to manually update the data, overwriting the current date
**/

function onOpen() {
  getYBRReadiness();
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  var chart = sheet.getCharts()[0];
  sheet.updateChart(chart);
  Logger.log(chart.getChartId());
  
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Update Chart')
      .addItem('UpdateChart', 'getYBRReadiness')
      .addToUi();
}


function getYBRReadiness() {
  // activate the spreadsheet
  var this_Sheet = SpreadsheetApp.getActive();
  
  // get the ybrstatus sheet
  var ybrstatus = this_Sheet.getSheets()[0];
  var ybrstatus_data_range = ybrstatus.getDataRange();
  var ybrstatus_last_row_index = ybrstatus_data_range.getLastRow();
  var ybrstatus_data_start = 3;
  // get the ybrdata sheet
  var ybr_data = this_Sheet.getSheets()[1];
  var ybr_data_range = ybr_data.getDataRange();
  
  //
  var ybr_data_last_row_index = ybr_data_range.getLastRow();
  var ybr_data_last_col_index = ybr_data_range.getLastColumn();
  var ybr_data_last_row;
  
  // get the current date
  var date = new Date();
  
  // for the ybr_status
  var project_name;
  var name_column = 1;
  var project_url;
  var url_column = 2;
  //var proj_leader;
  //var leader_col = 3;
  //var project_status;
  //var status_column = 4;
  var project_readiness;
  var readiness_column = 5;
  var graph_this;
  var graph_column = 6;
  
  // for the ybr_data
  var name_row = 2;
  var name_start_col = 2;
  var url_row = 1;
  var project_names;
  var project_urls;
  var project_column;
  var project_range;
  var data_range;
  
  // get all the project names before we go into the loop
  project_names = ybr_data.getRange(name_row, name_start_col,1,ybr_data_last_col_index).getValues();
  //Logger.log(project_names);
  // and the urls for good measure
  project_urls = ybr_data.getRange(url_row, name_start_col, 1, ybr_data_last_col_index).getValues();
  //Logger.log(project_urls);
  
  // SET THE DATE
  // if the date is equal to the current date, we will overwrite the existing values
  if (ybr_data.getRange(ybr_data_last_row_index,1).getValue().getDay() != date.getDay()){
    ybr_data_last_row_index += 1;
    ybr_data.getRange(ybr_data_last_row_index, 1).setValue(date);
  }

  var i;
  for (i = ybrstatus_data_start; i <= ybrstatus_last_row_index; i++) {
    // gets the name of the project
    project_name = ybrstatus_data_range.getCell(i, name_column).getValue();
    // if the project name is not blank
    if (project_name != '') {
      graph_this = ybrstatus_data_range.getCell(i, graph_column).getValue(); // checks if the checkbox is checked
      if (graph_this) {
        // gets the readiness of the project
        project_readiness = ybrstatus_data_range.getCell(i, readiness_column).getValue(); // retrieves the readiness
        // gets all the current project names
        // checks if the name is in the list
        project_column = project_names[0].indexOf(project_name) + 2;
        Logger.log(project_name, ": ", project_column);
        // if its not in the list
        if (project_column == 1) {
          // gets the url of the project
          project_url = ybrstatus_data_range.getCell(i, url_column).getValue();
          // checks if the project url is listed
          project_column = project_urls[0].indexOf(project_url) + 2;
          Logger.log("Round 2: ", project_column);
          // if the project url is not present
          if (project_column == 1) {
            // increment the last column index
            ybr_data_last_col_index += 1;
            // and set that as the project column
            project_column = ybr_data_last_col_index;
            Logger.log("Reached end, index is ", project_column);
            // put the url while we are here
            ybr_data.getRange(url_row, project_column).setValue(project_url);
            // Also, update the chart while we are at it
            // get the full data_range, up to 1000 columns? (good for 3 years)
            data_range = ybr_data.getRange(name_row, project_column, 1000);
            update_chart(data_range);
            
          }
          // at this point the project column is correct, and in either case we update the name
          ybr_data.getRange(name_row, project_column).setValue(project_name);
        }
        
        // with the correct column, we set the value at that column on the last row to the project readiness.
        ybr_data.getRange(ybr_data_last_row_index, project_column).setValue(project_readiness);
      }
    }
  }
}