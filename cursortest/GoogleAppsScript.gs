function doPost(e) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.openById('18Oj3a5wquM3fbzSHol-hfcQWcvxh07xw5n8cu8AAf-Q');
    const sheet = spreadsheet.getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toLocaleString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.entityName || '',
      data.entityType || '',
      data.product || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('Form handler is working!')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setHeaders(headers);
} 