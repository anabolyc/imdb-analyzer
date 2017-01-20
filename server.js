var http    = require('http');
var path    = require('path');
var express = require('express');
var request = require('request');

var app     = express();

// var r = request.defaults({ 'proxy': "http://username:password@proxyaddress:8080" }); 
var r = request;

app.get('/proxy', function(req, res) {

  console.log("Sending request", req.query.url);

  r(req.query.url, function (error, response, body) {
    console.log("Got response");
    if (!error && response.statusCode == 200) {
      res.statusCode = 200;
      res.send(body);
      res.end();
    } else {
      res.statusCode = 400;
      res.send(error);
      res.end();
    }
  })
  
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen(5000);
console.log("App started, listening port 5000...");

