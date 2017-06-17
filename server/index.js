var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var Repo = require('../database/index.js');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  var clientID = '624d58ee8076f3a779cd';
  var clientSecret = 'd9a555cd6327beac4a0f632bacf81bc51b0bf561';
  var options = {
    url: `https://api.github.com/users/${req.body.query}/repos?client_id=${clientID}&client_secret=${clientSecret}`,
    headers: {
      'User-Agent': req.body.query,
    }
  }
  request(options, function(err, res, body) {
    var gitHubInfo = JSON.parse(body);
    var results = [];
    gitHubInfo.forEach(function(item) {
      results.push({'name': item.name, 'owner-id': item.owner.id, 'url': item.html_url, 'description': item.description, 'private': item.private});
    });
    for (var i = 0; i < results.length; i++) {
      Repo.create(results[i])
      .then(item => {
        //res.send('github information has been successfully saved to the database');
      })
      .catch(err => {
        //res.status(400).send('github information has not been successfully saved to the database')
      })
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
