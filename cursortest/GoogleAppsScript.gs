function doPost(e) {
  // Set CORS headers to allow requests from Netlify
  const headers = {
    'Access-Control-Allow-Origin': 'https://chic-dasik-e88d56.netlify.app',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  try {
    // Log the incoming request for debugging
    console.log('Received POST request');
    console.log('Request parameters:', e.parameter);
    console.log('Request postData:', e.postData);
    
    // Get form data from the request
    let data = {};
    
    if (e.parameter) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      // Try to parse JSON if it's JSON data
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        console.log('Failed to parse JSON:', jsonError);
        // If JSON parsing fails, try to parse as form data
        const formData = e.postData.contents;
        const params = new URLSearchParams(formData);
        for (let [key, value] of params.entries()) {
          data[key] = value;
        }
      }
    }
    
    console.log('Processed data:', data);
    
    // Validate that we have the required spreadsheet ID
    const spreadsheetId = '18Oj3a5wquM3fbzSHol-hfcQWcvxh07xw5n8cu8AAf-Q';
    console.log('Using spreadsheet ID:', spreadsheetId);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    if (!spreadsheet) {
      throw new Error('Could not open spreadsheet with ID: ' + spreadsheetId);
    }
    
    const sheet = spreadsheet.getActiveSheet();
    if (!sheet) {
      throw new Error('Could not get active sheet');
    }
    
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
    
    console.log('Row data to append:', rowData);
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Successfully appended row to sheet');
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    console.error('Error stack:', error.stack);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString(),
        'message': 'Failed to process form submission'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  // Set CORS headers to allow requests from Netlify
  const headers = {
    'Access-Control-Allow-Origin': 'https://chic-dasik-e88d56.netlify.app',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  try {
    console.log('Received GET request');
    
    // Test if we can access the spreadsheet
    const spreadsheetId = '18Oj3a5wquM3fbzSHol-hfcQWcvxh07xw5n8cu8AAf-Q';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    if (spreadsheet) {
      return ContentService
        .createTextOutput('Form handler is working! Spreadsheet access confirmed.')
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeaders(headers);
    } else {
      return ContentService
        .createTextOutput('Form handler is working but cannot access spreadsheet.')
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeaders(headers);
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }
}

// Test function to verify spreadsheet access
function testSpreadsheetAccess() {
  try {
    const spreadsheetId = '18Oj3a5wquM3fbzSHol-hfcQWcvxh07xw5n8cu8AAf-Q';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    if (spreadsheet) {
      console.log('Spreadsheet access successful');
      const sheet = spreadsheet.getActiveSheet();
      console.log('Sheet name:', sheet.getName());
      return true;
    } else {
      console.log('Could not access spreadsheet');
      return false;
    }
  } catch (error) {
    console.error('Error testing spreadsheet access:', error);
    return false;
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://chic-dasik-e88d56.netlify.app',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService
    .createTextOutput('')
    .setHeaders(headers);
} 