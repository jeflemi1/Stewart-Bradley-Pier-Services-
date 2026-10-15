var SPREADSHEET_ID = '1y7zYPR-D7BFEBuaTnaN-I8A1lNq9am1Vi0sKNIjcYyQ';

function doPost(e) {
  var params = (e && e.parameter) || {};
  if (!params.website) {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    sheet.appendRow([
      new Date(),
      params.email || '',
      params.name || '',
      params.reminders || '',
      params.source || ''
    ]);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
