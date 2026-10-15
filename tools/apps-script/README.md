# Pier Care Checklist signup

`Code.gs` is the Google Apps Script web app that records checklist sign-ups. It is not a page on the site.

## Deploy

1. Open the checklist spreadsheet (`1y7zYPR-D7BFEBuaTnaN-I8A1lNq9am1Vi0sKNIjcYyQ`) and go to **Extensions → Apps Script**.
2. Replace the script with `Code.gs`.
3. **Deploy → New deployment → Web app**.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Copy the web app URL (the `/exec` link) into `SIGNUP_ENDPOINT` at the top of `script.js`, replacing `REPLACE_WITH_APPS_SCRIPT_EXEC_URL`.

`doPost` appends the date, email, first name, reminder choice (`Y` or `N`), and page path to the active sheet. A filled honeypot is ignored. The response is JSON `{ "ok": true }`.
