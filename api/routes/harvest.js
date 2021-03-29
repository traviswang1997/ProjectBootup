

var express = require("express");
var router = express.Router();


let Harvest = require('harvest-v2');
let harvest = new Harvest({
        account_ID: '1284800',
        access_token: '2558037.pt.6dJce3VBrC-itSjOSwJjUa06ce53jPUT5RQGX0qH3kU_XMpQEEk9LKvIRTHGe7Q6gtRONbv0pndg_raRIjMuow',
        user_agent: 'Harvest API'
});

router.get('/', function(req, res, next){
    harvest.company.retrieve().then((first_name) => {
        res.send(first_name);
    }).catch(function (err) {
        res.send(err);
    });
});

module.exports = router;