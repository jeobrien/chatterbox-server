var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var messages = [];
// var html_dir = '../client/';
var fs = require('fs');

app.use(express.static('client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Max-Age", 10); // Seconds.
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.sendFile('index.html', { root: 'client' });
// });

// app.get '/'
  // res.send index.html

app.get('/classes/messages', function (req, res) {
  // fs.writeFile('./database.json', req.body, function() { console.log("Worked!"); });
  var reply = {
    results: messages
  };
  res.send(reply);
});

app.post('/classes/messages', function (req, res) {
  fs.readFile('./server/database.json', function(err, data) {
    console.log(data);
    console.log(JSON.parse(data));
    // data += JSON.stringify(req.body);
    // fs.writeFile('./server/database.json', data, function() { console.log("Worked!"); });
  });
  // console.log(req.body);
  // messages.push(req.body);
  // res.send();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
