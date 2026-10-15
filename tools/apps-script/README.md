# Pier Care Checklist signup

`Code.gs` is the Google Apps Script web app that records checklist sign-ups. It is not a page on the site.

The sheet must be owned by the account deploying the script. `SPREADSHEET_ID` in `Code.gs` is a placeholder (`PASTE_YOUR_NEW_SHEET_ID_HERE`); replace it with the new spreadsheet id before you deploy.

## Deploy

1. Create or open the checklist spreadsheet with the same Google account that will deploy the script.
2. Go to **Extensions → Apps Script** and replace the script with `Code.gs`.
3. Set `SPREADSHEET_ID` to that spreadsheet’s id.
4. **Deploy → New deployment → Web app**.
5. Execute as: **Me**.
6. Who has access: **Anyone**.
7. Copy the web app URL (the `/exec` link) into `SIGNUP_ENDPOINT` at the top of `script.js`, replacing `REPLACE_WITH_APPS_SCRIPT_EXEC_URL`.

`doPost` writes the date, email, first name, reminder choice (`Y` or `N`), and page path to the first sheet. A filled honeypot is ignored. The response is JSON `{ "ok": true }`.

## Spam limits

- Email validation: addresses that fail the check are not stored.
- Field length caps: email 120, name 60, source 100.
- Per-email dedupe via script cache for up to 6 hours.
- 30 rows per minute cap.
- Formula-neutralizing plain-text storage: values are stored as text, and a leading `=`, `+`, `-`, or `@` is prefixed with an apostrophe.
