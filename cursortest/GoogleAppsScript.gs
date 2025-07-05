function doPost(e) {
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
      data.id || 'NO-ID',
      data.timestamp || new Date().toLocaleString(),
      data.submitterName || '',
      data.submitterEmail || '',
      data.salesAgentCompany || '',
      data.entityName || '',
      data.dba || '',
      data.entityType || '',
      data.ein || '',
      data.jurisdiction || '',
      data.supportEmail || '',
      data.supportPhone || '',
      data.ownerFirstName || '',
      data.ownerLastName || '',
      data.ownerEmail || '',
      data.ownerPhone || '',
      data.product || '',
      data.termsAccepted || 'No'
    ];
    
    console.log('Row data to append:', rowData);
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Successfully appended row to sheet');
    
    // Return success response with CORS headers
    const response = ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Data saved successfully' }));
    response.setMimeType(ContentService.MimeType.JSON);
    response.setHeader('Access-Control-Allow-Origin', 'https://chic-dasik-e88d56.netlify.app');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
      
  } catch (error) {
    console.error('Error in doPost:', error);
    console.error('Error stack:', error.stack);
    
    // Return error response with CORS headers
    const response = ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'error': error.toString(),
      'message': 'Failed to process form submission'
    }));
    response.setMimeType(ContentService.MimeType.JSON);
    response.setHeader('Access-Control-Allow-Origin', 'https://chic-dasik-e88d56.netlify.app');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
}

function doGet(e) {
  try {
    console.log('Received GET request');
    
    // Test if we can access the spreadsheet
    const spreadsheetId = '18Oj3a5wquM3fbzSHol-hfcQWcvxh07xw5n8cu8AAf-Q';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    let response;
    if (spreadsheet) {
      response = ContentService.createTextOutput('Form handler is working! Spreadsheet access confirmed.');
    } else {
      response = ContentService.createTextOutput('Form handler is working but cannot access spreadsheet.');
    }
    
    response.setMimeType(ContentService.MimeType.TEXT);
    response.setHeader('Access-Control-Allow-Origin', 'https://chic-dasik-e88d56.netlify.app');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
    
  } catch (error) {
    console.error('Error in doGet:', error);
    const response = ContentService.createTextOutput('Error: ' + error.toString());
    response.setMimeType(ContentService.MimeType.TEXT);
    response.setHeader('Access-Control-Allow-Origin', 'https://chic-dasik-e88d56.netlify.app');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
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
  const response = ContentService.createTextOutput('');
  response.setHeader('Access-Control-Allow-Origin', 'https://chic-dasik-e88d56.netlify.app');
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return response;
} 