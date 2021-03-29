var express = require("express");
var router = express.Router();
const { WebClient } = require('@slack/web-api');

let accessToken = null;
let web = null;

const createChannel = async () =>{
    try {
    // Use the `chat.postMessage` method to send a message from this app
        await web.conversations.create({
            name: 'testing_from_nodejs',
        });
        console.log('Channel created!');
    } catch (error) {
        console.log(error);
    }
    
}

router.get('/', function(req, res, next) {
    web = new WebClient(accessToken);
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    console.log('token :', JSON.stringify(accessToken));
    res.end(JSON.stringify(accessToken));
    //createChannel();
});

router.post('/token', function(req, res) {
    const newToken = req.body.access_token;
    accessToken = newToken;
    console.log("token = "+ accessToken);
});


module.exports = router;

