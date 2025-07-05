function doPost(e) {
  try {
    // Get form data from the request
    const data = e.parameter;
    
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
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Form handler is working!')
    .setMimeType(ContentService.MimeType.TEXT);
} 