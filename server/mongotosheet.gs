function sendDataToMongoDB() {
  const url = "https://databasetogsheet-2.onrender.com/add-to-mongo"; // Replace with your actual API endpoint

  // Get the active sheet and its data
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();
  
  // Log the raw data to see what's being extracted from the sheet
  Logger.log("Raw Sheet Data: " + JSON.stringify(data));

  // Transform data into an array of objects
  const headers = data[0]; // Assume first row is header
  const payloadData = data.slice(1).map(row => {
    let obj = {};
    row.forEach((cell, index) => {
      obj[headers[index]] = cell;
    });
    return obj;
  });

  // Log the transformed data to see if it's correctly formatted
  Logger.log("Transformed Payload Data: " + JSON.stringify(payloadData));

  // Prepare the payload to send to MongoDB
  const payload = {
    "data": payloadData // Transformed data from Google Sheets
  };

  // Set the request options
  const options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true // To see full server response in case of an error
  };

  // Send the data to MongoDB via API
  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Server Response: " + response.getContentText()); // Log the response from the API
  } catch (error) {
    Logger.log("Error: " + error.message); // Log the error
  }
}