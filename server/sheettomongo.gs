// function sendDataToMongoDB(){}
function updateGoogleSheetFromMongoDB() {
  // MongoDB API endpoint
  const url = "https://databasetogsheet-2.onrender.com/"; // Replace with your actual API endpoint

  try {
    // Fetch data from MongoDB
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    console.log('Fetched data:', data); // Log the fetched data

    // Check if data is empty or not an array
    if (!Array.isArray(data) || data.length === 0) {
      console.log('No data to update.');
      return;
    }

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Clear existing data
    sheet.clear();

    // Prepare headers and values
    const headers = Object.keys(data[0]);
    console.log('Headers:', headers); // Log headers

    // Prepare values for rows
    const values = data.map(item => headers.map(header => item[header] || '')); // Handle missing values
    console.log('Values:', values); // Log values

    // Set headers in the first row
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Set data starting from the second row
    if (values.length > 0) {
      sheet.getRange(2, 1, values.length, headers.length).setValues(values);
    }

    console.log('Successfully updated Google Sheet.');

  } catch (error) {
    console.error('Error:', error.message);
  }
}