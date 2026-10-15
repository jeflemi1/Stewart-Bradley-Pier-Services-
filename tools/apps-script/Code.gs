var SPREADSHEET_ID = 'PASTE_YOUR_NEW_SHEET_ID_HERE';
function clean_(v, max) { v = String(v || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max); if (/^[=+\-@]/.test(v)) v = "'" + v; return v; }
function ok_() { return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON); }
function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return ok_();
  var email = String(p.email || '').trim().toLowerCase().slice(0, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return ok_();
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var cache = CacheService.getScriptCache();
    var key = 'e_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email));
    if (cache.get(key)) return ok_();
    var minute = 'm_' + Math.floor(Date.now() / 60000);
    var count = Number(cache.get(minute) || 0);
    if (count >= 30) return ok_();
    cache.put(key, '1', 21600);
    cache.put(minute, String(count + 1), 120);
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    var row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, 5).setNumberFormat('@').setValues([[new Date().toISOString(), clean_(email, 120), clean_(p.name, 60), p.reminders === 'Y' ? 'Y' : 'N', clean_(p.source, 100)]]);
  } finally { lock.releaseLock(); }
  return ok_();
}
