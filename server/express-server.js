var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static('client'));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "content-type, accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Max-Age", 10); // Seconds.
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/classes/messages', function (req, res) {
  console.log('GET request');
  fs.readFile('./server/database.json', function (err, data) {
    if (err) {
      throw err;
    }
    var messages = JSON.parse(data);
    var reply = {
      results: messages
    };
    res.send(reply);
  });
});

app.post('/classes/messages', function (req, res) {
  fs.readFile('./server/database.json', function(err, data) {
    if (err) {
      throw err;
    }

    var messages = JSON.parse(data);
    messages.unshift(req.body);
    fs.writeFile('./server/database.json', JSON.stringify(messages), function() {
      console.log('Wrote new message to database.json');
      res.sendStatus(201);
    });
  });
});

var port = 3000;

var server = app.listen(port, function () {
  console.log('Express server listening at http://127.0.0.1:' + port);
});
