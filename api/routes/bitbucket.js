const { Bitbucket } = require('bitbucket');
var express = require("express");
var router = express.Router();
//https://bitbucket.org/jamesanthonyconsulting/workspace/settings/oauth-consumers#
//access_token=xYQCN-UGi2-NYty2-S5bQQI8XT2wkvG8L-CHB1ybZTDh9dr6WK4tnBZYGya0qUTSCseM30SMxf_HUZS4Lf6s-aHtwlVoCKt7poQKRAH0Qvgq4fc4RMSX5hrV&scopes=project%3Awrite+pipeline%3Awrite+pullrequest%3Awrite+issue%3Awrite+team%3Awrite+snippet%3Awrite+wiki+account&expires_in=7200&token_type=bearer

let accessToken = null;

   
const getBitbucketRepos = async () => {
    const clientOptions = {
        baseUrl: 'https://api.bitbucket.org/2.0',
        headers: {},
        hideNotice: true,
        options: {
          timeout: 10 * 1000
        },
        auth: {
            token: accessToken
        },
    };
    const bitbucket = new Bitbucket(clientOptions);


    try {
      const { data } = await bitbucket.repositories.listBranches({
        username: 'travis_wang',
        pagelen: 100,
        workspace: 'jamesanthonyconsulting',
        repo_slug: 'test'
      });
      console.log(data.values);
      return data.values;
    } catch (e) {
      console.log(e);
    }
};

router.get('/', function(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    getBitbucketRepos();
    console.log('token : ', JSON.stringify(accessToken));
    res.end(JSON.stringify(accessToken));
});

router.post('/token', function(req, res) {
    const newToken = req.body.key;
    accessToken = newToken;
    console.log("token = "+ accessToken);
});


module.exports = router;

