var express = require('express');
var router = express.Router();


let token = null;
let user = null;

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// spreadsheet key is the long id in the sheets URL
//const doc = new GoogleSpreadsheet('1opxwMbJyZHTohL_SnvZzT9dwtboej8V_icF0S9Q2Anw');

function accessDrive() {
  // Load client secrets from a local file.
  fs.readFile('../config/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles);
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

function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}


router.get('/', function(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  accessDrive();
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
