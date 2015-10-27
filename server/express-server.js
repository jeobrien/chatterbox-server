var bodyParser = require('body-parser');
var express = require('express');

var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/database'); 
db.bind('messages');

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
  
  var messages = db.messages.find().toArray(function(err, items) {
    if (err) throw err;
    var reply = {
      results: items
    };
    res.send(reply);
  });
});

app.post('/classes/messages', function (req, res) {
    var message = req.body;
    db.messages.insert(message, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!'); res.sendStatus(201);
    });  
});

var port = 3000;

var server = app.listen(port, function () {
  console.log('Express server listening at http://127.0.0.1:' + port);
});
