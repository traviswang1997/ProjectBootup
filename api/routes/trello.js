// //key:27247488df8786dcce58e6599ff3db01
// //token:c15180618e46a0da144db54851a46153a029413e35fe3258503baa572afa59bc

// const TRELLO_API_KEY = '27247488df8786dcce58e6599ff3db01';
// const TRELLO_OAUTH_TOKEN = '02f74cc364b08723266ce696e43fba2527bc05c6306430e556ea3e69e32e7a09';


const TrelloNodeAPI = require('trello-node-api');

var express = require('express');
var http = require('http')
var OAuth = require('oauth').OAuth
var url = require('url')

/*
/     Express Server Setup
*/

var router = express.Router();

/*
/     OAuth Setup and Functions
*/
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Trello OAuth Example";
const scope = 'read';
const expiration = '1hour';

// Be sure to include your key and secret in 🗝.env ↖️ over there.
// You can get your key and secret from Trello at: https://trello.com/app-key
const key = '27247488df8786dcce58e6599ff3db01';
const secret = '436afefcce46e3c8567dfe80defb548c874a831aa1c72d1be931258b3aea1bf6';
const trello = new TrelloNodeAPI();

// Trello redirects the user here after authentication
// callback url
const loginCallback = `http://127.0.0.1:8000/trello/callback`;

// You should have {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1")

const login = function(request, response) {
  oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
    oauth_secrets[token] = tokenSecret;
    response.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`);
  });
};

let token, tokenSecret;

var callback = function(req, res) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
    // set token and api key
    trello.setApiKey(key);
    trello.setOauthToken(accessToken);
    res.redirect('/');
  });
};

/*
/     Routes
*/
router.get("/", function (request, response) {
  login(request, response);
});


router.get("/callback", function (request, response) {
  callback(request, response);
});

module.exports = router;