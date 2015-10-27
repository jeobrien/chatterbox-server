var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var messages = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Max-Age", 10); // Seconds.
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/classes/messages', function (req, res) {
  var reply = {
    results: messages
  };
  res.send(reply);
});

app.post('/classes/messages', function (req, res) {
  console.log(req.body);
  messages.push(req.body);
  res.send();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
