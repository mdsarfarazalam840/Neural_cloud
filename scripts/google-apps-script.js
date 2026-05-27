/**
 * Google Apps Script — NEURAL_ARCHITECT form backend
 *
 * Receives form POST (via hidden iframe) and writes to the sheet.
 * Silently rejects spam (honeypot) and duplicates.
 *
 * Sheet columns (row 1):
 *   A: TIMESTAMP
 *   B: SIGNAL_IDENTIFIER
 *   C: TRANSMIT_FREQUENCY
 *   D: MESSAGE_PAYLOAD
 */

var SHEET_URL = 'https://docs.google.com/spreadsheets/d/1TFNGvy4uM7lMAfcC_fQTYLZB9exchC09akYpsHpptuA/edit'

function doPost(e) {
  var data = e.parameter

  if (data._honeypot) {
    return respond()
  }

  var sheet = SpreadsheetApp.openByUrl(SHEET_URL).getActiveSheet()
  var existing = sheet.getRange('C:C').getValues().flat().map(String)

  if (existing.indexOf(String(data.email)) > -1) {
    return respond()
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.name,
    data.email,
    data.message,
  ])
  return respond()
}

function respond() {
  return HtmlService.createHtmlOutput('<html><body></body></html>')
}

function doGet() {
  return HtmlService.createHtmlOutput('<html><body>ONLINE</body></html>')
}
