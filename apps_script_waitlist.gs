/**
 * Google Apps Script — Zyra Waitlist API
 * 1) スプレッドシートを作成（シート名: "waitlist"）
 * 2) ツール > スクリプトエディタ でこのコードを貼付
 * 3) Deploy > New deployment > Web app
 *   - Execute as: Me
 *   - Who has access: Anyone
 *   - URL を LP の FORM_ENDPOINT に貼る
 */

const SHEET_ID = 'REPLACE_WITH_SPREADSHEET_ID'; // スプレッドシートIDに置換
const SHEET_NAME = 'waitlist';

function doOptions(e){
  return ContentService.createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doPost(e){
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (!body.email) return json({error:'email required'}, 400);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const id = Utilities.getUuid();
    const row = [
      new Date(), id, body.name || '', body.email || '',
      body.businessType || '', body.channel || '',
      body.request || '', body.consent ? 'true' : 'false', body.ts || ''
    ];
    sh.appendRow(row);

    return json({ ok: true, id });
  } catch (err){
    return json({ error: String(err) }, 500);
  }
}

function doGet(e){ return doOptions(e); }
function doDelete(e){ return doOptions(e); }
function doPut(e){ return doOptions(e); }
function doPatch(e){ return doOptions(e); }

function json(obj, code=200){
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  const resp = out;
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  resp.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return out;
}
