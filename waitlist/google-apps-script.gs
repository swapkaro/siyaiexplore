/**
 * Siyai waitlist -> Google Sheet
 *
 * 1. Create a Google Sheet. Extensions > Apps Script. Paste this file in, save.
 * 2. Deploy > New deployment > type "Web app".
 *    Execute as: Me.  Who has access: Anyone.
 * 3. Copy the Web app URL and paste it into WAITLIST_URL in index.html.
 */
const SHEET_NAME = "Waitlist";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const email = String(data.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: "invalid email" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(["Joined at", "Email", "Source", "Frames collected"]);

    // skip duplicates
    const last = sheet.getLastRow();
    if (last > 1) {
      const emails = sheet.getRange(2, 2, last - 1, 1).getValues().flat().map(String);
      if (emails.includes(email)) return json({ ok: true, duplicate: true });
    }
    sheet.appendRow([new Date(), email, String(data.source || ""), Number(data.frames || 0)]);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
