var express = require('express');
var router = express.Router();


let token = null;
let user = null;

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// spreadsheet key is the long id in the sheets URL
//const doc = new GoogleSpreadsheet('1opxwMbJyZHTohL_SnvZzT9dwtboej8V_icF0S9Q2Anw');

function accessSpreadsheet() {
  // Load client secrets from a local file.
  fs.readFile('../config/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listMajors);
  });
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials({
    "access_token": token
});
  callback(oAuth2Client);
}

function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1opxwMbJyZHTohL_SnvZzT9dwtboej8V_icF0S9Q2Anw',
      range: 'A4:F',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log('TRUE, Status Update Sender:');
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          console.log(`${row[0]}, ${row[5]}`);
        });
      } else {
        console.log('No data found.');
      }
    });
}


router.get('/', function(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  accessSpreadsheet();
  console.log('token : ', JSON.stringify(token));
  res.end(JSON.stringify(token));
});

router.post('/', function(req, res) {
  const newUser = req.body.user;
  user = newUser;
  console.log("user = "+ user);
});

router.post('/token', function(req, res) {
  const newToken = req.body.token;
  token = newToken;
  console.log("token = "+ token);
});

module.exports = router;
